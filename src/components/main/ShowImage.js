import React,{useEffect,useState,useContext} from 'react'
import { View,Text, ImageBackground, Dimensions,Image,Button,TouchableOpacity,Alert, StyleSheet } from 'react-native'
import * as CustomIcon from '../CustomBar/InterestIcons'
import { collection, doc,getDoc, getDocs,orderBy,query, where,deleteDoc } from 'firebase/firestore';
import { storage,db } from '../../firebase';
import { AuthContext } from '../../navigation/Routes';
import { getDownloadURL,ref,deleteObject } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { SharedElement } from 'react-navigation-shared-element';


const deviceHeight=Dimensions.get('window').height
const deviceWidth=Dimensions.get('window').width
export const ShowImage =(props) => {//show image when user clicks
  const navigation = useNavigation();
  const {userExists} = useContext(AuthContext);  
  const [deleted, setDeleted] = useState(false);//delete post
  const [showAlert, setShowAlert]=useState(false)//show alert if user wants to delete post
  const [showAlert2, setShowAlert2]=useState(false)//show alert if delete was success
  const [alertMes, setAlertMes]=useState('')
  const [alertTitle, setAlertTitle]=useState('')
  const handleDelete = (postId) => {
    console.log('enter')
    setAlertMes('Are you sure?')
    setShowAlert(true)
    setAlertTitle('Delete post')
    
  };
  const logUser=props.route.params.logUser//takes the image that the user has clicked with the help of routes.params and passed it in the image value
  const deletePost =async (postId) => {//delete image
    const docRef = doc(db, "posts", postId);
    await getDoc(docRef)
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();
          
          if (postImg != null) {
            const imageRef= ref(storage, `files/${postImg}`)

            deleteObject(imageRef)//delete image from firebase
              .then(() => {
                console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreData(postId);
              })
              .catch((e) => {
                console.log('Error while deleting the image. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const deleteFirestoreData = (postId) => {
    const docRef = doc(db, "posts", postId);
    setShowAlert(false)

    deleteDoc(docRef)
      .then(() => {
        setShowAlert(false)
        setShowAlert2(true)
        setDeleted(true);
      })
      .catch((e) => console.log('Error deleting posst.', e));
  };

 

  
  useEffect(() => {
    if(logUser==true){
      props.navigation.setOptions({//show icon in the navigatorBar
        headerRight: () => (
          <TouchableOpacity testID='TrashBin' onPress={()=>handleDelete(image.id)}>
            <CustomIcon.Trash style={{paddingRight:'5%'}} size={30} color={'#B14AB9'}/>
          </TouchableOpacity> 

        ),
      });
    }
      
      setDeleted(false);
  }, [deleted]);
  
  const image=props.route.params.image//takes the image that the user has clicked with the help of routes.params and passed it in the image value

  return (
    <View style={{height:'100%',backgroundColor:'#D6DCF2'}}>
      <SharedElement id={`item${image.id}`}>
        <Image source={{uri:image.showImage}} style={styles.image}/>
      </SharedElement>
      <AwesomeAlert //show aler if user wants to delete that post
        show={showAlert}
        showProgress={false}
        title='Delete post'
        message='Are you sure?'
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, delete it"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setShowAlert(false)
        }}
        onConfirmPressed={() => {
          deletePost(image.id)
        }}
      />
      <AwesomeAlert //if post deleted successfully
        show={showAlert2}
        showProgress={false}
        title='Your post '
        message='has been deleted!'
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Ok"
        confirmButtonColor="#B14AB9"
        contentContainerStyle={styles.contentContainerStyle}
        confirmButtonTextStyle={styles.confirmButtonText}
        confirmButtonStyle={styles.confirmButton}
        titleStyle={{fontSize:20}}
        onCancelPressed={() => {
          setShowAlert(false)
        }}
        onConfirmPressed={() => {
          navigation.navigate('ProfileScreen')
        }}
      />
    </View>
  )
}
ShowImage.sharedElements = (props) => {
  const image=props.route.params.image//takes the image that the user has clicked with the help of routes.params and passed it in the image value
console.log(`item.${image.id}`)
  return [
    {
      id: `item.${image.id}`,
      animation: 'move',
      resize: 'clip',
    },
    
  ]
}

const styles=StyleSheet.create({
  image:{
    height:deviceHeight*0.70, 
    width:deviceWidth,
    alignSelf:'center',
    marginTop:'10%',
    borderRadius:10,
  },
  contentContainerStyle:{
    width:'60%',
    height:'25%',
    marginBottom:'10%',
    borderRadius:10
  },
  confirmButtonText:{
    alignItems:'center', 
    alignSelf:'center',
    fontSize:20
  },
  confirmButton:{
    width:'30%',
    height:'90%',
    borderRadius:10
  }
  
})
