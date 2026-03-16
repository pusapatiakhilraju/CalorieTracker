import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WaterTracker from '../../src/components/WaterTracker';

// Wrapper to manage state so we can test interactions
function WaterTrackerWrapper({ initial = 5 }) {
  const [glasses, setGlasses] = useState(initial);
  return <WaterTracker glasses={glasses} onUpdate={setGlasses} />;
}

describe('WaterTracker', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<WaterTrackerWrapper />);
    expect(toJSON()).not.toBeNull();
  });

  it('shows "Hydration" title', () => {
    const { getByText } = render(<WaterTrackerWrapper />);
    expect(getByText('Hydration')).toBeTruthy();
  });

  it('displays ml consumed (5 glasses = 1250ml)', () => {
    const { getByText } = render(<WaterTrackerWrapper initial={5} />);
    expect(getByText('1250 ml consumed')).toBeTruthy();
  });

  it('displays ml consumed for 0 glasses', () => {
    const { getByText } = render(<WaterTrackerWrapper initial={0} />);
    expect(getByText('0 ml consumed')).toBeTruthy();
  });

  it('shows current glass count', () => {
    const { getByText } = render(<WaterTrackerWrapper initial={5} />);
    expect(getByText('5')).toBeTruthy();
  });

  it('shows total glasses out of 8', () => {
    const { getByText } = render(<WaterTrackerWrapper initial={5} />);
    expect(getByText('/ 8')).toBeTruthy();
  });

  it('increments count when "+ Add Glass" is pressed', () => {
    const { getByText } = render(<WaterTrackerWrapper initial={5} />);
    fireEvent.press(getByText('+ Add Glass'));
    expect(getByText('6')).toBeTruthy();
    expect(getByText('1500 ml consumed')).toBeTruthy();
  });

  it('decrements count when "− Remove" is pressed', () => {
    const { getByText } = render(<WaterTrackerWrapper initial={5} />);
    fireEvent.press(getByText('− Remove'));
    expect(getByText('4')).toBeTruthy();
    expect(getByText('1000 ml consumed')).toBeTruthy();
  });

  it('does not go below 0 glasses', () => {
    const { getByText } = render(<WaterTrackerWrapper initial={0} />);
    fireEvent.press(getByText('− Remove'));
    expect(getByText('0')).toBeTruthy();
  });

  it('does not exceed 8 glasses', () => {
    const { getByText } = render(<WaterTrackerWrapper initial={8} />);
    fireEvent.press(getByText('+ Add Glass'));
    expect(getByText('8')).toBeTruthy();
  });
});
