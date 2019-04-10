import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from "../../constants/colors";

export const NutrientGrade = (props) => {

    return (
        <View style={styles.block}>
            <View style={[styles.container, styles.firstContainer, styles.a, props.grade === 'A' ? styles.containerActive : null]}>
                <Text style={[styles.textA, props.grade === 'A' ? styles.textActive : null]}>A</Text>
            </View>
            <View style={[styles.container, styles.b, props.grade === 'B' ? styles.containerActive : null]}>
                <Text style={[styles.textB, props.grade === 'B' ? styles.textActive : null]}>B</Text>
            </View>
            <View style={[styles.container, styles.c, props.grade === 'C' ? styles.containerActive : null]}>
                <Text style={[styles.textC, props.grade === 'C' ? styles.textActive : null]}>C</Text>
            </View>
            <View style={[styles.container, styles.d, props.grade === 'D' ? styles.containerActive : null]}>
                <Text style={[styles.textD, props.grade === 'D' ? styles.textActive : null]}>D</Text>
            </View>
            <View style={[styles.container, styles.lastContainer, styles.e, props.grade === 'E' ? styles.containerActive : null]}>
                <Text style={[styles.textE, props.grade === 'E' ? styles.textActive : null]}>E</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    block: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
    },
    container: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingRight: 10,
        paddingLeft: 10,
    },
    firstContainer: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    lastContainer: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    a: {
        backgroundColor: colors.DARK_GREEN,
    },
    textA: {
        color: '#5FB680',
    },
    b: {
        backgroundColor: colors.GREEN,
    },
    textB: {
        color: '#B1E288',
    },
    c: {
        backgroundColor: colors.YELLOW,
    },
    textC: {
        color: '#FFE584',
    },
    d: {
        backgroundColor: colors.ORANGE,
    },
    textD: {
        color: '#FBBB65',
    },
    e: {
        backgroundColor: colors.RED,
    },
    textE: {
        color: '#FB8C73',
    },
    containerActive: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingRight: 15,
        paddingLeft: 15,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        borderWidth: 3,
        borderColor: colors.WHITE,
    },
    textActive: {
        fontWeight: 'bold',
        color: colors.WHITE,
    },
});
