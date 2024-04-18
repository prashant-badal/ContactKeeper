import { useState } from "react";
import AuthContext from "./authContext"


const LoginState=({children})=>{
    const [accessKey ,setAccessKey]=useState(null)

    const removeAccessToken = () => {
      localStorage.removeItem('accessToken');
      
      };


    

      const storeAccessToken = (accessToken) => {
     
        const key =  localStorage.setItem("accessToken",accessToken);
        if(key){
        setAccessKey(key);
    }
  

  };

    return (
        <AuthContext.Provider value={{accessKey,removeAccessToken,storeAccessToken}}>
            {children}
        </AuthContext.Provider>
    )
}
export default LoginState
