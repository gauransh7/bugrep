import React from 'react';
import { Layout, Row, Result, Button } from 'antd';
import { NavLink } from 'react-router-dom';

const { Content } = Layout;

const Loader = () => {
    return (
        <Layout>
            <Content>
                <Row align="middle" justify="center">
                    <Result
                        status="403"
                        title="403"
                        subTitle="Sorry, you are not authorized to access this page."
                        extra={<NavLink to='/'><Button type="primary">Back Home</Button></NavLink>}
                    />
                </Row>
            </Content>
        </Layout>
    )
}

export default Loader;