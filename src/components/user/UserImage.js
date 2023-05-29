import { StyleSheet,  View, Image,TouchableOpacity,Alert,ActivityIndicator } from "react-native";
import React,{useEffect, useState} from "react";
import {Menu,MenuOptions,MenuTrigger,renderers } from "react-native-popup-menu";
import {AddImage,SeeImage,} from "./CustomContents";
import ImagePicker from 'react-native-image-crop-picker';
import { storage,auth,db } from '../../firebase';
import { doc, updateDoc,getDoc} from 'firebase/firestore';
import { ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AwesomeAlert from 'react-native-awesome-alerts';

const Divider = () => <View style={styles.divider} />;

const UserImage = () => {
  const cuserId=auth.currentUser.uid

  const getUserImage=async()=>{

  const userRef=doc(db,"users", cuserId)
  const querySnapshot = await getDoc(userRef);
  const userImg=querySnapshot.data().userImg
  getDownloadURL(ref(storage, `profImg/${userImg}`))
  .then((url)=>{
    setImage(url)
  })
    setFirstRender(false)
    setLoading(false);
  }
  const [loading, setLoading]=useState(true)
  const [firstRender, setFirstRender]=useState(true)
  const [image, setImage] = useState(null);
  const [upload,setUpload]=useState(false)
  const [showAlert, setShowAlert]=useState(false)
  const [alertmes, setAlertMes]=useState('Something went wrong please try again.')
  const [showIndicator, setShowIndicator]=useState(false)
  const choosePhotoFromLibrary = () => {//selects photo from user images
    ImagePicker.openPicker({
      width: 1200,
      height: 1200,
      cropping: true,
      cropperCircleOverlay:true
    }).then((image) => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri)
      setUpload(true)
      setShowIndicator(true)
      
        
    });
  };  

  const uploadImage = async () => {//uploads the image in the storage
    const { uri } = image;

    const filename = image.substring(image.lastIndexOf('/') + 1);//change the image name in the database
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef=ref(storage, `profImg/${filename}`)//the name that the image will be saved in the database
    const img=await fetch(image)
    const bytes=await img.blob()//convert to blob so i uploads with all the bytes
    const task=uploadBytesResumable(storageRef, bytes,metadata)
    
    try {
      await task
    } catch (e) {
      setShowAlert(true)
    }
    setShowIndicator(false)
    setAlertMes('Photo changed successfully!')
    setShowAlert(true)
    const userRef=doc(db,"users", cuserId)

    await updateDoc(userRef,{
      userImg:filename
    }).then(()=> getDownloadURL(ref(storage, `profImg/${filename}`))
    .then((url)=>{
      updateDoc(userRef,{imgUrl:url})
    }))
    
    setUpload(false)
    
  };
      
  useEffect(()=>{
    if(firstRender==true){//loads the user image
      getUserImage()
        
    }
    if(upload==true){
      uploadImage()
    }
  },[upload])

 return (
   <View style={[styles.container]} >
    {loading?(
      <View style={{marginTop:'-5%'}}>
         <SkeletonPlaceholder backgroundColor='#CDCBDF' >
            <View style={styles.skeleton1}>
            <View style={styles.skeleton2} />
            </View>
       </SkeletonPlaceholder>
      </View>
      ):
      showIndicator?
      <View style={{alignContent:'center',paddingTop:'5%'}}>
        <ActivityIndicator size="large" color='#B14AB9' />
      </View>:
    
      <Menu  
        renderer={renderers.Popover}  
        rendererProps={{ anchorStyle: styles.anchorStyle,placement:'right' }}
        style={{ height: 20 }}>
        <MenuTrigger customStyles={{TriggerTouchableComponent: TouchableOpacity}}>
          <Image resizeMode="cover" style = {styles.roundImage} source = {{uri: image}}/>

        </MenuTrigger>
        <MenuOptions
          customStyles={{
          optionsContainer: {
          },
          }}
        >
          <AddImage text="Change Image" iconName="images" value={choosePhotoFromLibrary} />
          <Divider />
          <SeeImage text="Infomations" iconName="info"  />
        </MenuOptions>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title='Change photo'
          message={alertmes}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={false}
          showConfirmButton={true}
          contentContainerStyle={styles.contentContainerStyle}
          confirmButtonTextStyle={styles.confirmButtonTextStyle}
          confirmButtonStyle={styles.confirmButtonTextStyle}
          confirmText="Ok"
          confirmButtonColor="#B14AB9"
          onConfirmPressed={() => {
            setShowAlert(false)
          }}
        />
      </Menu>
      }
    </View>
 );
};

export default UserImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop:'-40.5%',
    marginBottom:'12%'
  },
  roundImage:{
    width: 100,
    height: 100,
    borderRadius: 200 / 2,
    borderWidth: 2,
  },
  anchorStyle: {
    backgroundColor: '#221E1E',
  },
  divider: {
    height: 1,
    backgroundColor: "#7F8487",
  },
  skeleton1:{
    flexDirection: 'row', 
    alignItems: 'center',
    paddingTop:'20%' },
  skeleton2:{
    width: 100, 
    height: 100, 
    borderRadius: 50,
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
    fontSize:20
  },
  confirmButtonStyle:{
    width:'30%',
    height:'75%',
    borderRadius:10,
    marginBottom:'5%'
  }
});


