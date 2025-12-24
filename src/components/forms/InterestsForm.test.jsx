import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InterestsForm from './InterestsForm';

describe('InterestsForm Component', () => {
  const mockOnChange = vi.fn();
  const defaultData = {
    fields: [],
    degreeLevel: '',
    specificProgramme: '',
    researchInterests: '',
    startDate: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form sections correctly', () => {
    render(<InterestsForm data={defaultData} onChange={mockOnChange} />);

    expect(screen.getByText(/fields of study you're interested in/i)).toBeInTheDocument();
    expect(screen.getByText(/preferred degree level/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/specific programme interests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/research interests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/preferred start date/i)).toBeInTheDocument();
  });

  it('displays info banner with interests context', () => {
    render(<InterestsForm data={defaultData} onChange={mockOnChange} />);

    expect(screen.getByText(/what drives you/i)).toBeInTheDocument();
    expect(screen.getByText(/academic passions and career goals/i)).toBeInTheDocument();
  });

  it('shows required field indicators', () => {
    render(<InterestsForm data={defaultData} onChange={mockOnChange} />);

    const fieldsLabel = screen.getByText(/fields of study you're interested in/i);
    expect(fieldsLabel.parentElement.querySelector('.text-red-500')).toBeInTheDocument();

    const degreeLevelLabel = screen.getByText(/preferred degree level/i);
    expect(degreeLevelLabel.parentElement.querySelector('.text-red-500')).toBeInTheDocument();
  });

  it('renders with pre-filled data', () => {
    const filledData = {
      fields: ['Computer Science', 'Engineering'],
      degreeLevel: 'bachelor',
      specificProgramme: 'Machine Learning',
      researchInterests: 'AI and robotics',
      startDate: '2025-09',
    };

    render(<InterestsForm data={filledData} onChange={mockOnChange} />);

    expect(screen.getByDisplayValue('Machine Learning')).toBeInTheDocument();
    expect(screen.getByDisplayValue('AI and robotics')).toBeInTheDocument();
    // Check select value
    const startDateSelect = screen.getByLabelText(/preferred start date/i);
    expect(startDateSelect.value).toBe('2025-09');
  });

  describe('Field of Study Selection', () => {
    it('renders all field of study options as buttons', () => {
      render(<InterestsForm data={defaultData} onChange={mockOnChange} />);

      expect(screen.getByRole('button', { name: 'Computer Science' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Engineering' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Medicine' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Business' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Economics' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Law' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Psychology' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Biology' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Chemistry' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Physics' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Mathematics' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Arts & Humanities' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Social Sciences' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Environmental Science' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Architecture' })).toBeInTheDocument();
    });

    it('toggles field selection when field button is clicked', async () => {
      const user = userEvent.setup();
      render(<InterestsForm data={defaultData} onChange={mockOnChange} />);

      const csButton = screen.getByRole('button', { name: 'Computer Science' });
      await user.click(csButton);

      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          fields: ['Computer Science'],
        })
      );
    });

    it('allows multiple field selections', async () => {
      const user = userEvent.setup();
      render(<InterestsForm data={defaultData} onChange={mockOnChange} />);

      const csButton = screen.getByRole('button', { name: 'Computer Science' });
      const mathButton = screen.getByRole('button', { name: 'Mathematics' });

      await user.click(csButton);
      await user.click(mathButton);

      const calls = mockOnChange.mock.calls;
      const lastCall = calls[calls.length - 1][0];
      expect(lastCall.fields).toContain('Computer Science');
      expect(lastCall.fields).toContain('Mathematics');
    });

    it('deselects field when clicked again', async () => {
      const user = userEvent.setup();
      const dataWithField = {
        ...defaultData,
        fields: ['Computer Science'],
      };

      render(<InterestsForm data={dataWithField} onChange={mockOnChange} />);

      const csButton = screen.getByRole('button', { name: 'Computer Science' });
      await user.click(csButton);

      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          fields: [],
        })
      );
    });

    it('applies selected styling to chosen fields', () => {
      const dataWithFields = {
        ...defaultData,
        fields: ['Computer Science', 'Engineering'],
      };

      render(<InterestsForm data={dataWithFields} onChange={mockOnChange} />);

      const csButton = screen.getByRole('button', { name: 'Computer Science' });
      const engineeringButton = screen.getByRole('button', { name: 'Engineering' });
      const lawButton = screen.getByRole('button', { name: 'Law' });

      expect(csButton).toHaveClass('bg-primary-blue');
      expect(csButton).toHaveClass('text-white');
      expect(engineeringButton).toHaveClass('bg-primary-blue');
      expect(lawButton).toHaveClass('bg-gray-100');
    });
  });

  describe('Degree Level Selection', () => {
    it('renders all degree level options as buttons', () => {
      render(<InterestsForm data={defaultData} onChange={mockOnChange} />);

      expect(screen.getByRole('button', { name: 'Bachelor' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Master' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'PhD' })).toBeInTheDocument();
    });

    it('selects degree level when button is clicked', async () => {
      const user = userEvent.setup();
      render(<InterestsForm data={defaultData} onChange={mockOnChange} />);

      const bachelorButton = screen.getByRole('button', { name: 'Bachelor' });
      await user.click(bachelorButton);

      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          degreeLevel: 'bachelor',
        })
      );
    });

    it('applies selected styling to chosen degree level', () => {
      const dataWithDegree = {
        ...defaultData,
        degreeLevel: 'master',
      };

      render(<InterestsForm data={dataWithDegree} onChange={mockOnChange} />);

      const masterButton = screen.getByRole('button', { name: 'Master' });
      const bachelorButton = screen.getByRole('button', { name: 'Bachelor' });

      expect(masterButton).toHaveClass('bg-primary-blue');
      expect(masterButton).toHaveClass('text-white');
      expect(bachelorButton).toHaveClass('bg-gray-100');
    });
  });

  describe('User Interactions', () => {
    it('calls onChange when specific programme is updated', async () => {
      const user = userEvent.setup();
      render(<InterestsForm data={defaultData} onChange={mockOnChange} />);

      const programmeInput = screen.getByLabelText(/specific programme interests/i);
      await user.type(programmeInput, 'D');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ specificProgramme: 'D' })
      );
    });

    it('calls onChange when research interests are updated', async () => {
      const user = userEvent.setup();
      render(<InterestsForm data={defaultData} onChange={mockOnChange} />);

      const researchTextarea = screen.getByLabelText(/research interests/i);
      await user.type(researchTextarea, 'M');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ researchInterests: 'M' })
      );
    });

    it('calls onChange when start date is selected', async () => {
      const user = userEvent.setup();
      render(<InterestsForm data={defaultData} onChange={mockOnChange} />);

      const startDateSelect = screen.getByLabelText(/preferred start date/i);
      await user.selectOptions(startDateSelect, '2025-09');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ startDate: '2025-09' })
      );
    });
  });

  describe('Form Validation', () => {
    it('has appropriate placeholders for user guidance', () => {
      render(<InterestsForm data={defaultData} onChange={mockOnChange} />);

      expect(screen.getByPlaceholderText(/machine learning, international business/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/what specific topics or research areas/i)).toBeInTheDocument();
    });

    it('marks research interests as optional', () => {
      render(<InterestsForm data={defaultData} onChange={mockOnChange} />);

      const researchLabel = screen.getByText(/research interests/i);
      expect(researchLabel.textContent).toMatch(/optional/i);
    });

    it('displays helper text for field selection', () => {
      render(<InterestsForm data={defaultData} onChange={mockOnChange} />);

      expect(screen.getByText(/select all that apply \(at least 1\)/i)).toBeInTheDocument();
    });
  });

  describe('Start Date Options', () => {
    it('renders all start date options', () => {
      render(<InterestsForm data={defaultData} onChange={mockOnChange} />);

      expect(screen.getByRole('option', { name: /september 2025/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /january 2026/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /september 2026/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /january 2027/i })).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it('preserves existing data when updating a single field', async () => {
      const user = userEvent.setup();
      const existingData = {
        fields: ['Computer Science'],
        degreeLevel: 'bachelor',
        specificProgramme: '',
        researchInterests: '',
        startDate: '',
      };

      render(<InterestsForm data={existingData} onChange={mockOnChange} />);

      const programmeInput = screen.getByLabelText(/specific programme interests/i);
      await user.type(programmeInput, 'A');

      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          fields: ['Computer Science'],
          degreeLevel: 'bachelor',
          specificProgramme: 'A',
        })
      );
    });

    it('initializes with empty fields array if data.fields is undefined', () => {
      const emptyData = {};
      render(<InterestsForm data={emptyData} onChange={mockOnChange} />);

      const csButton = screen.getByRole('button', { name: 'Computer Science' });
      expect(csButton).toHaveClass('bg-gray-100');
    });
  });

  describe('Accessibility', () => {
    it('has proper label associations', () => {
      render(<InterestsForm data={defaultData} onChange={mockOnChange} />);

      const programmeInput = screen.getByLabelText(/specific programme interests/i);
      expect(programmeInput).toHaveAttribute('type', 'text');

      const researchTextarea = screen.getByLabelText(/research interests/i);
      expect(researchTextarea.tagName).toBe('TEXTAREA');
    });

    it('applies focus styles with ring classes', () => {
      const { container } = render(<InterestsForm data={defaultData} onChange={mockOnChange} />);

      const inputs = container.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        expect(input).toHaveClass('focus:ring-2');
        expect(input).toHaveClass('focus:ring-primary-blue');
      });
    });

    it('uses textarea with appropriate rows for research interests', () => {
      render(<InterestsForm data={defaultData} onChange={mockOnChange} />);

      const researchTextarea = screen.getByLabelText(/research interests/i);
      expect(researchTextarea).toHaveAttribute('rows', '4');
    });

    it('has accessible buttons for field and degree level selection', () => {
      render(<InterestsForm data={defaultData} onChange={mockOnChange} />);

      const csButton = screen.getByRole('button', { name: 'Computer Science' });
      const bachelorButton = screen.getByRole('button', { name: 'Bachelor' });

      expect(csButton).toBeInTheDocument();
      expect(bachelorButton).toBeInTheDocument();
    });
  });
});
