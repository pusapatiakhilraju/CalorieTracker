import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 80; // account for card padding

export default function WeightChart({ data }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        delay: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay: 600,
        tension: 60,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const latest = data[data.length - 1]?.weight ?? 0;
  const first = data[0]?.weight ?? 0;
  const delta = (latest - first).toFixed(1);
  const isDown = delta < 0;

  const chartData = {
    labels: data.map((d) => d.date.replace('Mar ', '')),
    datasets: [
      {
        data: data.map((d) => d.weight),
        color: () => `rgba(124, 58, 237, 0.9)`,
        strokeWidth: 2.5,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#161626',
    backgroundGradientTo: '#161626',
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(124, 58, 237, ${opacity})`,
    labelColor: () => '#475569',
    strokeWidth: 2,
    barPercentage: 0.5,
    decimalPlaces: 1,
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#A78BFA',
      fill: '#161626',
    },
    propsForBackgroundLines: {
      stroke: '#1E2035',
      strokeDasharray: '4',
    },
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Weight Progress</Text>
          <Text style={styles.subtitle}>Last 7 days</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.current}>{latest} kg</Text>
          <View style={[styles.delta, { backgroundColor: isDown ? '#052E16' : '#3B0764' }]}>
            <Text style={[styles.deltaText, { color: isDown ? '#4ADE80' : '#C084FC' }]}>
              {isDown ? '↓' : '↑'} {Math.abs(delta)} kg
            </Text>
          </View>
        </View>
      </View>

      <LineChart
        data={chartData}
        width={CHART_WIDTH}
        height={140}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        withShadow={false}
        withInnerLines={true}
        withOuterLines={false}
        withVerticalLines={false}
        fromZero={false}
        yAxisSuffix=""
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: -4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F1F5F9',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  stats: {
    alignItems: 'flex-end',
    gap: 4,
  },
  current: {
    fontSize: 20,
    fontWeight: '800',
    color: '#F1F5F9',
  },
  delta: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  deltaText: {
    fontSize: 12,
    fontWeight: '600',
  },
  chart: {
    marginLeft: -16,
    borderRadius: 12,
  },
});
