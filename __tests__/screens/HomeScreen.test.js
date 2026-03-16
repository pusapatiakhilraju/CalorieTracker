import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../../src/screens/HomeScreen';
import { dailyGoals, getTotals } from '../../src/data/mockData';

describe('HomeScreen (integration)', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<HomeScreen />);
    expect(toJSON()).not.toBeNull();
  });

  // ── Header ──────────────────────────────────────────────────────────────
  it('shows a greeting', () => {
    const { getByText } = render(<HomeScreen />);
    const greetings = ['Good morning', 'Good afternoon', 'Good evening'];
    const found = greetings.some((g) => {
      try {
        getByText(g);
        return true;
      } catch {
        return false;
      }
    });
    expect(found).toBe(true);
  });

  it('shows the avatar initial', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('A')).toBeTruthy();
  });

  // ── Calorie section ──────────────────────────────────────────────────────
  it('shows "Daily Calories" card title', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Daily Calories')).toBeTruthy();
  });

  it('shows the calorie goal badge', () => {
    const { getByText } = render(<HomeScreen />);
    expect(
      getByText(`Goal: ${dailyGoals.calories.toLocaleString()} kcal`)
    ).toBeTruthy();
  });

  it('shows consumed calories in the ring', () => {
    const { getByText } = render(<HomeScreen />);
    const totals = getTotals();
    expect(getByText(totals.calories.toLocaleString())).toBeTruthy();
  });

  it('shows macro bars for protein, carbs, fat', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Protein')).toBeTruthy();
    expect(getByText('Carbs')).toBeTruthy();
    expect(getByText('Fat')).toBeTruthy();
  });

  // ── Water section ────────────────────────────────────────────────────────
  it('shows Hydration section', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Hydration')).toBeTruthy();
  });

  it('shows water add/remove buttons', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('+ Add Glass')).toBeTruthy();
    expect(getByText('− Remove')).toBeTruthy();
  });

  // ── Weight chart ─────────────────────────────────────────────────────────
  it('shows Weight Progress section', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Weight Progress')).toBeTruthy();
  });

  it('renders the weight line chart', () => {
    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId('line-chart')).toBeTruthy();
  });

  // ── Meals section ────────────────────────────────────────────────────────
  it("shows Today's Meals section", () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText("Today's Meals")).toBeTruthy();
  });

  it('shows each meal name', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Breakfast')).toBeTruthy();
    expect(getByText('Lunch')).toBeTruthy();
    expect(getByText('Snack')).toBeTruthy();
    expect(getByText('Dinner')).toBeTruthy();
  });

  it('shows Log button', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('+ Log')).toBeTruthy();
  });
});
