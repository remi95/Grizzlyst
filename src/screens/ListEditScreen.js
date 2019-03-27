import React, {Component} from 'react';
import ProductList from "../components/list/ProductList";
import NavigationService from "../services/NavigationService";
import {Root, Content, Footer, Text, Button, ActionSheet} from "native-base";
import AppHeader from "../components/AppHeader";
import Styles from "../styles/styles";
import {connect} from "react-redux";
import GrizzlystClient from "../clients/GrizzlystClient";
import {setProductsByDepartment} from "../actions/listAction";

class ListEditScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            needUpdate: false,
            departments: [],
        }
    }

    addDepartment = async (department) => {
        let {list, departments} = this.props.listReducer;
        let response = await GrizzlystClient.addDepartment(list.id, department.id);

        if (response.status) {
            departments[Object.keys(departments).length] = response.data;
            this.props.setProductsByDepartment(departments);
            this.filterDepartments();
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
                addableDepartments.push(department.name)
            }
        }

        this.setState({departments: addableDepartments})
    };

    render() {
        let {departmentsReference} = this.props.listReducer;
        let {departments} = this.state;

        return (
            <Root style={styles.container}>
                <Content>
                    <AppHeader title="Edition de liste" navigation={ this.props.navigation } />
                    <ProductList navigation={this.props.navigation} />
                    <Button
                        title={'Ajouter un rayon'}
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: departments,
                                    title: "Ajouter un rayon"
                                },
                                buttonIndex => {
                                    this.addDepartment(departmentsReference[buttonIndex])
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
