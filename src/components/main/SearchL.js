import React, { useState,useRef, useEffect,useCallback,useContext } from 'react';
import { StyleSheet,  View, Dimensions, Image, Animated, PanResponder,TouchableOpacity,ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db,storage } from '../../firebase';
import { arrayUnion, doc,getDoc,updateDoc } from 'firebase/firestore';
import { getDownloadURL,ref } from 'firebase/storage';
import {AuthContext} from '../../navigation/Routes';
import CustomText from '../custom/CustomText';


const SCREEN_HEIGHT0 = Dimensions.get('window').height*0.1
const SCREEN_HEIGHT = Dimensions.get('window').height*0.8
const SCREEN_WIDTH = Dimensions.get('window').width
const SearchL=()=>{

  const {userExists} = useContext(AuthContext);

  const navigation=useNavigation()
  const [likedUsers,setLikedUsers]=useState([])
  const [dislikedUsers,setDislikedUsers]=useState([])
  const [id, setId]=useState(null)
  const [currentIndex,setCurrentIndex]=useState(0)
  const [userImages, setUserImages] = useState([]);
  const [showIndicator, setShowIndicator]=useState(true)
  const [currentId, setCurrentId]=useState(null)
  const updatedId=useRef(null)
  const position = useRef(new Animated.ValueXY()).current;//get the current position of the card
  const checkUserCheckIn=async()=>{//get place that the user has checked in
    const userRef=doc(db,"users",userExists.uid)
    await getDoc(userRef).then((docSnapshot)=>{
      if(docSnapshot.exists()){
        setId(docSnapshot.data().checkIn)
      }
    })
  }
  const userDislike=async()=>{//function that sets in the firebase if the user selects dislike or like

    const userRef=doc(db,"users", userExists.uid)
      await updateDoc(userRef,{
        ['usersList.disliked']:arrayUnion(currentId)
      })
      .then(() => {
        console.log('User Updated!');
      })
  }
  const userLike=async()=>{//function that sets in the firebase if the user selects dislike or like

    const userRef=doc(db,"users", userExists.uid)
      await updateDoc(userRef,{
        ['usersList.liked']:arrayUnion(currentId),
      })
      .then(() => {
        console.log('User Updated!');
      })
      const userRef2=doc(db,"users",currentId)
      await updateDoc(userRef2,{
        ['request']:arrayUnion(userExists.uid)
      })
  }
  const moveLike=(gestureState)=>{
    userLike()
    if(currentIndex+1<userImages.length){
    setCurrentId(userImages[currentIndex+1].id)}//changes the currentid of the user that is been showed
    Animated.spring(position, {//animates the card
      toValue: { x: SCREEN_WIDTH + 100, y: gestureState },
      useNativeDriver: true
    }).start(() => {
      setCurrentIndex(currentIndex + 1);//change the index number so the next card can be shown
      position.setValue({ x: 0, y: 0 });
    });
  }
  const moveDislike=(gestureState)=>{
    userDislike()
    if(currentIndex+1<userImages.length){
      setCurrentId(userImages[currentIndex+1].id)
    }

    Animated.spring(position, {
    toValue: { x: -SCREEN_WIDTH - 100, y: gestureState },
    useNativeDriver: true

    })
    .start(() => {
      setCurrentIndex(currentIndex + 1);
      position.setValue({ x: 0, y: 0 });
    });
  }
  const panResponder=
    PanResponder.create({//checks where the user is moving the card and executes the proper function
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
       
        if(currentIndex<userImages.length){
          if (gestureState.dx > 120) {//if swaps right
            moveLike(gestureState.dy)
          } else if (gestureState.dx < -120) {
            moveDislike(gestureState.dy)
          } else {
            Animated.spring(position, {
              toValue: { x: 0, y: 0 },
              friction: 4,
              useNativeDriver: true
            }).start();
          }
        }else{
          if (gestureState.dx > 120) {
            
            Animated.spring(position, {
              toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
              useNativeDriver: true
            }).start(() => {
              setCurrentIndex(currentIndex + 1);
              position.setValue({ x: 0, y: 0 });
            });
          } else if (gestureState.dx < -120) {
            Animated.spring(position, {
              toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
              useNativeDriver: true
  
            }).start(() => {
              setCurrentIndex(currentIndex + 1);
              position.setValue({ x: 0, y: 0 });
            });
          } else {
            Animated.spring(position, {
              toValue: { x: 0, y: 0 },
              friction: 4,
              useNativeDriver: true
            }).start();
          }
        }
       
      }
    })
  
  
  const rotate = position.x.interpolate({//how the image will be rotated
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-30deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  });

  const rotateAndTranslate = {
    transform: [
      {
        rotate: rotate
      },
      ...position.getTranslateTransform()
    ]
  }
  const likeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp'
 })
  const dislikeOpacity  = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp'
  })
  const nextCardOpacity =position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp'
  })
  const nextCardScale =position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp'
  })
  const getUserImages = async() => {//get current user data from firebase
    let array = [];
    let disliked=[]
    let liked=[]
    const array2=[]
    const docRef = doc(db, "checkIn", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      
    const promises = docSnap.data().ids.map(async (userId) => {//shows all the users that have checked in in this location
    const userRef = doc(db, "users", userId);//gets the user
    const querySnapshot = await getDoc(userRef);
    if(userExists.uid==userId){//checks if this user is the logged in user
      setDislikedUsers(querySnapshot.data().usersList.disliked)//set the disliked with the disliked users in the array
      setLikedUsers(querySnapshot.data().usersList.liked)
      liked=querySnapshot.data().usersList.liked//sets the liked users in the value so it can be used in this function because the state can not be refreshed
      disliked=querySnapshot.data().usersList.disliked
    }else{//if not logged in user gets user photo an put it in the array that is used so the cards can be showned
      const userImg = querySnapshot.data().userImg;
      const url = await getDownloadURL(ref(storage, `profImg/${userImg}`));
      array.push({ id:userId,image: url });
    }

    });
    await Promise.all(promises);//wait so all can be executed
    array.map((item)=>{//check if in the array are existing ids that the users has in like or dislike array
      if (!liked.some((likedItem) => likedItem === item.id) && !disliked.some((dislikedItem) => dislikedItem === item.id)){
        array2.push({id:item.id,image:item.image})
      }
    
    })

    if(array2.length===0){//if are not existing other users
      setCurrentId(1)
    }else{
      setCurrentId(array2[0].id)//change the currentid that menas to change the image that is been showned

    }
    setShowIndicator(false)//hide the indicator
    } else {
      console.log("No such document!");
    }
    setUserImages(array2)//make the array of images
  };

  useEffect(()=>{

    checkUserCheckIn()//execute the function that checks where the user has checked in

  },[])
  useEffect(()=>{
    if(id!==null){
      getUserImages()//execute the function that shows images
    }
  },[id])

  const  renderUsers=()=>{//shows the swap images component
    return userImages.map((item, i) => {
      if(i<currentIndex){
        return null
      }else if(i==currentIndex){
        updatedId.current=item.id
        return (
          <Animated.View//how the animation will be moved
          {...panResponder.panHandlers}
          key={item.id} style={[rotateAndTranslate, { height: SCREEN_HEIGHT - 110, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>
          <Animated.View style={{ opacity: likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
            <CustomText style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</CustomText>

          </Animated.View>

          <Animated.View style={{ opacity: dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
            <CustomText style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</CustomText>

          </Animated.View>

          <Image
            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
            source={{ uri:  item.image}} />

        </Animated.View>
        );
      }else{
        return (
          <Animated.View

            key={item.id} style={[{
            opacity: nextCardOpacity,
            transform: [{ scale: nextCardScale }],
            height: SCREEN_HEIGHT - 110, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
        }]}>
        <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
          <CustomText style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</CustomText>

        </Animated.View>

        <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
          <CustomText style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</CustomText>

        </Animated.View>

        <Image
          style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
          source={{ uri:  item.image}} />

      </Animated.View>
        );
      }
      
    }).reverse();
  }
  return (
    showIndicator
      ?//if not the data is loaded
        <View style={{alignContent:'center',paddingTop:'65%',}}>
          <ActivityIndicator size={50} color='#B14AB9' />
        </View>
      : 
        <View style={{ flex: 1,backgroundColor:'#D6DCF2' }}>
          <View style={{ height: '5%' }} />
            <View style={{ flex: 1 ,}}>
              <Animated.View
                style={[
                  {
                    height: SCREEN_HEIGHT - 70,
                    width: SCREEN_WIDTH,
                    padding: 10
                  }
                ]}
              >
                {renderUsers()}
              </Animated.View>
              {userImages.length>0?<View style={styles.containerImages}>
                  <TouchableOpacity  onPress={()=>moveLike(-60)}/**button heart that likes the user */>
                    <View>
                      <Image  style={styles.image} source={require('../../../assets/heart1.png')}/>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={()=>{navigation.navigate('ProfileSee', {updatedId})}}>
                    <View>
                      <Image  style={styles.image} source={require('../../../assets/eye7.png')}/>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={()=>moveDislike(-60)}>
                    <View>
                      <Image  style={styles.image} source={require('../../../assets/close3.png')}/>
                    </View>
                  </TouchableOpacity>
                </View>:null}
            </View>
        </View>
   
  );
    
}

export default SearchL;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },button2: {
    width: 70,
    height: 70,
    borderRadius: 70,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    marginLeft: '10%',
    
  },
  
  borderGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderWidth: 3,
    borderRadius: 70,
    zIndex: -1,
    background: 'linear-gradient(to right, #00cc66, #00cc66)',
  },
  image:{
    width:80,
    height:80,
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
    
  },
  containerImages:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:'-10%'
  }
  });