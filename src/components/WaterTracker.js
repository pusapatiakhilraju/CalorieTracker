import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

const TOTAL_GLASSES = 8;

function WaterGlass({ filled, onPress, index }) {
  const fillAnim = useRef(new Animated.Value(filled ? 1 : 0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;
  const entranceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(entranceAnim, {
      toValue: 1,
      delay: index * 60,
      tension: 80,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    Animated.timing(fillAnim, {
      toValue: filled ? 1 : 0,
      duration: 350,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [filled]);

  const handlePress = () => {
    // Bounce + ripple
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.2,
        tension: 200,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 200,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.timing(rippleAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(rippleAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
    ]).start();

    onPress();
  };

  const fillHeight = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '78%'],
  });

  const rippleScale = rippleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 2.2],
  });
  const rippleOpacity = rippleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 0.3, 0],
  });

  return (
    <Animated.View
      style={[
        styles.glassWrapper,
        {
          opacity: entranceAnim,
          transform: [
            { scale: entranceAnim },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        {/* Ripple ring */}
        <Animated.View
          style={[
            styles.ripple,
            {
              transform: [{ scale: rippleScale }],
              opacity: rippleOpacity,
            },
          ]}
        />
        {/* Glass shape */}
        <View style={styles.glass}>
          {/* Water fill */}
          <Animated.View
            style={[
              styles.waterFill,
              {
                height: fillHeight,
                backgroundColor: filled ? '#38BDF8' : '#1E3A5F',
              },
            ]}
          >
            {/* Wave shimmer */}
            {filled && (
              <View style={styles.wave}>
                <View style={styles.waveInner} />
              </View>
            )}
          </Animated.View>
        </View>
        {/* Droplet icon */}
        <Text style={[styles.dropIcon, { opacity: filled ? 0 : 0.4 }]}>💧</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function WaterTracker({ glasses, onUpdate }) {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(progressAnim, {
      toValue: glasses / TOTAL_GLASSES,
      tension: 60,
      friction: 8,
      useNativeDriver: false,
    }).start();
  }, [glasses]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const mlConsumed = glasses * 250;

  const toggleGlass = (index) => {
    const newCount = index < glasses ? index : index + 1;
    onUpdate(Math.max(0, Math.min(newCount, TOTAL_GLASSES)));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Hydration</Text>
          <Text style={styles.subtitle}>{mlConsumed} ml consumed</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{glasses}</Text>
          <Text style={styles.badgeUnit}>/ {TOTAL_GLASSES}</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
      </View>

      {/* Glasses grid */}
      <View style={styles.glassesRow}>
        {Array.from({ length: TOTAL_GLASSES }).map((_, i) => (
          <WaterGlass
            key={i}
            index={i}
            filled={i < glasses}
            onPress={() => toggleGlass(i)}
          />
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.btn, styles.btnRemove]}
          onPress={() => onUpdate(Math.max(0, glasses - 1))}
          activeOpacity={0.7}
        >
          <Text style={styles.btnText}>− Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.btnAdd]}
          onPress={() => onUpdate(Math.min(TOTAL_GLASSES, glasses + 1))}
          activeOpacity={0.7}
        >
          <Text style={[styles.btnText, { color: '#0EA5E9' }]}>+ Add Glass</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  badge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: '#0C2340',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1E4976',
  },
  badgeText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#38BDF8',
  },
  badgeUnit: {
    fontSize: 13,
    color: '#475569',
    marginLeft: 2,
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#1E2035',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0EA5E9',
    borderRadius: 2,
  },
  glassesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  glassWrapper: {
    alignItems: 'center',
  },
  glass: {
    width: 28,
    height: 40,
    borderRadius: 4,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#111827',
    borderWidth: 1.5,
    borderColor: '#1E3A5F',
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  waterFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  wave: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    height: 8,
    overflow: 'hidden',
  },
  waveInner: {
    height: 8,
    backgroundColor: 'rgba(186, 230, 253, 0.3)',
    borderRadius: 4,
  },
  dropIcon: {
    position: 'absolute',
    fontSize: 10,
    top: 6,
    alignSelf: 'center',
    width: 28,
    textAlign: 'center',
  },
  ripple: {
    position: 'absolute',
    width: 28,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#38BDF8',
    zIndex: -1,
    top: 0,
    left: 0,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  btnAdd: {
    backgroundColor: '#0C1A27',
    borderColor: '#0EA5E9',
  },
  btnRemove: {
    backgroundColor: '#161626',
    borderColor: '#252540',
  },
  btnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
});
