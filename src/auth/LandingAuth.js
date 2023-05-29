import {View,StyleSheet,Animated,Image,useWindowDimensions,ScrollView} from 'react-native'
import CustomText from '../components/custom/CustomText';
import { useRef} from 'react'; 
import {  Button, Card, } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {  form } from '../styles/styles';
import CardLogin from '../components/custom/CardLogin';




const LandingAuth=(props)=>{
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);

  const images = 
    [//cards in the login page
      { id:1, 
        img:<Card key={1} style={form.mainCard}>
              <Image source={require('../../assets/logo_3.png')} style={form.mainImage}/>
              <View style={{alignItems:'center',paddingTop:"30%"}}>
                <CustomText style={styles.customTextCard}>Welcome to </CustomText>
                <CustomText style={[styles.customTextCard,{lineHeight:45}]}>TreffU</CustomText>
              </View>
            
              <Button uppercase={false}  contentStyle={{height:'100%',width:'160%',}} 
              labelStyle={{textAlign:'center',paddingRight:'23%'}}
              mode="contained"          onPress={()=>handleButtonPress()}

              style={form.button1}>
                Let's begin
              </Button>
              <View style={form.bottomButtonLanding} >
                <TouchableOpacity onPress={() => props.navigation.navigate("LoginReal")} >
                  <CustomText style={form.textBottomLanding}>
                      Already have an account?
                  </CustomText>
                </TouchableOpacity>
                    
              </View>
          </Card>, 
        color:"gray"
      },
      { id:2, 
        img:
          <Card key={2} style={{width:'90%',height:'90%',left:'-1%',marginTop:'5%',borderRadius:10,elevation:10 }}>
            <Image source={require('../../assets/Group.png')} style={form.mainImage2}/>
            <View style={{alignItems:'center',paddingTop:"25%"}}>
              <CustomText style={{color:'#363939',fontWeight:"600", fontSize:30,fontStyle:'normal'}}>
                Find friends or Love 
              </CustomText>
              <CustomText style={{color:'#797A7B',fontWeight:"600",fontSize:16,lineHeight:30,textAlign:'center'}}>
                Check In in your area and see who is available
              </CustomText>
            </View>
        
            <Button uppercase={false} contentStyle={{height:'100%',width:'160%',}} 
            labelStyle={styles.labelStyleText}mode="contained" 
            onPress={()=>handleButtonPress()} style={form.button2}>
              Next
            </Button>
            <View style={form.bottomButtonLanding} >
              <TouchableOpacity onPress={() => navigation.navigate("LoginReal")} >
                <CustomText style={form.textBottomLanding}>
                    Already have an account?
                </CustomText>
              </TouchableOpacity>
                  
            </View>
          </Card>,  
        color:"gray"
      },
    
    { id:3,
      img:
        <CardLogin props={props} image={require('../../assets/customize.png')} 
        onPress={()=>handleButtonPress()} buttonText={'Next'} 
        cardContainer={{marginLeft:-17}} text1={'Customize your profil'} 
        text2={'Tell us what you like and show the others your interests and activities'} text2Style={{paddingRight:20}}
        />,
      color:'gray'
    },
    { id:4,
      img:
        <CardLogin props={props} image={require('../../assets/chatting.png')} 
        onPress={()=>props.navigation.navigate("Register")} buttonStyle={{paddingRight:'22%'}} 
        buttonText={'Sign me up!'} imageStyle={{width:220,height:220}} cardContainer={{marginLeft:-33}}  
        text1={'Start chating'} 
        text2={'No time to waste, Let’s go!'} text2Style={{paddingRight:20}}
        />,
      color:'gray'
    }
  ]
  
  
  let { width: windowWidth, height: windowHeight } = useWindowDimensions();
  windowHeight = windowHeight - 300;

  const handleButtonPress = () => {//on button press animate to the next card
    const currentOffset = scrollX._value;
    const nextOffset = currentOffset + windowWidth-15;

    scrollRef.current?.scrollTo({ x: nextOffset, animated: true });
  };
  return (
    <View style={styles.container}>
      <View style={[styles.scrollContainer, {height:'90%'} ]}>
        <ScrollView //scrollview that shows the cards in horizontal view
          horizontal={true}
          style={styles.scrollViewStyle}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={
              Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: false}
                )
            }
          scrollEventThrottle={16}
          ref={scrollRef}
        >
          {images.map((image, imageIndex) => {
            return (
              <Animated.View 
                style={{ width: windowWidth,}}
                key={imageIndex}
              >
                {image.img}
              </Animated.View>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.indicatorContainer}>

          {
              images.map((image, imageIndex)=>{
                  const width=scrollX.interpolate({
                      inputRange:[
                          windowWidth*(imageIndex-1),
                          windowWidth*(imageIndex),
                          windowWidth*(imageIndex+1),
                      ],
                      outputRange:[8, 16, 8],
                      extrapolate:"clamp",
                  })

                  return(
                      <Animated.View key={imageIndex} style={[styles.normalDots, {width}, {backgroundColor:image.color}]}/>

                  );
              })
          }

      </View>

    </View>
  )
}

export default LandingAuth;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },

  scrollContainer: {
    shadowColor:"#6A6C6E",
    shadowOffset:{
        width:10,
        height:-10,
    },
    shadowOpacity:1,
  },
  
  indicatorContainer:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  normalDots:{
    width:8,
    height:8,
    borderRadius:4,
    marginHorizontal:4,
  },
  Card:{
    width:'95%',
    height:'90%',
    left:'3%',
    marginTop:'5%',
    borderRadius:10,
    elevation:10
  },
  customTextCard:{
    color:'#B14AB9',
    fontWeight:"600", 
    fontSize:40
  },
    
  labelStyleText:{
    textAlign:'center',
    paddingRight:'23%'
  }
  });

