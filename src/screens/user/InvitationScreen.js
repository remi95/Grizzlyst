import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, FlatList} from 'react-native';
import GrizzlystClient from '../../clients/GrizzlystClient';
import { connect } from 'react-redux';

class InvitationScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            invitations: []
        }
    }

    async componentDidMount() {
        const invitations = await GrizzlystClient.get(`users/me/invitations`);
        this.setState({
            invitations
        });
    }

    renderItem({item}) {
        return (
            <View>
                <Text>{item.group.name}</Text>
                <Button title='Accepter' onPress={ () => null } />
                <Button title='Refuser' onPress={ () => null } />
            </View>
        )
    }

    render() {
        return (
            <View>
                <Text>Hello</Text>
                <FlatList
                    data={ this.state.invitations }
                    renderItem={({item}) => (
                        this.renderItem({item})
                    )}
                    keyExtractor={(item, index) => index.toString()}/>
            </View>
        )
    }
}

export default InvitationScreen;