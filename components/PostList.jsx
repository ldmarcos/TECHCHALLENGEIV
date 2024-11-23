import { View, Text, Image, TouchableOpacity } from "react-native"
import { StyleSheet } from "react-native"
import { useNavigation } from 'expo-router';

const PostList = ({id, titulo, conteudo, data, autor, capa})=>{
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Post', {
            id,
        });
    };

    return(
        <View style={styles.Container}>
            <TouchableOpacity style={styles.postContainer} onPress={handlePress}>    
                    <Image style={styles.capaPost} source={{uri: capa}}/>
                    <View style={styles.infoPost}>
                        <Text style={styles.tituloPost}>{titulo}</Text>
                        <Text style={styles.resumoPost}>{conteudo}</Text>
                        <View style={styles.infoPostRodape}>
                            <Text style={styles.data}>{data}</Text>
                            <Text style={styles.autor}>{autor}</Text>
                        </View>
                    </View>
            </TouchableOpacity>
        </View>
    
    )
}

const styles = StyleSheet.create({

    Container: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },

    postContainer: {
        height: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000', // Cor da sombra
        shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra (horizontal e vertical)
        shadowOpacity: 0.1, // Opacidade da sombra (suave)
        shadowRadius: 4, // Difusão da sombra
        elevation: 3, // Para aplicar a sombra no Android
      },
      capaPost: {
        width: '100%',
        height: 150,
      },
      infoPost: {
        padding: 12,
      },
      tituloPost: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
      },
      resumoPost: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
      },
      infoPostRodape: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      data: {
        fontSize: 12,
        color: '#999',
      },
      autor: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
      },
})


export default PostList