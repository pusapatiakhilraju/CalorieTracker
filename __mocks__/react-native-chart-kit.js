// Mock for react-native-chart-kit — depends on react-native-svg native bindings
const React = require('react');
const { View, Text } = require('react-native');

const LineChart = ({ data, testID }) =>
  React.createElement(
    View,
    { testID: testID || 'line-chart' },
    React.createElement(Text, null, `LineChart: ${JSON.stringify(data?.labels ?? [])}`)
  );

const BarChart = ({ data, testID }) =>
  React.createElement(
    View,
    { testID: testID || 'bar-chart' },
    React.createElement(Text, null, `BarChart: ${JSON.stringify(data?.labels ?? [])}`)
  );

module.exports = { LineChart, BarChart };
