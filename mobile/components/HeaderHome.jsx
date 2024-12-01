import { useState } from "react"
import { View, Image, Text, TextInput } from "react-native"
import { StyleSheet } from "react-native"
const HeaderHome = ({titulo, search, setSearch}) => {
    return(
    <View style={styles.headerContainer}>
        <View style={styles.header}>
            <Image style={styles.img} source={require('../assets/images/logo.png')}/>
            <Text style={styles.tituloPagina}>{titulo}</Text>
        </View>
        <View style={styles.barraPesquisa}>
            <Image style={styles.imgPesquisa} source={require('../assets/icons/search.png')}/>
            <TextInput style={styles.textoPesquisa} value={search} placeholder="Pesquisar" onChangeText={(text) => setSearch(text)}/>
        </View>
    </View>
    )
}

export default HeaderHome

const styles = StyleSheet.create({
    headerContainer:{
        width: '100vw',
        height: 150,
        backgroundColor: '#2579E7', 
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
    },

    header:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'left',
        gap: 10
    },

    tituloPagina:{
        fontSize: 25,
        color: 'white',
        fontWeight: '600',
        textAlign: 'center'
    },

    img:{
        width: 76,
        height: 70,
    },

    barraPesquisa:{
        width: '70%',
        height: '25%',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },

    imgPesquisa:{
        width: '10%',
        height: '100%'
    },

    textoPesquisa:{
        height: '100%'
    }
})