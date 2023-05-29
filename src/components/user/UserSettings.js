import React,{useContext, useEffect, useState, createContext, useRef} from 'react';
import {Text,View,StyleSheet,TextInput,Keyboard,Dimensions,SectionList, Button, TouchableOpacity,Pressable,Alert, TouchableWithoutFeedback} from 'react-native'
import { auth,db } from '../../firebase';
import {AuthContext} from '../../navigation/Routes';
import { doc,getDoc,updateDoc } from 'firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from "react-native-linear-gradient";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioButton from '../custom/RadioButton';
import { gym, pets,school,music,searching,book } from '../../data/InterestCh';
import * as InterestIcons from '../CustomBar/InterestIcons';
import CountryPicker from 'react-native-country-picker-modal'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { signOut } from 'firebase/auth';
import AwesomeAlert from 'react-native-awesome-alerts';
import CustomText from '../custom/CustomText';
const deviceHeight=Dimensions.get('window').height
const deviceWidth=Dimensions.get('window').width
const Settings=(props)=>{
  const [firstRender, setFirstRender]=useState(true)  //when the first render happens so it can change the stored values of the radiobuttons
  const [petsArray, setPetsArray]=useState(pets)//the first array that changes after the first render show it can show what the user has stored
  const [gymArray, setGymArray]=useState(gym)
  const [schoolArray, setSchoolArray]=useState(school)
  const [musicArray, setMusicArray]=useState(music)
  const [bookArray, setBookArray]=useState(book)
  const [searchingArray, setSearchingArray]=useState(searching)
  const [petSelect, setPetSelect]=useState()
  const [gymSelect, setGymSelect]=useState()
  const [schoolSelect, setSchoolSelect]=useState()
  const [musicSelect, setMusicSelect]=useState()
  const [bookSelect, setBookSelect]=useState()
  const [searchingSelect, setSearchingSelect]=useState()
  const {userExists} = useContext(AuthContext);//check which user is logged in
  const [userData, setUserData] = useState(null);//user data that will be used in order to change the values in the firestore
  const [userInfo, setUserInfo]=useState(null)//array only for rabiobuttons that changes when the user press another value
  const [show, setShow]=useState('menu-up')//change the icon of arrow when radio buttons ara shown
  const [countryCode, setCountryCode] = useState('');//used in the country library 
  const [country, setCountry] = useState('');
  const [showAlert, setShowAlert]=useState(false)
  const [showAlert2, setShowAlert2]=useState(false)
  const petIcon=<InterestIcons.Pet2 size={27} style={styles.iconsStyle}/>//icons that passed in the radiobutton component 
  const gymIcon=<InterestIcons.Gym2 size={27} style={styles.iconsStyle}/>
  const schoolIcon=<InterestIcons.School2 size={27} style={styles.iconsStyle}/>
  const musicIcon=<InterestIcons.Music size={27} style={styles.iconsStyle}/>
  const bookIcon=<InterestIcons.Book2 size={27} style={styles.iconsStyle}/>
  const searchingIcon=<AntDesign name={'smileo'} size={27} style={styles.iconsStyle}/>


  const onSelect = country => {//used to change the selected country
    setCountryCode(country.cca2);
    setCountry(country);
    };
  const checkArrays=async()=>{//updates first arrays so the radio buttons values are right
    if(firstRender){
      if(userExists){
        const userRef=doc(db,"users", userExists.uid)
        const docSnap=await getDoc(userRef)
        const petSelected=docSnap.data().info['pet']
        const updatePets=pets.map((item)=>
        item.name==petSelected
        ? { ...item, selected: true }
        : { ...item, selected: false }
        )
        const gymSelected=docSnap.data().info['gym']
        const updateGym=gym.map((item)=>
        item.name==gymSelected
        ? { ...item, selected: true }
        : { ...item, selected: false }
        )
        const schoolSelected=docSnap.data().info['school']
        const updateSchool=school.map((item)=>
        item.name==schoolSelected
        ? { ...item, selected: true }
        : { ...item, selected: false }
        )
        const searchingSelected=docSnap.data().info['searching']
        const updateSearching=searching.map((item)=>
        item.name==searchingSelected
        ? { ...item, selected: true }
        : { ...item, selected: false }
        )
        const bookSelected=docSnap.data().info['book']
        const updateBook=book.map((item)=>
        item.name==bookSelected
        ? { ...item, selected: true }
        : { ...item, selected: false }
        )
        const musicSelected=docSnap.data().info['music']
        const updateMusic=music.map((item)=>
        item.name==musicSelected
        ? { ...item, selected: true }
        : { ...item, selected: false }
        )
        setPetsArray(updatePets)
        setGymArray(updateGym)
        setSchoolArray(updateSchool)
        setMusicArray(updateMusic)
        setBookArray(updateBook)
        setSearchingArray(updateSearching)
        
      }
    }
    setFirstRender(false)
  }
  const getUser=async()=>{//gets user from firestore

    const docRef = doc(db, "users", userExists.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        setUserData(docSnap.data())
        setUserInfo(docSnap.data().info)
        setCountryCode(docSnap.data().country['cca2'])

    } else {
        console.log("No such document!");
    }
          
        
  }
  
  
  const handleUpdate = async() => {//stores the update values in the firestore
      const userRef=doc(db,"users", userExists.uid)
      
      await updateDoc(userRef,{
        fname: userData.fname,
        lname: userData.lname,
        uname:userData.uname,
        phone: userData.phone,
        country: country,
        city: userData.city,
        info:userInfo
      })
      .then(() => {
        console.log('User Updated!');
        setShowAlert(true)
      })
    }
    
    const hide=()=>{//hides the radiobuttons
      if(show=='menu-up'){
        setShow('menu-down')
      }else{
        setShow('menu-up')
      }
    }
    const signOutUser=()=>{
      setShowAlert2(true)
    }
  useEffect(()=>{
    checkArrays()
    getUser()
    props.navigation.setOptions({
      headerStyle: {
        backgroundColor: '#D6DCF2',
        shadowColor: '#fff',
        elevation: 0,
      },
      
      headerRight: () => (
        <TouchableOpacity  onPress={()=>signOutUser()}>
          <InterestIcons.Exit5 style={{paddingRight:'15%'}} color='#B14AB9' size={40} />
        </TouchableOpacity>),
    });
  },[])
  return(
    <View style={styles.container}>
    {!userData?( 
    <SkeletonPlaceholder backgroundColor='#CDCBDF'>
      <View style={{flexDirection: 'row', alignItems: 'center',paddingTop:'2%'}}>
        <View style={{width: 40, height: 40,marginLeft:'84%' }} />
        
      </View>
      <View style={{paddingTop:'1%'}}>
        <View style={styles.skeletonStyle} />
        <View style={styles.skeletonStyle} /> 
        <View style={styles.skeletonStyle} /> 
        <View style={styles.skeletonStyle} /> 
        <View style={styles.skeletonStyle} /> 
        <View style={styles.skeletonStyle2} /> 
        <View style={styles.skeletonButton} /> 
      </View>
    </SkeletonPlaceholder>):
    (<ScrollView>
      <TouchableOpacity onPress={()=>handleUpdate()}>
        <InterestIcons.Save size={37} color='black' style={{paddingLeft:'85%',position:'absolute',paddingTop:'2%'}}/>
      </TouchableOpacity>
      <View style={{paddingTop:'8%'}}>
        <CustomText style={styles.text}>First Name</CustomText>
        <View style={styles.action}>
          <InterestIcons.Id2  size={27} color={'black'}/>
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            onSubmitEditing={Keyboard.dismiss}
            selectionColor={'#7a42f4'}
            autoCorrect={false}
            value={userData ? userData.fname : ''}
            onChangeText={(content) => setUserData({...userData, fname: content})}
            
            style={styles.textInput}
          />
              
        </View>
        <CustomText style={styles.text}>Last Name</CustomText>
        <View style={styles.action}>
          <InterestIcons.Id2  size={27} color={'black'}/>
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#666666"
            
            selectionColor={'#7a42f4'}
            autoCorrect={false}
            value={userData ? userData.lname : ''}
            onChangeText={(txt) => setUserData({...userData, lname: txt})}
            style={styles.textInput}
          />
        </View>
        <CustomText style={styles.text}>Username</CustomText>
        <View style={styles.action}>
          <InterestIcons.Id2  size={27} color={'black'}/>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#666666"
              
            selectionColor={'#7a42f4'}
            autoCorrect={false}
            value={userData ? userData.uname : ''}
            onChangeText={(txt) => setUserData({...userData, uname: txt})}
            style={styles.textInput}
          />
        </View>
        <CustomText style={styles.text}>Phone</CustomText>
          <View style={styles.action}>
            <InterestIcons.Phone2  size={27} color={'black'}/>
            <TextInput
              placeholder="Phone"
              placeholderTextColor="#666666"
              
              selectionColor={'#7a42f4'}
              autoCorrect={false}
              value={userData ? userData.phone : ''}
              onChangeText={(txt) => setUserData({...userData, phone: txt})}
              style={styles.textInput}
            />
          </View>
          <CustomText style={styles.text}>City</CustomText>
          <View style={styles.action}>
            <FontAwesome5 name={'city'}  size={22} color={'black'}/>
              <TextInput
                placeholder="City"
                placeholderTextColor="#666666"
                
                selectionColor={'#7a42f4'}
                autoCorrect={false}
                value={userData ? userData.city : ''}
                onChangeText={(txt) => setUserData({...userData, city: txt})}
                style={styles.textInput}
              />
          </View>
          <CustomText style={styles.text}>Country</CustomText>

          <View style={styles.action}>
            <InterestIcons.Country style={{paddingTop:'2%'}} color={'black'} size={27} />

            <CountryPicker
              containerButtonStyle={{
                height: 50,
                paddingLeft:'30%',  
                justifyContent: 'center',
                paddingBottom:'5%'
              }}
              countryCode={countryCode}
              withCountryNameButton={true}
              visible={false}
              withFlag={true}
              withCloseButton={true}
              withAlphaFilter={true}
              //   withCurrency={true}
              withEmoji={true}
              withFilter={true}
              withModal={true}
              onSelect={onSelect}
            />
            <Feather name='chevron-down' style={{ marginTop:'2%',marginLeft:'-10%'}}  size={30} color='black'/>

          </View>
          <TouchableOpacity activeOpacity={0.8} style={{paddingHorizontal:10}} onPress={()=>hide()}>

            <LinearGradient
              colors={["#9542f5", "#c021cf"]}
              start={{x: 0, y: 0}} // Gradient starting coordinates
              end={{x: 0, y: 0.5}} // Gradient ending coordinates
              style={styles.appButtonContainer}
            >
              <InterestIcons.Info style={{position:'absolute', paddingTop:'2%', paddingLeft:'5%'}} color='#FFFFFF' size={30}/>
              <CustomText style={styles.appButtonText}>More Info</CustomText>
              <MaterialCommunityIcons name={show} style={{position:'absolute',paddingTop:'-3%',paddingLeft:'85%',marginTop:'-3.5%'}} size={60} color='white'/>

            </LinearGradient>
          </TouchableOpacity>
          
          {show=='menu-down'?

            <View>
              <RadioButton array={petsArray} selected={petSelect} setSelected={setPetSelect} title={'Pets'} iconCustom={petIcon} userInfo={userInfo} setUserInfo={setUserInfo}/>
              <RadioButton array={gymArray} selected={gymSelect} setSelected={setGymSelect} title={'Workout'} iconCustom={gymIcon} userInfo={userInfo} setUserInfo={setUserInfo}/>
              <RadioButton array={schoolArray} selected={schoolSelect} setSelected={setSchoolSelect} title={'Education'} iconCustom={schoolIcon} userInfo={userInfo} setUserInfo={setUserInfo}/>
              <RadioButton array={musicArray} selected={musicSelect} setSelected={setMusicSelect} title={'Music'} iconCustom={musicIcon} userInfo={userInfo} setUserInfo={setUserInfo}/>
              <RadioButton array={bookArray} selected={bookSelect} setSelected={setBookSelect} title={'Book'} iconCustom={bookIcon} userInfo={userInfo} setUserInfo={setUserInfo}/>
              <RadioButton array={searchingArray} selected={searchingSelect} setSelected={setSearchingSelect} title={'Searching'} iconCustom={searchingIcon} userInfo={userInfo} setUserInfo={setUserInfo}/>
            </View>

          :null}
          
        </View>
          
    </ScrollView> ) }
    <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title='Profile Updated!'
        message='Your profile has been updated successfully.'
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Ok"
        confirmButtonColor="#B14AB9"
        contentContainerStyle={styles.contentContainerStyle}
        confirmButtonTextStyle={styles.confirmButtonTextStyle}
        confirmButtonStyle={styles.confirmButtonStyle}
        titleStyle={{fontSize:20}}
        onConfirmPressed={() => {
        setShowAlert(false)          
        }}
      />
      <AwesomeAlert
        show={showAlert2}
        showProgress={false}
        title='Log out'
        message='Are you sure?'
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, log out"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setShowAlert2(false)
        }}
        onConfirmPressed={() => {
          signOut(auth)
        }}
      />
    </View>

      
      
  )
  
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6DCF2',
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
      paddingTop:'2%',
      borderColor: '#7a42f4',
      marginHorizontal:'5%',
      borderRadius:5,
      borderWidth:2,
      paddingLeft:'1%'
    
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
  },
  textInput: {
    flex: 1,
    marginBottom:-4,
    marginTop: Platform.OS === 'ios' ? 0 : -13,
    paddingLeft: 10,
    color: '#637187',
    fontFamily:'sans-serif-medium'
  },
  text:{
    letterSpacing:1,
    paddingLeft:'5%',
    fontFamily:'sans-serif-medium',
    color:'#637187',
    fontWeight:'bold'
  },
  taskItem:{
    padding: 10,
    marginVertical: 15,
    fontSize: 16
  },
  taskTitle:{
    backgroundColor: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    elevation: 4,
    margin: 10,
    marginBottom: 0,
    borderRadius: 10
    },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    
  },
  appButtonContainer: {
    elevation: 3,
    backgroundColor: "#009688",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12
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
    position:'absolute', padding:'5%',
  },
  skeletonStyle:{
    width: deviceWidth-0.1*deviceWidth,
    height: 40, 
    flexDirection: 'row',
    marginTop: '6%',
    marginBottom: '4%',
    marginHorizontal:'5%',
    borderRadius:5,
      
  },
  skeletonStyle2:{
    width: deviceWidth-0.1*deviceWidth,
    height: 65, 
    flexDirection: 'row',
    marginTop: '10%',
    marginBottom: '4%',
    marginHorizontal:'5%',
    borderRadius:5,
      
  },
  skeletonButton:{
    width: deviceWidth-0.1*deviceWidth,
    height: 40, 
    flexDirection: 'row',
    marginTop: '1%',
    marginBottom: '7%',
    marginHorizontal:'5%',
    borderRadius:20,
  },
  contentContainerStyle:{
    width:'60%',
    height:'25%',
    marginBottom:'10%',
    borderRadius:10
  },
  confirmButtonTextStyle:{
    alignItems:'center', 
    alignSelf:'center',
    fontSize:20},
  confirmButtonStyle:{
    width:'30%',
    height:'90%',
    borderRadius:10
  }
  
});

