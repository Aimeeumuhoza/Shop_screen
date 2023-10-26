import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { deleteItemAsync, getItemAsync } from "expo-secure-store";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const API_BASE_URL = "https://grocery-9znl.onrender.com/api/v1";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNTgwZjg2ZGExODkxYmFjZDc4NGEiLCJpYXQiOjE2OTgzMjI0NDcsImV4cCI6MTY5ODMzMzI0N30.49BF_UDGgm4ef3HxrgadgAojH_KHQV3tIJb1Y2b75kw";

const UserProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

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

    if (!result.cancelled) {
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

      const response = await axios.patch(`${API_BASE_URL}/auth/users/updateProfile`, formData, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      console.log("Profile Updated:", response.data);
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
    navigation.navigate("Login");
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const storedData = await getItemAsync("authProfile");
        const parsedData = JSON.parse(storedData);
        setEmail(parsedData.email);
        setFullName(parsedData.fullName);
        setLocation(parsedData.location);
        setPhone(parsedData.phone);
        setProfileImage(parsedData.profileImage);
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
          <KeyboardAvoidingView style={styles.centeredView} behavior="padding">
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Update Profile</Text>
              <TouchableOpacity style={styles.imagePicker}>
                <FontAwesome name="upload" size={12} color="white" onPress={pickImage} />
              </TouchableOpacity>
              <TextInput onChangeText={(email) => setEmail(email)} style={styles.userText} placeholder="Email" value={email} />
              <TextInput onChangeText={(fullName) => setFullName(fullName)} style={styles.userText} placeholder="Full Name" value={fullName} />
              <TextInput onChangeText={(location) => setLocation(location)} style={styles.userText} placeholder="Location" value={location} />
              <TextInput onChangeText={(phone) => setPhone(phone)} style={styles.userText} placeholder="Phone Number" keyboardType="numeric" value={phone} />
              <View style={styles.modalButn}>
                <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
                <Pressable style={styles.buttonClose} onPress={handleUpdate}>
                  <Text style={styles.textStyle}>Update</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
      <View style={styles.title}>
        <Text style={styles.text}>My Account</Text>
      </View>
      <View style={styles.userDetails}>
        <View style={{ flexDirection: "row" }}>
          <Image style={styles.image} source={profileImage ? { uri: profileImage } : require("../assets/1.jpg")} />
          <Pressable style={styles.butn} onPress={() => setModalVisible(true)}>
            <Text style={styles.changeButton}>Change Profile</Text>
          </Pressable>
        </View>
        <View>
          <Text style={styles.userdata}>Personal Information</Text>
          <Text style={styles.userdata}>Full Name: {fullName}</Text>
          <Text style={styles.userdata}>Address: {location}</Text>
          <Text style={styles.userdata}>Email: {email}</Text>
          <Text style={styles.userdata}>Phone: {phone}</Text>
          <Text style={styles.userdata}>About</Text>
          <Text style={styles.userdata}>Help</Text>
          <TouchableOpacity onPress={handLogout} style={{ flexDirection: "row", alignContent: "space-between" }}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  // ...styles (your existing styles here)
});
