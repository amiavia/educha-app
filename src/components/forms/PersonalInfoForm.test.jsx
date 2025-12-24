import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PersonalInfoForm from './PersonalInfoForm';

describe('PersonalInfoForm Component', () => {
  const mockOnChange = vi.fn();
  const defaultData = {
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    email: '',
    phone: '',
    country: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form fields correctly', () => {
    render(<PersonalInfoForm data={defaultData} onChange={mockOnChange} />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nationality/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/current country of residence/i)).toBeInTheDocument();
  });

  it('displays info banner with explanation', () => {
    render(<PersonalInfoForm data={defaultData} onChange={mockOnChange} />);

    expect(screen.getByText(/why we need this/i)).toBeInTheDocument();
    expect(screen.getByText(/universities use this information/i)).toBeInTheDocument();
  });

  it('shows required field indicators', () => {
    const { container } = render(<PersonalInfoForm data={defaultData} onChange={mockOnChange} />);
    const requiredFields = container.querySelectorAll('.text-red-500');

    // Should have 5 required fields marked with asterisks
    expect(requiredFields.length).toBeGreaterThanOrEqual(5);
  });

  it('renders with pre-filled data', () => {
    const filledData = {
      fullName: 'Meera Patel',
      dateOfBirth: '2000-05-15',
      nationality: 'indian',
      email: 'meera@example.com',
      phone: '+44 20 1234 5678',
      country: 'uk',
    };

    render(<PersonalInfoForm data={filledData} onChange={mockOnChange} />);

    expect(screen.getByDisplayValue('Meera Patel')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2000-05-15')).toBeInTheDocument();
    // Check select values
    const nationalitySelect = screen.getByLabelText(/nationality/i);
    expect(nationalitySelect.value).toBe('indian');
    expect(screen.getByDisplayValue('meera@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('+44 20 1234 5678')).toBeInTheDocument();
    const countrySelect = screen.getByLabelText(/current country of residence/i);
    expect(countrySelect.value).toBe('uk');
  });

  describe('User Interactions', () => {
    it('calls onChange when full name is updated', async () => {
      const user = userEvent.setup();
      render(<PersonalInfoForm data={defaultData} onChange={mockOnChange} />);

      const nameInput = screen.getByLabelText(/full name/i);
      await user.type(nameInput, 'J');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ fullName: 'J' })
      );
    });

    it('calls onChange when date of birth is selected', async () => {
      const user = userEvent.setup();
      const { container } = render(<PersonalInfoForm data={defaultData} onChange={mockOnChange} />);

      const dobInput = container.querySelector('input[type="date"]');
      await user.type(dobInput, '2000-01-15');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ dateOfBirth: '2000-01-15' })
      );
    });

    it('calls onChange when nationality is selected', async () => {
      const user = userEvent.setup();
      render(<PersonalInfoForm data={defaultData} onChange={mockOnChange} />);

      const selects = screen.getAllByRole('combobox');
      const nationalitySelect = selects[0]; // First select is nationality
      await user.selectOptions(nationalitySelect, 'indian');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ nationality: 'indian' })
      );
    });

    it('calls onChange when email is updated', async () => {
      const user = userEvent.setup();
      render(<PersonalInfoForm data={defaultData} onChange={mockOnChange} />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 't');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ email: 't' })
      );
    });

    it('calls onChange when phone is updated', async () => {
      const user = userEvent.setup();
      render(<PersonalInfoForm data={defaultData} onChange={mockOnChange} />);

      const phoneInput = screen.getByLabelText(/phone number/i);
      await user.type(phoneInput, '+');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ phone: '+' })
      );
    });

    it('calls onChange when country is selected', async () => {
      const user = userEvent.setup();
      render(<PersonalInfoForm data={defaultData} onChange={mockOnChange} />);

      const selects = screen.getAllByRole('combobox');
      const countrySelect = selects[1]; // Second select is country
      await user.selectOptions(countrySelect, 'india');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ country: 'india' })
      );
    });
  });

  describe('Form Validation', () => {
    it('has correct input types for validation', () => {
      const { container } = render(<PersonalInfoForm data={defaultData} onChange={mockOnChange} />);

      const emailInput = screen.getByPlaceholderText(/your.email@example.com/i);
      expect(emailInput).toHaveAttribute('type', 'email');

      const phoneInput = screen.getByPlaceholderText(/\+44 20 1234 5678/i);
      expect(phoneInput).toHaveAttribute('type', 'tel');

      const dobInput = container.querySelector('input[type="date"]');
      expect(dobInput).toBeInTheDocument();
    });

    it('has appropriate placeholders for user guidance', () => {
      render(<PersonalInfoForm data={defaultData} onChange={mockOnChange} />);

      expect(screen.getByPlaceholderText(/meera patel/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/your.email@example.com/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/\+44 20 1234 5678/i)).toBeInTheDocument();
    });
  });

  describe('Select Options', () => {
    it('renders all nationality options', () => {
      render(<PersonalInfoForm data={defaultData} onChange={mockOnChange} />);

      const nationalitySelect = screen.getByLabelText(/nationality/i);
      const options = nationalitySelect.querySelectorAll('option');

      expect(options.length).toBe(7); // 6 options + 1 placeholder
      expect(screen.getByRole('option', { name: /indian/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /chinese/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /nigerian/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /bangladeshi/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /pakistani/i })).toBeInTheDocument();
      // Check for 'Other' option within the nationality select
      const otherOptions = nationalitySelect.querySelectorAll('option[value="other"]');
      expect(otherOptions.length).toBe(1);
    });

    it('renders all country options', () => {
      render(<PersonalInfoForm data={defaultData} onChange={mockOnChange} />);

      const selects = screen.getAllByRole('combobox');
      const countrySelect = selects[1];
      const options = countrySelect.querySelectorAll('option');

      expect(options.length).toBe(8); // 7 options + 1 placeholder
      expect(screen.getByRole('option', { name: /^india$/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /united kingdom/i })).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it('preserves existing data when updating a single field', async () => {
      const user = userEvent.setup();
      const existingData = {
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        phone: '',
        dateOfBirth: '',
        nationality: '',
        country: '',
      };

      render(<PersonalInfoForm data={existingData} onChange={mockOnChange} />);

      const phoneInput = screen.getByLabelText(/phone number/i);
      await user.type(phoneInput, '1');

      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          fullName: 'Jane Smith',
          email: 'jane@example.com',
          phone: '1',
        })
      );
    });
  });

  describe('Accessibility', () => {
    it('applies focus styles with ring classes', () => {
      const { container } = render(<PersonalInfoForm data={defaultData} onChange={mockOnChange} />);

      const inputs = container.querySelectorAll('input, select');
      inputs.forEach(input => {
        expect(input).toHaveClass('focus:ring-2');
        expect(input).toHaveClass('focus:ring-primary-blue');
      });
    });
  });
});
