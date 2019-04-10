import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from "react-redux";
import colors from "../../constants/colors";
import {setAlert} from "../../actions/alertAction";

class Alert extends Component {

    render() {
        let alert = this.props.alertReducer;

        return (
            <View>
                {
                    alert.message && alert.message.trim().length > 0 ?

                        <View style={[styles.alert, {borderColor: alert.type !== null ? alert.type : colors.INFO}]}>
                            <Text style={{color: alert.type !== null ? alert.type : colors.INFO}}>{ alert.message }</Text>
                        </View>

                        : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    alert: {
        position: 'absolute',
        bottom: 25,
        borderWidth: 3,
        borderRadius: 5,
    }
});

const mapStateToProps = ({ alertReducer }) => {
    return { alertReducer }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => dispatch(setAlert(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);