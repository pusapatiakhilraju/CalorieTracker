import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function MacroBar({ label, value, goal, unit, color, delay = 0 }) {
  const progress = Math.min(value / goal, 1);
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: progress,
      delay: delay,
      tension: 60,
      friction: 8,
      useNativeDriver: false,
    }).start();
  }, [progress, delay]);

  const width = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', `${progress * 100}%`],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
          <Text style={[styles.current, { color }]}>{value}{unit}</Text>
          <Text style={styles.goal}> / {goal}{unit}</Text>
        </Text>
      </View>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { width, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
  },
  value: {
    fontSize: 13,
  },
  current: {
    fontWeight: '700',
  },
  goal: {
    color: '#475569',
    fontWeight: '400',
  },
  track: {
    height: 6,
    backgroundColor: '#1E2035',
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
});
