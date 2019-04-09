import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import ProductList from "../components/list/ProductList";
import NavigationService from "../services/NavigationService";
import {Root, Content, Footer, Text, Button, ActionSheet, Spinner} from "native-base";
import AppHeader from "../components/AppHeader";
import Styles from "../styles/styles";
import {connect} from "react-redux";
import GrizzlystClient from "../clients/GrizzlystClient";
import {setProductsByDepartment} from "../actions/listAction";
import listStatus from "../constants/list";
import colors from "../constants/colors";

class ListEditScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: {},
            departments: null,
            addableDepartments: [],
            needUpdate: false,
        }
    }

    addDepartment = async (department) => {
        let {list, departments} = this.state;
        let response = await GrizzlystClient.addDepartment(list.id, department.id);

        if (response.status) {
            // Because data from store has this products array.
            response.data.products = [];
            departments[Object.keys(departments).length] = response.data;

            this.filterDepartments();
            this.setState({needUpdate: !this.state.needUpdate, departments})
        }
    };

    getExistingDepartmentIds = () => {
        let {departments} = this.state;
        let departmentsIds = [];

        for (let i in departments) {
            departmentsIds.push(departments[i].id);
        }

        return departmentsIds;
    };

    filterDepartments = () => {
        let existingDepartmentIds = this.getExistingDepartmentIds();

        let {departmentsReference} = this.props.listReducer;
        let addableDepartments = [];

        for (let department of departmentsReference) {
            if (!existingDepartmentIds.includes(department.id)) {
                addableDepartments.push(department)
            }
        }

        this.setState({addableDepartments})
    };

    startListInProgress = async () => {
        await GrizzlystClient.changeListStatus(this.state.list.id, listStatus.IN_PROGRESS);
        NavigationService.navigate('ListInProgress', {listId: this.state.list.id})
    };

    render() {
        let {departments, list} = this.state;

        return (
            <Root style={styles.container}>
                <Content>
                    <AppHeader title={list.name || ''} navigation={this.props.navigation}/>
                    {
                        departments !== null
                            ?
                                <View>
                                    <Button
                                        full
                                        onPress={() =>
                                            ActionSheet.show(
                                                {
                                                    options: this.state.addableDepartments.map(({name}) => name),
                                                    title: "Ajouter un rayon"
                                                },
                                                buttonIndex => {
                                                    this.addDepartment(this.state.addableDepartments[buttonIndex])
                                                }
                                            )}
                                    >
                                        <Text>Ajouter un rayon</Text>
                                    </Button>

                                    <ProductList update={this.state.needUpdate}
                                                 departments={departments}
                                                 navigation={this.props.navigation}/>
                                </View>

                            : <Spinner color={colors.BLUE} />
                    }
                </Content>
                <Footer>
                    <Button full style={ Styles.button.fixedBottom } onPress={this.startListInProgress}>
                        <Text>Commencer les courses</Text>
                    </Button>
                </Footer>
            </Root>
        )
    }

    loadList = async (listId) => {
        const list = await GrizzlystClient.getList(listId);
        const products = await GrizzlystClient.getProductsByDepartments(listId);

        if (list.status && products.status) {
            this.setState({
                list: list.data,
                departments: products.data,
            });
        }

        this.filterDepartments();
    };

    clearList = () => {
        this.setState({
            list: {},
            departments: null,
        });
    };

    willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        payload => {
            this.loadList(payload.state.params.listId);
        }
    );

    didBlurSubscription = this.props.navigation.addListener(
        'didBlur',
        payload => {
            this.clearList();
        }
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
    },
});

const mapStateToProps = ({ listReducer }) => {
    return {
        listReducer,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setProductsByDepartment: (data) => dispatch(setProductsByDepartment(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListEditScreen);
