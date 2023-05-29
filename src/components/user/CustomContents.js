import { MenuOption } from "react-native-popup-menu";
import { Text,StyleSheet } from "react-native";
import  Entypo  from "react-native-vector-icons/Entypo";
import  SimpleLineIcons  from "react-native-vector-icons/SimpleLineIcons";
import  EvilIcons  from "react-native-vector-icons/EvilIcons";
import CustomText from "../custom/CustomText";
export const Block = ({ text, iconName, value }) => (
 <MenuOption
   onSelect={() => alert(`You clicked ${value}`)}
   customStyles={{
     optionWrapper: {
       flexDirection: "row",
       alignItems: "center",
       justifyContent: "space-between",
     },
   }}
 >
   <CustomText>{text}</CustomText>
   <Entypo name={iconName} size={24} color="black" />
 </MenuOption>
);

export const Mute = ({ text, iconName, value }) => (
 <MenuOption
   
   customStyles={{
     optionWrapper: {
       flexDirection: "row",
       alignItems: "center",
       justifyContent: "space-between",
     },
   }}
 >
   <CustomText>{text}</CustomText>
   <Entypo name={iconName} size={24} color="black" />
 </MenuOption>
);
export const Follow = ({ text, iconName, value }) => (
 <MenuOption
   onSelect={() => alert(`You clicked ${value}`)}
   customStyles={{
     optionWrapper: {
       flexDirection: "row",
       alignItems: "center",
       justifyContent: "space-between",
     },
   }}
 >
   <CustomText>{text}</CustomText>
   <SimpleLineIcons name={iconName} size={24} color="black" />
 </MenuOption>
);

export const Why = ({ text, iconName, value }) => (
 <MenuOption
   onSelect={() => alert(`You clicked ${value}`)}
   customStyles={{
     optionWrapper: {
       flexDirection: "row",
       alignItems: "center",
       justifyContent: "space-between",
     },
   }}
 >
   <CustomText>{text}</CustomText>
   <EvilIcons name={iconName} size={24} color="black" />
 </MenuOption>
);
export const Question = ({ text, iconName, value }) => (
 <MenuOption
   onSelect={() => alert(`You clicked ${value}`)}
   customStyles={{
     optionWrapper: {
       flexDirection: "row",
       alignItems: "center",
       justifyContent: "space-between",
     },
   }}
 >
   <CustomText>{text}</CustomText>
   <SimpleLineIcons name={iconName} size={24} color="black" />
 </MenuOption>
);
export const NotInterested = ({ text, iconName, value }) => (
 <MenuOption
   onSelect={() => alert(`You clicked ${value}`)}
   customStyles={{
     optionWrapper: {
       flexDirection: "row",
       alignItems: "center",
       justifyContent: "space-between",
     },
   }}
 >
   <CustomText>{text}</CustomText>
   <Entypo name={iconName} size={24} color="black" />
 </MenuOption>
);
export const AddImage = ({ text, iconName, value }) => (
    <MenuOption
    
    onSelect={() => value()}      
    customStyles={{
        optionWrapper: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
      }}
    >
      <CustomText style={styles.text}>{text}</CustomText>
      <Entypo name={iconName} size={24} color="black" />
    </MenuOption>
   );

   export const SeeImage = ({ text, iconName, value }) => (
    <MenuOption
      customStyles={{
        optionWrapper: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
      }}
    >
      <CustomText style={styles.text}>{text}</CustomText>
      <Entypo name={iconName} size={24} color="black" />
    </MenuOption>
   );
   const styles=StyleSheet.create({
  
    text: {
      color: "black",
      fontWeight:'bold'
     
  },
  })