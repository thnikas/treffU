import React,{useEffect,useContext,useState} from 'react';
import { Dimensions, StatusBar, StyleSheet, View,Text,TouchableOpacity,ScrollView,ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomText from '../custom/CustomText';
import Svg, { Path } from 'react-native-svg';
import {Back4} from '../../components/CustomBar/InterestIcons'
import UserImageSee from '../custom/profileSee/UserImageSee';
import {AuthContext} from '../../navigation/Routes';
import CardIcon from '../custom/LandingCard';
import {  doc,getDoc,  } from 'firebase/firestore';
import { db,storage } from '../../firebase';
import { getDownloadURL,ref } from 'firebase/storage';
import { FlatList } from 'react-native-gesture-handler';
import { FlatGrid } from 'react-native-super-grid';
const FriendList=(props)=>{
  const startLoading = () => {//loading that shows the indicator
    setTimeout(() => {
    setLoading(false);
    }, 5000);
  };
  const {userExists} = useContext(AuthContext);
  const [friends,setFriends]=useState([])
  const [loading, setLoading] = useState(true);

  const getFriends=async()=>{//create  friends array
    let array = [];

    const docRef = doc(db, "users", userExists.uid);
    const docSnap = await getDoc(docRef);
      
    if (docSnap.exists()) {
      const promises = docSnap.data().friends.map(async (userId) => {
        const userRef = doc(db, "users", userId);
        const querySnapshot = await getDoc(userRef);
        const userImg = querySnapshot.data().userImg;
        const url = await getDownloadURL(ref(storage, `profImg/${userImg}`));
        array.push({ id:userId,image: url,uname:querySnapshot.data().uname });
      });
      await Promise.all(promises);

    } else {
      console.log("No such document!");
    }
    setFriends(array)
  }
  const bottomWave=//wave at bottom
    (<View style={styles.bottom}>
        <View style={styles.box}>
          <Svg
            height={200}
            width={Dimensions.get('screen').width}
            viewBox="0 0 1440 320"
            style={styles.bottomWavy}
          >
            <Path
              fill="#D6DCF2"
              d='M0,64L40,96C80,128,160,192,240,202.7C320,213,400,171,480,149.3C560,128,640,128,720,154.7C800,181,880,235,960,218.7C1040,203,1120,117,1200,74.7C1280,32,1360,32,1400,32L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z'
            />
          </Svg>
        </View>
      </View>)

  useEffect(() => {
    startLoading()

    getFriends()
    props.navigation.setOptions({//show icon in the navigatorBar
      
      headerRight: () => (
        <View style={styles.container}>
          <View style={{right:'190%',position:'absolute',zIndex:10,paddingTop:10}}>
            <TouchableOpacity  onPress={()=>props.navigation.navigate("Landing")}>
              <Back4 size={30}  color='#B14AB9' />
            </TouchableOpacity>
          </View> 
          <Svg //wave at the top
            height={200}
            width={Dimensions.get('screen').width}
            viewBox="0 0 1440 320"
            style={styles.topWavy}
          >
            <Path
              fill="#D6DCF2"
              d="M0,0L48,32C96,64,192,128,288,144C384,160,480,128,576,138.7C672,149,768,203,864,208C960,213,1056,171,1152,176C1248,181,1344,235,1392,261.3L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
          </Svg>
          <View style={{position:'absolute',zIndex:11,top:'80%',left:'80%'}}> 
            <UserImageSee myData={userExists.uid} customStyles={{borderColor:'#ffff',borderWidth:2}} />
          </View>
        </View>
  
      ),
    });
    
  }, [loading]);
    return (

      <View style={{flex:1,backgroundColor:'#ffff'}}>
        {!loading?
        <FlatGrid //list that show the card of friends
          itemDimension={130}
          data={friends}
          style={styles.gridView}
          spacing={1}
          renderItem={({ item }) => (
            <View style={[styles.itemContainer]}>
              <CardIcon userCard={true} //card component
              iconSource={<UserImageSee myData={item.id} customStyles={styles.imageStyle} />} title={item.uname} 
              />
            </View>
          )}
        />: 
        <View style={{alignContent:'center',paddingTop:'50%'}}>
          <ActivityIndicator size={40} color='#B14AB9' />
        </View>
        }
 
        {bottomWave}
      </View>
    );
     
}

export default FriendList;
const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridView: {
    backgroundColor:'#ffff',
    flex: 1,
  },
  itemContainer: {
    borderRadius: 5,
    height: 250,
    paddingBottom:'10%'
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  topWavy:{top:'10%'},
  bottom: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    bottom: -35,
  },
  box: {
    backgroundColor: '#D6DCF2',
    height: 80,
    bottom:-40
  },
  bottomWavy: {
    position: 'absolute',
    bottom: -5,
  },
  imageStyle:{ 
    width: 93, 
    height: 93, 
    top: '39%' 
  }
  });
