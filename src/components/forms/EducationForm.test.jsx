import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EducationForm from './EducationForm';

describe('EducationForm Component', () => {
  const mockOnChange = vi.fn();
  const defaultData = {
    highSchool: '',
    graduationYear: '',
    curriculum: '',
    grade: '',
    sat: '',
    act: '',
    subjects: '',
  };

  it('renders all form fields correctly', () => {
    render(<EducationForm data={defaultData} onChange={mockOnChange} />);

    expect(screen.getByLabelText(/high school name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/graduation year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/curriculum type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/overall grade\/percentage/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/key subjects studied/i)).toBeInTheDocument();
  });

  it('displays info banner with academic context', () => {
    render(<EducationForm data={defaultData} onChange={mockOnChange} />);

    expect(screen.getByText(/academic background/i)).toBeInTheDocument();
    expect(screen.getByText(/educational journey/i)).toBeInTheDocument();
  });

  it('shows required field indicators', () => {
    const { container } = render(<EducationForm data={defaultData} onChange={mockOnChange} />);
    const requiredFields = container.querySelectorAll('.text-red-500');

    // Should have 3 required fields marked with asterisks
    expect(requiredFields.length).toBeGreaterThanOrEqual(3);
  });

  it('renders with pre-filled data', () => {
    const filledData = {
      highSchool: 'Delhi Public School',
      graduationYear: '2024',
      curriculum: 'cbse',
      grade: '85%',
      sat: '1400',
      act: '32',
      subjects: 'Mathematics, Physics, Chemistry',
    };

    render(<EducationForm data={filledData} onChange={mockOnChange} />);

    expect(screen.getByDisplayValue('Delhi Public School')).toBeInTheDocument();
    // Check select values
    const yearSelect = screen.getByLabelText(/graduation year/i);
    expect(yearSelect.value).toBe('2024');
    const curriculumSelect = screen.getByLabelText(/curriculum type/i);
    expect(curriculumSelect.value).toBe('cbse');
    expect(screen.getByDisplayValue('85%')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1400')).toBeInTheDocument();
    expect(screen.getByDisplayValue('32')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Mathematics, Physics, Chemistry')).toBeInTheDocument();
  });

  describe('User Interactions', () => {
    it('calls onChange when high school name is updated', async () => {
      const user = userEvent.setup();
      render(<EducationForm data={defaultData} onChange={mockOnChange} />);

      const schoolInput = screen.getByLabelText(/high school name/i);
      await user.type(schoolInput, 'T');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ highSchool: 'T' })
      );
    });

    it('calls onChange when graduation year is selected', async () => {
      const user = userEvent.setup();
      render(<EducationForm data={defaultData} onChange={mockOnChange} />);

      const yearSelect = screen.getByLabelText(/graduation year/i);
      const currentYear = new Date().getFullYear();
      await user.selectOptions(yearSelect, currentYear.toString());

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ graduationYear: currentYear.toString() })
      );
    });

    it('calls onChange when curriculum is selected', async () => {
      const user = userEvent.setup();
      render(<EducationForm data={defaultData} onChange={mockOnChange} />);

      const curriculumSelect = screen.getByLabelText(/curriculum type/i);
      await user.selectOptions(curriculumSelect, 'a-levels');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ curriculum: 'a-levels' })
      );
    });

    it('calls onChange when grade is updated', async () => {
      const user = userEvent.setup();
      render(<EducationForm data={defaultData} onChange={mockOnChange} />);

      const gradeInput = screen.getByLabelText(/overall grade\/percentage/i);
      await user.type(gradeInput, '9');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ grade: '9' })
      );
    });

    it('calls onChange when SAT score is updated', async () => {
      const user = userEvent.setup();
      render(<EducationForm data={defaultData} onChange={mockOnChange} />);

      const satInput = screen.getByLabelText(/sat score/i);
      await user.type(satInput, '1');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ sat: '1' })
      );
    });

    it('calls onChange when ACT score is updated', async () => {
      const user = userEvent.setup();
      render(<EducationForm data={defaultData} onChange={mockOnChange} />);

      const actInput = screen.getByLabelText(/act score/i);
      await user.type(actInput, '3');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ act: '3' })
      );
    });

    it('calls onChange when subjects are updated', async () => {
      const user = userEvent.setup();
      render(<EducationForm data={defaultData} onChange={mockOnChange} />);

      const subjectsTextarea = screen.getByLabelText(/key subjects studied/i);
      await user.type(subjectsTextarea, 'B');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ subjects: 'B' })
      );
    });
  });

  describe('Form Validation', () => {
    it('has appropriate placeholders for user guidance', () => {
      render(<EducationForm data={defaultData} onChange={mockOnChange} />);

      expect(screen.getByPlaceholderText(/delhi public school/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/85% or 3 A\*s, 2 As/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/sat score/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/act score/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/mathematics, physics/i)).toBeInTheDocument();
    });

    it('displays helper text for grade field', () => {
      render(<EducationForm data={defaultData} onChange={mockOnChange} />);

      expect(screen.getByText(/predicted or achieved grades/i)).toBeInTheDocument();
    });
  });

  describe('Select Options', () => {
    it('renders graduation year options dynamically', () => {
      render(<EducationForm data={defaultData} onChange={mockOnChange} />);

      const yearSelect = screen.getByLabelText(/graduation year/i);
      const options = yearSelect.querySelectorAll('option');

      // Should have 11 options: 1 placeholder + 10 years
      expect(options.length).toBe(11);
    });

    it('includes current and future years in graduation year options', () => {
      render(<EducationForm data={defaultData} onChange={mockOnChange} />);

      const currentYear = new Date().getFullYear();
      const futureYear = currentYear + 4;

      expect(screen.getByRole('option', { name: currentYear.toString() })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: futureYear.toString() })).toBeInTheDocument();
    });

    it('renders all curriculum type options', () => {
      render(<EducationForm data={defaultData} onChange={mockOnChange} />);

      expect(screen.getByRole('option', { name: /a-levels/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /international baccalaureate/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /^cbse$/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /^icse$/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /^waec$/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /^other$/i })).toBeInTheDocument();
    });
  });

  describe('Standardized Test Scores', () => {
    it('renders both SAT and ACT input fields', () => {
      render(<EducationForm data={defaultData} onChange={mockOnChange} />);

      expect(screen.getByPlaceholderText(/sat score/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/act score/i)).toBeInTheDocument();
    });

    it('marks standardized tests as optional', () => {
      render(<EducationForm data={defaultData} onChange={mockOnChange} />);

      const testScoresLabel = screen.getByText(/standardized test scores/i);
      expect(testScoresLabel.textContent).toMatch(/if applicable/i);
    });
  });

  describe('State Management', () => {
    it('preserves existing data when updating a single field', async () => {
      const user = userEvent.setup();
      const existingData = {
        highSchool: 'Existing School',
        graduationYear: '2023',
        curriculum: '',
        grade: '',
        sat: '',
        act: '',
        subjects: '',
      };

      render(<EducationForm data={existingData} onChange={mockOnChange} />);

      const gradeInput = screen.getByLabelText(/overall grade\/percentage/i);
      await user.type(gradeInput, 'A');

      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          highSchool: 'Existing School',
          graduationYear: '2023',
          grade: expect.stringContaining('A'),
        })
      );
    });
  });

  describe('Accessibility', () => {
    it('has proper label associations', () => {
      render(<EducationForm data={defaultData} onChange={mockOnChange} />);

      const schoolInput = screen.getByLabelText(/high school name/i);
      expect(schoolInput).toHaveAttribute('type', 'text');

      const gradeInput = screen.getByLabelText(/overall grade\/percentage/i);
      expect(gradeInput).toHaveAttribute('type', 'text');
    });

    it('applies focus styles with ring classes', () => {
      const { container } = render(<EducationForm data={defaultData} onChange={mockOnChange} />);

      const inputs = container.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        expect(input).toHaveClass('focus:ring-2');
        expect(input).toHaveClass('focus:ring-primary-blue');
      });
    });

    it('uses textarea for multi-line subjects input', () => {
      render(<EducationForm data={defaultData} onChange={mockOnChange} />);

      const subjectsInput = screen.getByLabelText(/key subjects studied/i);
      expect(subjectsInput.tagName).toBe('TEXTAREA');
      expect(subjectsInput).toHaveAttribute('rows', '3');
    });
  });
});
