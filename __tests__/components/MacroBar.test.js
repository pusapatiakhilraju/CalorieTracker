import React from 'react';
import { render } from '@testing-library/react-native';
import MacroBar from '../../src/components/MacroBar';

describe('MacroBar', () => {
  const defaultProps = {
    label: 'Protein',
    value: 92,
    goal: 150,
    unit: 'g',
    color: '#EF4444',
  };

  it('renders without crashing', () => {
    const { toJSON } = render(<MacroBar {...defaultProps} />);
    expect(toJSON()).not.toBeNull();
  });

  it('displays the label', () => {
    const { getByText } = render(<MacroBar {...defaultProps} />);
    expect(getByText('Protein')).toBeTruthy();
  });

  it('displays current value with unit', () => {
    const { getByText } = render(<MacroBar {...defaultProps} />);
    expect(getByText('92g')).toBeTruthy();
  });

  it('displays goal with unit', () => {
    const { getByText } = render(<MacroBar {...defaultProps} />);
    expect(getByText('/ 150g')).toBeTruthy();
  });

  it('renders carbs variant', () => {
    const { getByText } = render(
      <MacroBar label="Carbs" value={165} goal={250} unit="g" color="#F59E0B" />
    );
    expect(getByText('Carbs')).toBeTruthy();
    expect(getByText('165g')).toBeTruthy();
  });

  it('renders fat variant', () => {
    const { getByText } = render(
      <MacroBar label="Fat" value={48} goal={70} unit="g" color="#10B981" />
    );
    expect(getByText('Fat')).toBeTruthy();
    expect(getByText('48g')).toBeTruthy();
  });

  it('handles value exceeding goal without crashing', () => {
    const { toJSON } = render(<MacroBar {...defaultProps} value={200} goal={150} />);
    expect(toJSON()).not.toBeNull();
  });
});
