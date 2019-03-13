import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from "react-redux";
import Accordion from "../element/Accordion";
import NavigationService from "../../services/NavigationService";
import {addProductToDepartment} from "../../actions/listAction";

class ProductList extends Component {

    render() {
        console.log('render')
        return (
            <View>
                {
                    Object.keys(this.props.departments).map(departmentName =>
                        <Accordion
                            key={departmentName}
                            department={departmentName}
                            products={this.props.departments[departmentName]}
                            navigation={this.props.navigation}
                        />
                    )
                }
            </View>
        )
    }

    componentDidMount() {
        // if (!this.props.listReducer.list.id) {
        //     return NavigationService.navigate('ListList');
        //     // TODO: throw alert
        // }
        console.log('MOUNT ')
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(' UPDATED ')
    }
}

const mapStateToProps = ({ listReducer }) => {
    return {
        departments: listReducer.departments,
    }
};

export default connect(mapStateToProps, null)(ProductList);