import React, {Component} from 'react';
import {StyleSheet, ScrollView, FlatList, Button, Text} from 'react-native';
import {connect} from "react-redux";
import NavigationService from "../services/NavigationService";

class GroupListScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            groups: [],
        }
    }

    _keyExtractor = (item) => item.id.toString();

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
                                renderItem={ ({item}) =>
                                    <Text>{item.name}</Text>
                                }
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

export default connect(mapStateToProps, null)(GroupListScreen);