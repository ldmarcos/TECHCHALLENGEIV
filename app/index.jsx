import React from 'react';
import AuthProvider from '../context/AuthContext';
import TabLayout from './screens/_layout';
export default function App() {
  return (
    <AuthProvider>
        <TabLayout/>
    </AuthProvider>
  );
}
