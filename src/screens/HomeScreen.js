import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CalorieRing from '../components/CalorieRing';
import MacroBar from '../components/MacroBar';
import WaterTracker from '../components/WaterTracker';
import WeightChart from '../components/WeightChart';
import { dailyGoals, getTotals, weightHistory } from '../data/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function AnimatedCard({ children, delay = 0, style }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        delay,
        tension: 65,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[{ opacity, transform: [{ translateY }] }, style]}>
      {children}
    </Animated.View>
  );
}

function MealRow({ meal, delay }) {
  const slideAnim = useRef(new Animated.Value(20)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, delay, tension: 80, friction: 10, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.mealRow, { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }]}>
      <Text style={styles.mealIcon}>{meal.icon}</Text>
      <View style={styles.mealInfo}>
        <Text style={styles.mealName}>{meal.name}</Text>
        <Text style={styles.mealMacros}>
          P: {meal.protein}g · C: {meal.carbs}g · F: {meal.fat}g
        </Text>
      </View>
      <Text style={styles.mealCal}>{meal.calories} kcal</Text>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const [waterGlasses, setWaterGlasses] = useState(5);
  const totals = getTotals();
  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 17 ? 'Good afternoon' : 'Good evening';

  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Header entrance
    Animated.parallel([
      Animated.timing(headerFade, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(headerSlide, { toValue: 0, tension: 60, friction: 10, useNativeDriver: true }),
    ]).start();

    // Subtle pulse on the greeting dot
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.3, duration: 900, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const dateStr = `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}`;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A1A" />

      {/* Background gradient */}
      <LinearGradient
        colors={['#0D0520', '#0A0A1A', '#0A0A1A']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.7, y: 0.3 }}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── HEADER ── */}
        <Animated.View
          style={[
            styles.header,
            { opacity: headerFade, transform: [{ translateY: headerSlide }] },
          ]}
        >
          <View>
            <View style={styles.greetRow}>
              <Animated.View
                style={[styles.statusDot, { transform: [{ scale: pulse }] }]}
              />
              <Text style={styles.greeting}>{greeting}</Text>
            </View>
            <Text style={styles.date}>{dateStr}</Text>
          </View>
          <TouchableOpacity style={styles.avatar} activeOpacity={0.8}>
            <Text style={styles.avatarText}>A</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ── CALORIE CARD ── */}
        <AnimatedCard delay={100} style={styles.card}>
          <LinearGradient
            colors={['#1A1035', '#161626']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Daily Calories</Text>
              <View style={styles.goalBadge}>
                <Text style={styles.goalText}>Goal: {dailyGoals.calories.toLocaleString()} kcal</Text>
              </View>
            </View>

            <CalorieRing consumed={totals.calories} goal={dailyGoals.calories} />

            {/* Macro bars */}
            <View style={styles.macros}>
              <MacroBar
                label="Protein"
                value={totals.protein}
                goal={dailyGoals.protein}
                unit="g"
                color="#EF4444"
                delay={500}
              />
              <MacroBar
                label="Carbs"
                value={totals.carbs}
                goal={dailyGoals.carbs}
                unit="g"
                color="#F59E0B"
                delay={600}
              />
              <MacroBar
                label="Fat"
                value={totals.fat}
                goal={dailyGoals.fat}
                unit="g"
                color="#10B981"
                delay={700}
              />
            </View>
          </LinearGradient>
        </AnimatedCard>

        {/* ── WATER CARD ── */}
        <AnimatedCard delay={250} style={styles.card}>
          <LinearGradient
            colors={['#071B2E', '#0D0D1A']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <WaterTracker glasses={waterGlasses} onUpdate={setWaterGlasses} />
          </LinearGradient>
        </AnimatedCard>

        {/* ── WEIGHT CHART ── */}
        <AnimatedCard delay={400} style={styles.card}>
          <LinearGradient
            colors={['#1A0D35', '#0D0D1A']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <WeightChart data={weightHistory} />
          </LinearGradient>
        </AnimatedCard>

        {/* ── TODAY'S MEALS ── */}
        <AnimatedCard delay={550} style={[styles.card, { marginBottom: 32 }]}>
          <LinearGradient
            colors={['#161626', '#111122']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Today's Meals</Text>
              <TouchableOpacity style={styles.addBtn} activeOpacity={0.7}>
                <Text style={styles.addBtnText}>+ Log</Text>
              </TouchableOpacity>
            </View>
            {getTotals && (
              <View style={styles.mealsList}>
                {require('../data/mockData').todayMeals.map((meal, i) => (
                  <MealRow key={meal.id} meal={meal} delay={650 + i * 80} />
                ))}
              </View>
            )}
          </LinearGradient>
        </AnimatedCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0A0A1A',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 56,
    paddingHorizontal: 16,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F1F5F9',
    letterSpacing: -0.3,
  },
  date: {
    fontSize: 14,
    color: '#475569',
    marginTop: 3,
    marginLeft: 16,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },

  // Cards
  card: {
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1E2035',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  cardGradient: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F1F5F9',
  },
  goalBadge: {
    backgroundColor: '#1A1035',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2D1B69',
  },
  goalText: {
    fontSize: 11,
    color: '#A78BFA',
    fontWeight: '600',
  },
  macros: {
    marginTop: 20,
    gap: 4,
  },

  // Meals
  addBtn: {
    backgroundColor: '#1A1035',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#7C3AED',
  },
  addBtnText: {
    fontSize: 12,
    color: '#A78BFA',
    fontWeight: '600',
  },
  mealsList: {
    gap: 2,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#161626',
    gap: 12,
  },
  mealIcon: {
    fontSize: 26,
    width: 36,
    textAlign: 'center',
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E2E8F0',
  },
  mealMacros: {
    fontSize: 11,
    color: '#475569',
    marginTop: 2,
  },
  mealCal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94A3B8',
  },
});
