import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomText from '../../components/custom/CustomText';
import { form } from '../../styles/styles';

const CardLogin = ({props, onPress,image, text1, text2, key,text1Style,text2Style,cardContainer,imageStyle,buttonText,buttonStyle }) => {
  return (//card component in the login page
    <Card key={key} style={[{ width: '90%', height: '90%', left: '-1%', marginTop: '5%', borderRadius: 10, elevation: 10 },cardContainer]}>
      <Image source={image} style={[form.mainImage2,imageStyle]} />
      <View style={{ alignItems: 'center', paddingTop: "25%" }}>
        <CustomText style={[text1Style,{ color: '#363939', fontWeight: "600", fontSize: 30, fontStyle: 'normal' }]}>{text1} </CustomText>
        <CustomText style={[text2Style,{ color: '#797A7B', fontWeight: "600", fontSize: 16, lineHeight: 30, textAlign: 'center' }]}>
          {text2}
        </CustomText>
      </View>

      <Button
        uppercase={false}
        contentStyle={{ height: '100%', width: '160%' }}
        labelStyle={[{ textAlign: 'center', paddingRight: '28%' },buttonStyle]}
        mode="contained"
        onPress={() => onPress()}
        style={form.button2}
      >
        {buttonText}
      </Button>
      <View style={form.bottomButtonLanding}>
        <TouchableOpacity onPress={() =>  props.navigation.navigate("LoginReal")}>
          <CustomText style={form.textBottomLanding}>
            Already have an account?
          </CustomText>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default CardLogin;

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
