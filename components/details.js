import * as React from 'react';
import { Text, View, StyleSheet, Image, } from 'react-native';

export default function Details({ route, navigation }) {

    const {userName, lastName} = route.params;
    return (

    <View>
        <Text>Name: {userName}</Text>
        <Text>Lastname:{lastName}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CCD5AE',
        paddingTop: 40,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
}

)