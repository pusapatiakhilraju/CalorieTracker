/**
 * App smoke test — verifies the app entry point loads without errors
 * and renders the home screen as the root component.
 */
import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('builds and renders without throwing', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('mounts the root component successfully', () => {
    const { toJSON } = render(<App />);
    expect(toJSON()).not.toBeNull();
  });

  it('renders the home screen as root (shows greeting)', () => {
    const { getByText } = render(<App />);
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

  it('renders Daily Calories section at root level', () => {
    const { getByText } = render(<App />);
    expect(getByText('Daily Calories')).toBeTruthy();
  });
});
