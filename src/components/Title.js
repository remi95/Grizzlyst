import React from 'react';
import { Text, StyleSheet } from 'react-native';


export const Title = (props) => (
    <Text style={styles.text}>{props.text}</Text>
);

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
    },
});