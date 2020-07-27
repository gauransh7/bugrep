import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Loader from './Loader';


const PrivaterRoute = ({component: Component, auth, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if(auth.isLoading){
                    return (
                        <Loader />
                    )
                } 
                else if (!auth.isAuthenticated){
                    return (
                        <Redirect to='/Login'/>
                    )
                }
                else {
                    return (
                        <Component {...props} />
                    )
                }
            }}
        />
    )
} 

const mapStateToProps = state => ({ 
    auth: state.auth
})

export default connect(mapStateToProps)(PrivaterRoute);