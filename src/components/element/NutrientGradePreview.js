import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from "../../constants/colors";
import NutrientGradeHelper from "../../helpers/NutrientGrade";

export const NutrientGradePreview = (props) => {

    if (!props.grade) {
        return null;
    }

    let color = NutrientGradeHelper.getColor(props.grade);

    return (
        <View style={[{backgroundColor: color}, styles.container]}>
            <Text style={styles.text}>{ props.grade.toUpperCase() }</Text>
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
