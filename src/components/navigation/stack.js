import React, {useState, navigation} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {EnterOtp, Login} from '../../screens/user/login'
import Register_User from '../../screens/user/user_registration'
import {User_Dashboard} from '../../screens/user/dashboard'

const Stack = createStackNavigator();

const MyStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Login} options={{title : "Login"}} />
        <Stack.Screen name="otp" component={EnterOtp} options={{title : "Verification"}} />
        <Stack.Screen name="register_user" component={Register_User} options={{title : "User Registration", headerLeft:null}} />
        <Stack.Screen name="user_dashboard" component={User_Dashboard} options={{title : "Dashboard", headerLeft:null}} />
      </Stack.Navigator>
  );
};


export default MyStack;