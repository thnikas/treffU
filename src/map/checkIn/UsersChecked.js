import React,{useEffect,useState} from 'react';
import {Text,View,StyleSheet,Animated,TouchableWithoutFeedback} from 'react-native'
import { db,storage } from '../../firebase';
import { collection, doc,getDoc, getDocs,orderBy,query, where } from 'firebase/firestore';
import { getDownloadURL,ref } from 'firebase/storage';

export async function UsersChecked(id){//gets the data of the users that have made check in in the same place as the user
    
    const getUserImage=async(userId)=>{

      const userRef=doc(db,"users", userId)
      const querySnapshot = await getDoc(userRef);
      const userImg=querySnapshot.data().userImg
      getDownloadURL(ref(storage, `profImg/${userImg}`))
      .then((url)=>{
        setUsers(...users,url)
      })
        
      }
      const getPlace = async() => {//get cuurent user data from firebase
      let array = [];

      const docRef = doc(db, "checkIn", id);
      const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const promises = docSnap.data().ids.map(async (userId) => {
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

    return array
  };
  getPlace()
    
    
}


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
    },
  });
