import {View,Text,Image} from "react-native";
import React  from "react";
import { useDispatch } from "react-redux";
import {deleteItemAsync} from "expo-secure-store"
import {setAuthStatus,setLoaded,setAuthProfile,setAuthToken} from "../Redux/AuthSlice"
import { useNavigation } from "@react-navigation/native";


const account =()=>{
    const dispatch =useDispatch();

    const handLogout =()=>{
        deleteItemAsync('authToken');
        deleteItemAsync('authProfile');
        dispatch(setAuthToken(null));
        dispatch(setAuthStatus(false));
        dispatch(setAuthProfile(null));
    };

    const navigation=useNavigation();
    const [person,setPerson]=useState({
        name:'Abera',
        email:'abera@gmail.com',
        phone:'0788',
        profile:require(""),
        DOB:"02/78"
    });

    return(
 <View style={styles.Container}>
    <Text>account</Text>

 </View>

    )
}