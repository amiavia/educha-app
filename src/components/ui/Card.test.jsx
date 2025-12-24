import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <h2>Test Title</h2>
        <p>Test content</p>
      </Card>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies base styles', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild;

    expect(card).toHaveClass('bg-white');
    expect(card).toHaveClass('rounded-xl');
    expect(card).toHaveClass('shadow-md');
    expect(card).toHaveClass('p-6');
    expect(card).toHaveClass('transition-all');
  });

  it('applies hover styles by default', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild;

    expect(card).toHaveClass('hover:shadow-xl');
    expect(card).toHaveClass('hover:-translate-y-1');
  });

  it('does not apply hover styles when hover is false', () => {
    const { container } = render(<Card hover={false}>Content</Card>);
    const card = container.firstChild;

    expect(card).not.toHaveClass('hover:shadow-xl');
    expect(card).not.toHaveClass('hover:-translate-y-1');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Card className="custom-class">Content</Card>
    );
    const card = container.firstChild;

    expect(card).toHaveClass('custom-class');
  });

  it('combines custom className with base styles', () => {
    const { container } = render(
      <Card className="mt-8 mb-4">Content</Card>
    );
    const card = container.firstChild;

    expect(card).toHaveClass('bg-white');
    expect(card).toHaveClass('mt-8');
    expect(card).toHaveClass('mb-4');
  });

  it('renders with hover enabled explicitly', () => {
    const { container } = render(<Card hover={true}>Content</Card>);
    const card = container.firstChild;

    expect(card).toHaveClass('hover:shadow-xl');
    expect(card).toHaveClass('hover:-translate-y-1');
  });

  it('renders complex children correctly', () => {
    render(
      <Card>
        <div data-testid="complex-child">
          <h1>Title</h1>
          <button>Click me</button>
          <img src="test.jpg" alt="test" />
        </div>
      </Card>
    );

    expect(screen.getByTestId('complex-child')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByAltText('test')).toBeInTheDocument();
  });

  it('renders multiple cards independently', () => {
    const { container } = render(
      <>
        <Card className="card-1">Card 1</Card>
        <Card className="card-2" hover={false}>Card 2</Card>
        <Card className="card-3">Card 3</Card>
      </>
    );

    const cards = container.querySelectorAll('.bg-white');
    expect(cards).toHaveLength(3);
  });

  it('handles empty className prop', () => {
    const { container } = render(<Card className="">Content</Card>);
    const card = container.firstChild;

    expect(card).toHaveClass('bg-white');
    expect(card).toHaveClass('rounded-xl');
  });

  it('renders with nested cards', () => {
    const { container } = render(
      <Card>
        <h2>Outer Card</h2>
        <Card>
          <p>Inner Card</p>
        </Card>
      </Card>
    );

    // Check both cards are rendered
    const cards = container.querySelectorAll('.bg-white');
    expect(cards).toHaveLength(2);

    expect(screen.getByText('Outer Card')).toBeInTheDocument();
    expect(screen.getByText('Inner Card')).toBeInTheDocument();
  });
});
