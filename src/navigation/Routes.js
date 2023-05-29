import React, {useContext, useState, useEffect,createContext} from 'react';
import {NavigationContainer,DefaultTheme} from '@react-navigation/native';
import { auth,db} from '../firebase';
//import {AuthContext} from './AuthProvider';
import {onAuthStateChanged} from 'firebase/auth';
import CustomText from '../components/custom/CustomText';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import StatusBarConfig from '../styles/StatusBarConfig';

export const AuthContext = createContext();

const Routes = ({children}) => {
  //const {user, setUser} = useContext(AuthContext);
  
  const [initializing, setInitializing] = useState(true);
  const [userExists, setUserExists] = useState(null);
  const [userLogged, setUserLogged] = useState(false);
  const [select, setSelect]=useState(null)
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#D6DCF2',
    },
    
  };

  useEffect(() => {
    function checkIfUserLog(){

        onAuthStateChanged(auth, user => {//check if user had logged
          
          if (user) {
            setUserLogged(true)
            setUserExists(user)
            setInitializing(false)

          } 
          else {
            setUserLogged(false)
            setInitializing(false)

          }
        })
      }  
      checkIfUserLog()
   
    
  }, [userExists]);
  if (initializing) return null;
  return (
    <AuthContext.Provider
    
      value={{
        userExists,
        setUserExists,select,setSelect}}>
    <NavigationContainer theme={navTheme} >
      <StatusBarConfig/>
      {userLogged ? (<AppStack />) : (<AuthStack />)}
    </NavigationContainer>
    {children}
    </AuthContext.Provider>
  );
};

export default Routes;