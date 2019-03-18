import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from "react-redux";
import Accordion from "../element/Accordion";
import {addProductToDepartment} from "../../actions/listAction";

class ProductList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            needUpdate: false,
        }
    }

    render() {
        let {departments} = this.props.listReducer;
        return (
            <View>
                {
                    Object.keys(departments).map(departmentName =>
                        <Accordion
                            key={departmentName}
                            department={departmentName}
                            products={departments[departmentName]}
                        />
                    )
                }
            </View>
        )
    }

    componentDidMount() {
        if (!this.props.listReducer.list.id) {
            return NavigationService.navigate('ListList');
            // TODO: throw alert
        }
    }

    willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        payload => {
            this.setState(prevState => ({needUpdate: !prevState.needUpdate}))
        }
    );
}

const mapStateToProps = ({ listReducer }) => {
    return {
        listReducer,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addProductToDepartment: (product, departmentId) => dispatch(addProductToDepartment(product, departmentId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);