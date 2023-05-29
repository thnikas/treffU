import React, {createContext, useState} from 'react';

export const AppContext = createContext();

export default AppContextProvider = ({children}) => {

  const [select,setSelect]=useState(null) 
  return (
    <AppContextProvider.Provider
      value={{select,setSelect}}
    >
    {children}
    </AppContextProvider.Provider>
  )
  
}