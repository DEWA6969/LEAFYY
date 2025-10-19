import React from 'react';
import { Text as RNText } from 'react-native';

export const Text = ({ 
  children, 
  variant = 'body', 
  style,
  className 
}) => {
  const getTextStyle = () => {
    const baseStyle = {};

    switch (variant) {
      case 'h1':
        baseStyle.fontSize = 24;
        baseStyle.fontWeight = '800';
        baseStyle.color = '#1f2937';
        break;
      case 'h2':
        baseStyle.fontSize = 20;
        baseStyle.fontWeight = '700';
        baseStyle.color = '#1f2937';
        break;
      case 'h3':
        baseStyle.fontSize = 18;
        baseStyle.fontWeight = '600';
        baseStyle.color = '#1f2937';
        break;
      case 'body':
        baseStyle.fontSize = 16;
        baseStyle.fontWeight = '400';
        baseStyle.color = '#1f2937';
        break;
      case 'caption':
        baseStyle.fontSize = 14;
        baseStyle.fontWeight = '500';
        baseStyle.color = '#6b7280';
        break;
      case 'muted':
        baseStyle.fontSize = 14;
        baseStyle.fontWeight = '400';
        baseStyle.color = '#9ca3af';
        break;
    }

    return baseStyle;
  };

  return (
    <RNText style={[getTextStyle(), style]}>
      {children}
    </RNText>
  );
};

