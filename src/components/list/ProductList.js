import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from "react-redux";
import Accordion from "../element/Accordion";

class ProductList extends Component {

    render() {
        return (
            <View>
                {
                    this.props.listReducer.departments.map(department =>
                        <Accordion
                            key={department.id}
                            department={department}
                        />
                    )
                }
            </View>
        )
    }
}

const mapStateToProps = ({ listReducer }) => {
    return {
        listReducer,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        action: (data) => dispatch(action(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);