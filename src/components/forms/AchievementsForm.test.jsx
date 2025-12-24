import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AchievementsForm from './AchievementsForm';

describe('AchievementsForm Component', () => {
  const mockOnChange = vi.fn();
  const defaultData = {
    achievements: [{ title: '', description: '', year: '' }],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form with initial achievement entry', () => {
    render(<AchievementsForm data={defaultData} onChange={mockOnChange} />);

    expect(screen.getByLabelText(/achievement title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^year$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^description$/i)).toBeInTheDocument();
  });

  it('displays info banner with achievements context', () => {
    render(<AchievementsForm data={defaultData} onChange={mockOnChange} />);

    expect(screen.getByText(/show off your accomplishments/i)).toBeInTheDocument();
    expect(screen.getByText(/academic awards, competitions/i)).toBeInTheDocument();
  });

  it('displays pro tip section', () => {
    render(<AchievementsForm data={defaultData} onChange={mockOnChange} />);

    expect(screen.getByText(/pro tip/i)).toBeInTheDocument();
    expect(screen.getByText(/national\/international competitions/i)).toBeInTheDocument();
  });

  it('renders with pre-filled achievement data', () => {
    const filledData = {
      achievements: [
        {
          title: 'National Science Olympiad Gold Medal',
          description: 'First place in national competition',
          year: '2023',
          category: 'academic',
        },
      ],
    };

    render(<AchievementsForm data={filledData} onChange={mockOnChange} />);

    expect(screen.getByDisplayValue('National Science Olympiad Gold Medal')).toBeInTheDocument();
    expect(screen.getByDisplayValue('First place in national competition')).toBeInTheDocument();
    // Check select values
    const yearSelect = screen.getByLabelText(/^year$/i);
    expect(yearSelect.value).toBe('2023');
    const categorySelect = screen.getByLabelText(/category/i);
    expect(categorySelect.value).toBe('academic');
  });

  describe('Adding and Removing Achievements', () => {
    it('displays add achievement button', () => {
      render(<AchievementsForm data={defaultData} onChange={mockOnChange} />);

      const addButton = screen.getByRole('button', { name: /add another achievement/i });
      expect(addButton).toBeInTheDocument();
    });

    it('adds a new achievement entry when add button is clicked', async () => {
      const user = userEvent.setup();
      render(<AchievementsForm data={defaultData} onChange={mockOnChange} />);

      const addButton = screen.getByRole('button', { name: /add another achievement/i });
      await user.click(addButton);

      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          achievements: expect.arrayContaining([
            { title: '', description: '', year: '' },
            { title: '', description: '', year: '' },
          ]),
        })
      );
    });

    it('does not show remove button when only one achievement exists', () => {
      render(<AchievementsForm data={defaultData} onChange={mockOnChange} />);

      const deleteButtons = screen.queryAllByRole('button', { name: '' });
      const trashButtons = deleteButtons.filter(btn => btn.querySelector('svg') && btn.className.includes('text-red-500'));

      expect(trashButtons.length).toBe(0);
    });

    it('shows remove button when multiple achievements exist', () => {
      const multipleData = {
        achievements: [
          { title: 'Achievement 1', description: 'Desc 1', year: '2023', category: 'academic' },
          { title: 'Achievement 2', description: 'Desc 2', year: '2024', category: 'sports' },
        ],
      };

      render(<AchievementsForm data={multipleData} onChange={mockOnChange} />);

      const containers = screen.getAllByText(/achievement title/i).map(el => el.closest('.bg-gray-50'));
      expect(containers.length).toBe(2);
    });

    it('removes an achievement when remove button is clicked', async () => {
      const user = userEvent.setup();
      const multipleData = {
        achievements: [
          { title: 'Achievement 1', description: 'Desc 1', year: '2023', category: 'academic' },
          { title: 'Achievement 2', description: 'Desc 2', year: '2024', category: 'sports' },
        ],
      };

      render(<AchievementsForm data={multipleData} onChange={mockOnChange} />);

      // Find delete buttons by looking for HiOutlineTrash icons
      const deleteButtons = screen.getAllByRole('button').filter(btn => {
        const svg = btn.querySelector('svg');
        return svg && btn.className.includes('text-red-500');
      });

      expect(deleteButtons.length).toBe(2);

      await user.click(deleteButtons[0]);

      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          achievements: expect.arrayContaining([
            expect.objectContaining({ title: 'Achievement 2' }),
          ]),
        })
      );
    });
  });

  describe('User Interactions', () => {
    it('calls onChange when title is updated', async () => {
      const user = userEvent.setup();
      render(<AchievementsForm data={defaultData} onChange={mockOnChange} />);

      const titleInput = screen.getByLabelText(/achievement title/i);
      await user.type(titleInput, 'Math Competition Winner');

      expect(mockOnChange).toHaveBeenCalled();
      const lastCall = mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0];
      expect(lastCall.achievements[0].title).toContain('Math Competition Winner');
    });

    it('calls onChange when year is selected', async () => {
      const user = userEvent.setup();
      render(<AchievementsForm data={defaultData} onChange={mockOnChange} />);

      const yearSelect = screen.getByLabelText(/^year$/i);
      const currentYear = new Date().getFullYear();
      await user.selectOptions(yearSelect, currentYear.toString());

      expect(mockOnChange).toHaveBeenCalled();
      const lastCall = mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0];
      expect(lastCall.achievements[0].year).toBe(currentYear.toString());
    });

    it('calls onChange when category is selected', async () => {
      const user = userEvent.setup();
      render(<AchievementsForm data={defaultData} onChange={mockOnChange} />);

      const categorySelect = screen.getByLabelText(/category/i);
      await user.selectOptions(categorySelect, 'competition');

      expect(mockOnChange).toHaveBeenCalled();
      const lastCall = mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0];
      expect(lastCall.achievements[0].category).toBe('competition');
    });

    it('calls onChange when description is updated', async () => {
      const user = userEvent.setup();
      render(<AchievementsForm data={defaultData} onChange={mockOnChange} />);

      const descriptionTextarea = screen.getByLabelText(/^description$/i);
      await user.type(descriptionTextarea, 'Won first place');

      expect(mockOnChange).toHaveBeenCalled();
      const lastCall = mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0];
      expect(lastCall.achievements[0].description).toContain('Won first place');
    });
  });

  describe('Year Options', () => {
    it('renders year options dynamically for last 8 years', () => {
      render(<AchievementsForm data={defaultData} onChange={mockOnChange} />);

      const yearSelect = screen.getByLabelText(/^year$/i);
      const options = yearSelect.querySelectorAll('option');

      // Should have 9 options: 1 placeholder + 8 years
      expect(options.length).toBe(9);
    });

    it('includes current and past years in year options', () => {
      render(<AchievementsForm data={defaultData} onChange={mockOnChange} />);

      const currentYear = new Date().getFullYear();
      const pastYear = currentYear - 7;

      expect(screen.getByRole('option', { name: currentYear.toString() })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: pastYear.toString() })).toBeInTheDocument();
    });
  });

  describe('Category Options', () => {
    it('renders all achievement category options', () => {
      render(<AchievementsForm data={defaultData} onChange={mockOnChange} />);

      expect(screen.getByRole('option', { name: /academic award/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /^competition$/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /^certification$/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /^leadership$/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /^sports$/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /arts & culture/i })).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('has appropriate placeholders for user guidance', () => {
      render(<AchievementsForm data={defaultData} onChange={mockOnChange} />);

      expect(screen.getByPlaceholderText(/national science olympiad/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/briefly describe what you achieved/i)).toBeInTheDocument();
    });
  });

  describe('Multiple Achievements', () => {
    it('updates the correct achievement when multiple exist', async () => {
      const user = userEvent.setup();
      const multipleData = {
        achievements: [
          { title: 'Achievement 1', description: '', year: '', category: '' },
          { title: 'Achievement 2', description: '', year: '', category: '' },
        ],
      };

      render(<AchievementsForm data={multipleData} onChange={mockOnChange} />);

      const titleInputs = screen.getAllByLabelText(/achievement title/i);
      expect(titleInputs.length).toBe(2);

      await user.clear(titleInputs[1]);
      await user.type(titleInputs[1], 'Updated Achievement');

      expect(mockOnChange).toHaveBeenCalled();
      const lastCall = mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0];
      expect(lastCall.achievements[0].title).toBe('Achievement 1');
      expect(lastCall.achievements[1].title).toContain('Updated Achievement');
    });
  });

  describe('Accessibility', () => {
    it('has proper label associations', () => {
      render(<AchievementsForm data={defaultData} onChange={mockOnChange} />);

      const titleInput = screen.getByLabelText(/achievement title/i);
      expect(titleInput).toHaveAttribute('type', 'text');

      const descriptionTextarea = screen.getByLabelText(/^description$/i);
      expect(descriptionTextarea.tagName).toBe('TEXTAREA');
    });

    it('applies focus styles with ring classes', () => {
      const { container } = render(<AchievementsForm data={defaultData} onChange={mockOnChange} />);

      const inputs = container.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        expect(input).toHaveClass('focus:ring-2');
        expect(input).toHaveClass('focus:ring-primary-blue');
      });
    });

    it('uses textarea with appropriate rows for description', () => {
      render(<AchievementsForm data={defaultData} onChange={mockOnChange} />);

      const descriptionTextarea = screen.getByLabelText(/^description$/i);
      expect(descriptionTextarea).toHaveAttribute('rows', '2');
    });
  });

  describe('State Management', () => {
    it('initializes with empty achievement if data.achievements is undefined', () => {
      const emptyData = {};
      render(<AchievementsForm data={emptyData} onChange={mockOnChange} />);

      const titleInput = screen.getByLabelText(/achievement title/i);
      expect(titleInput).toHaveValue('');
    });
  });
});
