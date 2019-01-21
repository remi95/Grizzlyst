import React, {Component} from 'react';
import {StyleSheet, View} from "react-native";
import colors from "../../constants/colors";
import InputButton from "./InputButton";
import TextButton from "../Text/TextButton";

class TextList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [],
            inputValue: null,
            error: null
        }
    }

    updateValue = (value) => {
        this.setState({inputValue: value});
    };

    addElement = () => {
        let value = this.state.inputValue.trim();

        if (this.state.list.includes(value)) {
            this.setState({ error: 'Cette valeur existe déjà dans la liste' });

            return;
        }

        let list = this.state.list;
        list.push(value);

        this.setState({ list });
        this.props.updateList(list)
    };

    removeElement = (value) => {
        let list = this.state.list;

        if (list.includes(value)) {
            list = list.filter(element => element !== value);

            this.setState({list});
            this.props.updateList(list)
        }
    };

    render() {
        return (
            <View>
                <View style={styles.list}>
                    {
                        this.state.list.map(element =>
                            <TextButton
                                key={element}
                                style={styles.element}
                                text={element}
                                icon={'close'}
                                color={colors.GRAY}
                                action={this.removeElement.bind(this, element)}
                            />
                        )
                    }
                </View>

                <InputButton
                    placeholder={this.props.placeholder}
                    type={this.props.type}
                    value={this.state.inputValue}
                    icon={'plus-circle'}
                    color={colors.BLUE}
                    error={this.state.error}
                    action={this.addElement}
                    onChange={this.updateValue}
                    validation={this.props.validation}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        margin: 15,
    },
    element: {
        color: colors.GRAY,
    },
});

export default TextList;

