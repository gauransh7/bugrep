import React from 'react';
import { Spin, Space, Layout, Row } from 'antd';

const { Content } = Layout;

const Loader = () => {
    return (
        <Layout>
            <Content>
                <Row align="middle" justify="center" style={{ paddingTop: '10rem' }}>
                    <Space size="middle">
                        <Spin size="large" />
                    </Space>
                </Row>
            </Content>
        </Layout>
    )
} 

export default Loader;