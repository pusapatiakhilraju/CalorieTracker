import React from 'react';
import { render } from '@testing-library/react-native';
import WeightChart from '../../src/components/WeightChart';
import { weightHistory } from '../../src/data/mockData';

describe('WeightChart', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<WeightChart data={weightHistory} />);
    expect(toJSON()).not.toBeNull();
  });

  it('shows "Weight Progress" title', () => {
    const { getByText } = render(<WeightChart data={weightHistory} />);
    expect(getByText('Weight Progress')).toBeTruthy();
  });

  it('shows "Last 7 days" subtitle', () => {
    const { getByText } = render(<WeightChart data={weightHistory} />);
    expect(getByText('Last 7 days')).toBeTruthy();
  });

  it('displays the latest weight', () => {
    const { getByText } = render(<WeightChart data={weightHistory} />);
    const latest = weightHistory[weightHistory.length - 1].weight;
    expect(getByText(`${latest} kg`)).toBeTruthy();
  });

  it('renders the line chart', () => {
    const { getByTestId } = render(<WeightChart data={weightHistory} />);
    expect(getByTestId('line-chart')).toBeTruthy();
  });

  it('shows a downward delta for weight loss', () => {
    const lossData = [
      { date: 'Mar 1', weight: 80.0 },
      { date: 'Mar 2', weight: 79.5 },
    ];
    const { getByText } = render(<WeightChart data={lossData} />);
    expect(getByText(/↓/)).toBeTruthy();
  });

  it('shows an upward delta for weight gain', () => {
    const gainData = [
      { date: 'Mar 1', weight: 75.0 },
      { date: 'Mar 2', weight: 76.0 },
    ];
    const { getByText } = render(<WeightChart data={gainData} />);
    expect(getByText(/↑/)).toBeTruthy();
  });
});
