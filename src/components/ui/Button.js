import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const Button = ({ 
  children, 
  onPress, 
  variant = 'default', 
  size = 'default',
  style,
  textStyle,
  disabled = false
}) => {
  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    // Size styles
    switch (size) {
      case 'sm':
        baseStyle.paddingHorizontal = 12;
        baseStyle.paddingVertical = 8;
        break;
      case 'lg':
        baseStyle.paddingHorizontal = 24;
        baseStyle.paddingVertical = 16;
        break;
      default:
        baseStyle.paddingHorizontal = 16;
        baseStyle.paddingVertical = 12;
    }

    // Variant styles
    switch (variant) {
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = '#3b82f6';
        break;
      case 'ghost':
        baseStyle.backgroundColor = 'transparent';
        break;
      default:
        baseStyle.backgroundColor = '#3b82f6';
    }

    if (disabled) {
      baseStyle.opacity = 0.5;
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = {
      fontWeight: '600',
    };

    // Size styles
    switch (size) {
      case 'sm':
        baseStyle.fontSize = 14;
        break;
      case 'lg':
        baseStyle.fontSize = 18;
        break;
      default:
        baseStyle.fontSize = 16;
    }

    // Variant styles
    switch (variant) {
      case 'outline':
        baseStyle.color = '#3b82f6';
        break;
      case 'ghost':
        baseStyle.color = '#6b7280';
        break;
      default:
        baseStyle.color = '#ffffff';
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[getTextStyle(), textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

