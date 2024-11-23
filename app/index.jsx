import React from 'react';
import AuthProvider from '../context/AuthContext';
import TabLayout from './screens/_layout';
import { createStackNavigator } from '@react-navigation/stack';
import NewPostScreen from './NewPost';
import EditPostScreen from './screens/EditPost';
import PostScreen from './screens/Post';

const Stack = createStackNavigator();

export default function App() {

  return (
    <AuthProvider>
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{headerShown: false}} name="Home" component={TabLayout} />
        <Stack.Screen options={{headerShown: false}}  name="Post" component={PostScreen} />
        <Stack.Screen options={{headerShown: false}}  name="EditPost" component={EditPostScreen} />
        <Stack.Screen options={{headerShown: false}}  name="NewPost" component={NewPostScreen} />
      </Stack.Navigator>
    </AuthProvider>
  );
}
