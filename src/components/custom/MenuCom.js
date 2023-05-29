import {Menu,MenuOptions,MenuTrigger,renderers } from "react-native-popup-menu";
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native'
import CustomText from "./CustomText";
 const MenuCom=({icon,text})=>{//menu that show the interests of the user
    
    return(
        <View >
            <Menu  
                renderer={renderers.Popover}  
                rendererProps={{ anchorStyle: styles.anchorStyle,placement:'bottom', }}
                style={styles.menu}
            >
                <MenuTrigger customStyles={{TriggerTouchableComponent: TouchableOpacity}}>
                    {icon}    
                </MenuTrigger>
                <MenuOptions
                    customStyles={{
                    optionsContainer: {
                    
                    },
                }}>
                    <CustomText style={styles.text}>{text}</CustomText>
                </MenuOptions>
            </Menu>
        </View>

    )
    
   
}
export default MenuCom;

const styles = StyleSheet.create({
    menu:{
        height: 40 ,
        
    },
    container: {
        flex: 1,
        alignItems: "center",
        marginTop:'-140.5%',
        marginBottom:'112%',
    },
    roundImage:{//user image style
        width: 100,
        height: 100,
        borderRadius: 200 / 2,
        borderWidth: 2,
    },
    anchorStyle: {//the small arrow that pop ups when the user clicks an icon
        backgroundColor: '#A4A0D5',
        marginLeft:'-10%'
    },
    divider: {
        height: 1,
        backgroundColor: "#7F8487",
  },
    iconsStyle:{
        paddingTop:'2%',paddingLeft:'5%',
        paddingRight:'3.8%',
        color:'#ffff'
    },
    text:{color:'black',marginHorizontal:'2%', fontFamily:'sans-serif-medium'}
});