import React, { useState,useEffect } from 'react';
import {View,Dimensions,SafeAreaView,ActivityIndicator,Text,TouchableOpacity,StyleSheet,Alert,Image,Keyboard,TouchableWithoutFeedback} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { ref,uploadBytesResumable } from "firebase/storage";
import { storage,auth,db } from '../firebase';
import 'react-native-get-random-values';
import { Timestamp,addDoc,doc,collection} from 'firebase/firestore';
import AwesomeAlert from 'react-native-awesome-alerts';
import CustomText from './custom/CustomText';
import { FloatingAction } from "react-native-floating-action";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { TextInput } from 'react-native-paper';

const deviceHeight=Dimensions.get('window').height
const deviceWidth=Dimensions.get('window').width


export default function AddPost(){
  const [image, setImage] = useState(null);//the image that will be uploaded
  const [uploading, setUploading] = useState(false);//show of hide indicator when its uploaded
  const [post, setPost] = useState(null);//change textinput value
  const [color, setColor] = useState('#4954EB');//change the colours of the activeindicator
  const [showAlert, setShowAlert]=useState(false)
  const [alertmes, setArrayMes]=useState('')

  const actions = //icons used in the floating button
  [
    {
      text: "Take Photo",
      icon: <MaterialIcons name='photo-camera' color={'#FFFFFF'} size={25}/>,
      name: "tk_ph",
      position: 1,
      buttonSize:45,
      color:'#4954EB'
    },
    {
      text: "Choose Photo",
      icon:<AntDesign name='picture' color={'#FFFFFF'} size={25}/>, 
      name: "ch_ph",
      position: 2,
      buttonSize:45,
      color:'#4954EB'

    },
  ];
  const takeImage=()=>{
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.launchCamera(options, (response) => {//opens user camera
      if (response.didCancel) {
        console.log('User cancelled photo');
      } else if (response.error) {
        console.log('ImagePhoto Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else if(response){
        const source = { uri: response.assets[0].uri };
        console.log(source)
        setImage(source);
      }
    });
  }
  const selectImage = () => {
    const options = {//image zoom
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.launchImageLibrary(options, (response) => {//select image from user phone
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.assets[0].uri };
        setImage(source);
      }
    });
  };
  const uriNull=()=>{//error if the user does not select image
    if(image==null){
      setArrayMes(  'Please select an image!')
      setShowAlert(true)

     
        return;
    }
  }
  const uploadImage = async () => {//uploads the image in the storage
    const cuserId=auth.currentUser.uid
    const { uri } = image;
    
    if(uri==null){//if user uploads without selecting img
      setArrayMes( 'Please select an image!')
      setShowAlert(true)
      return;
    }

    const filenam = uri.substring(uri.lastIndexOf('/') + 1);//change the image name in the database
    const filename=filenam.substring(25)
    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    const filename3 = name + Date.now() + '.' + extension;
    const metadata = {
      contentType: "image/jpeg",
    };
    setUploading(true);
    const storageRef=ref(storage, `files/${filename3}`)//the name that the image will be saved in the database
    const img=await fetch(uri)
    const bytes=await img.blob()//convert to blob so i uploads with all the bytes
    const task=uploadBytesResumable(storageRef, bytes,metadata)
    
    try {
       await task
    } catch (e) {
      console.log(e)
      setArrayMes('Something went wrong please try again.')
      setShowAlert(true)
      return
    }
    setUploading(false);
    setArrayMes('Success!')
    setShowAlert(true)
    addDoc(collection(db, "posts"), {//add entry in the firestore
      userId: cuserId,
      post: post,
      postImg: filename3,
      postTime: Timestamp.fromDate(new Date()),
      likes: null,
      comments: null,
    })
    setImage(null);
    setPost(null)
  };
  useEffect(() => {
    
  }, [alertmes]);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

      <View style={styles.container}>

        <TextInput
          label="What's on your mind?"
          style={{width:250,height:50,fontSize:17}}
          mode='outlined'
          numberOfLines={5}
          value={post}
          onChangeText={(content) => setPost(content)}
          onSubmitEditing={Keyboard.dismiss}
        />
        <View style={styles.imageContainer}>
      
        {image !== null ? (
          <Image source={{ uri: image.uri }} style={styles.imageBox} />
        ) : null}
    


        {uploading ? (
          <View style={styles.progressBarContainer}>
            <ActivityIndicator size="large" color={color} style={styles.indicator}/>
            <CustomText style={styles.indicatorText}>Uploading photo...</CustomText>
          </View>
        ) : (
        
          <View style={styles.uploadButtonView}>
            <TouchableOpacity style={styles.uploadButton} onPress={image==null?uriNull:uploadImage}>
              <CustomText style={styles.buttonText}>Upload image</CustomText>
          </TouchableOpacity>
        </View>
        )}
  
        </View>
        <View style={styles.floatingIcon}>
          <FloatingAction
            color='#4954EB'
            actions={actions}
            showBackground={false}
            onPressItem={name => {
            name=='ch_ph'?selectImage():takeImage()  
            }}/>
        </View>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Upload"
          message={alertmes}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          contentContainerStyle={styles.contentContainerStyle}
          messageStyle={{alignItems:'center', alignSelf:'center',}}
          confirmButtonTextStyle={styles.confirmButtonTextStyle}
          confirmButtonStyle={styles.confirmButtonStyle}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonColor="#4954EB"
          onCancelPressed={() => {
           setShowAlert(false)
          }}
          onConfirmPressed={() => {
            setShowAlert(false)
          }}
        />
      </View>

    </TouchableWithoutFeedback>
  );
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#D6DCF2'
  },
  uploadButtonView:{
    position:'absolute',
    marginTop:'110%',
    alignItems:'center'
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height:50,
    backgroundColor: '#4954EB',
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  imageContainer: {
    marginTop: 30,
    alignItems: 'center'
  },
  progressBarContainer: {
    marginTop: 20
  },
  imageBox: {
    width: deviceWidth*0.95,
    height: deviceHeight*0.55,
    borderRadius:3
  },
  floatingIcon: {
    paddingTop:'170%',
    paddingLeft:'99%',
    position:'absolute'},
    indicator: {},
    
  indicatorText: {
    fontSize: 18,
    marginTop: 12,
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


