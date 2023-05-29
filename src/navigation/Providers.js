import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';
import { MenuProvider } from 'react-native-popup-menu';

const Providers = () => {
  return (
    <AuthProvider>
      <MenuProvider>
      <Routes />

      </MenuProvider>
    </AuthProvider>
  );
}

export default Providers;