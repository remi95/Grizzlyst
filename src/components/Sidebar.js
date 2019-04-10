import React from "react";
import { Container, Content, Text, List, ListItem, Left, Body, Icon } from "native-base";
import {AsyncStorage, Image, StyleSheet, View} from "react-native";
import {logout} from "../actions/userAction";
import {connect} from "react-redux";
import HomeService from "../services/HomeService";
import {Constants} from "expo";
import images from "../constants/images";
import colors from "../constants/colors";
import Styles from "../styles/styles";

const routes = [
    {
        route: 'GroupCreate',
        title: 'Créer un groupe',
        icon: 'add-circle',
    },
    {
        route: 'GroupList',
        title: 'Mes groupes',
        icon: 'people',
    },
    {
        route: 'Invitations',
        title: 'Mes invitations',
        icon: 'list-box',
    },
    {
        route: 'Params',
        title: 'Paramètres',
        icon: 'settings',
    }
];

class SideBar extends React.Component {

    logout = async () => {
        await AsyncStorage.removeItem('token');
        this.props.logout();
        this.props.navigation.closeDrawer();
        await HomeService.getHomeScreen();
    };

    render() {
        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={images.logo}
                            style={styles.logo}
                        />
                    </View>
                    <List
                        style={styles.list}
                        dataArray={routes}
                        renderRow={data => {
                            return (
                                <ListItem icon onPress={() => this.props.navigation.navigate(data.route)}>
                                    <Left>
                                        <Icon active color={colors.GRAY} name={data.icon} />
                                    </Left>
                                    <Body>
                                        <Text>{data.title}</Text>
                                    </Body>
                                </ListItem>
                            );
                        }}
                    />

                    <ListItem icon onPress={this.logout}>
                        <Left>
                            <Icon active color={colors.GRAY} name={'exit'} />
                        </Left>
                        <Body>
                            <Text style={{color: colors.RED}}>Déconnexion</Text>
                        </Body>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
    },
    content: {
        flex: 1
    },
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        marginTop: 50,
        marginBottom: 50,
    },
    list: {
        marginBottom: 50,
    },
});

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    }
};

export default connect(null, mapDispatchToProps)(SideBar);