import React, {useContext, useEffect, useState,useRef} from 'react';
import {AuthContext} from '../navigation/Routes';
import {Text,View,StyleSheet,Image, Dimensions, TouchableOpacity,Animated} from 'react-native'
import { collection, doc,getDoc, getDocs,orderBy,query, where } from 'firebase/firestore';
import { storage,db } from '../firebase';
import { getDownloadURL,ref } from 'firebase/storage';
import { useIsFocused  } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import * as InterestIcon from './CustomBar/InterestIcons'
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';

const deviceHeight=Dimensions.get('window').height
const deviceWidth=Dimensions.get('window').width

const PostCard = ({item,  onPress}) => {
  const navigation = useNavigation();
    const {userExists} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [imageUrl, setImageUrl]=useState([])
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();
    const fadeAnim = useRef(new Animated.Value(0)).current;//animation that show the images

    const fadeIn = () => {
      // Will change fadeAnim value to 1 in 5 seconds
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true
      }).start();
    };
    const fetchPosts = async () => {//show images from firestore
      try {
        const list = [];
        const q = query(collection(db, "posts"), where("userId", "==", userExists.uid),orderBy("postTime",'desc'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const {userId,post,postImg,postTime,likes,comments,} = doc.data();
          list.push({id: doc.id,userId,userName: 'Test Name',postTime: postTime,post,postImg,
            liked: false,likes,comments,
          });
        });
        setPosts(list);
        if (loading) {
          setLoading(false);
        }
  
      } catch (e) {
        console.log(e);
      }
    };
    const getUrls=async()=>{//get the image urls for firebase storage
      try{
        posts.map((value)=>
          getDownloadURL(ref(storage, `files/${value.postImg}`))
          .then((url)=>{
            setImageUrl((imageUrl)=>[...imageUrl, {showImage:url,postTime:value.postTime['seconds'],id:value.id}])         
          })
            
        )
      }catch(e){
        console.log(e)
      }
    }  
  

    const getUser = async() => {//get curent user data from firebase
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
    useEffect(()=>{
      getUser();
      fetchPosts();
      getUrls()
      if(!loading){
        fadeIn()
      }
      
    },[loading])
  return (
    loading? <SkeletonPlaceholder backgroundColor='#CDCBDF' >
      <View style={{flexDirection: 'row', alignItems: 'center',paddingBottom:'20%' }}>
        <View style={{width:deviceWidth/3-6,height:deviceHeight/3,borderRadius:10,margin:2}} />
        <View style={{width:deviceWidth/3-6,height:deviceHeight/3,borderRadius:10,margin:2}} />
        <View style={{width:deviceWidth/3-6,height:deviceHeight/3,borderRadius:10,margin:2}} />
      </View>
      
    </SkeletonPlaceholder>:
       
    <Animated.ScrollView
      use
      style={[
        styles.fadingContainer,
        {
          // Bind opacity to animated value
          opacity: fadeAnim
        }
      ]}
    >
      <View style={{display:'flex', flexDirection:'row', flexWrap:'wrap', paddingTop:'10%'}}>
        {posts.length>0?imageUrl.sort((a, b) => b.postTime - a.postTime).map((image,index)=>(
          <TouchableOpacity key={index} onPress={()=>{onPress.navigate('ShowImage', {image,logUser:true})}}>
            <SharedElement id={`item.${image.id}`}>
            <Image  source={{ uri: image.showImage }} style={{width:deviceWidth/3-6,height:deviceHeight/3,borderRadius:10,margin:2}}/>

            </SharedElement>
          </TouchableOpacity>
        )):<TouchableOpacity style={{alignContent:'center',alignSelf:'center',alignItems:'center'}} onPress={()=>navigation.navigate('AddPost')}>
            <InterestIcon.AddImage3 size={90}/>
        </TouchableOpacity>
        }
      
      </View>
    </Animated.ScrollView>

  )
    
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  fadingContainer: {
    marginTop:'30%'
  },
  fadingText: {
    fontSize: 28
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: "space-evenly",
    marginVertical: 16
  }
});