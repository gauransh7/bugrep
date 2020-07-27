import React from 'react';
import { Row, Col, Tabs, Button } from 'antd';
import ProjectSider from '../projects/ProjectSider';
import ProjectList from '../projects/ProjectList';
import { getAllProjects, getMyProjects } from '../../store/actions/projectActions';
import { connect } from 'react-redux';
import CreateProject from '../projects/CreateProject';

const { TabPane } = Tabs
 
class Project extends React.Component {
    componentDidMount() {
        this.props.getAllProjects();
        this.props.getMyProjects();
    }

    operations = (
        <Row gutter={8}>
            {/* <Col>
                <Button>Extra Action</Button>
            </Col> */}
            <Col>    
                <CreateProject />
            </Col>
        </Row>
    );

    render() {
        return (
            <Row>
                <Col span={22} style={{ margin:'1.5rem' }}>
                    <Tabs tabBarExtraContent={this.operations}>
                        <TabPane tab="All Projects" key="1">
                            <ProjectList projects={this.props.allProjects}></ProjectList>
                        </TabPane>
                        <TabPane tab="My Projects" key="2">
                            <ProjectList projects={this.props.myProjects}></ProjectList>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    allProjects: state.project.allProjects,
    myProjects: state.project.myProjects
})

export default connect(mapStateToProps, { getAllProjects, getMyProjects })(Project);
