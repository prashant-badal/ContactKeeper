import { useState } from "react";
import AuthContext from "./authContext"



const LoginState=({children})=>{
    const [accessKey ,setAccessKey]=useState(localStorage.getItem("accessToken"))
    const [errorTextLogin, setErrorTextLogin] = useState(null);
    const [contactList, setContactList] = useState([]);

  const islogIn=!!accessKey;





    const removeAccessToken = () => {
      localStorage.removeItem('accessToken');
      // navigate('/')
      };


    

      const storeAccessToken = (accessToken) => {
     
         
       
        if(accessToken){
        setAccessKey(accessToken);
        console.log(accessKey)
        localStorage.setItem("accessToken",accessToken);
    };
  }

    const getTokenLocalStorage=()=>{
      const key =localStorage.getItem("accessToken");
      console.log ("localStorage" ,key);
      setAccessKey(key);
    
  

  };

    return (
        <AuthContext.Provider value={{islogIn,accessKey ,setAccessKey,errorTextLogin, setErrorTextLogin,contactList, setContactList,removeAccessToken,storeAccessToken ,getTokenLocalStorage}}>
            {children}
        </AuthContext.Provider>
    )
}
export default LoginState
