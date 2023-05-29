import { useState,useContext,useEffect } from "react";
import { TouchableOpacity, StyleSheet, Text,FlatList,View,Image } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import { MenuProvider, Menu, renderers, MenuTrigger, MenuOptions, MenuContext } from "react-native-popup-menu";
import {AuthContext} from '../../navigation/Routes';
import { arrayUnion, doc,getDoc,updateDoc,arrayRemove } from 'firebase/firestore';
import { db,storage } from '../../firebase';
import { getDownloadURL,ref } from 'firebase/storage';
import { useIsFocused  } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomText from './CustomText';

const ListItem = ({ item, onDelete, onCheck,profileSee }) => {//the list item that shows the used that have sent friend request
  
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={()=>profileSee(item.id)}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      </TouchableOpacity>
     
      <View style={styles.itemButtonsContainer}>
        <TouchableOpacity onPress={() => onCheck(item.id)} style={styles.itemButton}>
          <MaterialIcons name="check" size={25} color="#28a745" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.itemButton}>
          <MaterialIcons name="close" size={25} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const NotificationIcon = () => {
  const navigation = useNavigation()
  const {userExists} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const startLoading = () => {
    setTimeout(() => {
    setLoading(false);
    }, 5000);
  };
  const getUsers = async() => {//get curent user data from firebase
    let array = [];

    const docRef = doc(db, "users", userExists.uid);
    const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const promises = docSnap.data().request.map(async (userId) => {
      const userRef = doc(db, "users", userId);
      const querySnapshot = await getDoc(userRef);
      const userImg = querySnapshot.data().userImg;
      const url = await getDownloadURL(ref(storage, `profImg/${userImg}`));
      array.push({ id:userId,image: url });
    });

    await Promise.all(promises);
  } else {
    console.log("No such document!");
  }
  setItems(array)
  //return array
};
  const [items, setItems] = useState([]);
  const [open,setOpen]=useState(false)
  const handleDelete = async(id) => {//update if user press X
    const userRef=doc(db,"users", userExists.uid)
      await updateDoc(userRef,{
        ['request']:arrayRemove(id)
      })
      .then(() => {
        console.log('User Updated!');
      })
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleCheck = async(id) => {//update if user accepts
    
   const userRef=doc(db,"users", userExists.uid)
      await updateDoc(userRef,{
        ['friends']:arrayUnion(id),
        ['request']:arrayRemove(id)
      })
      .then(() => {
        console.log('User Updated!');
      })
      const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };
  const profileSee=(updatedId)=>{
    setOpen(false)
    navigation.navigate('ProfileSee', {updatedId})
  }

  useEffect(()=>{
    getUsers()
    startLoading()
      navigation.addListener("focus", () => setLoading(!loading));

  },[loading])
  
  return (
     isFocused?
     <Menu
        renderer={renderers.Popover}
        rendererProps={{ anchorStyle: styles.anchorStyle, placement: 'bottom' }}
        style={styles.menu}
        menuId="menuId" // Add a menuId prop to the Menu component
      >
        <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity }}>
          {items.length>1? <MaterialIcons style={styles.icon} name="notification-important" size={35} color='#B14AB9' />
          : <MaterialIcons style={styles.icon} name="notifications" size={35} color='#B14AB9' />}
        </MenuTrigger>
        
        <MenuOptions
          customStyles={{
            optionsContainer: {
              right:'10%',
              borderRadius:10,
            },
          }}>{items.length>0?
         <FlatList
          data={items}
          renderItem={({ item }) => 
            <ListItem item={item} onDelete={handleDelete} onCheck={handleCheck} profileSee={profileSee} />}
          keyExtractor={(item) => item.id}
        />:
        <CustomText>No News</CustomText>
        }
        </MenuOptions>
      </Menu>:null
   
      
  )
}

export default NotificationIcon;

const styles = StyleSheet.create({
  icon: {
    flexDirection: 'row', // Add a flexDirection style to the TouchableOpacity
  },
  menu: {},
  container: {
    flex: 1,
    alignItems: "center",
    paddingRight:'10%'
  },
  anchorStyle: {
    backgroundColor: '#A4A0D5',
    left:48
  },
  text: {
    color: 'black',
    marginHorizontal: '2%',
    fontFamily: 'sans-serif-medium'
  }, 
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  itemButtonsContainer: {
    flexDirection: 'row',
  },
  itemButton: {
    marginHorizontal: 5,
  },
  icon:{
    paddingRight:'15%',
    paddingLeft:'10%'
  }
})
