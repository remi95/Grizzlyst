import React, {Component} from 'react';
import {StyleSheet, ScrollView, FlatList, Button, Text} from 'react-native';
import NavigationService from "../services/NavigationService";
import GrizzlystClient from "../clients/GrizzlystClient";
import {connect} from "react-redux";
import {setCurrentList} from "../actions/listAction";

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
        const response = await GrizzlystClient.get('lists/' + id);
        // TODO: Replace with a query which get all associations.

        if (response.status) {
            this.props.setCurrentList(response.data);
            NavigationService.navigate('EditList');
        }
        else {
            console.log(response)
            // TODO: throw alert.
        }
    };

    render() {
        return (
            <ScrollView>
                <Button
                    title={'Créer une liste'}
                    onPress={() => NavigationService.navigate('CreateList')} />
                {
                    this.state.lists.length > 0
                        ?   <FlatList
                            data={this.state.lists}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
                        :   null
                }

            </ScrollView>
        )
    }

    async componentDidMount() {
        if (!this.props.groupReducer.group.id) {
            return NavigationService.navigate('GroupList');
            // TODO: throw alert
        }

        const groupId = this.props.groupReducer.group.id;

        const lists = await GrizzlystClient.get(`groups/${groupId}/lists`);
        if (lists.status) {
            this.setState({ lists: lists.data.lists })
        }
    }
}

const mapStateToProps = ({ groupReducer }) => {
    return { groupReducer }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentList: (data) => dispatch(setCurrentList(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListListScreen);
