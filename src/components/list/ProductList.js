import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Accordion from "../element/Accordion";
import {connect} from "react-redux";
import {addProductToDepartment} from "../../actions/listAction";
import colors from "../../constants/colors";
import {Font} from "expo";
import NavigationService from "../../services/NavigationService";

class ProductList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isIconLoaded: false,
            needUpdate: false,
            data: [],
        }
    }

    render() {
        let {departments} = this.props;
        return (
            <View>
                {
                    Object.keys(departments).map(key =>
                        <Accordion
                            key={key}
                            department={departments[key]}
                        />
                    )
                }
            </View>
        )
    }

    async componentDidMount () {
        if (!this.props.listReducer.list.id) {
            return NavigationService.navigate('ListList');
            // TODO: throw alert
        }

        try {
            await Font.loadAsync({FontAwesome: require('@expo/vector-icons/fonts/FontAwesome.ttf')});
            this.setState({isIconLoaded: true})
        } catch {
            console.log('ERROR WHILE LOADING ICONS...')
        }
    }

    willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        payload => {
            this.setState(prevState => ({needUpdate: !prevState.needUpdate}))
        }
    );
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