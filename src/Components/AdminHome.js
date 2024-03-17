import React, {useState, useEffect} from "react";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDocs, collection, query, where} from "firebase/firestore"
import 'bootstrap/dist/css/bootstrap.css';
import {  onMessage } from "firebase/messaging";

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

  const messaging = getMessaging(); 

const AdminHome = () => {

    const [users, setUsers] = useState([]); 
    const [selectedUsers, setSelectedUsers] = useState([]); 
    const [displayUsers, setDisplayUsers] = useState([]); 
    const [refresh, setRefresh] = useState(false); 
    const [selectedTokens, setSelectedTokens] = useState([]); 
    const [newTitle, setNewTitle] = useState(""); 
    const [newDesc, setNewDesc] = useState(""); 


    let userMap={};

    const getUsers =  async () =>{
    
        console.log("working"); 

       const getData = async () =>{
                const data = await getDocs(collection(db, "users")); 
                setUsers([]); 
                data.docs.map((doc) => {setUsers((prevUsers) => [...prevUsers, [doc.id, doc.data().name]])})
                setDisplayUsers([]); 
                const uniqueNames = Array.from(new Set(data.docs.map(doc => doc.data().name)));
                setDisplayUsers(prevUsers => [...prevUsers, ...uniqueNames]);
                userMap={};
                data.docs.forEach((doc)=>{
                    const id = doc.id;
                    const name=doc.data().name;
                    if(userMap[name]){
                        userMap[name].push(id);
                    }
                    else{
                        userMap[name]=[id];
                    }
                })
                console.log(userMap);

        }
        getData(); 
      
      console.log(users);
      console.log(displayUsers);
      
    }

    const sendMessages = () =>{
       
       selectedUsers.map(item => {
            users.map(item2 => {
                if(item == item2[1]){
                    sendMessage(item2[0], newTitle, newDesc); 
                }
            })
       })
       
    }

    onMessage(messaging, (payload) =>{
        console.log(payload)
        alert(payload.notification.title + " \n "+  payload.notification.body)
       })
   
    const sendMessage = (fcmKey,title,message) =>{
        //  console.log(`${message}`)
        const apiKey = 'AAAA49LMuFs:APA91bG0JEGIEJCkSSUIrdpJZYAYvNCTGFnYj6J_5AZtvBjDu35f4XIaq6geM7Rww0kFJBK15CtsDWwvrEpUhQxZYMDyMQLiP5JXQkMfcZGl1CpVoN_dIlt5DZf7v_Ba7d0pvrbCc6mA';
  
         fetch('https://fcm.googleapis.com/fcm/send', {
              method: 'POST',
              headers: {
                'Authorization': `key=${apiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                to: fcmKey,
                notification: {
                  title : title,
                  body: message,
                },
                data: {
                    title : title,
                    body: message,
                  },
                priority: 'high', // Set priority to ensure timely delivery (optional)
              }),
            });
      }
  

    const selectUser = (item, state) =>{

        if(selectedUsers.includes(item)) 
         setSelectedUsers(l => l.filter(member => member !== item));
        else setSelectedUsers((prevUsers) => [...prevUsers, item])

    }

    useEffect(() =>{
            getUsers(); 
            
    }, [refresh])
        

    return(
        <div style = {{ textAlign: "center",  marginLeft: "600px", marginTop: "50px",
         width: "300px", alignItems: "center"}}>
           <div>
            <button onClick = {() => setRefresh(!refresh)}> Refresh</button>
           

            <table className='table table-striped table-sm' 
             >
                <thead class="thead-light">  Users </thead>
                <tbody style = {{textAlign: "left"}}>
                    {/* {Object.keys(userMap) && Object.keys(userMap).map((item,i)  =>
                         <tr> <p>    
                             <input type = "checkbox" onClick = { () => selectUser(item)}/> 
                               {item[0]}
                         </p> </tr>
                 )} */}
                    {displayUsers && displayUsers.map((item,i)  =>
                         <tr> <p>    
                             <input type = "checkbox" onClick = { () => selectUser(item)}/> 
                               {item}
                         </p> </tr>
                 )}

                </tbody>
            </table>

            <label> Enter Name of the Task</label>
            <input type="text" onChange={e => setNewTitle(e.target.value)}/>
                            <br/>
                            <br/>
            <label> Enter Description of the Task</label>
            <input type="text" onChange={e => setNewDesc(e.target.value)}/>
                            <br/>
                            <br/>
            <button onClick = {sendMessages}> Send Message </button>
 
           </div>


        </div>
    )
}

export default AdminHome; 