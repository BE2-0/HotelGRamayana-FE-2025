import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { useContext } from "react";

const AuthContext=React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children})
{
    const [currentUser,setCurrentUser]=useState(null);
    const [userLoggedIn,setUserLoggedIn]=useState(false);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,initializeUser);
        return unsubscribe;
    },[])

    async function initializeUser(user)
    {
        if(user)
        {
            setCurrentUser({...user});
            setUserLoggedIn(true);
        }
        else
        {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);

    }


    const value={currentUser,loading,userLoggedIn};
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}