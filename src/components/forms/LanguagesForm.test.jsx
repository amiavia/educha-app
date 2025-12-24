import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LanguagesForm from './LanguagesForm';

describe('LanguagesForm Component', () => {
  const mockOnChange = vi.fn();
  const defaultData = {
    englishLevel: '',
    ielts: '',
    toefl: '',
    cambridge: '',
    pte: '',
    nativeLanguage: '',
    otherLanguages: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form fields correctly', () => {
    render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

    expect(screen.getByLabelText(/english proficiency level/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/native language/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/other languages/i)).toBeInTheDocument();
  });

  it('displays info banner with language context', () => {
    render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

    expect(screen.getByText(/language proficiency is key/i)).toBeInTheDocument();
    expect(screen.getByText(/uk universities require strong english skills/i)).toBeInTheDocument();
  });

  it('displays pro tip section', () => {
    render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

    expect(screen.getByText(/don't have test scores yet/i)).toBeInTheDocument();
    expect(screen.getByText(/indicate your current proficiency level/i)).toBeInTheDocument();
  });

  it('shows required field indicators', () => {
    const { container } = render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

    const englishLevelLabel = screen.getByText(/english proficiency level/i);
    expect(englishLevelLabel.parentElement.querySelector('.text-red-500')).toBeInTheDocument();
  });

  it('renders with pre-filled data', () => {
    const filledData = {
      englishLevel: 'fluent',
      ielts: '7.5',
      toefl: '100',
      cambridge: 'Grade A',
      pte: '68',
      nativeLanguage: 'Hindi',
      otherLanguages: 'French - Intermediate',
    };

    render(<LanguagesForm data={filledData} onChange={mockOnChange} />);

    // Check select has correct value
    const englishLevelSelect = screen.getByLabelText(/english proficiency level/i);
    expect(englishLevelSelect.value).toBe('fluent');

    expect(screen.getByDisplayValue('7.5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Grade A')).toBeInTheDocument();
    expect(screen.getByDisplayValue('68')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Hindi')).toBeInTheDocument();
    expect(screen.getByDisplayValue('French - Intermediate')).toBeInTheDocument();
  });

  describe('User Interactions', () => {
    it('calls onChange when English proficiency level is selected', async () => {
      const user = userEvent.setup();
      render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

      const levelSelect = screen.getByLabelText(/english proficiency level/i);
      await user.selectOptions(levelSelect, 'advanced');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ englishLevel: 'advanced' })
      );
    });

    it('calls onChange when IELTS score is updated', async () => {
      const user = userEvent.setup();
      render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

      const ieltsInput = screen.getByLabelText(/ielts overall/i);
      await user.type(ieltsInput, '8');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ ielts: '8' })
      );
    });

    it('calls onChange when TOEFL score is updated', async () => {
      const user = userEvent.setup();
      render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

      const toeflInput = screen.getByLabelText(/toefl ibt/i);
      await user.type(toeflInput, '1');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ toefl: '1' })
      );
    });

    it('calls onChange when Cambridge score is updated', async () => {
      const user = userEvent.setup();
      render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

      const cambridgeInput = screen.getByLabelText(/cambridge/i);
      await user.type(cambridgeInput, 'G');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ cambridge: 'G' })
      );
    });

    it('calls onChange when PTE score is updated', async () => {
      const user = userEvent.setup();
      render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

      const pteInput = screen.getByLabelText(/pte academic/i);
      await user.type(pteInput, '7');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ pte: '7' })
      );
    });

    it('calls onChange when native language is updated', async () => {
      const user = userEvent.setup();
      render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

      const nativeInput = screen.getByLabelText(/native language/i);
      await user.type(nativeInput, 'M');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ nativeLanguage: 'M' })
      );
    });

    it('calls onChange when other languages are updated', async () => {
      const user = userEvent.setup();
      render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

      const otherLanguagesTextarea = screen.getByLabelText(/other languages/i);
      await user.type(otherLanguagesTextarea, 'S');

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ otherLanguages: 'S' })
      );
    });
  });

  describe('English Proficiency Options', () => {
    it('renders all English proficiency level options', () => {
      render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

      expect(screen.getByRole('option', { name: /native speaker/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /fluent \(c2\)/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /advanced \(c1\)/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /upper intermediate \(b2\)/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /intermediate \(b1\)/i })).toBeInTheDocument();
    });
  });

  describe('English Test Scores Section', () => {
    it('renders all English test score input fields', () => {
      render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

      expect(screen.getByText(/ielts overall/i)).toBeInTheDocument();
      expect(screen.getByText(/toefl ibt/i)).toBeInTheDocument();
      expect(screen.getByText(/cambridge \(cae\/cpe\)/i)).toBeInTheDocument();
      expect(screen.getByText(/pte academic/i)).toBeInTheDocument();
    });

    it('marks English test scores as optional', () => {
      render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

      const testScoresLabel = screen.getByText(/english test scores/i);
      expect(testScoresLabel.textContent).toMatch(/if taken/i);
    });

    it('displays helper text for test score requirements', () => {
      render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

      expect(screen.getByText(/most uk universities require ielts 6.5-7.0/i)).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('has appropriate placeholders for user guidance', () => {
      render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

      expect(screen.getByPlaceholderText(/e\.g\., 7\.5/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/e\.g\., 100/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/e\.g\., grade a/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/e\.g\., 68/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/hindi, mandarin, yoruba/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/list any other languages/i)).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it('preserves existing data when updating a single field', async () => {
      const user = userEvent.setup();
      const existingData = {
        englishLevel: 'fluent',
        ielts: '7.5',
        toefl: '',
        cambridge: '',
        pte: '',
        nativeLanguage: 'Hindi',
        otherLanguages: '',
      };

      render(<LanguagesForm data={existingData} onChange={mockOnChange} />);

      const toeflInput = screen.getByLabelText(/toefl ibt/i);
      await user.type(toeflInput, '1');

      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          englishLevel: 'fluent',
          ielts: '7.5',
          toefl: '1',
          nativeLanguage: 'Hindi',
        })
      );
    });
  });

  describe('Accessibility', () => {
    it('has proper label associations', () => {
      render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

      const englishLevelSelect = screen.getByLabelText(/english proficiency level/i);
      expect(englishLevelSelect.tagName).toBe('SELECT');

      const nativeInput = screen.getByLabelText(/native language/i);
      expect(nativeInput).toHaveAttribute('type', 'text');

      const otherLanguagesTextarea = screen.getByLabelText(/other languages/i);
      expect(otherLanguagesTextarea.tagName).toBe('TEXTAREA');
    });

    it('applies focus styles with ring classes', () => {
      const { container } = render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

      const inputs = container.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        expect(input).toHaveClass('focus:ring-2');
        expect(input).toHaveClass('focus:ring-primary-blue');
      });
    });

    it('uses textarea with appropriate rows for other languages', () => {
      render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

      const otherLanguagesTextarea = screen.getByLabelText(/other languages/i);
      expect(otherLanguagesTextarea).toHaveAttribute('rows', '3');
    });

    it('has descriptive labels for test score inputs', () => {
      const { container } = render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

      const labels = container.querySelectorAll('label.text-xs.text-gray-600');
      expect(labels.length).toBeGreaterThanOrEqual(4); // IELTS, TOEFL, Cambridge, PTE
    });
  });

  describe('Test Score Input Layout', () => {
    it('organizes test score inputs in a grid layout', () => {
      const { container } = render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

      const gridContainers = container.querySelectorAll('.grid.grid-cols-2.gap-3');
      expect(gridContainers.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Optional Fields', () => {
    it('marks other languages as optional', () => {
      render(<LanguagesForm data={defaultData} onChange={mockOnChange} />);

      const otherLanguagesLabel = screen.getByText(/other languages/i);
      expect(otherLanguagesLabel.textContent).toMatch(/optional/i);
    });
  });
});
