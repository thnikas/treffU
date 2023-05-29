import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View,TouchableOpacity,StyleSheet,Keyboard,TouchableWithoutFeedback,Image } from 'react-native';
import { container, form } from '../styles/styles';
import { signInWithEmailAndPassword,getAuth, signOut } from 'firebase/auth';
import { Snackbar } from 'react-native-paper';
import { doc, setDoc } from "firebase/firestore"; 
import { auth,db} from '../firebase';
import LinearGradient from "react-native-linear-gradient";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import CustomText from '../components/custom/CustomText';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(true);//if there are errors it shows the suitable message

    const onSignUp = () => {
        if(email.length==0||password.length==0){
            setIsValid({ bool: true, boolSnack: true, message: "Please fill out everything" })
            return
        }
        signInWithEmailAndPassword(auth,email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          Alert.alert('','Welcome!')
            
        })//if there are errors in the log in
        .catch((error) => {
            if (error.code === 'auth/user-not-found') {
                setIsValid({ bool: true, boolSnack: true, message: "This e-mail does not exist. Please try again with another one" })
                return
              }
            else if (error.code === 'auth/wrong-password') {
                    setIsValid({ bool: true, boolSnack: true, message: "The password is incorrect" })
                    return
                }
            else if (error.code === 'auth/user-not-found') {
                    setIsValid({ bool: true, boolSnack: true, message: "The user is incorrect" })
                    return
                    } 
            else if (error.code === 'auth/user-disabled') {
                setIsValid({ bool: true, boolSnack: true, message: "The current user is disabled" })
                return
            }
               
            
        })
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

            <View style={container.center}>
                <Image source={require('../../assets/logo_3.png')} style={styles.image}/>
                <View style={container.formCenter}>

                    <TextInput
                        style={form.textInput}
                        placeholder="Email"
                        autoCapitalize="none"
                        onChangeText={(email) => setEmail(email)}
                        selectionColor={'#5C53E2'}
                        onSubmitEditing={Keyboard.dismiss}
                        
                    />
                    <TextInput
                        style={form.textInput}
                        placeholder="Password"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        onChangeText={(password) => setPassword(password)}
                        selectionColor={'#5C53E2'}
                        onSubmitEditing={Keyboard.dismiss}/>

                    <TouchableOpacity activeOpacity={0.4} style={styles.appButtonContainer} onPress={() => onSignUp()}>

                        <CustomText  style={styles.text}>Sign in</CustomText>

                    </TouchableOpacity>
                
                    <TouchableOpacity onPress={()=>props.navigation.navigate("ForgotPassword")} style={{paddingTop:'4%',alignContent:'center',alignSelf:'center'}}>
                        
                        <CustomText style={{fontSize:15,color:'#5C53E2'}}>Did you forget your password?</CustomText>
                    
                    </TouchableOpacity>
            
                </View>
                
                <View style={form.bottomButton} >
                    <TouchableOpacity onPress={() => props.navigation.navigate("Register")}>
                    <CustomText style={form.textBottomLogin}
                        title="Register"
                            >
                        Don't have an account? Sign Up.
                    </CustomText>
                
                    </TouchableOpacity>
                    </View>
                <Snackbar 
                    style={styles.snack}
                    visible={isValid.boolSnack}
                    duration={3000}
                    onDismiss={() => { setIsValid({ boolSnack: false }) }}>
                    {isValid.message}
                </Snackbar>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    button: {
        shadowOpacity: 2, // IOS
        shadowRadius: 2, //IOS
        backgroundColor: '#fff',
        elevation: 12, // Android
        height: '8%',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius:10,
        alignContent:'center',
        alignSelf:'center',
        marginTop:'5%'
    },
    appButtonContainer: {
        elevation: 12,
        backgroundColor: "#5C53E2",
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
    snack:{
        color:'#5C53E2',
        backgroundColor:'#DB3939'
    },
    image:{ 
        width: 100, 
        height: 100, 
        top:'1%',
        alignItems:"center",
        alignSelf:'center' 
    }
      
})