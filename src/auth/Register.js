import React, { useState,useEffect,useRef } from 'react';
import {  TextInput, View,Alert,StyleSheet,TouchableOpacity,Keyboard,TouchableWithoutFeedback,ScrollView,Image } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { container, form } from '../styles/styles';
import { doc, setDoc } from 'firebase/firestore';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import firebase, { auth,db} from '../firebase';
import { SimRadioButton } from '../components/custom/simRadioBtn';

import CustomText from '../components/custom/CustomText';
export default function Register(props) {
    useEffect(() => {
    }, [alert]);
    const lnameRef = useRef(null);
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordRepeatRef = useRef(null);
    const emailRef = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lname, setLname] = useState('');
    const [alert, setAlert]=useState(false)
    const [username, setUsername] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [passwordRepeat, setPasswordRepeat]=useState('')
    const [gender, setGender]=useState([{gender:'Male',selected:false}, {gender:'Female',selected:false}])
    const info={
         book:'',
         gym:'',
         music:'',
         pet:'',
         school:'',
         searching:'',
    }
    const onRadioBtnClick = (item) => {//change the state of the selected value in the array

        if(item.selected==true){
            let updatedState= gender.map((genderSel) =>
            item.selected==true
            ?{ ...genderSel, selected: false }
            :null
  
        )
        setGender(updatedState)
    }else if(item.selected==false){
        let updatedState = gender.map((genderSel) =>
      
      genderSel.gender === item.gender
        ? { ...genderSel, selected: true }
        : { ...genderSel, selected: false }
       
    )
    setGender(updatedState)

}
        
        
        
      };
    const onRegister = () => {
        
        if (name.length == 0 || username.length == 0 || email.length == 0 || password.length == 0) {//checks if all the credentials are correct
            setIsValid({ bool: true, boolSnack: true, message: "Please fill out everything" })
            return;
        }
        if (password.length < 6) {
            setIsValid({ bool: true, boolSnack: true, message: "passwords must be at least 6 characters" })
            return;
        }
        if (password.length < 6) {
            setIsValid({ bool: true, boolSnack: true, message: "passwords must be at least 6 characters" })
            return;
        }
        if(password!==passwordRepeat){
            setIsValid({ bool: true, boolSnack: true, message: "passwords do not match" })
            return;
        }

        
        createUserWithEmailAndPassword(auth, email, password).then(()=>{//creates the new user

            async function customId(){
                const cuserId=auth.currentUser.uid
                await setDoc(doc(db, "users", cuserId), {
                    fname:name,
                    lname:lname,
                    email:email,
                    uname:username,
                    image:'default' ,
                    followingCount: 0,
                    followersCount: 0,
                    userImg:'no-user-profile-picture-24185395.jpg',
                    city:'',
                    gender:gender,
                    info:info,
                    country:[],
                    phone:'',
                    uid:cuserId,
                    usersList:{'disliked':[],'liked':[]},
                    friends:[],
                    request:[],
                    checkIn:null,
                    imgUrl:'https://firebasestorage.googleapis.com/v0/b/liebe-13c1b.appspot.com/o/profImg%2Fno-user-profile-picture-24185395.jpg?alt=media&token=7b06c86d-c5d5-4bf2-ab7f-0295f9d9866f'
                }) 
                }customId()
               
                Alert.alert('','Welcome!')
 
        }).catch((error) => {//catch errors if exist
            if (error.code === 'auth/email-already-in-use') {
                setIsValid({ bool: true, boolSnack: true, message: "These is already a user with the specific E-mail. Please try with another E-mail" })
                return
            }
                if (error.code === 'auth/invalid-email') {
                setIsValid({ bool: true, boolSnack: true, message: "Please register with a valid E-mail" })
                return
            }
                
            
        })
                    
                
            


    }
   
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

        <View style={container.center}>
        <Image source={require('../../assets/logo_3.png')} style={styles.image}/>

            <View style={container.formCenter}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TextInput
                    style={form.textInput}
                    placeholder="Username"
                    value={username}
                    keyboardType="twitter"
                    autoCapitalize="none"
                    onChangeText={(username) => setUsername(username)}
                    selectionColor={'#5C53E2'}
                    onSubmitEditing={() => {
                        nameRef.current.focus();
                      }}
                      blurOnSubmit={false}

                />
                <TextInput
                    style={form.textInput}
                    placeholder="Name"                       
                    autoCapitalize="none"
                    onChangeText={(name) => setName(name)}
                    selectionColor={'#5C53E2'}
                    onSubmitEditing={() => {
                        lnameRef.current.focus();
                      }}
                      blurOnSubmit={false}
                    ref={nameRef}
                />
                <TextInput
                    style={form.textInput}
                    placeholder="Last Name"                       
                    autoCapitalize="none"
                    onChangeText={(lname) => setLname(lname)}
                    selectionColor={'#5C53E2'}
                    onSubmitEditing={() => {
                        emailRef.current.focus();
                      }}
                      blurOnSubmit={false}
                      ref={lnameRef}

                />
                <TextInput
                    style={form.textInput}
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={(email) => setEmail(email)}
                    selectionColor={'#5C53E2'}
                    onSubmitEditing={() => {
                        passwordRef.current.focus();
                      }}
                      blurOnSubmit={false}
                      ref={emailRef}

                />
                <TextInput
                    style={form.textInput}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onChangeText={(password) => setPassword(password)}
                    selectionColor={'#5C53E2'}
                    onSubmitEditing={() => {
                        passwordRepeatRef.current.focus();
                      }}
                      blurOnSubmit={false}
                      ref={passwordRef}

                />
                <TextInput
                    style={form.textInput}
                    placeholder="Password Repeat"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onChangeText={(passwordRepeat) => setPasswordRepeat(passwordRepeat)}
                    selectionColor={'#5C53E2'}
                    onSubmitEditing={Keyboard.dismiss}
                    ref={passwordRepeatRef}
                    

                />
                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                {gender.map((item,index)=>(
                     <SimRadioButton  onPress={()=>onRadioBtnClick(item)} selected={item.selected} key={index}>{item.gender}</SimRadioButton>
                ))} 
                </View>

               

                <TouchableOpacity activeOpacity={0.4} style={styles.appButtonContainer} 
                onPress={() => onRegister()}>

                   
                <CustomText  style={styles.text}>Register</CustomText>

                    </TouchableOpacity>
                    </ScrollView>

            </View>

            <View style={form.bottomButton} >
                <TouchableOpacity onPress={() => props.navigation.navigate("Login")} >
                <CustomText style={form.textBottom}
                    >
                    Already have an account? Sign In.
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
        width: '65%',
        alignContent:'center',
        alignItems:'center',
        bottom:'5%'
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