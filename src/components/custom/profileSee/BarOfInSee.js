import React,{ useEffect,useState,useContext } from 'react';
import {Text,View,StyleSheet,Dimensions, TouchableOpacity} from 'react-native'
import LinearGradient from "react-native-linear-gradient";
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as InterestIcons from '../../CustomBar/InterestIcons';
import { AuthContext } from '../../../navigation/Routes';
import {  doc,getDoc,  } from 'firebase/firestore';
import { db } from '../../../firebase';
import MenuCom from '../profileSee/MenuComSee';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const deviceHeight=Dimensions.get('window').height
const deviceWidth=Dimensions.get('window').width
const BarOfInSee=(myData)=>{
  const {userExists} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const petIcon=<InterestIcons.Pet size={27} style={styles.iconsStyle}/>//icons that passed in the radiobutton component 
  const gymIcon=<InterestIcons.Gym3 size={27} style={styles.iconsStyle}/>
  const schoolIcon=<InterestIcons.School size={27} style={styles.iconsStyle}/>
  const musicIcon=<InterestIcons.Music2 size={27} style={styles.iconsStyle}/>
  const bookIcon=<InterestIcons.Book size={27} style={styles.iconsStyle}/>
  const searchingIcon=<AntDesign name={'smileo'} size={27} style={styles.iconsStyle}/>
  const getUser = async() => {

    if(myData.userData){
      const docRef = doc(db, "users", myData.userData);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setUserData(docSnap.data())
      } else {
        console.log("No such document!");
      }
      }else{
          if(userExists){
            const docRef = doc(db, "users", userExists.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
              setUserData(docSnap.data())
            } else {
              console.log("No such document!");
            }
            
          }
        }
  }

  useEffect(()=>{
    getUser()

  },[])
  
  return(
    <View style={styles.container}>
      {!userData?( 
      <SkeletonPlaceholder  backgroundColor='#CDCBDF'>

        <View style={styles.skeletonButton} /> 
    
      </SkeletonPlaceholder>):
      <TouchableOpacity activeOpacity={1} >

        <LinearGradient
          colors={["#E281D8", "#AE50A4"]}
          start={{x: 0, y: 1.2}} // Gradient starting coordinates
          end={{x: 0, y: 0.1}} // Gradient ending coordinates
          style={styles.appButtonContainer}
        >
          <View style={{flexDirection:'row'}}>
            {userData.info['searching']!==''?<MenuCom icon={searchingIcon} text={userData.info['searching']}/>:null}
            {userData.info['pet']!==''?          <MenuCom icon={petIcon} text={userData.info['pet']}/>:null}
            {userData.info['gym']!==''?<MenuCom icon={gymIcon} text={userData.info['gym']}/>:null}
            {userData.info['book']!==''?<MenuCom icon={bookIcon} text={userData.info['book']}/>:null}
            {userData.info['school']!==''?<MenuCom icon={schoolIcon} text={userData.info['school']}/>:null}
            {userData.info['music']!==''? <MenuCom icon={musicIcon} text={userData.info['music']}/>:null}

          </View>

        </LinearGradient>
      </TouchableOpacity>
      }
      
    </View>
  )
    
}

export default BarOfInSee;

const styles = StyleSheet.create({
  container: {
    marginTop:'20%',
  },
  appButtonContainer: {
    backgroundColor: "#009688",
    borderRadius: 10,
    width:deviceWidth*0.95,
    height:deviceHeight*0.06
  },
  saveButtonContainer:{
    borderRadius:10,
    height:50
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  iconsStyle:{
    paddingTop:'2%',
    paddingLeft:'5%',
    paddingRight:'3.8%',
    color:'#ffff'
  },anchorStyle: {
    backgroundColor: '#A4A0D5',
}, 
  skeletonButton:{
    width:deviceWidth*0.95,
    height:deviceHeight*0.06,
    flexDirection: 'row',
    borderRadius:10,
  }
       
});

