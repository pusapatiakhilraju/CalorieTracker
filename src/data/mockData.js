export const dailyGoals = {
  calories: 2200,
  protein: 150,
  carbs: 250,
  fat: 70,
  water: 8,
};

export const todayMeals = [
  { id: '1', name: 'Breakfast', calories: 480, protein: 28, carbs: 58, fat: 18, icon: '🍳' },
  { id: '2', name: 'Lunch', calories: 620, protein: 42, carbs: 70, fat: 20, icon: '🥗' },
  { id: '3', name: 'Snack', calories: 210, protein: 12, carbs: 28, fat: 7, icon: '🍎' },
  { id: '4', name: 'Dinner', calories: 140, protein: 10, carbs: 9, fat: 3, icon: '🍜' },
];

export const weightHistory = [
  { date: 'Mar 9', weight: 76.4 },
  { date: 'Mar 10', weight: 76.0 },
  { date: 'Mar 11', weight: 75.8 },
  { date: 'Mar 12', weight: 76.2 },
  { date: 'Mar 13', weight: 75.5 },
  { date: 'Mar 14', weight: 75.3 },
  { date: 'Mar 15', weight: 75.1 },
];

export const getTotals = () => {
  return todayMeals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fat: acc.fat + meal.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
};
