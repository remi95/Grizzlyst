import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Body, Button, Header, Icon, Left, Right, Title} from "native-base";
import colors from "../constants/colors";
import { Constants } from 'expo'

class AppHeader extends Component {

    render() {
        return (
            <Header style={styles.header}>
                {
                    this.props.title !== 'Mes groupes'
                        ?
                        <Left>
                            <Button
                                transparent
                                onPress={ () => this.props.navigation.goBack() }>
                                <Icon name="arrow-back" />
                            </Button>
                        </Left>
                        :
                        <Left />
                }
                <Body>
                    <Title>{ this.props.title }</Title>
                </Body>
                <Right>
                    <Button
                        transparent
                        onPress={ () => this.props.navigation.toggleDrawer() }>
                        <Icon name="menu" />
                    </Button>
                </Right>
            </Header>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        marginTop: Constants.statusBarHeight,
        backgroundColor: colors.BLUE
    }
});

export default AppHeader;