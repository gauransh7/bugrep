import React from 'react';
import { Row, Col, Descriptions, Card, Avatar, Typography, Select, Tag, Tabs, Button, message, Modal } from 'antd';
import {
    DeleteTwoTone,
    CheckCircleTwoTone,
    LoadingOutlined,
    CloseCircleTwoTone,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import ReactHtmlParser from 'react-html-parser'; 
import { changeStatus, changeAssignedUser, deleteIssue } from '../../store/actions/issueActions';
import { connect } from 'react-redux';
import { getAllProjects } from '../../store/actions/projectActions';
import { getUsers } from '../../store/actions/userActions';
import PropTypes from 'prop-types';
import CommentList from '../comments/CommentList';
import Comment from '../comments/Comment';
import { Link } from 'react-router-dom';

const { Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { confirm } = Modal;

const date = (date) => {
    const thedate = new Date(date);
    return thedate.toDateString();
}

const Media = ({ url }) => {
    if(url === null){
        return 'No Media'
    }
    console.log(url)
    let u = url
    const ext = u.split('.').pop();
    if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
        return <img src={url} />
    }
    else if (ext === 'mp4') {
        return (
            <video controls>
                <source src={url} type="video/mp4" />
            </video>
        )
    }
}

class IssueDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bugStatus: this.props.bug.status,
            assignedUser: this.props.bug.assigned_user,
            bugId: this.props.bug.id,
            bugUpdate: false,
            userUpdate: false,
            tags: []
        };
    }

    componentDidMount() {
        let tags = []
        if (this.props.bug.tags != null) {
            tags  = this.props.bug.tags.split(' ');
        }
        this.setState({
            tags: tags
        })
    }

    static propTypes = {
        user: PropTypes.object.isRequired,
        deleteIssue: PropTypes.func.isRequired
    }

    static getDerivedStateFromProps(props, state){
        let newState = {}
        if (state.bugUpdate) {
            newState = {
                ...newState,
                bugStatus: state.bugStatus,
                bugUpdate: false
            };
        }
        else if (props.bug.status !== state.bugStatus) {
            newState = {
                bugStatus: props.bug.status,
            };
        }
        
        if (state.userUpdate) {
            newState = {
                ...newState,
                assignedUser: state.assignedUser,
                userUpdate: false,  
            };
        }
        else if (props.bug.assigned_user !== state.assignedUser) {
            newState = {
                ...newState,
                assignedUser: props.bug.assigned_user,
            };
        }
        return newState
        
    }

    handleChange = (event) => {
        this.props.changeStatus(event, this.props.bug.id);
        this.setState({
            bugStatus: event,
            bugUpdate: true
        });
    }

    handleUserChange = (event) => {
        this.setState({
            assignedUser: event,
            userUpdate: true
        });
        this.props.changeAssignedUser(event, this.props.bug.id);
    }

    operations = (
        <Row gutter={8}>
            <Col>
                {this.props.bug.reported_user ==  this.props.user.id || this.props.user.is_superuser ?
                    <Button danger onClick={() => this.confirmDelete(this.handleDelete, this.props.bug.id)}>
                        <DeleteTwoTone twoToneColor='#ff4d4f' />
                        {window.innerWidth > 430 ? "Delete" : null}
                    </Button> : null}
            </Col>
        </Row>
    )

    confirmDelete = (handleDelete, id) => {
        confirm({
            title: 'Are you sure delete this Bug?',
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
        this.props.deleteIssue(id);
    }

    
    
    render() {
        
        return (
            <>
                <Tabs defaultActiveKey="1" style={{ margin: '2rem', marginTop: '1rem' }} tabBarExtraContent={this.operations}>
                    <TabPane tab="Detail" key="1">
                        {/* {Object.keys(this.state.bug).length ? <IssueDetail bug={this.state.bug} ></IssueDetail> : ""} */}
                        <Row >
                            <Col
                                className='scroll'
                                sm={22}
                                md={22}
                                lg={16}
                                style={{
                                    maxHeight: '90vh',
                                }}
                            >
                                <Descriptions title={this.props.comments ? <Link to={"Bugs/" + this.props.bug.id + "/"} >{'Bug Info' + " : " + this.props.bug.heading}</Link> :  'Bug Info' + " : " + this.props.bug.heading } column={1}>
                                    <Descriptions.Item label="Time">
                                        <time>
                                            {date(this.props.bug.date)}
                                        </time>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Tags">
                                        {this.state.tags.map(tag => (<Tag>{tag}</Tag>))}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Project">
                                        {this.props.bug.project_name}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Reported By"></Descriptions.Item>
                                    <Descriptions.Item>
                                        {this.props.bug.profile?<Avatar style={{ marginRight: '1rem' }} src={this.props.bug.profile} />:<Avatar>{this.props.bug.reported_user_name[0]}</Avatar>}
                                        &nbsp;{this.props.bug.reported_user_name}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Description"></Descriptions.Item>
                                    <Descriptions.Item label="">
                                        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                                            {ReactHtmlParser(this.props.bug.description)}
                                        </Paragraph>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Media"></Descriptions.Item>
                                    <Descriptions.Item>
                                        <Media url={this.props.bug.media} />
                                    </Descriptions.Item>
                                </Descriptions>
                            </Col>
                            <Col sm={22} md={22} lg={8}>
                                <Card
                                    style={{
                                        width: '100%',
                                        // margin: '3rem',
                                    }}
                                    title={'Actions'}
                                >
                                    <Row style={{ marginBottom: '1.5rem' }} justify={'center'}>
                                        <Select
                                            value={this.state.bugStatus}
                                            style={{ width: 210 }}
                                            onChange={this.handleChange.bind(this)}
                                            disabled = {this.props.bug.members.find(item => item.id == this.props.user.id) || this.props.user.is_superuser  ?false:true}
                                        >
                                            <Option key={0} value={0}><CloseCircleTwoTone twoToneColor="#eb2f96" /> Open</Option>
                                            <Option key={1} value={1}><LoadingOutlined /> In Progress</Option>
                                            <Option key={2} value={2}><CheckCircleTwoTone twoToneColor="#52c41a" /> Done</Option>
                                        </Select>
                                    </Row>
                                    <Row justify={'center'}>
                                        <Select
                                            value={this.state.assignedUser}
                                            style={{ width: 210 }}
                                            onChange={this.handleUserChange.bind(this)}
                                            disabled = {this.props.bug.members.find(item => item.id == this.props.user.id) || this.props.user.is_superuser  ?false:true}
                                        >
                                            <Option value={null}>
                                                Assigned User : None
                                            </Option>
                                            {this.props.bug.members.map(user => {
                                                if (user.profile != null) {
                                                    return (
                                                        <Option value={user.id} key={user.id}>
                                                            <Avatar size={18} src={user.profile} />
                                                        &nbsp;{user.name}
                                                        </Option>
                                                    );
                                                }
                                                else {
                                                    return (
                                                        <Option value={user.id} key={user.id}>
                                                            <Avatar size={18} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{user.name[0]}</Avatar>
                                                        &nbsp;{user.name}
                                                        </Option>
                                                    );
                                                }
                                            })}

                                        </Select>
                                    </Row>
                                </Card>
                            </Col>

                        </Row>
                    </TabPane>
                    {this.props.comments?null:
                    <TabPane tab="Comments" key="2">
                        <Comment bugId={this.state.bugId} token={this.props.token} />
                    </TabPane>}
                </Tabs>
                
            </>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token
});

export default connect(mapStateToProps, { changeStatus, changeAssignedUser, getAllProjects, getUsers, deleteIssue })(IssueDetail);
