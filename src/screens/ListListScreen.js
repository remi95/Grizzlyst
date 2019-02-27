import React, {Component} from 'react';
import {StyleSheet, ScrollView, FlatList, Button, Text} from 'react-native';
import NavigationService from "../services/NavigationService";
import GrizzlystClient from "../clients/GrizzlystClient";
import {connect} from "react-redux";
import {group} from "../actions/groupAction";

class ListListScreen extends Component {

    constructor(props) {
        super(props);

        this.groupId = this.getGroup();

        this.state = {
            lists: [],
        }
    }

    getGroup = () => {
        if (this.props.userReducer.groups.length <= 0) {
            return NavigationService.navigate('GroupList');
        }
        if (this.props.navigation && this.props.navigation.groupId) {
            return this.props.navigation.groupId;
        }

        return this.props.groupId || this.props.userReducer.groups[0].id;
    };

    _keyExtractor = (item) => item.id.toString();

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
                            renderItem={ ({item}) =>
                                <Text>{item.name}</Text>
                            }
                        />
                        :   null
                }

            </ScrollView>
        )
    }

    async componentDidMount() {
        const lists = await GrizzlystClient.get(`groups/${this.groupId}/lists`);
        const group = await GrizzlystClient.get(`groups/${this.groupId}`);

        if (lists.status) {
            this.setState({ lists: lists.data })
        }
        if (group.status) {
            this.props.setCurrentGroup(group.data)
        }
    }
}

const mapStateToProps = ({ userReducer }) => {
    return { userReducer }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentGroup: (data) => dispatch(group(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListListScreen);
