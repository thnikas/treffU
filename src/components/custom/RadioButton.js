import React, {useState,useEffect} from 'react';
import {View,StyleSheet,TouchableOpacity} from 'react-native'
import CustomText from './CustomText';
const RadioButton=({array,children,selected,setSelected,title,iconCustom, userInfo, setUserInfo})=>{
  

    const [isLiked, setIsLiked] = useState(//state when the user selects another radiobutton
        array
      );
      useEffect(()=>{

      },[selected])
      const onRadioBtnClick = (item) => {//change the state of the selected value in the array

        if(item.selected==true){
            let updatedState= isLiked.map((isLikedItem) =>
            item.selected==true
            ?{ ...isLikedItem, selected: false }
            :null
  
        );
        setIsLiked(updatedState)
        setSelected(updatedState) //the value that changes the array in the UserSettings screen
        if(title=='Pets'){
         setUserInfo({...userInfo, pet: ''})
        } else if(title=='Workout'){
         setUserInfo({...userInfo, gym: ''})
        }else if(title=='Education'){
         setUserInfo({...userInfo, school: ''})
        }else if(title=='Music'){
         setUserInfo({...userInfo, music: ''})
        }
        else if(title=='Searching'){
          setUserInfo({...userInfo, book: ''})
         }
         else if(title=='Book'){
          setUserInfo({...userInfo, searching: ''})
         }
        }
        if(item.selected==false){
            let updatedState = isLiked.map((isLikedItem) =>
          
          isLikedItem.id === item.id
            ? { ...isLikedItem, selected: true }
            : { ...isLikedItem, selected: false }
           
        );
        setIsLiked(updatedState);
        setSelected(updatedState)
        const newInfo=updatedState.filter(item=>item.selected==true).reduce(item=>{return`${item.name}`})
         if(title=='Pets'){
          setUserInfo({...userInfo, pet: newInfo.name})
         } else if(title=='Workout'){
          setUserInfo({...userInfo, gym: newInfo.name})
         }else if(title=='Education'){
          setUserInfo({...userInfo, school: newInfo.name})
         }else if(title=='Music'){
          setUserInfo({...userInfo, music: newInfo.name})
         }
         else if(title=='Book'){
          setUserInfo({...userInfo, book: newInfo.name})
         }
         else if(title=='Searching'){
          setUserInfo({...userInfo, searching: newInfo.name})
         }
       
        }
        
        
      };
      const RadioButton = ({ onPress, selected, children }) => {//how the radio button is created
        return (
          <View style={styles.radioButtonContainer}>
            <TouchableOpacity onPress={onPress} style={styles.radioButton}>
              {selected ? <View style={styles.radioButtonIcon} /> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress}>
              <CustomText style={styles.radioButtonText}>{children}</CustomText>
            </TouchableOpacity>
          </View>
        );
      };
    
      
    return(
      <View style={{paddingBottom:'5%'}}>
        
        <CustomText style={styles.taskTitle}>{title}</CustomText>
        {iconCustom}    
      
        
        
        {selected==null? isLiked.map((item) => (
      
        <RadioButton 
          onPress={() => onRadioBtnClick(item)}
          selected={item.selected}
          key={item.id}
        >
        {item.name}
        </RadioButton>
    )): selected.map((item) => (
      
        <RadioButton 
          onPress={() => onRadioBtnClick(item)}
          selected={item.selected}
          key={item.id}
        >
          {item.name}
        </RadioButton>
  ))}
  
  {children}

 </View>

 )
    
}

export default RadioButton;
const styles = StyleSheet.create({
  radioButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingLeft:'20%',
      paddingTop:'4%'
    },
    radioButton: {
      height: 20,
      width: 20,
      backgroundColor: "#F8F8F8",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#E6E6E6",
      alignItems: "center",
      justifyContent: "center",
      marginTop:'5%',
      borderColor:'black'
    },
    radioButtonIcon: {
      height: 14,
      width: 14,
      borderRadius: 7,
      backgroundColor: "#7a42f4"
    },
    radioButtonText: {
      fontSize: 16,
      marginLeft: 16,
      paddingTop:'4%',
      fontFamily:'sans-serif-medium',
      color:'#605f6b'

    },
    taskTitle:{
      backgroundColor: "#7a42f4",
      fontSize: 20,
      fontWeight: "bold",
      padding: 10,
      elevation: 4,
      margin: 10,
      marginBottom: 0,
      borderRadius: 10,
      paddingLeft:'12%'
    },
  });
