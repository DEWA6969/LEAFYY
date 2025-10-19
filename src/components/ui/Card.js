import React from 'react';
import { View } from 'react-native';

export const Card = ({ children, style, className }) => {
  return (
    <View 
      style={[
        {
          backgroundColor: '#ffffff',
          borderRadius: 16,
          padding: 16,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
          borderWidth: 1,
          borderColor: '#e5e7eb',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export const CardHeader = ({ children, style }) => {
  return (
    <View style={[{ marginBottom: 8 }, style]}>
      {children}
    </View>
  );
};

export const CardContent = ({ children, style }) => {
  return (
    <View style={style}>
      {children}
    </View>
  );
};

export const CardTitle = ({ children, style }) => {
  return (
    <View style={style}>
      {children}
    </View>
  );
};
