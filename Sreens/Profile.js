import React, { useState } from "react";
import { Text, View, Image,ScrollView, Pressable, StyleSheet, Modal, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome ,AntDesign } from '@expo/vector-icons';



const UserProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ email, setEmail] = useState("@gmail.com")
  const [ username, setUsername] = useState("A")
 const handleUpdate = () =>{}

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
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Update Profile</Text>
              <View class={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
                />
                <TouchableOpacity style={styles.imagePicker}>
                  <FontAwesome name="upload" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <TextInput onChangeText={()=> setEmail(email)} style={styles.userText} placeholder="email" />
              <TextInput onChangeText={()=> setUsername(username)} style={styles.userText} placeholder="username" />
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
          </View>
        </Modal>
      </View>
      <View style={styles.title}>
        <Text
          style={styles.text}
        >My Account
        </Text>
      </View>
      <View style={styles.userDetails}>
        <View style={{flexDirection:'row'}}>
        <Image
          style={styles.image}
          source={require("../assets/1.jpg")}
        />
         <Pressable style={styles.butn} onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.changeButton}>Change profile</Text>
        </Pressable>
        </View>
        <View>
        <Text style={styles.userdata} >persanal Information</Text>
        <Text style={styles.userdata} >Address</Text>
        <Text style={styles.userdata} >Password</Text>
        <Text style={styles.userdata} >About</Text>
          <Text style={styles.userdata} >Help</Text>
          <TouchableOpacity style={{flexDirection:'row',alignContent:'space-between'}}>
          <Text>Logout</Text>
          <View style={{marginLeft:9}}>
          
          </View>
          </TouchableOpacity>
        </View>
       
        {/* <Pressable style={styles.button}>
          <Text style={styles.changeButton}>LOG OUT</Text>
        </Pressable> */}
      </View>
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex:1
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
    flexDirection:'row',
    alignContent:'flex-end',
    marginLeft:6


  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 78,
    marginBottom: 40
  },
  userDetails: {
marginLeft:15
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
    width:'30%',
    height:'22%'
  },
  changeButton: {
    color: "green",
    fontSize: 15,
    fontWeight: "bold",
    textAlign:'center'
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
    marginTop: 22,
    borderRadius: 30,

  },
  modalView: {
    margin: 20,
    backgroundColor: "green",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: "grey",
    marginBottom: 20,
    backgroundColor: "grey",
    borderRadius: 20,
    padding: 10,
    flexDirection:'row'
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
})

