import React from 'react';
import { View } from 'react-native';

export const Progress = ({ 
  value, 
  max = 100, 
  style,
  className 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <View 
      style={[
        {
          height: 8,
          backgroundColor: '#e5e7eb',
          borderRadius: 4,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <View
        style={{
          height: '100%',
          width: `${percentage}%`,
          backgroundColor: '#E5F3E5',
          borderRadius: 4,
        }}
      />
    </View>
  );
};

