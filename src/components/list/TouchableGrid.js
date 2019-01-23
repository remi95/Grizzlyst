import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image} from "react-native";
import colors from '../../constants/colors'

class TouchableGrid extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.data.map((element, i) =>
                        <TouchableOpacity
                            key={element.text}
                            style={[styles.touchable, (element.favorite || element.enable) ? styles.active : null]}
                            onPress={() => this.props.action(i)}
                        >
                            <Image
                                source={element.icon}
                                style={styles.icon}
                            />
                            <Text style={styles.text}>{element.text}</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    touchable: {
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 100,
        height: 100,
        padding: 5,
        backgroundColor: colors.WHITE,
    },
    active: {
        backgroundColor: colors.LIGHT_GRAY,
    },
    icon: {
        width: 50,
        height: 50,
    },
    text: {
        color: colors.DARK_GRAY,
        textAlign: 'center',
        minHeight: 30,
    },
});

export default TouchableGrid;