import React, {Component} from 'react';
import NavigationService from "../services/NavigationService";
import GrizzlystClient from "../clients/GrizzlystClient";
import {connect} from "react-redux";
import {setCurrentList, setProductsByDepartment} from "../actions/listAction";
import AppHeader from "../components/AppHeader";
import {Container, Content, Footer, Button, Text, List, ListItem, Left, Right, Icon} from "native-base";
import Styles from "../styles/styles";

class ListListScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lists: [],
        }
    }

    _keyExtractor = (item) => item.id.toString();

    _renderItem = ({item}) => (
        <Text onPress={() => this._onPressItem(item.id)}>
            {item.name}
        </Text>
    );

    _onPressItem = async (id) => {
        const list = await GrizzlystClient.get('lists/' + id);
        const products = await GrizzlystClient.get('lists/' + id + '/departments/products');

        if (list.status && products.status) {
            await this.props.setCurrentList(list.data);
            await this.props.setProductsByDepartment(products.data);
            NavigationService.navigate('EditList');
        }
        else {
            console.log(response)
            // TODO: throw alert.
        }
    };

    render() {
        return (
            <Container>
                <AppHeader title="Listes du groupe" navigation={ this.props.navigation } />
                <Content>
                    {
                        this.state.lists.length > 0
                            ?
                            <List>
                                {
                                    this.state.lists.map((list, i) =>
                                        <ListItem key={i} onPress={ () => this._onPressItem(list.id) }>
                                            <Left>
                                                <Text>{list.name}</Text>
                                            </Left>
                                            <Right>
                                                <Icon name="arrow-forward" />
                                            </Right>
                                        </ListItem>
                                    )}
                            </List>
                            :
                            null
                    }
                </Content>
                <Footer>
                    <Button full style={ Styles.button.fixedBottom } onPress={ () => NavigationService.navigate('CreateList') }>
                        <Text>Créer une liste</Text>
                    </Button>
                </Footer>
            </Container>
        )
    }

    async componentDidMount() {
        if (!this.props.navigation.state.params.groupId) {
            return NavigationService.navigate('GroupList');
            // TODO: throw alert
        }

        this.loadLists(this.props.navigation.state.params.groupId);
    }

    loadLists = async (groupId) => {
        const lists = await GrizzlystClient.get(`groups/${groupId}/lists`);

        if (lists.status) {
            this.setState({ lists: lists.data.lists })
        }
    };

    willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        async payload => {
            await this.loadLists(this.props.navigation.state.params.groupId)
        }
    );
}

const mapStateToProps = ({ groupReducer }) => {
    return { groupReducer }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentList: (data) => dispatch(setCurrentList(data)),
        setProductsByDepartment: (data) => dispatch(setProductsByDepartment(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListListScreen);
