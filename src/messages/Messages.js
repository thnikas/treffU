import React,{useContext, useState, useEffect} from 'react';
import {Text,View,StyleSheet,FlatList,TouchableOpacity,Image,ActivityIndicator} from 'react-native'
import {AuthContext} from '../navigation/Routes';
import { db,storage } from '../firebase';
import { collection, doc,getDoc, getDocs,orderBy,query, where,limit } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused  } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CustomText from '../components/custom/CustomText';
const Divider = () => <View style={styles.divider} />;

const Messages=(props)=>{

  const startLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  const navigation = useNavigation();
  const [users, setUsers] = useState([])
  const {userExists} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const getUsers = async ()=> {
    const list=[]
    const messages=[]
    const specificMessages=[]
    const docRef = doc(db, "users", userExists.uid);
    const docSnap = await getDoc(docRef);
    const friends=docSnap.data().friends
    if(friends.length>0){
      const friendsQuery = query(collection(db, "users"), where("uid", "in", friends));

      const querySnapshot = await getDocs(friendsQuery);
      querySnapshot.forEach((doc) => {
        const chatid = doc.data().uid > userExists.uid ? userExists.uid+"-"+doc.data().uid : doc.data().uid+"-"+userExists.uid   
        messages.push(chatid) //get last user messages
      });
  
      for(let i=0;i<messages.length;i++){
        const docRef=doc(db,"chats",messages[i])
        const colRef = collection(docRef, "messages")
        const q=query(collection(docRef, "messages"),orderBy('createdAt', 'desc'),limit(1))      
         
        await getDocs(q).then(function(querySnapshot){//get last message from each chat
          querySnapshot.forEach(function(doc){
            specificMessages.push(doc.data())
          })
        })  
      }
     
      querySnapshot.forEach((doc) => {
        let showMessage=''
        let hour=''
        let messageReaded=true
        specificMessages.forEach((moc)=>{
          if((moc.sentTo==doc.data().uid&&moc.sentBy==userExists.uid)||(moc.sentTo==userExists.uid&&moc.sentBy==doc.data().uid)){
            showMessage=moc.text//message text
            if(moc.sentTo==userExists.uid&&moc.sentBy==doc.data().uid){
              messageReaded=moc.readed//check if message has been readed
            }
            hour=moc.createdAt.toDate()//show hour
            hour=new Intl.DateTimeFormat('en-US', {year: '2-digit', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit',}).format(hour);
            hour=hour.toString()//change time from timestamp to normal date
          }
        })
        
        const {email,fname,uid,uname,userImg,imgUrl} = doc.data();
        list.push({id: doc.id,uid,fname:fname,uname:uname,email:email,userImg,imgUrl,//pust it to list and show it in the screen
                  showMessage:showMessage,showHour:hour,messageReaded:messageReaded
        })
      });
      setUsers(list)
    }

  }


  const getUser = async() => {//get logged user data from firestore
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
    getUsers()
    getUser()
    startLoading()
    props.navigation.addListener("focus", () => setLoading(!loading));//lose focus when leave screen so it can rerender when the user comes back with new messages

  },[loading])
    return(
      isFocused?
      !loading?
        <View style={{flex:1,}}>
        
           {users!==[]? 
           <View >
              <FlatList
                style={{borderRadius:10}}
                data={users}
                keyExtractor={(item)=>item.uid}
                renderItem={({item}) => (
                <TouchableOpacity style={{paddingBottom:'5%',marginBottom:10,borderRadius:5,borderColor:'black', paddingHorizontal:5}} onPress={() => navigation.navigate('Chats', {name: item.uname, uid: item.uid,url:item.imgUrl, logUserImg:userData.imgUrl})} >
                  <View>
                  <Image resizeMode="cover" style = {styles.roundImage} source = {{uri: item.imgUrl}}/>

                    <View>
                      {item.messageReaded==false? <FontAwesome style={{marginBottom:'16%',marginLeft:'75%',position:'absolute',marginTop:'-20%'}} 
                      color='#B14AB9' name='exclamation-circle' size={30}/>:null}
                    <View>                      
                  </View>

                  <CustomText style={{marginTop:'-20%',marginLeft:'25%',    
                  fontSize:18,color:'#221818'}}>{item.uname}</CustomText>
                  </View>
                  <View>
                    {item.messageReaded==false? 
                    <CustomText  ellipsizeMode="tail" numberOfLines={0.5}  
                      style={{marginTop:'-7%',marginLeft:'25%', fontWeight:'bold'}}>
                      {item.showMessage.substring(0,15)}{item.showMessage.length>15?<CustomText> ...</CustomText>:null}
                    </CustomText>: 
                    <CustomText ellipsizeMode="tail" numberOfLines={0.5}  
                      style={{marginTop:'-7%',marginLeft:'25%',color:'#5C5C5C'}}>
                      {item.showMessage.substring(0,15)}{item.showMessage.length>15?<CustomText> ...</CustomText>:null}</CustomText>}
                  </View>
                  
                  <View>
                    {item.messageReaded==false? 
                    <CustomText  style={{marginTop:'-7%',alignSelf:'flex-end',fontWeight:'bold',color:'#5C5C5C'}}>{item.showHour}</CustomText>: 
                    <CustomText  style={{marginTop:'-7%',alignSelf:'flex-end',    color:'#939393'}}>{item.showHour}</CustomText>}
                  </View>
                  </View>
                  
                  <Divider />  

                </TouchableOpacity>
              )}/>                       

          </View>:              
          <ActivityIndicator size="large" color='blue' style={{fontSize:18}}/>
          }
        </View>: <View style={{alignContent:'center',paddingTop:'60%'}}>
        <ActivityIndicator  size={40} color='#B14AB9' />
      </View>
        :null
    )
    
}

export default Messages;
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
  roundImage:{
    width: 70,
    height: 70,
    borderRadius: 200 / 2,
    borderWidth: 2,
},
  divider: {
    height: 0.5,
    backgroundColor: "#CBD0E6",
    marginTop:'5%',
    width:'110%',
    
    marginLeft:-10,
    elevation:1,
    //shadowColor:'black'
  },
});
