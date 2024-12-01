import { View, Text, Image, TouchableOpacity, TouchableHighlight } from "react-native"
import { StyleSheet } from "react-native"
import { useNavigation } from 'expo-router';
import Popup from "./Popup";


const ListagemPost = ({id, titulo, data, autor}) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Post', {
            id,
        });
    };
    return(
        <View style={styles.postContainer}>
            <TouchableOpacity style={styles.infoContainer} onPress={handlePress}> 
                <View style={styles.infoGeral}>
                    <Text style={styles.tituloPost}>{titulo}</Text>
                    <View style={styles.infoPost}>
                        <Text style={styles.infoPostText}>{data}</Text>
                        <Text style={styles.infoPostText}>{autor}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            {/*<TouchableOpacity onPress={handleOptions}>
                        <View>
                            <Image style={styles.btnOptions} source={require('../assets/icons/menu.png')} />
                        </View>
            </TouchableOpacity>*/}
             {<Popup idPost={id}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    postContainer:{
        width: '100%',
        height: 100,
        backgroundColor: 'white',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },

    infoContainer:{
        width: '80%'
    },
    infoGeral:{
        maxWidth: '75%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        gap: 12
    },

    tituloPost:{
        fontSize: 16,
        fontWeight: '800'
    },

    infoPost:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    infoPostText:{
        fontWeight: '700',
        color: 'gray'
    },

    btnOptions:{
        width: 40,
        height: 40
    }
})

export default ListagemPost