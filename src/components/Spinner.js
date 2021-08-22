import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Spinner() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="small" color="#0000ff" />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    }
});