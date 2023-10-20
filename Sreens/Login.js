import React ,{useState}from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import {  Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get("screen")

export default function Login() {

    const [email,setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [error, setError]=useState('')
    const [hidePassword,setHidePassword]=useState(true)

    const passwordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    
  const onSubmit = () => {
    if(validateForm()){
     navigation.navigate('HomeTabNavigator');
   
}
  
  }
    const validateForm = () => {
        let errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //  passwordRegex.test(password);
        if (!email) {
            errors.email = 'Enter email';
        } else if (!emailRegex.test(email)) {
            errors.email = 'Invalid email format';
        }
    
        if (!password) {
            errors.password = 'Enter password';
        }

        setError(errors);
        return Object.keys(errors).length === 0;
    };



    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <AntDesign
                    name="arrowleft"
                    size={24}
                    color="green"
                />
            </TouchableOpacity>
            <View style={styles.getstarted}>
                <Text style={styles.title}>Login to continue</Text>
            </View>
            <View style={styles.inputContainer}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={styles.emailContainer}>
                        <TextInput style={styles.input} placeholder="Email"  onChangeText={(value)=>setEmail(value)} />
                    </View>
                </View>
                {
               error.email && <Text style={{color:'red'}}>{error.email}</Text>
                }
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={styles.emailContainer}>
                        <TextInput style={styles.input} placeholder="password"   secureTextEntry={hidePassword}   onChangeText={(value)=>setPassword(value)}/>
                        {/* <Feather name="eye-off" size={24} color="green" style={styles.icon} onPress={()=>{setHide(!hidePassword)}}/> */}
                        <Feather
                        name={hidePassword ? "eye-off" : "eye"} 
                        size={24}
                        color="green"
                        style={styles.icon}
                        onPress={passwordVisibility} 
                    />
                    </View>
                </View>
                {
               error.password && <Text style={{color:'red'}}>{error.password}</Text>
                }

            </View>
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}> Login</Text>
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', padding: 10 }} onPress={() => navigation.navigate("sign up")}>You don't have an account? create One </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 20,
        marginTop: 20,
        padding: 23
    },

    inputContainer: {
        width: '100%',
        marginBottom: 1,
    },
    icon: {
        right: 30
    },
    input: {
        height: 50,
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginTop:34
    },
    emailContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },

    button: {
        height: 50,
        width: width - 40,
        backgroundColor: '#08C25E',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    signInText: {
        marginTop: 20,
        color: 'blue',
        textDecorationLine: 'none',
    },

    item: {
        padding: 12
    },
    getstarted: {
        justifyContent: "left",
        alignItems: "left",
        marginTop: 30,
        fontSize:100

    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    footer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
    },
    apple: {
        width: width - 40,
        borderColor: "black",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 7,
        borderRadius: 5
    },
    google: {
        width: width - 40,
        borderColor: "black",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 7,
        borderRadius: 5,
        marginTop: 10
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
});