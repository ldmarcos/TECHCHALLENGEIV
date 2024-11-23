import { View, StyleSheet, Image  } from 'react-native'
import React from 'react'

export default function Capa({fonte}) {
  return (
    <View>
      <View style={styles.separator}/>
      <Image style={styles.imgCapa} source={{uri: fonte}}/>
      <View style={styles.separator}/>
    </View>
  )
}

const styles = StyleSheet.create({
    separator: {
      height: 1.5, 
      width: '100%',
      backgroundColor: '#2579E7',
    },

    imgCapa:{
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10
    }
  });