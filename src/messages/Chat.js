import React, {useState, useEffect, useCallback,useContext,useLayoutEffect} from 'react';
import {View, StyleSheet,Keyboard,ActivityIndicator} from 'react-native';
import {Bubble, GiftedChat, Send,InputToolbar} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../navigation/Routes';
import { storage,auth,db } from '../firebase';
import { collection, doc,getDoc, getDocs,orderBy,query, where,addDoc, setDoc, onSnapshot, updateDoc, arrayUnion, limit } from 'firebase/firestore';
import { useRoute,useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Back4} from '../components/CustomBar/InterestIcons'
import Entypo from 'react-native-vector-icons/Entypo'
const Chat = (props) => {
  const startLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };
  const [messages, setMessages] = useState([]);//array that saves the messages
  const {userExists} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const navigation = useNavigation();
  const [isTyping, setIsTyping]=useState(false)//check if user is typing and save it in the firestore
  const onSend =  useCallback ((msgArray) => {
    const msg = msgArray[0]
    const uid=route.params.uid
    const name=route.params.name
    const usermsg = {
      ...msg,
      sentBy: userExists.uid,
      sentTo: uid,
      createdAt: new Date(),
      sent:false,
      received:false,
      readed:false
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, usermsg))//gets user previous messages
    const chatid = uid > userExists.uid ? userExists.uid+ "-" +uid : uid+ "-" +userExists.uid
    const getMessage= async()=>{
      const docRef=doc(db,"chats",chatid)
      const colRef = collection(docRef, "messages")
      
      const q=query(collection(docRef, "messages"),where('sentBy', '==',userExists.uid),orderBy('createdAt', 'desc'),limit(1))      
      /*
      await getDocs(q).then(function(querySnapshot){//place ticks in the last user message
          querySnapshot.forEach(function(doc){
            updatemessage.push(doc.id)
          })
        })   
       const test=doc(docRef,'messages',updatemessage[0])
       updateDoc(test,{received:false,sent:false})      
      */
      addDoc(colRef,{...usermsg})//add new message
    }
    getMessage()
  }, []);

  const renderSend = (props) => {//icon of sent
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{bottom: '25%', right:'5%'}}
            size={32}
            color="#B14AB9"
          />
        </View>
      </Send>

    );
  };


  const getAllMessages = async () => {//show all messages
    const uid=route.params.uid
    const name=route.params.name
    const chatid = uid > userExists.uid ? userExists.uid+"-"+uid : uid+"-"+userExists.uid   

    const docRef=doc(db,"chats",chatid)
    const docSnap = await getDoc(docRef);
    const colRef = collection(docRef, "messages")

    if (docSnap.exists()) {
      const updatemessage=[]
      const docRef=doc(db,"chats",chatid)
      const q=query(collection(docRef, "messages"),where('sentBy', '==',uid),orderBy('createdAt', 'desc'),limit(1))      
      
      await getDocs(q).then(function(querySnapshot){//check if the message is readed
       if(!querySnapshot.empty){//enter when the friend has send message
        querySnapshot.forEach(function(doc){
          
          updatemessage.push(doc.id)
        })
       }
        
        })   
        if(updatemessage.length>0){
          const test=doc(docRef,'messages',updatemessage[0])
        updateDoc(test,{readed:true})      
      
        }
       
      const colRef = query(collection(docRef, "messages"),orderBy('createdAt', 'desc'))
      const uns=onSnapshot(colRef,docSanp=>{
      setMessages(docSanp.docs.map(doc=>({
        _id:doc.data()._id,createdAt:doc.data().createdAt.toDate(),sentBy:doc.data().sentBy,
        sentTo:doc.data().sentTo,text:doc.data().text,user:doc.data().user,
      })))
      
    })
    return uns
    } else {
        
      await setDoc(docRef, {//if the user opens first time this conversation
        typing:[
          {user:[userExists.uid,uid]},
          {userTyping:[false,false]}
        ]  
      }).then(addDoc(colRef,{}))
      } 

  }
  const getIsTyping=async()=>{//check if user is typing
    const uid=route.params.uid
    const chatid = uid > userExists.uid ? userExists.uid+"-"+uid : uid+"-"+userExists.uid   
    
    const docRef=doc(db,"chats",chatid)
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      const unsub = onSnapshot(doc(db, "chats", chatid), (doc) => {
        for(let i=0;i<2;i++){
          if(doc.data().typing[0].user[i]!==userExists.uid){
            setIsTyping(doc.data().typing[1].userTyping[i])
          }
        }
      });
    return unsub
    }
    
  }
  const renderBubble = (props) => {//render chat bubble
    return (
      <Bubble 
        {...props}
        wrapperStyle={{
          
          right: {
            backgroundColor: '#B14AB9',
            
          },
          left:{
            backgroundColor: '#ffffff',
          }
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
      
    );
  };

  const scrollToBottomComponent = () => {//scroll to bottom when user is up in the messages
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  const showTyping = async() => {//show 3 dots if the user is typing
    const uid=route.params.uid
    const chatid = uid > userExists.uid ? userExists.uid+"-"+uid : uid+"-"+userExists.uid
    const docRef=doc(db,"chats",chatid)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const chatArray=docSnap.data().typing

      for(let i=0;i<2;i++){
        if(docSnap.data().typing[0].user[i]==userExists.uid){
          chatArray[1].userTyping[i]=true
          await updateDoc(docRef,{typing:chatArray},{merge:true})
        }
      }
    } else {
      console.log("No such document!");
    }
      
  }
  const hideTyping=async()=>{//hide 3 dots if the user is not typing
    const uid=route.params.uid
    const chatid = uid > userExists.uid ? userExists.uid+"-"+uid : uid+"-"+userExists.uid
    const docRef=doc(db,"chats",chatid)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const chatArray=docSnap.data().typing

      for(let i=0;i<2;i++){
        if(docSnap.data().typing[0].user[i]==userExists.uid){
          chatArray[1].userTyping[i]=false
          await updateDoc(docRef,{typing:chatArray},{merge:true})
        }
      }
    } else {
      console.log("No such document!");
    }
  }
  useEffect(()=>{
    props.navigation.setOptions({
      headerBackImage: () => (//when the user goes to previus screen function hide runs in order to change typing value
        <View>
          <TouchableOpacity onPress={()=>hideTyping()}>
            <Back4 size={30}  color='#B14AB9' />
          </TouchableOpacity>
      </View>
     
      ), headerRight: () => (
        <View>
        <TouchableOpacity onPress={()=>hideTyping()}>
          <Entypo name="dots-three-vertical" size={20} style={{paddingRight:'10%'}}  color='#B14AB9' />
        </TouchableOpacity>
    </View>
        )
    });
    getAllMessages()
    startLoading()
    getIsTyping()
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      showTyping()
   });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
    hideTyping()
    });
   
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
    
},[])
/** const renderTicks = (message) => { //show ticks in the messages
  return ( (message.received || message.sent) && ( <Ionicons name={message.received ? "checkmark-done" : "checkmark"} 
  size={16} style={{ paddingRight: 5 }} color={'blue'} /> ) ); };*/
  return (
    <View style={{ flex: 1, paddingBottom: '0.5%'}}>
    {loading?<View style={{alignContent:'center',paddingTop:'60%'}}>
        <ActivityIndicator  size={40} color='#B14AB9' />
      </View>: <GiftedChat
   messages={messages}
   onSend={(messages) => onSend(messages)}
   user={{
     _id: userExists.uid,
     avatar:route.params.logUserImg,
   }}
   multiline={true}
   renderBubble={renderBubble}
   alwaysShowSend
   renderSend={renderSend}
   scrollToBottom={true}
   scrollToBottomComponent={scrollToBottomComponent}
   isTyping={isTyping}
   
   renderInputToolbar={(props) => (
    <InputToolbar {...props} containerStyle={styles.inputToolbar} />
  )}
  textInputProps={{
    style: styles.textInput,
  }}
   
   shouldUpdateMessage={(props, nextProps) =>
     props.extraData !== nextProps.extraData
   }
 />}
   
   </View>
    
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    backgroundColor:'#D6DCF2'
  },
  inputToolbar: {
    //borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    borderRadius: 20,
    width:'97%',
    left:'1.5%',
    
  },
  textInput: {
    
    color:'black',
    width:'90%'
  },
});
