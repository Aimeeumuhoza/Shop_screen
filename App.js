import React, { useState } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Router from "./Navigation/Route";
import UserProfile from "./Sreens/Profile"
import { Provider } from "react-redux";
import Store from "./Redux/store";
import Payment from "./Sreens/Payment"
import CategoriesComponent from "./Sreens/Get"

const slides = [
  {
    key: 1,
    text: "Easy shopping",
    text2: "Fresh groceries at your doorstep in the next hour \n ",
    image: require("./assets/1.jpg"),
    backgroundColor: "#59b2ab",
  },
  {
    key: 2,
    text: "Description",
    text2: "Find all needed for \n\n Find all needed forFind all needed for",
    image: require("./assets/2.jpg"),
    backgroundColor: "#febe29",
  },
  {
    key: 3,
    text: "Information",
    text2: "for more description \n\n follow .....",
    image: require("./assets/3.jpg"),
    backgroundColor: "#22bcb5",
  },
];

const App = () => {
  const [showRealApp, setShowRealApp] = useState(false);

  const RenderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
        <Text style={styles.text2}>{item.text2}</Text>
      </View>
    );
  };

  const bottomButton = () => {
    return (
      <View style={styles.bottomButtonContainer}>
        <Text style={styles.bottomButtonText}>Next</Text>
      </View>
    );
  };

  return showRealApp ? (
    <>
      <Provider store={Store}>
        <Router />
        {/* <CategoriesComponent/> */}
      </Provider>
    </>
  ) : (
    <AppIntroSlider
      dotStyle={{ backgroundColor: 'lightgreen' }}
      activeDotStyle={{ backgroundColor: 'green' }}
      data={slides}
      onDone={() => setShowRealApp(true)}
      renderItem={RenderItem}
      bottomButton={bottomButton}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    alignItems: "center",
    marginTop: 200,
  },
  text: {
    color: "#000",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  text2: {
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  },
  bottomButtonContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonText: {
    color: "green",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default App;
