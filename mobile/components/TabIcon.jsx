import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const TabIcon = ({ icon, name, color, focused }) => {
    return (
        <View style={styles.container}>
            <Image
                source={icon}
                resizeMode="contain"
                style={[styles.icon, { tintColor: color }]}
            />
            <Text style={[styles.text, { color: color }, focused ? styles.focusedText : styles.unfocusedText]}>
                {name}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center', 
        gap: 2,
    },
    icon: {
        width: 24,
        height: 24,
    },
    text: {
        fontSize: 12, 
    },
});

export default TabIcon;
