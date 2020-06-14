import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
    }

    onLogin = () => {
        window.location.href = "https://internet.channeli.in/oauth/authorise/?client_id=X3OuYZR7Gnmy6o3tiAhpIAmVI1fUdSjgSDXiS6q0";
    };

    render() {
        if(this.props.isAuthenticated){
            return (
                <Redirect to="/" />
            );
        }
        else{
            return (
                <Button 
                    type="primary" 
                    onClick={this.onLogin}
                >
                    Login
                </Button>
            );
        }
    }
}

const mapStatetoProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStatetoProps)(Login);
