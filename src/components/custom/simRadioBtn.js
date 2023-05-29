import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native'
import CustomText from './CustomText';
export const SimRadioButton = ({ onPress, selected, children }) => {//how the radio button is created
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
const styles = StyleSheet.create({
  radioButtonContainer: {
    paddingTop:'-5%',
    alignItems: 'center',
    alignContent:'center',
    alignSelf:'center',
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingLeft:'15%',
    paddingBottom:'15%'
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
    marginTop:'15%',
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
    color:'#5C53E2'
  },
  taskTitle:{
    backgroundColor: "#ffffff",
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
