import React,{useContext, useEffect, useState,createContext} from 'react';
import {Text,View,StyleSheet,Image, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native'
import {AuthContext} from '../../navigation/Routes';
import UserImage from '../user/UserImage'
import {MenuProvider} from "react-native-popup-menu";
import CustomButton from '../custom/CustomButtons';
import { useIsFocused  } from '@react-navigation/native';
import PostCard from '../PostCard';
import BarOfIn from '../custom/BarOfIn';
import MenuCom from '../custom/MenuCom';

const deviceHeight=Dimensions.get('window').height
const deviceWidth=Dimensions.get('window').width

const Profile=(props,children)=>{//profile of the login user

  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();//lose focus rerender so it can change the values
  const startLoading = () => {
    setTimeout(() => {
    setLoading(false);
    }, 5000);
  };
  
 

  useEffect(()=>{
    startLoading()
      props.navigation.addListener("focus", () => setLoading(!loading));
  },[loading])
  return(

    <View style={[styles.container]} >
      <CustomButton />
      {isFocused? //the bar that is showned down from the image
        <BarOfIn/>        
      :null}
        <UserImage/>
    
      {isFocused? //used isFocused so this data can be realoaded
        <PostCard onPress={props.navigation}/>//the cards that the user has upload
      :null}
    </View>   
      
  )
    
}

export default Profile;
const styles=StyleSheet.create({
  roundImage:{
    width: 100,
    height: 100,
    borderRadius: 200 / 2,
    borderColor: '#10F6B9',
    borderWidth: 2,
    margin:'10%',
    marginLeft:'36%',
    backgroundColor:"#2e64e515"
  },
  container: {
    backgroundColor: "#D6DCF2",
    alignItems: "center",
    height:'100%'
},
})
