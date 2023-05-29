import React, {createContext, useState} from 'react';
import { auth,db} from '../firebase';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await signInWithEmailAndPassword(auth,email, password)
          } catch (e) {
            console.log(e);
          }
        },
        
        register: async (email, password) => {
          try {
            await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
              
              const cuserId=auth.currentUser.uid
              setDoc(doc(db, "users", cuserId), {
                name:name,
                email:email,
                username:username,
                image:'default' ,
                followingCount: 0,
                followersCount: 0
              }) 
              //ensure we catch any errors 
              .catch(error => {
                  console.log('Something went wrong with added user to firestore: ', error);
              })
            })
            .catch(error => {
                console.log('Something went wrong with sign up: ', error);
            });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await signOut(auth).then(() => {
            })
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};