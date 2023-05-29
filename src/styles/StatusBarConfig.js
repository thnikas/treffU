import React from 'react';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
const StatusBarConfig = () => {
    const isFocused = useIsFocused();
  
    return (
      <StatusBar
       
        backgroundColor= '#D6DCF2' 
      />
    );
  };
  
  export default StatusBarConfig;