import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = ({ children,style }) => {//custom font family that is in all texts
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter-VariableFont_slnt,wght',
  },
});
/**
 * Inter-VariableFont_slnt,wght
 * Lato-Regular
 * Lora-VariableFont_wght
 * Montserrat-VariableFont_wght
 * OpenSans-VariableFont_wdth,wght
 * PlayfairDisplay-VariableFont_wght
 */
export default CustomText;