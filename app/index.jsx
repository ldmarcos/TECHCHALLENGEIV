import React from 'react';
import AuthProvider from '../context/AuthContext';
import TabLayout from './navigation/_layout';
import { createStackNavigator } from '@react-navigation/stack';
import NewPostScreen from './screens/NewPost';
import EditPostScreen from './screens/EditPost';
import PostScreen from './screens/Post';

const Stack = createStackNavigator();

export default function App() {

  return (
    <AuthProvider>
        <Stack.Navigator initialRouteName="Navigation">
          <Stack.Screen options={{headerShown: false}} name="Navigation" component={TabLayout} />
          <Stack.Screen options={{headerShown: false}}  name="Post" component={PostScreen} />
          <Stack.Screen options={{headerShown: false}}  name="EditPost" component={EditPostScreen} />
          <Stack.Screen options={{headerShown: false}}  name="NewPost" component={NewPostScreen} />
        </Stack.Navigator>
    </AuthProvider>
  );
}
