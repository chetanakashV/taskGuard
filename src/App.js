import './App.css'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import Landing from './Components/Landing';
import GuardHome from './Components/GuardHome';
import AdminHome from './Components/AdminHome';
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD0RhBjO9ZKRHP_gnLaT8zkyCYAj0f8Xqw",
  authDomain: "taskguard-a06f5.firebaseapp.com",
  projectId: "taskguard-a06f5",
  storageBucket: "taskguard-a06f5.appspot.com",
  messagingSenderId: "978494208091",
  appId: "1:978494208091:web:78f436a81d7dc756b2277e",
  measurementId: "G-M436DH2269"
};

const check = () => {
  alert("this is a test")
}

const app = initializeApp(firebaseConfig);

function App() {
  return (
    <Router>
        <Routes>
            <Route exact path = "/" element = {<Landing app = {app} check = {check}/>}/>
            <Route  path = "/home/:user" element = {<GuardHome app = {app}/>}/>
            <Route exact path = "/admin"  element = {<AdminHome app = {app}/>}/>
        </Routes>
    </Router>
  );
}

export default App;
