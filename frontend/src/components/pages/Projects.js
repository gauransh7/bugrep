import React from 'react';
import { Row, Col, Tabs, Divider } from 'antd';
import ProjectSider from '../projects/ProjectSider';

const { TabPane } = Tabs


class Project extends React.Component {
    render() {
        return (
            <Row>
                <Col sm={5}>
                    <ProjectSider></ProjectSider>
                </Col>
                <Divider type='vertical' style={{ minHeight: '100vh' }} />
                <Col sm={18}>
                    <Tabs defaultActiveKey="1" style={{ margin: '2rem' }}>
                        <TabPane tab="Detail" key="1">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Comments" key="2">
                            Content of Tab Pane 2
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        );
    }
}

export default Project;
