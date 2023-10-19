import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
// import Landing from '../Sreens/Landing'
import SignUp from '../Sreens/signUp'
import { AntDesign } from '@expo/vector-icons';
import SignIn from '../Sreens/signIn'
import Main from '../Sreens/Main'
import Choi from '../Sreens/Choi';
import HomeTabNavigator from './HomeTabNavigator'
import CategoryScreen from '../Sreens/Vegetable';

const Stack = createStackNavigator()

const Router = () => {
    return (
        <NavigationContainer>
            < Stack.Navigator>
                
                  <Stack.Screen
                    name={'HomeTabNavigator'}
                    component={HomeTabNavigator}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name={"sign up"}
                    component={SignUp}
                    options={{
                        headerShown: false

                    }}
                />
                <Stack.Screen
                    name={"sign in"}
                    component={SignIn}
                />

                <Stack.Screen
                    name={"main"}
                    component={Main}
                    options={{
                        headerShown: false
                    }}
                />
                
                <Stack.Screen
                    name={"CategoryScreen"}
                    component={CategoryScreen}
                    options={{
                        headerShown: false
                    }}
                />
                     <Stack.Screen
                    name={"Choi"}
                    component={Choi}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router
