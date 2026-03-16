// Mock for react-native-svg — Jest can't run native SVG bindings
const React = require('react');
const { View, Text } = require('react-native');

const mock = (name) => {
  const Comp = ({ children, ...props }) => React.createElement(View, { testID: name, ...props }, children);
  Comp.displayName = name;
  return Comp;
};

module.exports = {
  __esModule: true,
  default: mock('Svg'),
  Svg: mock('Svg'),
  Circle: mock('Circle'),
  Rect: mock('Rect'),
  Path: mock('Path'),
  Defs: mock('Defs'),
  LinearGradient: mock('LinearGradient'),
  Stop: mock('Stop'),
  G: mock('G'),
  Text: mock('SvgText'),
  Line: mock('Line'),
  Polyline: mock('Polyline'),
  Polygon: mock('Polygon'),
  ClipPath: mock('ClipPath'),
};
