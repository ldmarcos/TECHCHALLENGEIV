import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight, Image } from 'react-native';
import Docentes from '../screens/professores';
import Alunos from '../screens/alunos';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';


export default function Usuarios() {
  const [activeTab, setActiveTab] = useState('Docentes');
  const navigation = useNavigation()
  const renderContent = () => {
    switch (activeTab) {
      case 'Docentes':
        return <Docentes />;
      case 'Alunos':
        return <Alunos />;
      default:
        return null;
    }
  };

  function addUser(){
    if(activeTab === 'Docentes'){
        navigation.navigate('NewDocente',{
          grupo: 'Docentes'
        })
    }else{
        navigation.navigate('NewAluno',{
          grupo: 'Alunos'
        }) 
    }
    
  }

  return (
    <>
      <Header titulo={'Controle de Usuários'}/>
    <View style={{ flex: 1 }}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'Docentes' && styles.activeTab]}
          onPress={() => setActiveTab('Docentes')}
        >
          <Text style={styles.tabText}>Docentes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'Alunos' && styles.activeTab]}
          onPress={() => setActiveTab('Alunos')}
        >
          <Text style={styles.tabText}>Alunos</Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </View>
    <TouchableHighlight onPress={addUser}>
                    <View style={styles.btnNovoUser}>
                        <Image style={styles.icon} source={(require('../../assets/icons/addUser.png'))}/>
                    </View>
        </TouchableHighlight>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#2579E7',
  },
  tabItem: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  tabText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  btnNovoUser:{
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: 'green',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    },

    icon:{
        width: 32,
        height: 32
    }
});
