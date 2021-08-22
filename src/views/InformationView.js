import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';

export default function InformationView() {

    const { selected } = useSelector(state => state.news);

    return (
        selected ?
        <WebView 
            style={styles.container}
            source={{ uri: selected.story_url || selected.url }}
        /> : null 
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})