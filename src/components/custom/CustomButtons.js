import React from 'react';
import {Text,View,StyleSheet,Animated,TouchableWithoutFeedback, } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';

const CustomButton=(value,props)=>{//custom button used in profile picture to get in user settings
    const navigation = useNavigation();

    const spinValue = React.useState(new Animated.Value(0))[0];//rotate the icon
    const onPressIn = () => {
        Animated.spring(spinValue, {
            toValue: 3,
            useNativeDriver: true,
        }).start();
    };
    const onPressOut = () => {
        Animated.spring(spinValue, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };
    const spinDeg = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })
    const goSettings=()=>{
        navigation.navigate('UserSettings')
    }  
    
      // The animated style for scaling the button within the Animated.View
    const animatedScaleStyle = {
        transform: [{rotate: spinDeg}]
    };
    return(
        <View style={{position:'absolute', paddingLeft:'83%'}}>
            <TouchableWithoutFeedback
             
             onPress={goSettings}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
          >
                <View style={styles.container} >
                    
                    <Animated.View  style={[styles.iconContainer, animatedScaleStyle]}  >
                        <Ionicons  name='md-settings' style={{ color:'#B14AB9' }} size={30} />
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
    
        </View>
    )
}
export default CustomButton
   const styles = StyleSheet.create({
    container: {
        justifyContent:"center",
        alignItems:"center",
        padding:15,
        borderRadius:20
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
