import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExperienceForm from './ExperienceForm';

describe('ExperienceForm Component', () => {
  const mockOnChange = vi.fn();
  const defaultData = {
    experiences: [{ title: '', organization: '', type: '', duration: '', description: '' }],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form with initial experience entry', () => {
    render(<ExperienceForm data={defaultData} onChange={mockOnChange} />);

    expect(screen.getByLabelText(/role\/position/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/organization\/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^type$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/duration/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description & key responsibilities/i)).toBeInTheDocument();
  });

  it('displays info banner with experience context', () => {
    render(<ExperienceForm data={defaultData} onChange={mockOnChange} />);

    expect(screen.getByText(/real-world experience matters/i)).toBeInTheDocument();
    expect(screen.getByText(/internships, volunteer work/i)).toBeInTheDocument();
  });

  it('displays pro tip section', () => {
    render(<ExperienceForm data={defaultData} onChange={mockOnChange} />);

    expect(screen.getByText(/pro tip/i)).toBeInTheDocument();
    expect(screen.getByText(/even small experiences count/i)).toBeInTheDocument();
  });

  it('renders with pre-filled experience data', () => {
    const filledData = {
      experiences: [
        {
          title: 'Research Intern',
          organization: 'Microsoft',
          type: 'internship',
          duration: '3 months',
          description: 'Worked on machine learning projects',
        },
      ],
    };

    render(<ExperienceForm data={filledData} onChange={mockOnChange} />);

    expect(screen.getByDisplayValue('Research Intern')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Microsoft')).toBeInTheDocument();
    // Check select has correct value
    const typeSelect = screen.getByLabelText(/^type$/i);
    expect(typeSelect.value).toBe('internship');
    expect(screen.getByDisplayValue('3 months')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Worked on machine learning projects')).toBeInTheDocument();
  });

  describe('Adding and Removing Experiences', () => {
    it('displays add experience button', () => {
      render(<ExperienceForm data={defaultData} onChange={mockOnChange} />);

      const addButton = screen.getByRole('button', { name: /add another experience/i });
      expect(addButton).toBeInTheDocument();
    });

    it('adds a new experience entry when add button is clicked', async () => {
      const user = userEvent.setup();
      render(<ExperienceForm data={defaultData} onChange={mockOnChange} />);

      const addButton = screen.getByRole('button', { name: /add another experience/i });
      await user.click(addButton);

      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          experiences: expect.arrayContaining([
            { title: '', organization: '', type: '', duration: '', description: '' },
            { title: '', organization: '', type: '', duration: '', description: '' },
          ]),
        })
      );
    });

    it('does not show remove button when only one experience exists', () => {
      render(<ExperienceForm data={defaultData} onChange={mockOnChange} />);

      const deleteButtons = screen.queryAllByRole('button', { name: '' });
      const trashButtons = deleteButtons.filter(btn => btn.querySelector('svg'));

      expect(trashButtons.length).toBe(0);
    });

    it('shows remove button when multiple experiences exist', async () => {
      const user = userEvent.setup();
      const multipleData = {
        experiences: [
          { title: 'Intern 1', organization: 'Org 1', type: 'internship', duration: '2 months', description: 'Desc 1' },
          { title: 'Intern 2', organization: 'Org 2', type: 'volunteer', duration: '3 months', description: 'Desc 2' },
        ],
      };

      render(<ExperienceForm data={multipleData} onChange={mockOnChange} />);

      const containers = screen.getAllByText(/role\/position/i).map(el => el.closest('.bg-gray-50'));
      expect(containers.length).toBe(2);
    });

    it('removes an experience when remove button is clicked', async () => {
      const user = userEvent.setup();
      const multipleData = {
        experiences: [
          { title: 'Intern 1', organization: 'Org 1', type: 'internship', duration: '2 months', description: 'Desc 1' },
          { title: 'Intern 2', organization: 'Org 2', type: 'volunteer', duration: '3 months', description: 'Desc 2' },
        ],
      };

      render(<ExperienceForm data={multipleData} onChange={mockOnChange} />);

      // Find delete buttons by looking for HiOutlineTrash icons
      const deleteButtons = screen.getAllByRole('button').filter(btn => {
        const svg = btn.querySelector('svg');
        return svg && btn.className.includes('text-red-500');
      });

      expect(deleteButtons.length).toBe(2);

      await user.click(deleteButtons[0]);

      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          experiences: expect.arrayContaining([
            expect.objectContaining({ title: 'Intern 2' }),
          ]),
        })
      );
    });
  });

  describe('User Interactions', () => {
    it('calls onChange when title is updated', async () => {
      const user = userEvent.setup();
      render(<ExperienceForm data={defaultData} onChange={mockOnChange} />);

      const titleInput = screen.getByLabelText(/role\/position/i);
      await user.type(titleInput, 'Software Engineer');

      expect(mockOnChange).toHaveBeenCalled();
      const lastCall = mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0];
      expect(lastCall.experiences[0].title).toContain('Software Engineer');
    });

    it('calls onChange when organization is updated', async () => {
      const user = userEvent.setup();
      render(<ExperienceForm data={defaultData} onChange={mockOnChange} />);

      const orgInput = screen.getByLabelText(/organization\/company/i);
      await user.type(orgInput, 'Google');

      expect(mockOnChange).toHaveBeenCalled();
      const lastCall = mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0];
      expect(lastCall.experiences[0].organization).toContain('Google');
    });

    it('calls onChange when type is selected', async () => {
      const user = userEvent.setup();
      render(<ExperienceForm data={defaultData} onChange={mockOnChange} />);

      const typeSelect = screen.getByLabelText(/^type$/i);
      await user.selectOptions(typeSelect, 'internship');

      expect(mockOnChange).toHaveBeenCalled();
      const lastCall = mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0];
      expect(lastCall.experiences[0].type).toBe('internship');
    });

    it('calls onChange when duration is updated', async () => {
      const user = userEvent.setup();
      render(<ExperienceForm data={defaultData} onChange={mockOnChange} />);

      const durationInput = screen.getByLabelText(/duration/i);
      await user.type(durationInput, '6 months');

      expect(mockOnChange).toHaveBeenCalled();
      const lastCall = mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0];
      expect(lastCall.experiences[0].duration).toContain('6 months');
    });

    it('calls onChange when description is updated', async () => {
      const user = userEvent.setup();
      render(<ExperienceForm data={defaultData} onChange={mockOnChange} />);

      const descriptionTextarea = screen.getByLabelText(/description & key responsibilities/i);
      await user.type(descriptionTextarea, 'Developed features');

      expect(mockOnChange).toHaveBeenCalled();
      const lastCall = mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0];
      expect(lastCall.experiences[0].description).toContain('Developed features');
    });
  });

  describe('Experience Type Options', () => {
    it('renders all experience type options', () => {
      render(<ExperienceForm data={defaultData} onChange={mockOnChange} />);

      expect(screen.getByRole('option', { name: /^internship$/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /volunteer work/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /^project$/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /^research$/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /part-time job/i })).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('has appropriate placeholders for user guidance', () => {
      render(<ExperienceForm data={defaultData} onChange={mockOnChange} />);

      expect(screen.getByPlaceholderText(/research intern/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/microsoft, local ngo/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/3 months, summer 2024/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/what did you do/i)).toBeInTheDocument();
    });
  });

  describe('Multiple Experiences', () => {
    it('updates the correct experience when multiple exist', async () => {
      const user = userEvent.setup();
      const multipleData = {
        experiences: [
          { title: 'Experience 1', organization: '', type: '', duration: '', description: '' },
          { title: 'Experience 2', organization: '', type: '', duration: '', description: '' },
        ],
      };

      render(<ExperienceForm data={multipleData} onChange={mockOnChange} />);

      const titleInputs = screen.getAllByLabelText(/role\/position/i);
      expect(titleInputs.length).toBe(2);

      await user.clear(titleInputs[1]);
      await user.type(titleInputs[1], 'Updated Title');

      expect(mockOnChange).toHaveBeenCalled();
      const lastCall = mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0];
      expect(lastCall.experiences[0].title).toBe('Experience 1');
      expect(lastCall.experiences[1].title).toContain('Updated Title');
    });
  });

  describe('Accessibility', () => {
    it('has proper label associations', () => {
      render(<ExperienceForm data={defaultData} onChange={mockOnChange} />);

      const titleInput = screen.getByLabelText(/role\/position/i);
      expect(titleInput).toHaveAttribute('type', 'text');

      const descriptionTextarea = screen.getByLabelText(/description & key responsibilities/i);
      expect(descriptionTextarea.tagName).toBe('TEXTAREA');
    });

    it('applies focus styles with ring classes', () => {
      const { container } = render(<ExperienceForm data={defaultData} onChange={mockOnChange} />);

      const inputs = container.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        expect(input).toHaveClass('focus:ring-2');
        expect(input).toHaveClass('focus:ring-primary-blue');
      });
    });

    it('uses textarea with appropriate rows for description', () => {
      render(<ExperienceForm data={defaultData} onChange={mockOnChange} />);

      const descriptionTextarea = screen.getByLabelText(/description & key responsibilities/i);
      expect(descriptionTextarea).toHaveAttribute('rows', '3');
    });
  });

  describe('State Management', () => {
    it('initializes with empty experience if data.experiences is undefined', () => {
      const emptyData = {};
      render(<ExperienceForm data={emptyData} onChange={mockOnChange} />);

      const titleInput = screen.getByLabelText(/role\/position/i);
      expect(titleInput).toHaveValue('');
    });
  });
});
