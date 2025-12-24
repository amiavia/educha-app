import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StatementForm from './StatementForm';

describe('StatementForm Component', () => {
  const mockOnChange = vi.fn();
  const defaultData = {
    whyUK: '',
    careerGoals: '',
    uniqueQualities: '',
    whyYou: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form fields correctly', () => {
    render(<StatementForm data={defaultData} onChange={mockOnChange} />);

    expect(screen.getByLabelText(/why do you want to study in the uk/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/what are your career goals/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/what makes you unique/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/why should universities choose you/i)).toBeInTheDocument();
  });

  it('displays info banner with statement context', () => {
    render(<StatementForm data={defaultData} onChange={mockOnChange} />);

    expect(screen.getByText(/this is your story/i)).toBeInTheDocument();
    expect(screen.getByText(/share your passions, goals/i)).toBeInTheDocument();
  });

  it('displays writing tips section', () => {
    render(<StatementForm data={defaultData} onChange={mockOnChange} />);

    expect(screen.getByText(/writing tips/i)).toBeInTheDocument();
    expect(screen.getByText(/be specific - use concrete examples/i)).toBeInTheDocument();
    expect(screen.getByText(/show passion - let your enthusiasm shine/i)).toBeInTheDocument();
    expect(screen.getByText(/be honest - authenticity matters/i)).toBeInTheDocument();
    expect(screen.getByText(/proofread - check for grammar and spelling/i)).toBeInTheDocument();
  });

  it('shows required field indicators', () => {
    const { container } = render(<StatementForm data={defaultData} onChange={mockOnChange} />);
    const requiredFields = container.querySelectorAll('.text-red-500');

    // Should have 3 required fields marked with asterisks
    expect(requiredFields.length).toBeGreaterThanOrEqual(3);
  });

  it('renders with pre-filled data', () => {
    const filledData = {
      whyUK: 'I want to study in the UK because of the world-class education system.',
      careerGoals: 'I aspire to become a software engineer at a leading tech company.',
      uniqueQualities: 'My diverse background in both engineering and arts makes me unique.',
      whyYou: 'I bring a unique perspective and strong work ethic.',
    };

    render(<StatementForm data={filledData} onChange={mockOnChange} />);

    expect(screen.getByDisplayValue(/world-class education system/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/software engineer at a leading tech company/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/diverse background in both engineering and arts/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/unique perspective and strong work ethic/i)).toBeInTheDocument();
  });

  describe('Word Count Feature', () => {
    it('displays word count for why UK field', () => {
      render(<StatementForm data={defaultData} onChange={mockOnChange} />);

      const wordCounts = screen.getAllByText(/0 words/i);
      expect(wordCounts.length).toBeGreaterThanOrEqual(1);
    });

    it('updates word count when text is entered', async () => {
      const user = userEvent.setup();
      const dataWithText = {
        ...defaultData,
        whyUK: 'This is a test',
      };

      render(<StatementForm data={dataWithText} onChange={mockOnChange} />);

      expect(screen.getByText(/4 words/i)).toBeInTheDocument();
    });

    it('displays word count for all text fields', () => {
      const dataWithText = {
        whyUK: 'One two three',
        careerGoals: 'Four five',
        uniqueQualities: 'Six',
        whyYou: '',
      };

      render(<StatementForm data={dataWithText} onChange={mockOnChange} />);

      expect(screen.getByText(/3 words/i)).toBeInTheDocument();
      expect(screen.getByText(/2 words/i)).toBeInTheDocument();
      expect(screen.getByText(/1 words/i)).toBeInTheDocument();
    });

    it('handles empty or whitespace-only text correctly', () => {
      const dataWithWhitespace = {
        whyUK: '   ',
        careerGoals: '',
        uniqueQualities: '',
        whyYou: '',
      };

      render(<StatementForm data={dataWithWhitespace} onChange={mockOnChange} />);

      const wordCounts = screen.getAllByText(/0 words/i);
      expect(wordCounts.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('User Interactions', () => {
    it('calls onChange when why UK field is updated', async () => {
      const user = userEvent.setup();
      render(<StatementForm data={defaultData} onChange={mockOnChange} />);

      const whyUKTextarea = screen.getByLabelText(/why do you want to study in the uk/i);
      await user.type(whyUKTextarea, 'T');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ whyUK: 'T' })
      );
    });

    it('calls onChange when career goals field is updated', async () => {
      const user = userEvent.setup();
      render(<StatementForm data={defaultData} onChange={mockOnChange} />);

      const careerGoalsTextarea = screen.getByLabelText(/what are your career goals/i);
      await user.type(careerGoalsTextarea, 'D');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ careerGoals: 'D' })
      );
    });

    it('calls onChange when unique qualities field is updated', async () => {
      const user = userEvent.setup();
      render(<StatementForm data={defaultData} onChange={mockOnChange} />);

      const uniqueQualitiesTextarea = screen.getByLabelText(/what makes you unique/i);
      await user.type(uniqueQualitiesTextarea, 'U');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ uniqueQualities: 'U' })
      );
    });

    it('calls onChange when why you field is updated', async () => {
      const user = userEvent.setup();
      render(<StatementForm data={defaultData} onChange={mockOnChange} />);

      const whyYouTextarea = screen.getByLabelText(/why should universities choose you/i);
      await user.type(whyYouTextarea, 'D');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ whyYou: 'D' })
      );
    });
  });

  describe('Form Validation', () => {
    it('has appropriate placeholders for user guidance', () => {
      render(<StatementForm data={defaultData} onChange={mockOnChange} />);

      expect(screen.getByPlaceholderText(/what attracts you to uk universities/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/where do you see yourself in 5-10 years/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/what experiences, perspectives/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/sum up your strengths/i)).toBeInTheDocument();
    });

    it('marks why you field as optional', () => {
      render(<StatementForm data={defaultData} onChange={mockOnChange} />);

      const whyYouLabel = screen.getByText(/why should universities choose you/i);
      expect(whyYouLabel.textContent).toMatch(/optional/i);
    });

    it('displays helper text for each field', () => {
      render(<StatementForm data={defaultData} onChange={mockOnChange} />);

      expect(screen.getByText(/be specific and personal/i)).toBeInTheDocument();
      expect(screen.getByText(/think about the bigger picture/i)).toBeInTheDocument();
      expect(screen.getByText(/show what you bring to the university/i)).toBeInTheDocument();
      expect(screen.getByText(/your elevator pitch/i)).toBeInTheDocument();
    });
  });

  describe('Textarea Configuration', () => {
    it('configures textareas with appropriate row counts', () => {
      render(<StatementForm data={defaultData} onChange={mockOnChange} />);

      const whyUKTextarea = screen.getByLabelText(/why do you want to study in the uk/i);
      expect(whyUKTextarea).toHaveAttribute('rows', '4');

      const careerGoalsTextarea = screen.getByLabelText(/what are your career goals/i);
      expect(careerGoalsTextarea).toHaveAttribute('rows', '4');

      const uniqueQualitiesTextarea = screen.getByLabelText(/what makes you unique/i);
      expect(uniqueQualitiesTextarea).toHaveAttribute('rows', '4');

      const whyYouTextarea = screen.getByLabelText(/why should universities choose you/i);
      expect(whyYouTextarea).toHaveAttribute('rows', '3');
    });
  });

  describe('State Management', () => {
    it('preserves existing data when updating a single field', async () => {
      const user = userEvent.setup();
      const existingData = {
        whyUK: 'I love UK education',
        careerGoals: 'Be a scientist',
        uniqueQualities: '',
        whyYou: '',
      };

      render(<StatementForm data={existingData} onChange={mockOnChange} />);

      const uniqueQualitiesTextarea = screen.getByLabelText(/what makes you unique/i);
      await user.type(uniqueQualitiesTextarea, 'M');

      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          whyUK: 'I love UK education',
          careerGoals: 'Be a scientist',
          uniqueQualities: 'M',
        })
      );
    });
  });

  describe('Accessibility', () => {
    it('has proper label associations', () => {
      render(<StatementForm data={defaultData} onChange={mockOnChange} />);

      const whyUKTextarea = screen.getByLabelText(/why do you want to study in the uk/i);
      expect(whyUKTextarea.tagName).toBe('TEXTAREA');

      const careerGoalsTextarea = screen.getByLabelText(/what are your career goals/i);
      expect(careerGoalsTextarea.tagName).toBe('TEXTAREA');

      const uniqueQualitiesTextarea = screen.getByLabelText(/what makes you unique/i);
      expect(uniqueQualitiesTextarea.tagName).toBe('TEXTAREA');

      const whyYouTextarea = screen.getByLabelText(/why should universities choose you/i);
      expect(whyYouTextarea.tagName).toBe('TEXTAREA');
    });

    it('applies focus styles with ring classes', () => {
      const { container } = render(<StatementForm data={defaultData} onChange={mockOnChange} />);

      const textareas = container.querySelectorAll('textarea');
      textareas.forEach(textarea => {
        expect(textarea).toHaveClass('focus:ring-2');
        expect(textarea).toHaveClass('focus:ring-primary-blue');
      });
    });
  });

  describe('Word Count Calculation', () => {
    it('counts words correctly with multiple spaces', () => {
      const dataWithSpaces = {
        whyUK: 'Word1    Word2     Word3',
        careerGoals: '',
        uniqueQualities: '',
        whyYou: '',
      };

      render(<StatementForm data={dataWithSpaces} onChange={mockOnChange} />);

      expect(screen.getByText(/3 words/i)).toBeInTheDocument();
    });

    it('counts words correctly with newlines', () => {
      const dataWithNewlines = {
        whyUK: 'Word1\nWord2\nWord3\nWord4',
        careerGoals: '',
        uniqueQualities: '',
        whyYou: '',
      };

      render(<StatementForm data={dataWithNewlines} onChange={mockOnChange} />);

      expect(screen.getByText(/4 words/i)).toBeInTheDocument();
    });
  });

  describe('Helper Text Display', () => {
    it('displays all helper texts with correct styling', () => {
      const { container } = render(<StatementForm data={defaultData} onChange={mockOnChange} />);

      const helperTexts = container.querySelectorAll('.text-xs.text-gray-500');
      expect(helperTexts.length).toBeGreaterThanOrEqual(4); // At least 4 helper texts (excluding word counts)
    });
  });
});
