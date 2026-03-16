import { dailyGoals, todayMeals, weightHistory, getTotals } from '../../src/data/mockData';

describe('mockData', () => {
  describe('dailyGoals', () => {
    it('has all required goal fields', () => {
      expect(dailyGoals).toHaveProperty('calories');
      expect(dailyGoals).toHaveProperty('protein');
      expect(dailyGoals).toHaveProperty('carbs');
      expect(dailyGoals).toHaveProperty('fat');
      expect(dailyGoals).toHaveProperty('water');
    });

    it('has positive numeric goals', () => {
      expect(dailyGoals.calories).toBeGreaterThan(0);
      expect(dailyGoals.protein).toBeGreaterThan(0);
      expect(dailyGoals.carbs).toBeGreaterThan(0);
      expect(dailyGoals.fat).toBeGreaterThan(0);
      expect(dailyGoals.water).toBeGreaterThan(0);
    });
  });

  describe('todayMeals', () => {
    it('is a non-empty array', () => {
      expect(Array.isArray(todayMeals)).toBe(true);
      expect(todayMeals.length).toBeGreaterThan(0);
    });

    it('each meal has required fields', () => {
      todayMeals.forEach((meal) => {
        expect(meal).toHaveProperty('id');
        expect(meal).toHaveProperty('name');
        expect(meal).toHaveProperty('calories');
        expect(meal).toHaveProperty('protein');
        expect(meal).toHaveProperty('carbs');
        expect(meal).toHaveProperty('fat');
        expect(meal.calories).toBeGreaterThanOrEqual(0);
      });
    });

    it('has unique ids', () => {
      const ids = todayMeals.map((m) => m.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe('weightHistory', () => {
    it('has 7 entries', () => {
      expect(weightHistory).toHaveLength(7);
    });

    it('each entry has a date and weight', () => {
      weightHistory.forEach((entry) => {
        expect(entry).toHaveProperty('date');
        expect(entry).toHaveProperty('weight');
        expect(typeof entry.weight).toBe('number');
        expect(entry.weight).toBeGreaterThan(0);
      });
    });
  });

  describe('getTotals()', () => {
    it('returns an object with calorie/macro keys', () => {
      const totals = getTotals();
      expect(totals).toHaveProperty('calories');
      expect(totals).toHaveProperty('protein');
      expect(totals).toHaveProperty('carbs');
      expect(totals).toHaveProperty('fat');
    });

    it('sums calories correctly', () => {
      const expected = todayMeals.reduce((sum, m) => sum + m.calories, 0);
      expect(getTotals().calories).toBe(expected);
    });

    it('sums protein correctly', () => {
      const expected = todayMeals.reduce((sum, m) => sum + m.protein, 0);
      expect(getTotals().protein).toBe(expected);
    });

    it('sums carbs correctly', () => {
      const expected = todayMeals.reduce((sum, m) => sum + m.carbs, 0);
      expect(getTotals().carbs).toBe(expected);
    });

    it('sums fat correctly', () => {
      const expected = todayMeals.reduce((sum, m) => sum + m.fat, 0);
      expect(getTotals().fat).toBe(expected);
    });

    it('total calories do not exceed a realistic daily max', () => {
      expect(getTotals().calories).toBeLessThan(10000);
    });
  });
});
