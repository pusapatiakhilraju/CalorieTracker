import React from 'react';
import { render } from '@testing-library/react-native';
import CalorieRing from '../../src/components/CalorieRing';

describe('CalorieRing', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<CalorieRing consumed={1450} goal={2200} />);
    expect(toJSON()).not.toBeNull();
  });

  it('displays consumed calories', () => {
    const { getByText } = render(<CalorieRing consumed={1450} goal={2200} />);
    expect(getByText('1,450')).toBeTruthy();
  });

  it('displays "kcal eaten" label', () => {
    const { getByText } = render(<CalorieRing consumed={1450} goal={2200} />);
    expect(getByText('kcal eaten')).toBeTruthy();
  });

  it('shows remaining calories correctly', () => {
    const { getByText } = render(<CalorieRing consumed={1450} goal={2200} />);
    expect(getByText('750 left')).toBeTruthy();
  });

  it('shows 0 remaining when consumed equals goal', () => {
    const { getByText } = render(<CalorieRing consumed={2200} goal={2200} />);
    expect(getByText('0 left')).toBeTruthy();
  });

  it('shows 0 remaining when consumed exceeds goal', () => {
    const { getByText } = render(<CalorieRing consumed={2500} goal={2200} />);
    expect(getByText('0 left')).toBeTruthy();
  });

  it('renders correctly with zero consumption', () => {
    const { getByText } = render(<CalorieRing consumed={0} goal={2200} />);
    expect(getByText('0')).toBeTruthy();
    expect(getByText('2,200 left')).toBeTruthy();
  });
});
