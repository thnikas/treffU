import React, { useState, useEffect,useContext } from 'react';
import { FlatList, Text, View,Image,ActivityIndicator } from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import * as geolib from 'geolib';
import Card from './Card'
import { db } from '../../firebase';
import {  doc,getDoc } from 'firebase/firestore';
import {AuthContext} from '../../navigation/Routes';
import AwesomeAlert from 'react-native-awesome-alerts';


const PlacesList = () => {//where the places are shown in the cards
  
  const [places, setPlaces] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [checkStatus,setCheckStatus]=useState(false)
  const {userExists} = useContext(AuthContext);  
  const [showAlert, setShowAlert]=useState(false)
  const [alertmes, setAlertMes]=useState('Something went wrong please try again.')
  const [loading, setLoading] = useState(true);

  const checkUserStatus=async()=>{//check if user is logged in
    const userRef=doc(db,"users",userExists.uid)
    await getDoc(userRef).then((docSnapshot)=>{
      if(docSnapshot.exists()){
        if(docSnapshot.data().checkIn!==null){
          setCheckStatus(true)
          console.log(docSnapshot.data().checkIn)

        }
      }
    })
  }
  const startLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };
  useEffect(() => {
    startLoading()
    Geolocation.getCurrentPosition(//finds user current position
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => setShowAlert(true),setAlertMes('Gps is not enabled')
      ,
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );
    checkUserStatus()
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const fetchData = async () => {//get the data from api places 
       
      };
      fetchData();
    }
  }, [latitude, longitude]);

  const renderItem = ({ item }) => (
    <View>
      {item.photos && (//render the cards
        
        <Card title={item.name}  id={item.place_id} imageUrl={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=AIzaSyDRMF53T96B-sWIA1W7gutV1eMmVGD_xIc`}/>
      )}
    </View>
  );
  return (
    <View style={{backgroundColor:'#D6DCF2'}}>
      {loading?<View>
        <ActivityIndicator  size={40} color='#B14AB9' style={{paddingTop:'70%'}} />
      </View>: <View ><FlatList //list that the places are shown
        data={places}
        renderItem={renderItem}
        keyExtractor={(item) => item.place_id}
        ItemSeparatorComponent={() => <View style={{paddingTop:'40%'}} />}    
      />
       <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title='Location error'
          message={alertmes}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={false}
          showConfirmButton={true}
          contentContainerStyle={{width:'60%',height:'25%',marginBottom:'10%',borderRadius:10}}
          confirmButtonTextStyle={{alignItems:'center', alignSelf:'center',fontSize:20}}
          confirmButtonStyle={{width:'30%',height:'75%',borderRadius:10,marginBottom:'5%'}}
          confirmText="Ok"
          confirmButtonColor="#B14AB9"
          onConfirmPressed={() => {
            setShowAlert(false)
          }}
        /></View>}
      
    </View>
    
  );
};

export default PlacesList;
