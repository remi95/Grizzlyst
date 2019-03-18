import React from "react";
import { Container, Content, Text, List, ListItem } from "native-base";
const routes = [
    {
        route: 'GroupCreate',
        title: 'Créer un groupe'
    },
    {
        route: 'GroupList',
        title: 'Mes groupes'
    },
    {
        route: 'Invitations',
        title: 'Mes invitations'
    },
    {
        route: 'Params',
        title: 'Paramètres'
    }
];

export default class SideBar extends React.Component {
    render() {
        return (
            <Container>
                <Content>
                    <List
                        dataArray={routes}
                        renderRow={data => {
                            return (
                                <ListItem
                                    button
                                    onPress={() => this.props.navigation.navigate(data.route)}>
                                    <Text>{data.title}</Text>
                                </ListItem>
                            );
                        }}
                    />
                </Content>
            </Container>
        );
    }
}