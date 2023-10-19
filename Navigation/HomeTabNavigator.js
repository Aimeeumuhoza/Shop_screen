import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Main from "../Sreens/Main"
import { FontAwesome ,Zocial,MaterialCommunityIcons  } from '@expo/vector-icons';
import SignIn from '../Sreens/signIn';
import SignUp from '../Sreens/signUp';

const Tab = createBottomTabNavigator()
const HomeTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="main"
                component={Main}
                options={{
                    tabBarIcon: ({ color }) => (
                      
                        <FontAwesome name="shopping-basket" size={24} color='green' />
                        
                    ),
                    headerShown:false
                }}

                title="Home"
            />
            <Tab.Screen
                name="SignIn"
                component={SignIn}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Zocial name="cart" size={24} color={color} />
                    ),
                    headerShown:false
                }}
            />
            <Tab.Screen 
                name="SignUp"
                component={SignUp}
                options={{
                    tabBarIcon:({color})=>(
                        <FontAwesome name="shopping-bag" size={24} color={color} />
                    )
                }}
            />
             {/* <Tab.Screen 
                name="Main"
                component={Main}
                options={{
                    tabBarIcon:({color})=>(
                        <MaterialCommunityIcons name="account" size={24} color="black" />
                    )
                }}
            /> */}
        </Tab.Navigator>
    )
}

export default HomeTabNavigator
