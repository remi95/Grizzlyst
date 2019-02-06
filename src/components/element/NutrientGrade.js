import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from "../../constants/colors";

export const NutrientGrade = (props) => {

    let color = colors.GRAY;
    let grade = props.grade.toUpperCase();

    switch (grade) {
        case 'A':
            color = colors.DARK_GREEN;
            break;
        case 'B':
            color = colors.GREEN;
            break;
        case 'C':
            color = colors.YELLOW;
            break;
        case 'D':
            color = colors.ORANGE;
            break;
        case 'E':
            color = colors.RED;
            break;
        default:
            break;
    }

    return (
        <View style={[{backgroundColor: color}, styles.container]}>
            <Text style={styles.text}>{ grade }</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
    text: {
        color: colors.WHITE,
        fontWeight: 'bold',
    },
});
