import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Spin, Space, Layout, Row } from 'antd';

const { Content } = Layout;

const PrivaterRoute = ({component: Component, auth, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if(auth.isLoading){
                    return (
                        <Layout>
                            <Content>
                                <Row align="middle" justify="center" style={ { paddingTop: '10rem' }}>
                                    <Space size="middle">
                                        <Spin size="large" />
                                    </Space>
                                </Row>
                            </Content>
                        </Layout>
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