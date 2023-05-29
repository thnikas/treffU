import { StyleSheet, View, Image,ActivityIndicator } from "react-native";
import React,{useEffect, useState} from "react";

import { storage,auth,db } from '../../../firebase';
import { doc, updateDoc,getDoc} from 'firebase/firestore';
import { ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';


const UserImageSee = (myData) => {
  const cuserId=myData.myData
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
      <View style={[{marginTop:'-5%'},myData.customStyles]}>
         <SkeletonPlaceholder backgroundColor='#CDCBDF' >
            <View style={styles.viewStyle1}>
              <View style={styles.viewStyle2} />
            </View>
          </SkeletonPlaceholder>
      </View>
      ):
      showIndicator?
      <View style={styles.activityView}>
        <ActivityIndicator size="large" color='#B14AB9' />
      </View>:
    
      <Image resizeMode="cover" style = {[styles.roundImage,myData.customStyles]} source = {{uri: image}}/>
    }
    </View>
 );
};

export default UserImageSee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop:'-43.5%',
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
  viewStyle1:{
    flexDirection: 'row', 
    alignItems: 'center',
    paddingTop:'20%' 
  },
  viewStyle2:{
    width: 100, 
    height: 100, 
    borderRadius: 50,
  },
  activityView:{
    alignContent:'center',
    paddingTop:'5%'
  }
});


