import { useState } from "react";
import AuthContext from "./authContext"


const LoginState=({children})=>{
    const [accessKey ,setAccessKey]=useState(null)
    const [errorTextLogin, setErrorTextLogin] = useState(null);
    const [contactList, setContactList] = useState(null);







    const removeAccessToken = () => {
      localStorage.removeItem('accessToken');
      
      };


    

      const storeAccessToken = (accessToken) => {
     
         localStorage.setItem("accessToken",accessToken);
       
        if(accessToken){
        setAccessKey(accessToken);
        console.log(accessKey)
    };
  }

    const getTokenLocalStorage=()=>{
      const key =localStorage.getItem("accessToken");
      console.log ("localStorage" ,key);
      setAccessKey(key);
    
  

  };

    return (
        <AuthContext.Provider value={{accessKey ,setAccessKey,errorTextLogin, setErrorTextLogin,contactList, setContactList,removeAccessToken,storeAccessToken ,getTokenLocalStorage}}>
            {children}
        </AuthContext.Provider>
    )
}
export default LoginState
