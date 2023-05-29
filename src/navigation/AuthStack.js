import React, { Component,createContext,useContext, useEffect,useState } from 'react';
import {StyleSheet,View,Button,Text} from 'react-native';
import LoginScreen from '../auth/Login';
import RegisterScreen from '../auth/Register'

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {onAuthStateChanged} from 'firebase/auth';
import { auth,db} from './src/firebase';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import ForgotPasswordScreen from '../auth/ForgotPassword';
import InfoScreen from '../components/main/Infomation'
import {AnimatedTabBar} from "../navigation/AnimatedTabBar"
import LandingAuth from '../auth/LandingAuth'
const Stack = createStackNavigator();
const AuthContext = createContext();



const Tab = createBottomTabNavigator();

const AuthStack = () => {//if the user has not logged in
    const [userLogged, setUserLogged] = useState(false);
    const [userExists, setUserExists] = useState(null);
    const LoginStack = ({navigation,props}) => (
      <Stack.Navigator >
        <Stack.Screen
        
        name="LandingAuth"
        component={LandingAuth}
        options={({navigation})=>({
          title: '',
          headerShown:false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#fff',
            elevation: 0,
          },
          headerBackTitleVisible: false,
          
        })}
      />
        <Stack.Screen
        
          name="LoginReal"
          component={LoginScreen}
          options={({navigation})=>({
            title: '',
            headerShown:false,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',
              shadowColor: '#fff',
              elevation: 0,
            },
            headerBackTitleVisible: false,
            
          })}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={({navigation})=>({
            title: '',
            headerTitleAlign: 'center',
            headerShown:false,
            headerBackTitleVisible: false,
          })}
        />
      </Stack.Navigator>
    )

  return(
    
          <Tab.Navigator  tabBar={(props) => <AnimatedTabBar {...props} />}>
            <Tab.Screen  name="Login" component={LoginStack} options={{headerShown:false,tabBarIcon: ({}) => (
                <MaterialIcons color={'grey'} name="login" size={25}  />),}}/>
            <Tab.Screen name="Register" component={RegisterScreen} options={{headerShown:false,tabBarIcon: ({}) => (
                <FontAwesome5 name="user-plus" color={'grey'}  size={25} />)}}/>
            <Tab.Screen name="Info" component={InfoScreen} options={{headerShown:false,tabBarIcon: () => (
                <Entypo name="info-with-circle" color={'grey'}  size={25} />)}}/>
          </Tab.Navigator>
        

        

     
      
    )
  }
  export default AuthStack 