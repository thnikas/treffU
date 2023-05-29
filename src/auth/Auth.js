import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { View, Text,StyleSheet } from 'react-native';
import CustomText from '../components/custom/CustomText';
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View
        style={styles.container}
      >
        <CustomText>Loading User...</CustomText>
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const styles=StyleSheet.create({
  container:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
  }
})