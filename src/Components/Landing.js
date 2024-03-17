import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";






const Landing = (props) =>{
    const messaging = getMessaging(props.app);

    const [userName, setUserName] = useState(""); 
    const navigate = useNavigate(); 
    const [ref, setRef] = useState(false); 
    

    const join = () => {
        if(userName == "Admin") navigate("/admin")
       else  navigate(`/home/${userName}`)
    }

    const apiKey = 'BI_CXn0w8OcF7V6-USQxGR56RvpH55m_3spVp1vrpLhwGEkBJp2L0afdFQQxVGrDF898zn33dodXhTY-xlWqPUM'; 

    // useEffect(() =>{
    //     getToken(messaging,{vapidKey: {apiKey} }).then((currentToken) => {
    //             console.log(currentToken)
    //     }).catch((err) => console.log(err))
    // }, [])

    return(
        <div style = {{textAlign: "center", marginTop: "270px", fontFamily: "Poppins", fontSize: "20px"}}>
                <input type = "string" onChange = {e => setUserName(e.target.value)} style = {{borderRadius: "10px", height: "35px", width: "250px", textAlign: "center"}}/>
                <br/><br/>
                <button style = {{borderRadius: "10px", height: "40px", width: "230px", background: "black", color: "white", cursor: "pointer"}}  onClick = {join}> JOIN </button> <br/><br/>

                {/* <button onClick = {props.check}> test</button> */}
        </div>
    )
}


export default Landing; 