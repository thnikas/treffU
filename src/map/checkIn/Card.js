import { useState,useContext,useEffect } from 'react';
import { FlatList, Text, View,Image,StyleSheet,Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import AwesomeAlert from 'react-native-awesome-alerts';
import {AuthContext} from '../../navigation/Routes';
import { FieldValue, arrayUnion, collection, doc,getDoc, setDoc, updateDoc,getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import CustomText from '../../components/custom/CustomText';
const Card = ({ title, description, imageUrl,id }) => {
  const [buttonTick, setButtonTick] = useState(false);
  const [showAlert, setShowAlert]=useState(false)//show alert if user wants to delete post
  const [showAlertCheck, setShowAlertCheck]=useState(false)
  const {userExists} = useContext(AuthContext);  

  const checkUserStatus=async()=>{//checks if the user has already checked in and changes the tick in the right card
    const userRef=doc(db,"users",userExists.uid)
    const docRef = await getDocs(collection(db, 'checkIn'))
    const userDatasnap=await getDoc(userRef)
    if(userDatasnap.data().checkIn!==null){
      if(userDatasnap.data().checkIn==id){
        setButtonTick(true)
      }
    }
    
   
    
  }
    function cutString(s){//cuts the string size
      if(s.length>10){
        return s.slice(0,15)+"..."
      }else{
        return s
      }
    }
    
    const checkIn = async () => {
      const docRef = doc(db, "checkIn", id)
      const userRef=doc(db,"users",userExists.uid)
      const userDatasnap=await getDoc(userRef)
      if(userDatasnap.data().checkIn){//shows alert check
        setShowAlertCheck(true)
        return
      }
      setButtonTick(true)//change icon of the card
      
      await getDoc(userRef).then((docSnapshot)=>{//update the user firestore with the checked place
        if(docSnapshot.exists()){
          updateDoc(userRef,{
            checkIn:id,
            usersList:{liked:[],disliked:[]}
          }).catch((error) => {
            console.error("Error updating document: ", error);
          });
        }
      })
      
      await getDoc(docRef)//check if the user exist in the checkin list and if not it updates the list
        .then((docSnapshot) => {
          if (!docSnapshot.exists()) {
            setDoc(docRef, {
              ids: [userExists.uid]
            })
          } else {
            const existingIds = docSnapshot.data().ids || [];
            if (!existingIds.includes(userExists.uid)) {
              updateDoc(docRef, {
                  ids: [...existingIds, userExists.uid]
                })
                .then(() => {
                  console.log("Document successfully updated!");
                })
                .catch((error) => {
                  console.error("Error updating document: ", error);
                });
            }
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
        });
        
    }
    const cancelCheckIn=async()=>{//when tick is clicked trigger this function
      setShowAlert(false)
      setButtonTick(false)
      const docRef=doc(db,"checkIn",id)
      const userRef=doc(db,"users",userExists.uid)

      try {
        // Get the document and check if the user's uid exists in the 'ids' array
        const docSnap = await getDoc(docRef);
        const docSnap2=await getDoc(userRef)
        const data = docSnap.data();
        const data2=docSnap2.data()
        const ids = data.ids || [];
        const index = ids.indexOf(userExists.uid);
    
        // If the user's uid exists in the array, remove it and update the document
        if (index !== -1) {
          ids.splice(index, 1);
          await updateDoc(docRef, { ids });
          await updateDoc(userRef,{checkIn:null})
          console.log("Document successfully updated!");
        } else {
          console.log("User's uid does not exist in the 'ids' array.");
        }
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
    function buttonChange(){//change the button
      if(buttonTick==false){
        return(
          <TouchableOpacity onPress={()=>checkIn()}  style={styles.button}>
          <CustomText style={styles.button_text}>Check in </CustomText>
          <Icon style={styles.button_icon} name='check' size={20} color='#ffff'/>
       </TouchableOpacity>)
      }else{
        return(<TouchableOpacity onPress={()=>setShowAlert(true)}>
          <View style={styles.button2}>
            <Feather name="check" size={32} color="white" />
          </View>
        </TouchableOpacity>)
      }
    }
    useEffect(() => {
      
      checkUserStatus()
    }, []);
    const newTitle=cutString(title)//change the shown title
    return (
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Image style={styles.image} source={{uri:imageUrl}} />
          <CustomText style={styles.title}>{newTitle}</CustomText>
          {buttonChange()}
          <AwesomeAlert //when user wants to cancel the check in
            contentContainerStyle={styles.alertBox}
            show={showAlert}
            showProgress={false}
            title='Cancel Check in'
            message='Are you sure?'
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No"
            confirmText="Yes, cancel"
            confirmButtonColor="#DD6B55"
            cancelButtonStyle={styles.alertCancelButton}
            cancelButtonTextStyle={styles.alertCancelButtonText}
            onCancelPressed={() => {
              setShowAlert(false)
            }}
            onConfirmPressed={() => 
              cancelCheckIn()
            }
          />
          <AwesomeAlert //when user tries to check in 2 places
              contentContainerStyle={styles.alertBox}
              show={showAlertCheck}
              showProgress={false}
              title="Check in not possible!"
              message="Please first 'check out'"
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showConfirmButton={true}
              
              confirmText="Ok"
              confirmButtonColor="#DD6B55"
              
            
              onConfirmPressed={() => 
                setShowAlertCheck(false)
              }
          />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    card: {
      height:115,
      width:256.2,
      elevation:10,
      backgroundColor: '#D0CCEA',
      borderRadius: 8,
      shadowColor: '#000000',
      shadowOpacity: 0.2,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      marginTop:'5%',
     
      marginHorizontal:10,
      shadowRadius: 4,
      position:'absolute',
      flexDirection: 'row',
      alignSelf:'center',
      
    },
    image: {
      width: 90,
      height: 90,
      resizeMode: 'cover',
      borderRadius: 90/2,
      marginBottom:10,
      position:'absolute',
     marginLeft:-30 ,
     alignSelf:'flex-start',
      marginTop:3
    },
    textContainer: {
      flex: 1,
      padding: 16,
      alignContent:'center',
      alignItems:'center',
      alignSelf:'center'
    },
    title: {
      fontSize: 15,
      fontWeight: '800',
      marginBottom: 8,
      fontFamily:'Lora',
      fontStyle:'normal',
      textAlign:'center',
      alignSelf:'center',
      width:180,
      paddingLeft:'13%',
      color:'#605f6b',
    },
    button: {
      fontSize: 14,
      backgroundColor:'#363939',
      borderRadius:5,
      width:117,
      height:36,
      alignSelf:'center',
      alignContent:'center',
      marginLeft:'20%',
      //marginTop:'2%'
    },
    button_text:{
      fontFamily:'Inter',
      fontStyle:'normal',
      fontWeight:'500',
      textAlign:'center',
      color:'#ffff',
      paddingTop:'5%',
      fontSize:14,
      paddingRight:'9%'
    },
    button_icon:{
      position:'absolute',
      alignSelf:'flex-end',
      paddingTop:'3%',
      paddingRight:'10%'
    },
    button2:{
      width: 36,
      height: 36,
      borderRadius: 25,
      backgroundColor: '#00cc66',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf:'center',
      alignContent:'center',
      marginLeft:'10%'
    },
    alertBox:{
      color:'#D0CCEA'
    },
    alertCancelButton:{
      width:'25%',
      alignContent:'center',
      alignSelf:'center'
    },
    alertCancelButtonText:{
      alignContent:'center',
      alignItems:'center',
      alignSelf:'center'
    }
  });

export default Card;

