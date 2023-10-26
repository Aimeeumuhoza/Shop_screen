
import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, Pressable, StyleSheet, Modal, KeyboardAvoidingView, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { deleteItemAsync, getItemAsync } from 'expo-secure-store';
import { setAuthStatus, setLoaded, setAuthProfile, setAuthToken } from "../Redux/AuthSlice"
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';


const API_BASE_URL = 'https://grocery-9znl.onrender.com/api/v1';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM4YWUxYzE4ZTU1YTc4NDA0MzUxNmQiLCJpYXQiOjE2OTgzMjg3MzQsImV4cCI6MTY5ODMzOTUzNH0.GyYY9_FnZtWACW80ZN5nPNs1l59XY9ofrTzkqgzKPpI';

const UserProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(null);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const getUser = async () => {
      try {
        const storedData = await getItemAsync("authProfile");
        const parsedData = JSON.parse(storedData);
        setData(parsedData);
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    getUser();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("fullName", fullName);
      formData.append("location", location);
      formData.append("phone", phone);

      if (profileImage) {
        const localUri = profileImage;
        const filename = localUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        formData.append("profileImage", {
          uri: localUri,
          name: `${new Date().getTime()}_profile.${match[1]}`,
          type: type,
        });
      }

      const response = await axios.patch(
        `${API_BASE_URL}/auth/users/updateProfile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Profile Updated:", response.data);
      setData(response.data);
      alert("User updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update user profile");
    } finally {
      setModalVisible(false);
    }
  };

  const handLogout = async () => {
    await deleteItemAsync("authToken");
    await deleteItemAsync("authProfile");
    dispatch(setAuthToken(null));
    dispatch(setAuthStatus(false));
    dispatch(setAuthProfile(null));
    navigation.navigate("Login");
  };

  return (
  
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <KeyboardAvoidingView style={styles.centeredView} behavior="padding">
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Update Profile</Text>
              <View class={styles.imageContainer}>


                <TouchableOpacity style={styles.imagePicker} >
                  {/* {profilePicture?(  <FontAwesome name="upload" size={12} color="white" onPress={uploadProfileImage} />)} */}
                  <FontAwesome name="upload" size={12} color="white" onPress={pickImage}/>
                </TouchableOpacity>
              </View>
              <TextInput onChangeText={(email) => setEmail(email)} style={styles.userText} placeholder="email" />
              <TextInput onChangeText={(fullName) => setFullName(fullName)} style={styles.userText} placeholder="fullname" />
              <TextInput onChangeText={(location) => setLocation(location)} style={styles.userText} placeholder="location" />
              <TextInput onChangeText={(phone) => setPhone(phone)} style={styles.userText} placeholder="phone Number" keyboardType="numeric" />
              <View class={styles.modalButn}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
                <Pressable
                  onPress={handleUpdate}
                  style={styles.buttonClose}
                >
                  <Text style={styles.textStyle}>Update</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
      <View style={styles.title}>
        <Text
          style={styles.text}
        >My Account
        </Text>
      </View>
      <View style={styles.userDetails}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={styles.image}
            source={profileImage ? { uri: profileImage } :{uri: data && data.profileImage} }
            // source={{uri: data && data.profileImage}}
          />

          <Pressable style={styles.butn} onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.changeButton}>Change profile</Text>
          </Pressable>
        </View>
        <View>
          <Text style={styles.userdata} >persanal Information</Text>
          <Text style={styles.userdata} >FullName: {data && data.fullName}</Text>
          <Text style={styles.userdata} >Address: {data && data.location}</Text>
          <Text style={styles.userdata} >Email: {data && data.email}</Text>
          <Text style={styles.userdata} >phone: {data && data.phone}</Text>
          <Text style={styles.userdata} >About</Text>
          <Text style={styles.userdata} >Help</Text>
          <TouchableOpacity onPress={handLogout} style={{ flexDirection: 'row', alignContent: 'space-between' }}>
            <Text>Logout</Text>
            {/* <View style={{ marginLeft: 9 }}>
            </View> */}
          </TouchableOpacity>
        </View>

        {/* <Pressable style={styles.button}>
          <Text style={styles.changeButton}>LOG OUT</Text>
        </Pressable> */}
      </View>
    </View>
  )
  
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
        width: "100%",
        height: "100%",
        flex: 1
      },
      text: {
        marginTop: 50,
        marginLeft: 50,
        marginBottom: 50,
        color: 'black',
        fontSize: 20,
        fontWeight: "bold"
      },
      imagePicker: {
        position: 'absolute',
        right: 1,
        bottom: 5,
        backgroundColor: 'grey',
        padding: 8,
        borderRadius: 100,
        elevation: 20,
      },
      imageContainer: {
        flexDirection: 'row',
        alignContent: 'flex-end',
        marginLeft: 6
    
    
      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 78,
        marginBottom: 40
      },
      userDetails: {
        marginTop: 12,
        marginLeft: 15,
        flex: 1,
      },
      userdata: {
        marginBottom: 20,
        fontSize: 18,
        fontWeight: "bold"
      },
      butn: {
        marginTop: 56,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 1,
        width: '30%',
        height: '22%'
      },
      changeButton: {
        color: "green",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: 'center'
      },
      imageContainer: {
    
      },
      button: {
        marginTop: 100,
        backgroundColor: "grey",
        borderRadius: 20,
        padding: 10
      },
      centeredView: {
        marginTop: -3,
        borderRadius: 30,
        // height:134
    
      },
      modalView: {
        margintop: 12,
        backgroundColor: "green",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        // flex: 6,
      },
      buttonClose: {
    
        backgroundColor: "grey",
        marginTop: 4,
        backgroundColor: "grey",
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row'
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        flexDirection: "row"
      },
      modalButn: {
        flexDirection: "row"
      },
      userText: {
        width: "100%",
        height: 40,
        margin: 20,
        borderRadius: 15,
        backgroundColor: "white",
        color: "black",
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: "bold"
      },
      modalText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        color: "white"
      }
  
});











// source={{uri: data && data.profileImage}}

// import React, { useEffect, useState } from "react";
// import { Text, View, Image, ScrollView, Pressable, StyleSheet, Modal, KeyboardAvoidingView, TextInput, TouchableOpacity } from "react-native";
// import { FontAwesome, AntDesign } from '@expo/vector-icons';
// import { deleteItemAsync, getItemAsync } from 'expo-secure-store';
// import { setAuthStatus, setLoaded, setAuthProfile, setAuthToken } from "../Redux/AuthSlice"
// import { useDispatch } from "react-redux";
// import axios from "axios";
// import { useNavigation } from "@react-navigation/native";
// import * as ImagePicker from 'expo-image-picker';




// const UserProfile = () => {
//   const [modalVisible, setModalVisible] = useState(false);

//   const [data, setData] = useState(null)
//   const [email, setEmail] = useState("")
//   const [fullName, setFullName] = useState("")
//   const [location, setLocation] = useState("")
//   const [profilePicture, setprofilePicture] = useState(null);
//   const [phone, setPhone] = useState("")


//   // const pickImage=()=>{
//   //   const [image, setImage] = useState(null);

//   //   const openImageLibrary= async()=>{
//   //     const {status}=await ImagePicker.requestMediaLibraryPermissionsAsync();

//   //     if (status!=='granted'){
//   //       alert('sorry, we need camera roll permissions ')
//   //     }
//   //     if (status==='granteed'){
//   //       const response =await ImagePicker.launchImageLibraryAsync({
//   //         mediaTypes:ImagePicker.MediaTypeOptions.Images,
//   //         allowsEditing:true,
//   //       });
//   //       if(!response.canceled){
//   //         setImage(response.uri);
//   //       }
//   //     }
//   //   };
//   //   const uploadProfileImage=()=>{

//   //     const formData= new formData()
//   //     formData.append()
//   //   }

//   // }





//   // const pickImage = async () => {
//   //   let result = await ImagePicker.launchImageLibraryAsync({
//   //     mediaTypes: ImagePicker.MediaTypeOptions.All,
//   //     allowsEditing: true,
//   //     aspect: [4, 3],
//   //     quality: 1,
//   //   });

//   //   if (!result.canceled) {
//   //     setImage(result.uri);
//   //   }
//   // };


//   const API_BASE_URL = 'https://grocery-9znl.onrender.com/api/v1';
//   const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNTgwZjg2ZGExODkxYmFjZDc4NGEiLCJpYXQiOjE2OTgzMjI0NDcsImV4cCI6MTY5ODMzMzI0N30.49BF_UDGgm4ef3HxrgadgAojH_KHQV3tIJb1Y2b75kw';

//   const handleUpdate = async () => {

//     try {
//       const res = await axios.patch(
//         `${API_BASE_URL}/auth/users/updateProfile`,
//         {
//           // profilePicture: profilePicture,
//           email: email,
//           fullName: fullName,
//           location: location,
//           phone: phone,



//         },
//         {
//           headers: {
//             Authorization: `Bearer ${TOKEN}`,
//           },
//         }
//       );
//       console.log("phone:", phone);
//       alert('user updated', res.data)
//       setData(res.data);
//     } catch (error) {

//       console.error('Error updating profile:', error);
//     } finally {
//       setModalVisible(false);
//     }
//   };



//   const dispatch = useDispatch();

//   const navigation = useNavigation()

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const storedData = await getItemAsync('authProfile');
//         const parsedData = JSON.parse(storedData);
//         setData(parsedData);

//       } catch (error) {
//         console.error('Error retrieving user data:', error);
//       }
//     };

//     getUser();
//   }, []);


//   const handLogout = async () => {
//     deleteItemAsync('authToken');
//     deleteItemAsync('authProfile');
//     dispatch(setAuthToken(null));
//     dispatch(setAuthStatus(false));
//     dispatch(setAuthProfile(null));
//     navigation.navigate('Login');
//   };

//   return (

//     <View style={styles.container}>
//       <View style={styles.centeredView}>
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => {
//             Alert.alert("Modal has been closed.");
//             setModalVisible(!modalVisible);
//           }}
//         >
//           <KeyboardAvoidingView style={styles.centeredView} behavior="padding">
//             <View style={styles.modalView}>
//               <Text style={styles.modalText}>Update Profile</Text>
//               <View class={styles.imageContainer}>


//                 <TouchableOpacity style={styles.imagePicker} >
//                   {/* {profilePicture?(  <FontAwesome name="upload" size={12} color="white" onPress={uploadProfileImage} />)} */}
//                   {/* <FontAwesome name="upload" size={12} color="white" onPress={pickImage} /> */}
//                 </TouchableOpacity>
//               </View>
//               <TextInput onChangeText={(email) => setEmail(email)} style={styles.userText} placeholder="email" />
//               <TextInput onChangeText={(fullName) => setFullName(fullName)} style={styles.userText} placeholder="fullname" />
//               <TextInput onChangeText={(location) => setLocation(location)} style={styles.userText} placeholder="location" />
//               <TextInput onChangeText={(phone) => setPhone(phone)} style={styles.userText} placeholder="phone Number" keyboardType="numeric" />
//               <View class={styles.modalButn}>
//                 <Pressable
//                   style={[styles.button, styles.buttonClose]}
//                   onPress={() => setModalVisible(!modalVisible)}
//                 >
//                   <Text style={styles.textStyle}>Close</Text>
//                 </Pressable>
//                 <Pressable
//                   onPress={handleUpdate}
//                   style={styles.buttonClose}
//                 >
//                   <Text style={styles.textStyle}>Update</Text>
//                 </Pressable>
//               </View>
//             </View>
//           </KeyboardAvoidingView>
//         </Modal>
//       </View>
//       <View style={styles.title}>
//         <Text
//           style={styles.text}
//         >My Account
//         </Text>
//       </View>
//       <View style={styles.userDetails}>
//         <View style={{ flexDirection: 'row' }}>
//           <Image
//             style={styles.image}
//             source={profilePicture ? { uri: profilePicture } : require("../assets/1.jpg")}
//           />

//           <Pressable style={styles.butn} onPress={() => setModalVisible(!modalVisible)}>
//             <Text style={styles.changeButton}>Change profile</Text>
//           </Pressable>
//         </View>
//         <View>
//           <Text style={styles.userdata} >persanal Information</Text>
//           <Text style={styles.userdata} >FullName: {data && data.fullName}</Text>
//           <Text style={styles.userdata} >Address: {data && data.location}</Text>
//           <Text style={styles.userdata} >Email: {data && data.email}</Text>
//           <Text style={styles.userdata} >phone: {data && data.phone}</Text>
//           <Text style={styles.userdata} >About</Text>
//           <Text style={styles.userdata} >Help</Text>
//           <TouchableOpacity onPress={handLogout} style={{ flexDirection: 'row', alignContent: 'space-between' }}>
//             <Text>Logout</Text>
//             {/* <View style={{ marginLeft: 9 }}>
//             </View> */}
//           </TouchableOpacity>
//         </View>

//         {/* <Pressable style={styles.button}>
//           <Text style={styles.changeButton}>LOG OUT</Text>
//         </Pressable> */}
//       </View>
//     </View>
//   )
// }

// export default UserProfile

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     height: "100%",
//     flex: 1
//   },
//   text: {
//     marginTop: 50,
//     marginLeft: 50,
//     marginBottom: 50,
//     color: 'black',
//     fontSize: 20,
//     fontWeight: "bold"
//   },
//   imagePicker: {
//     position: 'absolute',
//     right: 1,
//     bottom: 5,
//     backgroundColor: 'grey',
//     padding: 8,
//     borderRadius: 100,
//     elevation: 20,
//   },
//   imageContainer: {
//     flexDirection: 'row',
//     alignContent: 'flex-end',
//     marginLeft: 6


//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 78,
//     marginBottom: 40
//   },
//   userDetails: {
//     marginTop: 12,
//     marginLeft: 15,
//     flex: 1,
//   },
//   userdata: {
//     marginBottom: 20,
//     fontSize: 18,
//     fontWeight: "bold"
//   },
//   butn: {
//     marginTop: 56,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 1,
//     width: '30%',
//     height: '22%'
//   },
//   changeButton: {
//     color: "green",
//     fontSize: 15,
//     fontWeight: "bold",
//     textAlign: 'center'
//   },
//   imageContainer: {

//   },
//   button: {
//     marginTop: 100,
//     backgroundColor: "grey",
//     borderRadius: 20,
//     padding: 10
//   },
//   centeredView: {
//     marginTop: -3,
//     borderRadius: 30,
//     // height:134

//   },
//   modalView: {
//     margintop: 12,
//     backgroundColor: "green",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//     // flex: 6,
//   },
//   buttonClose: {

//     backgroundColor: "grey",
//     marginTop: 4,
//     backgroundColor: "grey",
//     borderRadius: 20,
//     padding: 10,
//     flexDirection: 'row'
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     flexDirection: "row"
//   },
//   modalButn: {
//     flexDirection: "row"
//   },
//   userText: {
//     width: "100%",
//     height: 40,
//     margin: 20,
//     borderRadius: 15,
//     backgroundColor: "white",
//     color: "black",
//     paddingLeft: 10,
//     fontSize: 16,
//     fontWeight: "bold"
//   },
//   modalText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "white"
//   }
// })