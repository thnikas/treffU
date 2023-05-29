import React from 'react';
import {Text,View,StyleSheet,Animated,TouchableWithoutFeedback} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomText from './components/custom/CustomText';

const Main=()=>{
    
    return(
        <View style={{padding:'40%'}}>
            <CustomText style={{fontSize:30}}>Main</CustomText>


        </View>
    )
    
}

export default Main;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
