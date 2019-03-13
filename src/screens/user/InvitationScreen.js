import React, {Component} from 'react';
import { Container, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import GrizzlystClient from '../../clients/GrizzlystClient';
import Styles from "../../styles/styles";

class InvitationScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            invitations: []
        }
    }

    async componentDidMount() {
       this.getInvitations();
    }

    async getInvitations() {
        const invitations = await GrizzlystClient.get('me/invitations');
        this.setState({
            invitations: invitations.data
        });
    }

    async joinGroup(id) {
        await GrizzlystClient.post(`invitations/${id}/group`);
        this.getInvitations();
    }

    async deleteGroup(id) {
        await GrizzlystClient.delete(`invitations/${id}`);
        this.getInvitations();
    }

    render() {
        return (
            <Container>
                <Content>
                    {
                        this.state.invitations.map((invit, i) =>
                            <Card key={i}>
                                <CardItem>
                                    <Body>
                                        <Text>{ invit.group.name }</Text>
                                    </Body>
                                </CardItem>
                                <CardItem footer>
                                    <Button style={ Styles.button.success }
                                            onPress={ () => this.joinGroup(invit.id) }>
                                        <Text>Accepter</Text>
                                    </Button>
                                    <Button style={Styles.button.danger}
                                            onPress={ () => this.deleteGroup(invit.id) }>
                                        <Text>Refuser</Text>
                                    </Button>
                                </CardItem>
                            </Card>
                        )
                    }
                </Content>
            </Container>
        )
    }
}

export default InvitationScreen;