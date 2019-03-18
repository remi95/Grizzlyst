import React, {Component} from 'react';
import {connect} from "react-redux";
import NavigationService from "../services/NavigationService";
import {setCurrentGroup} from "../actions/groupAction";
import GrizzlystClient from "../clients/GrizzlystClient";
import {setAlert} from "../actions/alertAction";
import { Container, Content, List, ListItem, Text, Left, Right, Icon, Button, Footer } from 'native-base';
import Styles from "../styles/styles";
import AppHeader from "../components/AppHeader";

class GroupListScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: [],
        };
    }

    componentDidMount() {
        this.setState({ groups: this.props.userReducer.groups });
    }

    async navigateToList(id) {
        const response = await GrizzlystClient.get('groups/' + id);

        if (response.status) {
            this.props.setCurrentGroup(response.data);
            NavigationService.navigate('ListList');
        }
        else {
            console.log(response)
            // TODO: throw alert.
        }
    };

    render() {
        return (
            <Container style={ Styles.position.size.fullWidth }>
                <AppHeader title="Mes groupes" navigation={ this.props.navigation } />
                <Content>
                    <List>
                        {
                            this.state.groups.map((group, i) =>
                                <ListItem key={i} onPress={ () => this.navigateToList(group.id) }>
                                    <Left>
                                        <Text>{group.name}</Text>
                                    </Left>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
                                </ListItem>
                            )
                        }
                    </List>
                </Content>
                <Footer>
                    <Button full style={ Styles.button.fixedBottom } onPress={ () => NavigationService.navigate('GroupCreate') }>
                        <Text>Ajouter un groupe</Text>
                    </Button>
                </Footer>
            </Container>
        )
    }
}

const mapStateToProps = ({ userReducer }) => {
    return { userReducer }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentGroup: (data) => dispatch(setCurrentGroup(data)),
        setAlert: (data) => dispatch(setAlert(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupListScreen);