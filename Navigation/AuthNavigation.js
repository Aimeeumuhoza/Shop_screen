import { getItemAsync } from "expo-secure-store";
import { useSelector } from "react-redux";
import { setAuthLoaded, setAuthStatus, setAuthToken } from "../Redux/AuthSlice";
import { useEffect } from "react";

export default RootNavigation=()=>{
    splashcreen .preventAutohideAsync();
    const dispatch =useDispatch();
    const{authStatus,authLoaded}=useSelector((state)=>state.auth)


    console.log(authStatus,'AUthStatus');

    const handleAuth=async()=>{
    let token =await getItemAsync("authToken")
    console.log(teken,'Auth token');


    if(token){
        dispatch(setAuthStatus(true));
        dispatch(setAuthToken(token));
    }

    dispatch(setAuthLoaded(true));
    splashcreen.preventAutohideAsync();
    };

    useEffect(()=>{
        handleAuth();
    });
    if(!authLoaded){
        return null;
    }


return authStatus?<stackNavigator/>:<AuthNavigation/>

}