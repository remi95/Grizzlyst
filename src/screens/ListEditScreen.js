import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import ProductList from "../components/list/ProductList";
import NavigationService from "../services/NavigationService";
import {Root, Content, Footer, Text, Button, ActionSheet} from "native-base";
import AppHeader from "../components/AppHeader";
import Styles from "../styles/styles";
import {connect} from "react-redux";
import GrizzlystClient from "../clients/GrizzlystClient";
import {setProductsByDepartment} from "../actions/listAction";
import DepartmentsHelper from "../helpers/Departments";

class ListEditScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            addableDepartments: [],
            needUpdate: false,
        }
    }

    addDepartment = async (department) => {
        let {list, departments} = this.props.listReducer;
        // let departmentId = DepartmentsHelper.getDepartmentId(departmentName);
        let response = await GrizzlystClient.addDepartment(list.id, department.id);

        if (response.status) {
            // Because data from store has this products array.
            response.data.products = [];
            departments[Object.keys(departments).length] = response.data;

            this.props.setProductsByDepartment(departments);
            this.filterDepartments();
            this.setState({needUpdate: !this.state.needUpdate})
        }
    };

    getExistingDepartmentIds = () => {
        let {departments} = this.props.listReducer;
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

    render() {
        let {departments} = this.props.listReducer;

        return (
            <Root style={styles.container}>
                <Content>
                    <AppHeader title="Edition de liste" navigation={ this.props.navigation } />
                    <ProductList update={this.state.needUpdate} departments={departments} navigation={this.props.navigation} />
                    <Button
                        title={'Ajouter un rayon'}
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
                </Content>
                 <Footer>
                    <Button full style={ Styles.button.fixedBottom } onPress={ () => NavigationService.navigate('ListInProgress') }>
                        <Text>Commencer les courses</Text>
                    </Button>
                </Footer>
            </Root>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
    },
});

const mapStateToProps = ({ listReducer, userReducer }) => {
    return {
        listReducer,
        userReducer,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setProductsByDepartment: (data) => dispatch(setProductsByDepartment(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListEditScreen);
