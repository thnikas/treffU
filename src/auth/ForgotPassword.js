import React, { Component, useState } from 'react'
import { Text, View,StyleSheet,TextInput,Alert,Button,TouchableOpacity } from 'react-native'
import {  sendPasswordResetEmail } from "firebase/auth";
import { auth,db} from '../firebase';
import { container, form } from '../styles/styles';
import { Snackbar } from 'react-native-paper';
import CustomText from '../components/custom/CustomText';

const ForgotPassword=()=>  {
   const [email,setEmail]=useState(null)
   const [isValid, setIsValid] = useState(true);//if there are errors it shows the suitable message

   const resetPassword=()=>{
    if(!email){
      setIsValid({ bool: true, boolSnack: true, message: "Please fill out everything" })
      return
    }
    sendPasswordResetEmail(auth,email)
    .then((user)=>{
      Alert.alert('','An email to change your password has been sent to your account')

    }).catch((error) => {
    if (error.code === 'auth/missing-email') {
        setIsValid({ bool: true, boolSnack: true, message: "There is not email" })
        return
    }
    })

    }
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(val) => setEmail(val)}
          style={styles.textInput}
          selectionColor={'#5C53E2'}

        />
        <TouchableOpacity activeOpacity={0.4} style={styles.appButtonContainer} onPress={() => resetPassword()}>
                   
          <CustomText  style={styles.text}>Reset Password</CustomText>

        </TouchableOpacity>      
        <Snackbar 
          style={styles.snack}
          visible={isValid.boolSnack}
          duration={3000}
          onDismiss={() => { setIsValid({ boolSnack: false }) }}>
          {isValid.message}
        </Snackbar>   
                
      </View>
    )
  
}

export default ForgotPassword
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  
  appButtonContainer: {
    elevation: 12,
    olor: "#5C53E2",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf:'center',
    //height: '8%',
    width: '65%',
    alignContent:'center',
    alignItems:'center'
  },
  text:{
    letterSpacing:1,
    paddingLeft:'5%',
    fontFamily:'sans-serif-medium',
    color:'#ffff',
    fontWeight:'bold',
    fontSize:15
  },
  textInput: {
    marginBottom: '10%',
    borderColor: '#5C53E2',
    backgroundColor: 'whitesmoke',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    width:'65%',
    paddingBottom:'5%',
    
  },
  snack:{
      color:'#5C53E2',
      backgroundColor:'#DB3939'
  }
  });