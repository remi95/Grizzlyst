import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Accordion from "../element/Accordion";
import {connect} from "react-redux";
import {addProductToDepartment} from "../../actions/listAction";
import colors from "../../constants/colors";
import {Font} from "expo";

class ProductList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isIconLoaded: false,
            departments: null,
            // needUpdate: false,
        }
    }

    render() {
        let {departments} = this.state;

        return (
            <View>
                {
                    departments !== null
                        ? Object.keys(departments).map(key =>
                            <Accordion
                                key={key}
                                department={departments[key]}
                            />
                        )

                        : null
                }
            </View>
        )
    }

    async componentDidMount () {
        try {
            await Font.loadAsync({FontAwesome: require('@expo/vector-icons/fonts/FontAwesome.ttf')});
            this.setState({isIconLoaded: true, departments: this.props.departments})
        } catch {
            console.log('ERROR WHILE LOADING ICONS...')
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.departments !== prevProps.departments) {
            this.setState({departments: this.props.departments})
        }
    }

    // willFocusSubscription = this.props.navigation.addListener(
    //     'willFocus',
    //     payload => {
    //         this.setState(prevState => ({needUpdate: !prevState.needUpdate}))
    //     }
    // );
}

const styles = StyleSheet.create({
    department: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.LIGHT_GRAY,
    },
    name: {
        fontSize: 16,
    },
    quantity: {
        fontSize: 14,
        color: colors.GRAY
    },
});

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