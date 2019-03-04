import React, {Component} from 'react';
import {StyleSheet, ScrollView, FlatList, Button, Text} from 'react-native';
import {connect} from "react-redux";
import NavigationService from "../services/NavigationService";
import {setCurrentGroup} from "../actions/groupAction";
import GrizzlystClient from "../clients/GrizzlystClient";

class GroupListScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            groups: [],
        }
    }

    _keyExtractor = (item) => item.id.toString();

    _renderItem = ({item}) => (
        <Text onPress={() => this._onPressItem(item.id)}>
            {item.name}
        </Text>
    );

    _onPressItem = async (id) => {
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
            <ScrollView>
                <Button
                    title={'Créer un groupe'}
                    onPress={() => NavigationService.navigate('CreateGroup')} />
                {
                    this.state.groups.length > 0
                        ?   <FlatList
                                data={this.state.groups}
                                keyExtractor={this._keyExtractor}
                                renderItem={this._renderItem}
                            />
                        :   null
                }

            </ScrollView>
        )
    }

    componentDidMount() {
        this.setState({ groups: this.props.userReducer.groups })
    }
}

const mapStateToProps = ({ userReducer }) => {
    return { userReducer }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentGroup: (data) => dispatch(setCurrentGroup(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupListScreen);