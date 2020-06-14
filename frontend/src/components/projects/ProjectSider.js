import React from 'react';
import { Menu, Typography, Button, Row, Dropdown, message, Divider, Col, Descriptions, Tabs } from 'antd';
import CreateProject from './CreateProject';


const { Title, Text } = Typography;
const { TabPane } = Tabs;

class ProjectSider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
            <Row style={{ margin: '2rem 1rem' }} align="middle" justify={'space-around'}>
                <Col>
                    <Title level={3} style={{ margin: 0 }}>
                        Projects
                    </Title>
                </Col>
                <Col>
                    <CreateProject></CreateProject>
                </Col>
            </Row>
            <Row style={{ margin: '2rem 1rem' }} justify={'space-around'} align={"middle"}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="All Projects" key="1">
                        Content of Tab Pane 1
                    </TabPane>
                    <TabPane tab="My Projects" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                </Tabs>
            </Row>
            </>
        );
    }
}

export default ProjectSider;