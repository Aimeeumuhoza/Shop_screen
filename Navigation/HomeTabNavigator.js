import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Main from "../Sreens/Main"
import { FontAwesome ,Zocial,MaterialCommunityIcons  } from '@expo/vector-icons';
import SignIn from '../Sreens/signIn';
import SignUp from '../Sreens/signUp';
import Login from '../Sreens/Login';
import Cart from '../Sreens/Cart';
import Landing  from "../Sreens/Landing"
import CategoryScreen from "../Sreens/Vegetable"

const Tab = createBottomTabNavigator()
const HomeTabNavigator = () => {
    return (
        <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'green',
      }}
    >
            <Tab.Screen name="main"
                component={Main}
                options={{
                    tabBarIcon: ({ color }) => (
                      
                        <FontAwesome name="shopping-basket" size={24} color={color} />
                        
                    ),
                    headerShown:false
                }}

                title="Home"
            />
            <Tab.Screen
                name="CategoryScreen"
                component={CategoryScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Zocial name="cart" size={24} color={color} />
                    ),
                    headerShown:false
                }}
            />
            <Tab.Screen 
                name="SignIn"
                component={SignIn}
                options={{
                    tabBarIcon:({color})=>(
                        <FontAwesome name="shopping-bag" size={24} color={color} />
                    ),
                    headerShown:false
                }}
            />
             <Tab.Screen 
                name="Login"
                component={Login}
                options={{
                    tabBarIcon:({color})=>(
                        <MaterialCommunityIcons name="account" size={24} color={color} />
                    ),
                    headerShown:false
                }}
            />
        </Tab.Navigator>
    )
}

export default HomeTabNavigator
