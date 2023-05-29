import React,{useContext, useEffect, useState} from 'react';
import {Text,View,StyleSheet,Image, Dimensions} from 'react-native'

import { useIsFocused  } from '@react-navigation/native';

import UserImageSee from './UserImageSee';
import CardSee from './CardSee';
import BarOfInSee from './BarOfInSee';
const deviceHeight=Dimensions.get('window').height
const deviceWidth=Dimensions.get('window').width

const ProfileSee=(props)=>{//see the profile of the user that is showned in the card
  
  const [loading, setLoading] = useState(true);
  const [myData,setMyData]=useState(null)
  const isFocused = useIsFocused();
  const startLoading = () => {
    setTimeout(() => {
    setLoading(false);
    }, 5000);
  };
  

  useEffect(()=>{
    myData?
    props.navigation.setOptions({//show icon in the navigatorBar
      
      headerRight: () => (
        <View style={styles.container}>
            
          <View style={{position:'absolute',zIndex:11,right:'80%',top:'80%'}}> 
            <UserImageSee myData={myData} />
          </View>
        </View>
  
      ),
    }):null
    if(props.route.params.updatedId.current){
      setMyData(props.route.params.updatedId.current)
    }else{
      setMyData(props.route.params.updatedId)
    }
    startLoading()
      props.navigation.addListener("focus", () => setLoading(!loading));
  },[loading])
  return(
    myData? <View style={[styles.container]} >
    {isFocused? 
      <BarOfInSee userData={myData}/>        
    :null}

    {isFocused? 
      <CardSee onPress={props.navigation} userId={myData}/>
    :null}
  </View>   :null
   
      
  )
    
}

export default ProfileSee;
const styles=StyleSheet.create({
  
  container: {
    backgroundColor: "#D6DCF2",
    alignItems: "center",
   height:'100%'
},
})
