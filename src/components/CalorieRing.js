import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SIZE = 200;
const STROKE_WIDTH = 16;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CalorieRing({ consumed, goal }) {
  const progress = Math.min(consumed / goal, 1);
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: progress,
      duration: 1400,
      delay: 300,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const strokeDashoffset = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE, CIRCUMFERENCE * (1 - progress)],
  });

  const remaining = Math.max(goal - consumed, 0);
  const pct = Math.round(progress * 100);

  // Color shifts from purple → amber → red based on progress
  let ringColor = '#7C3AED';
  if (progress > 0.85) ringColor = '#EF4444';
  else if (progress > 0.65) ringColor = '#F59E0B';

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE} style={styles.svg}>
        <Defs>
          <LinearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={ringColor} stopOpacity="1" />
            <Stop offset="100%" stopColor={progress > 0.65 ? '#FDE68A' : '#A78BFA'} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        {/* Track */}
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="#252540"
          strokeWidth={STROKE_WIDTH}
          fill="none"
        />
        {/* Progress arc */}
        <AnimatedCircle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="url(#ringGrad)"
          strokeWidth={STROKE_WIDTH}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${SIZE / 2}, ${SIZE / 2}`}
        />
      </Svg>

      {/* Center text */}
      <View style={styles.center}>
        <Text style={styles.consumed}>{consumed.toLocaleString()}</Text>
        <Text style={styles.label}>kcal eaten</Text>
        <View style={styles.divider} />
        <Text style={styles.remaining}>{remaining.toLocaleString()} left</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  center: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  consumed: {
    fontSize: 34,
    fontWeight: '800',
    color: '#F1F5F9',
    letterSpacing: -1,
  },
  label: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: '#252540',
    marginVertical: 8,
  },
  remaining: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '500',
  },
});
