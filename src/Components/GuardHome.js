import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { doc, setDoc, getDocs, collection, query, where} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyD0RhBjO9ZKRHP_gnLaT8zkyCYAj0f8Xqw",
  authDomain: "taskguard-a06f5.firebaseapp.com",
  projectId: "taskguard-a06f5",
  storageBucket: "taskguard-a06f5.appspot.com",
  messagingSenderId: "978494208091",
  appId: "1:978494208091:web:78f436a81d7dc756b2277e",
  measurementId: "G-M436DH2269"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 


const addUser = async (user, token) =>{
 
  
  try{
    await setDoc( doc(db, "users", token), {
      name: user, 
      device: "web"
    }).then(() => alert("Token is updated")); 
  }
  catch(error) {
    alert(error); 
  }
  
  
} 


const vapidKey = 'BI_CXn0w8OcF7V6-USQxGR56RvpH55m_3spVp1vrpLhwGEkBJp2L0afdFQQxVGrDF898zn33dodXhTY-xlWqPUM'

const messaging = getMessaging(); 

const GuardHome = () =>{

  const {user} = useParams(); 
  const messaging = getMessaging(); 

  const requestForToken = () => {
    return getToken(messaging, { vapidKey: vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          addUser(user, currentToken)
          // Perform any other neccessary action with the token
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  };

  onMessage(messaging, (payload) =>{
    console.log(payload)
    alert(payload.notification.title + " \n "+  payload.notification.body)
   })


  useEffect(() => {
     requestForToken(); 

    
    
  })

  return(
    <div>
        Welcome, {user}



    </div>
  )
}


export default GuardHome; 