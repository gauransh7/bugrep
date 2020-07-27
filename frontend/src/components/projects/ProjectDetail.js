import React from 'react';
import { Row, Col, Descriptions, Tabs, Button, Avatar, Modal, message, Spin, Space, Layout } from 'antd';
import { DeleteTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import ProjectMembers from './ProjectMembers';
import ReactHtmlParser from 'react-html-parser';
import { deleteProject } from '../../store/actions/projectActions';
import PropTypes from 'prop-types';
import CreateIssue from '../issues/CreateIssue';
import IssueList from '../issues/IssueList';
import EditProject from './EditProject';

const { TabPane } = Tabs;
const { confirm } = Modal;
const { Content } = Layout;

const date = (date) => {
    const thedate = new Date(date);
    return thedate.toDateString();
}

class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: null
        }
    }

    static propTypes= {
        project: PropTypes.object.isRequired,
        deleteProject: PropTypes.func.isRequired
    }
    
    operations = (
        <Row gutter={8}>
            <Col>
                <CreateIssue projectId={this.props.project.id}></CreateIssue>
            </Col>
            <Col>
                {this.props.project.members.includes(this.props.user.id)||this.props.user.is_superuser?
                <Button danger onClick={() => this.confirmDelete(this.handleDelete, this.props.project.id)}>
                    <DeleteTwoTone twoToneColor='#ff4d4f' />
                    {window.innerWidth > 430 ? "Delete" : null}
                </Button>:null}
            </Col>
        </Row>
    )

    confirmDelete = (handleDelete, id) => {
        confirm({
            title: 'Are you sure delete this Project?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDelete(id);
            },
            onCancel() {
                message.info('Delete Cancelled')
            },
        });
    }

    handleDelete = (id) => {
        this.props.deleteProject(id);
    }

    static getDerivedStateFromProps(props, state) {
        if(props.project){
            return {
                project: props.project
            }
        }
    }

    render() {
        if (!this.state.project){
            return (
                <Content>
                    <Row align="middle" justify="center" style={{ paddingTop: '10rem' }}>
                        <Space size="middle">
                            <Spin size="large" />
                        </Space>
                    </Row>
                </Content>
            )
        }
        return (
            <Row>
                <Col span={22} style={{ margin: '1.5rem' }}>
                    <Tabs tabBarExtraContent={this.operations}>
                        <TabPane tab="Detail" key="1">
                            <Row type="flex" justify="center">
                                <Col xs={22} lg={18}>
                                    <Row gutter={16}>
                                        <Col>
                                            {this.props.project.logo ? <Avatar src={this.props.project.logo} /> : <Avatar>{this.props.project.name[0]}</Avatar>}
                                        </Col>
                                        <Col>
                                            <h2>{this.props.project.name}</h2>
                                        </Col>
                                    </Row>
                                    <Descriptions column={1} layout="vertical">
                                        <Descriptions.Item label="date">
                                            <time>
                                                {date(this.props.project.date)}
                                            </time>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="version">{this.props.project.version}</Descriptions.Item>
                                        <Descriptions.Item label="Wiki">{ReactHtmlParser(this.props.project.wiki)}</Descriptions.Item>
                                    </Descriptions>
                                </Col>
                                <Col xs={22} lg={6}>
                                    <ProjectMembers members={this.props.project.members_detail} id={this.props.project.id} />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="Bugs" key="2">
                            <IssueList projectId={this.props.project.id} />
                        </TabPane>
                        <TabPane tab="Edit" key="3">
                            <EditProject project={this.props.project} />
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    project: state.project.allProjects.find(element => element.id == ownProps.match.params.projectId),
    user: state.auth.user
})

export default connect(mapStateToProps, { deleteProject })(ProjectDetail);