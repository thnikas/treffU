import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from './CustomText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const CardIcon = ({ iconSource, title,navigateScreen,userCard }) => {//the landing card that is shown in the main screen
  if(userCard){//if true shows the styles of the cards in the friendlist
    return (
      
      <View style={[styles.container,styles.cardFriends]}>
        {iconSource}
        <CustomText style={[styles.title,styles.cardFriendsTitle]}>
          {title}
        </CustomText>
        <View style={{flexDirection:'row',justifyContent:'space-between',bottom:'10%',}}>  
          <TouchableOpacity>
            <MaterialCommunityIcons name='account-eye' color={'#ffff'} size={30}/>
          </TouchableOpacity>

          <TouchableOpacity style={{paddingLeft:'5%'}}>

            <MaterialCommunityIcons color={'#ffff'} name='message-processing-outline' size={30}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }else{
    return (
      <TouchableOpacity onPress={navigateScreen} style={styles.container}>
        <View >
          <Image  style={styles.image} source={iconSource}/>
          <CustomText style={styles.title}>
            {title}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  }
 
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D0CCEA',
    borderRadius: 10,
    marginStart:'10%',
    alignItems: 'center',
    marginRight:'-5%',
    justifyContent: 'center',
    margin: 10,
    width: '45%',
    height: '32%',
    flexDirection:'column',
    elevation:10,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },
  icon: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color:'#605f6b'
  },
  card: {
    height:'40%',
    width:'45%',
    elevation:10,
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
  },
  image:{
    width:80,
    height:80,
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center'
  },
  cardFriends:{
    backgroundColor:'#D6DCF2',
    width:'90%',
    height:'85%',
    top:'5%',
    right:'4%'
  },
  cardFriendsTitle:{
    bottom:'16%',
    color:'#ffff',
    fontSize:20
  }
});

export default CardIcon;