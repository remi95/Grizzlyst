import React, {Component} from 'react';
import HomeService from "../services/HomeService";
import {loginByTokenAction} from "../actions/userAction";
import {connect} from "react-redux";
import Loader from "../components/Loader";

class HomeScreen extends Component {

    render() {
        return (
          <Loader />
        )
    }

    async componentDidMount() {
        if (this.props.userReducer.token === null) {
            await this.props.loginByToken();
        }

        await HomeService.getHomeScreen();
    }
}

const mapStateToProps = ({ userReducer }) => {
    return { userReducer }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginByToken: () => dispatch(loginByTokenAction()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);