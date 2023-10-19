import React from 'react';
import { StyleSheet, View } from 'react-native';
import Vg from './Sreens/Vg'
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
   <Vg/>
    </SafeAreaView>
 
  
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
  },
});
