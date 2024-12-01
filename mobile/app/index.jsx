import React from 'react';
import AuthProvider from '../context/AuthContext';
import TabLayout from './navigation/_layout';
import { createStackNavigator } from '@react-navigation/stack';
import NewPostScreen from './screens/NewPost';
import NewDocenteScreen from './screens/NewDocente';
import NewAlunoScreen from './screens/NewAluno';
import EditPostScreen from './screens/EditPost';
import EditDocenteScreen from './screens/EditDocente';
import EditAlunoScreen from './screens/EditAluno';
import PostScreen from './screens/Post';
import { MenuProvider } from 'react-native-popup-menu';

const Stack = createStackNavigator();

export default function App() {

  return (
    <AuthProvider>
      <MenuProvider>
      <Stack.Navigator initialRouteName="Navigation">
          <Stack.Screen options={{headerShown: false}} name="Navigation" component={TabLayout} />
          <Stack.Screen options={{headerShown: false}}  name="Post" component={PostScreen} />
          <Stack.Screen options={{headerShown: false}}  name="EditPost" component={EditPostScreen} />
          <Stack.Screen options={{headerShown: false}}  name="NewPost" component={NewPostScreen} />
          <Stack.Screen options={{headerShown: false}}  name="NewDocente" component={NewDocenteScreen} />
          <Stack.Screen options={{headerShown: false}}  name="NewAluno" component={NewAlunoScreen} />
          <Stack.Screen options={{headerShown: false}}  name="EditDocente" component={EditDocenteScreen} />
          <Stack.Screen options={{headerShown: false}}  name="EditAluno" component={EditAlunoScreen} />
        </Stack.Navigator>
      </MenuProvider>
    </AuthProvider>
  );
}
