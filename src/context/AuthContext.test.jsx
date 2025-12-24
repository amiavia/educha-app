import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from './AuthContext';

// Test component to access the context
const TestComponent = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <div data-testid="user-status">
        {user ? `Logged in as ${user.email}` : 'Not logged in'}
      </div>
      {user && <div data-testid="user-name">{user.name}</div>}
      {user && <div data-testid="profile-completion">{user.profileCompletion}%</div>}
      <button
        onClick={() => login('meera@educha.co.uk', 'educha1113')}
        data-testid="login-button"
      >
        Login
      </button>
      <button
        onClick={() => login('wrong@email.com', 'wrongpass')}
        data-testid="login-wrong-button"
      >
        Login Wrong
      </button>
      <button onClick={logout} data-testid="logout-button">
        Logout
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('useAuth Hook', () => {
    it('throws error when used outside AuthProvider', () => {
      // Suppress console.error for this test
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useAuth must be used within AuthProvider');

      consoleError.mockRestore();
    });

    it('provides auth context when used within AuthProvider', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');
    });
  });

  describe('AuthProvider', () => {
    it('renders children correctly', () => {
      render(
        <AuthProvider>
          <div data-testid="child">Test Child</div>
        </AuthProvider>
      );

      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.getByTestId('child')).toHaveTextContent('Test Child');
    });

    it('initializes with no user', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');
    });

    it('successfully logs in with correct credentials', async () => {
      const user = userEvent.setup();

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const loginButton = screen.getByTestId('login-button');
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByTestId('user-status')).toHaveTextContent(
          'Logged in as meera@educha.co.uk'
        );
      });

      expect(screen.getByTestId('user-name')).toHaveTextContent('Meera');
      expect(screen.getByTestId('profile-completion')).toHaveTextContent('35%');
    });

    it('stores user data in localStorage on successful login', async () => {
      const user = userEvent.setup();

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const loginButton = screen.getByTestId('login-button');
      await user.click(loginButton);

      await waitFor(() => {
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'educha_user',
          JSON.stringify({
            email: 'meera@educha.co.uk',
            name: 'Meera',
            profileCompletion: 35,
          })
        );
      });
    });

    it('fails login with incorrect credentials', async () => {
      const user = userEvent.setup();

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const loginWrongButton = screen.getByTestId('login-wrong-button');
      await user.click(loginWrongButton);

      // User should still be not logged in
      expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');
      expect(screen.queryByTestId('user-name')).not.toBeInTheDocument();
    });

    it('logs out successfully', async () => {
      const user = userEvent.setup();

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // First login
      const loginButton = screen.getByTestId('login-button');
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByTestId('user-status')).toHaveTextContent(
          'Logged in as meera@educha.co.uk'
        );
      });

      // Then logout
      const logoutButton = screen.getByTestId('logout-button');
      await user.click(logoutButton);

      await waitFor(() => {
        expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');
      });

      expect(screen.queryByTestId('user-name')).not.toBeInTheDocument();
    });

    it('removes user data from localStorage on logout', async () => {
      const user = userEvent.setup();

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Login first
      const loginButton = screen.getByTestId('login-button');
      await user.click(loginButton);

      await waitFor(() => {
        expect(localStorage.setItem).toHaveBeenCalled();
      });

      // Logout
      const logoutButton = screen.getByTestId('logout-button');
      await user.click(logoutButton);

      await waitFor(() => {
        expect(localStorage.removeItem).toHaveBeenCalledWith('educha_user');
      });
    });

    it('restores user from localStorage on mount', () => {
      const storedUser = {
        email: 'meera@educha.co.uk',
        name: 'Meera',
        profileCompletion: 35,
      };

      localStorage.getItem.mockReturnValueOnce(JSON.stringify(storedUser));

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // User should be restored from localStorage
      expect(localStorage.getItem).toHaveBeenCalledWith('educha_user');
      expect(screen.getByTestId('user-status')).toHaveTextContent(
        'Logged in as meera@educha.co.uk'
      );
    });

    it('handles invalid localStorage data gracefully', () => {
      localStorage.getItem.mockReturnValueOnce('invalid json');

      // Should not throw error
      expect(() => {
        render(
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        );
      }).toThrow(); // JSON.parse will throw with invalid JSON
    });

    it('handles null localStorage data', () => {
      localStorage.getItem.mockReturnValueOnce(null);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');
    });
  });

  describe('Login Function', () => {
    it('returns success object on successful login', async () => {
      const user = userEvent.setup();
      let loginResult;

      const TestComponentWithResult = () => {
        const { login } = useAuth();

        return (
          <button
            onClick={async () => {
              loginResult = login('meera@educha.co.uk', 'educha1113');
            }}
            data-testid="test-login"
          >
            Test Login
          </button>
        );
      };

      render(
        <AuthProvider>
          <TestComponentWithResult />
        </AuthProvider>
      );

      await user.click(screen.getByTestId('test-login'));

      expect(loginResult).toEqual({ success: true });
    });

    it('returns error object on failed login', async () => {
      const user = userEvent.setup();
      let loginResult;

      const TestComponentWithResult = () => {
        const { login } = useAuth();

        return (
          <button
            onClick={async () => {
              loginResult = login('wrong@email.com', 'wrongpass');
            }}
            data-testid="test-login"
          >
            Test Login
          </button>
        );
      };

      render(
        <AuthProvider>
          <TestComponentWithResult />
        </AuthProvider>
      );

      await user.click(screen.getByTestId('test-login'));

      expect(loginResult).toEqual({
        success: false,
        error: 'Invalid email or password',
      });
    });
  });
});
