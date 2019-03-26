import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Body, Button, Container, Header, Icon, Left, Right, Title} from "native-base";
import colors from "../constants/colors";

class AppHeader extends Component {

    render() {
        return (
            <Header style={styles.header}>
                <Left />
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
        marginTop: 50,
        backgroundColor: colors.BLUE
    }
});

export default AppHeader;