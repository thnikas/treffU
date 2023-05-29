import React,{useState} from 'react';
import { StyleSheet,View,TouchableOpacity,  Easing,} from 'react-native';
import { getFocusedRouteNameFromRoute} from '@react-navigation/native';
import ProfileScreen from '../components/main/Profile'
import { ShowImage } from '../components/main/ShowImage';
import {CardStyleInterpolators,TransitionSpecs, } from '@react-navigation/stack';
import {  createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AddPostScreen from '../components/AddPost';
import * as CustomIcon from '../components/CustomBar/InterestIcons'
import SettingsScreen from '../components/user/UserSettings';
import {Back4} from '../components/CustomBar/InterestIcons'
import MessagesScreen from '../messages/Messages'
import ChatScreen from '../messages/Chat'
import LandingScreen from '../components/Landing';
import InfomationScreen from '../components/main/Infomation';
import FriendListScreen from '../components/main/FriendList';
import PlacesList from '../map/checkIn/CheckIn';
import SearchL from '../components/main/SearchL';
import ProfileSeeScreen from '../components/custom/profileSee/ProfileSee';
import NotificationIcon from '../components/custom/NotificationIcon'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {AnimatedTabBar} from "../navigation/AnimatedTabBar"
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import Entypo from 'react-native-vector-icons/Entypo'
const Stack = createSharedElementStackNavigator()

const config = {
  animation: 'slide',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    duration:700
  }
}

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 500,
    easing: Easing.linear,
  }
}
const customTransition = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            })
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: ["180deg", "0deg"],
            }),
          },
          {
            scale: next ?
              next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.7],
              }) : 1,
          }
        ]
      },
      opacity: current.opacity,
    }
  }
}
const options = {
  gestureEnabled: true,
  title: '',
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  backgroundColor:'#D6DCF2',
  headerStyle: {
    backgroundColor: '#D6DCF2',
    shadowColor: '#e3e7f2',
    elevation: 0,
  },
  headerBackImage: () => (
    <View style={{marginLeft: '8%'}}>
      <Back4 size={30}  color='#B14AB9'/>
    </View>
  ),
  transitionSpec: {
    open: { animation: 'timing', config: { duration: 600 } },
    close: { animation: 'timing', config: { duration: 600 } },
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      
      cardStyle: {
        opacity: progress,
        
      }
    }
  }
}

const MessageStack = ({navigation}) => (//stack screen for message and chat
  <Stack.Navigator screenOptions={{ contentStyle: {backgroundColor: '#D6DCF2'}}}>
    <Stack.Screen
      name="Message"
      
      component={MessagesScreen}
      options={{
        title:'Messages',
        headerStyle: {
          backgroundColor: '#D6DCF2',
          shadowColor: '#2e64e515',
          elevation: 0,
          borderRadius:10,
        },
        headerTitleStyle:styles.title,
        headerTitleAlign: 'left',
        
        headerRight: () => (
          <TouchableOpacity>
            <MaterialCommunityIcons name='message-plus-outline' size={35} style={{paddingRight:'10%',color:'#B14AB9',paddingTop:'5%'}}/>
          </TouchableOpacity>
        ),
      }}
    />
    <Stack.Screen
      name="Chats"
      component={ChatScreen}
      options={({route})=>({
        cardStyle:{backgroundColor:'#D6DCF2'},
        title: route.params.name,
        headerTitleStyle:{
          fontFamily:'sans-serif-mediums',
          fontSize:25,
        },
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#D6DCF2',
          elevation: 0,
        },
        headerTitleStyle:styles.title,
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: '8%'}}>
            <Back4 size={30}  color='#B14AB9'/>
          </View>
        ),
        headerRight: () => (
          <View>
            <Entypo name="dots-three-vertical" size={30}  color='#B14AB9' />
          </View>
          )
      })}
    />

    <Stack.Screen
      name="HomeProfile"
      component={ProfileScreen}
      options={({navigation})=>({
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#D6DCF2',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: '8%'}}>
            <Back4 size={30}  color='#B14AB9'/>
          </View>
        ),
      })}
    />
    
  </Stack.Navigator>
)
const LandingStack=({navigation,props}) => (//landing page pages
  <Stack.Navigator  screenOptions={{
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    contentStyle: {backgroundColor: '#D6DCF2'}
    
  }}>
    <Stack.Screen
      name="Landing"
      component={LandingScreen}
      options={({navigation})=>({
        gestureDirection: 'vertical',
        transitionSpec: {
          open: config,
          close: closeConfig,
        },
        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        title: '',
        headerShown:true,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#D6DCF2',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: '8%'}}>
            <Back4 size={30}  color='#B14AB9'/>
          </View>
        ),
        headerRight: () => (
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity  onPress={()=> navigation.navigate('AddPost')}>
              <MaterialCommunityIcons  name='image-plus' size={35}  color='#B14AB9'/>
            </TouchableOpacity>
            <NotificationIcon/>
          </View>
       ),     
      })}
    />
    <Stack.Screen
    name="Search"
    component={SearchL}
    options={({navigation})=>({
      transitionSpec: {
        open: config,
        close: closeConfig,
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      title: '',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#D6DCF2',
        shadowColor: '#2e64e515',
        elevation: 0,
        
      },
      headerBackTitleVisible: false,
      headerBackImage: () => (
        <View style={{marginLeft: '8%'}}>
          <Back4 size={30}  color='#B14AB9'/>
        </View>
      ),
      })}
    />
  
    <Stack.Screen
      name="Information"
      component={InfomationScreen}
      options={({navigation})=>({
        ...customTransition,
        title: '',
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#D6DCF2',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerTitleStyle:styles.title

      })}
    />

    <Stack.Screen
      name="Placelist"
      component={PlacesList}
      options={({navigation})=>({
      title:"Places Near",
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: '8%'}}>
            <Back4 size={30}  color='#B14AB9'/>
          </View>
        ),
        headerStyle: {
          backgroundColor: '#D6DCF2',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
      })}
    />
  
    <Stack.Screen
      name="Friends"
      component={FriendListScreen}
      options={({navigation})=>({
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#D6DCF2',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        
        headerBackTitleVisible: false,
        headerLeft: null,
      })}
    />
    <Stack.Screen
      name="ProfileSee"
      component={ProfileSeeScreen}
      options={({navigation})=>({
        title: '',
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#D6DCF2',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerBackImage: () => (
          <View style={{marginLeft: '8%'}}>
            <Back4 size={30}  color='#B14AB9'/>
          </View>
        ),
      })}
    />
    <Stack.Screen
        name="ShowImage"
        component={ShowImage}
        options={({navigation})=>({
          title: '',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#D6DCF2',
            shadowColor: '#e3e7f2',
            elevation: 0,
          },
          headerBackImage: () => (
            <View style={{marginLeft: '8%'}}>
              <Back4 size={30}  color='#B14AB9'/>
            </View>
          ),
      }, options
    )}
    />
    <Stack.Screen
      name="AddPost"
      component={AddPostScreen}
      options={({navigation})=>({
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#D6DCF2',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerTitleStyle:styles.title,
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: '8%'}}>
            <Back4 size={30}  color='#B14AB9'/>
          </View>
        ),
      })}
    />
  </Stack.Navigator>
)
const ProfileStack = ({navigation,props}) => (//user profile screen usersettings and screen to show the image
  <Stack.Navigator screenOptions={{
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    contentStyle: {backgroundColor: '#D6DCF2'}
  }}>
    <Stack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={({navigation})=>({
        gestureDirection: 'vertical',
        transitionSpec: {
          open: config,
          close: closeConfig,
        },
        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        title: '',
        headerShown:false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: '8%'}}>
            <Back4 size={30}  color='#B14AB9'/>
          </View>
        ),
      })}
    />
    <Stack.Screen
      name="ShowImage"
      component={ShowImage}
      options={({navigation})=>({
        title: '',
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#D6DCF2',
          shadowColor: '#e3e7f2',
          elevation: 0,
        },
        headerBackImage: () => (
          <View style={{marginLeft: '8%'}}>
            <Back4 size={30}  color='#B14AB9'/>
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity testID='TrashBin' >
            <CustomIcon.Trash style={{paddingRight:'5%'}} size={30} color='#B14AB9'/>
          </TouchableOpacity>),

      },options)}
    />

    <Stack.Screen
      name="UserSettings"
      component={SettingsScreen}
      options={({navigation})=>({
        gestureDirection: 'vertical',
        transitionSpec: {
          open: config,
          close: closeConfig,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        title: 'Your Settings',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#D6DCF2',
          shadowColor: '#fff',
          elevation: 0,
        },
        
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: '8%'}}>
            <Back4 size={30}  color='#B14AB9'/>
          </View>
        ),
        headerStyle: {
          backgroundColor: '#D6DCF2',
          shadowColor: '#2e64e515',
          elevation: 0,
        },        headerTitleStyle:styles.title,

        headerRight: () => (
          <TouchableOpacity >
            <CustomIcon.Exit5 style={{paddingRight:'15%'}} color='#B14AB9' size={40} />
          </TouchableOpacity>),
      })}
    />
    <Stack.Screen
      name="AddPost"
      component={AddPostScreen}
      options={({navigation})=>({
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#D6DCF2',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerTitleStyle:styles.title,
        headerBackImage: () => (
          <View style={{marginLeft: '8%'}}>
            <Back4 size={30}  color='#B14AB9'/>
          </View>
        ),
      })}
    />
    
  </Stack.Navigator>
)
const Tab = createBottomTabNavigator();

function App({ children }) {
 
  return( //the tab navigator screen that are the stacks above
      <Tab.Navigator
      tabBar={(props) => <AnimatedTabBar {...props} />}
      >
      <Tab.Screen  name="Main" component={LandingStack}  options={{headerShown:false,tabBarIcon: ({color, size}) => (
        <AntDesign name="hearto" color={'grey'}  size={25} />)}}/>
      <Tab.Screen  name="Messages"  component={MessageStack} options={({route})=>({
        tabBarStyle: ((route) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? ""
        if (routeName === 'Chats') {
          return { display: "none" }
        }
        return
      })(route),
      headerShown:false,tabBarIcon: ({color, size}) => (
        
        <AntDesign name="wechat" color={'grey'}  size={25} />)
      })} 
      />
      <Tab.Screen name="Profile" component={ProfileStack}  
        options={{headerShown:false,tabBarIcon: ({color, size}) => (
        <FontAwesome5 name="user" color={'grey'} size={25} />)}}
      />
    </Tab.Navigator>
      
  )
}


const styles=StyleSheet.create({
  title:{
    fontSize:30,
    color:'#221818',
    fontFamily:'Inter-VariableFont_slnt,wght'
  } 
})



  export default App 

