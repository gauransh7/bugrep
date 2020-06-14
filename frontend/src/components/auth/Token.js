import React from 'react';
import { setToken } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Token extends React.Component {
    getToken = () => {
        const url_string = window.location.href;
        const url = new URL(url_string);
        const token = url.searchParams.get('token');
        return token;
    }
    componentWillMount() {
        const token = this.getToken();
        if (token != null) {
            this.props.setToken(token);
        }
    }
    render() {
        return (
            // null
            <Redirect to="/" />
        );
    }
}

export default connect(null, { setToken })(Token);
