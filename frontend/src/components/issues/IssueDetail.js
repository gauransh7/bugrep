import React from 'react';
import { Row, Col, Descriptions, Card, Avatar, Typography, Select, Tag, List, Button } from 'antd';
import {
    PlusOutlined,
    CheckCircleTwoTone,
    LoadingOutlined,
    CloseCircleTwoTone,
} from '@ant-design/icons';
import ReactHtmlParser from 'react-html-parser'; 
import PropTypes from 'prop-types';
import { changeStatus, changeAssignedUser } from '../../store/actions/issueActions';
import { connect } from 'react-redux';
import { getAllProjects } from '../../store/actions/projectActions';
import { getUsers } from '../../store/actions/userActions';

const { Paragraph } = Typography;
const { Option } = Select;

const data = [
    'Member Name 1',
    'Member Name 2',
    'Member Name 3',
    'Member Name 4',
    'Member Name 5',
    'Member Name 6',
];

const date = (date) => {
    const thedate = new Date(date);
    return thedate.toDateString();
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
        };
    }

    static getDerivedStateFromProps(props, state){
        if (state.userUpdate) {
            return {
                assignedUser: state.assignedUser,
                userUpdate: false
            };
        }
        else if (props.bug.status !== state.bugStatus) {
            return {
                assignedUser: props.bug.assigned_user,
            };
        }
        if (state.bugUpdate) {
            return {
                bugStatus: state.bugStatus,
                bugUpdate: false
            };
        }
        else if(props.bug.status!==state.bugStatus){
            return { 
                bugStatus: props.bug.status,
            };
        }
        
    }

    handleChange = (event) => {
        this.setState({
            bugStatus: event,
            bugUpdate: true
        });
        this.props.changeStatus(event, this.props.bug.id);
    }

    handleUserChange = (event) => {
        this.setState({
            assignedUser: event,
            userUpdate: true
        });
        this.props.changeAssignedUser(event, this.props.bug.id);
    }
    
    render() {
        return (
            <>
                <Row >
                    <Col 
                        className='scroll'
                        sm={16}
                        style={ { 
                            maxHeight: '90vh',
                        }}
                    >
                        <Descriptions title={'Bug Info'+" : "+this.props.bug.heading} column={1}>
                            <Descriptions.Item label="Time">
                                <time>
                                    {date(this.props.bug.date)}
                                </time>
                            </Descriptions.Item>
                            <Descriptions.Item label="Tags">
                                {this.props.bug.tags.map(tag => (<Tag>{tag}</Tag>))}
                            </Descriptions.Item>
                            <Descriptions.Item label="Project">
                                {this.props.bug.project_name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Reported By"></Descriptions.Item>
                            <Descriptions.Item>
                                <Avatar style={ { marginRight: '1rem' }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                {this.props.bug.reported_user_name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Description"></Descriptions.Item>
                            <Descriptions.Item label="">
                                <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                                    {ReactHtmlParser( this.props.bug.description )}
                                </Paragraph>
                            </Descriptions.Item>
                            <Descriptions.Item label="Media"></Descriptions.Item>
                            {() => {
                                if(this.props.bug.media!=null){
                                    return(
                                        <Descriptions.Item>
                                            {/* {media(this.props.bug.media)} */}
                                        </Descriptions.Item>
                                    )
                                }
                            }}
                        </Descriptions>
                    </Col>
                    <Col sm={8}>
                        <Card
                            style={{ 
                                width: 270, 
                                margin:'3rem', 
                            }}
                            title={'Actions'}
                        >
                            <Row style={{ marginBottom: '1.5rem' }} justify={'center'}>
                                <Select 
                                    value={this.state.bugStatus} 
                                    style={{ width: 210}} 
                                    onChange={this.handleChange.bind(this)}
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
                                >
                                    {this.props.bug.members.map(user => {
                                            if(user.profile!=null){
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
                                    <Option value={null}>
                                        Assigned User : None
                                    </Option>
                                </Select>
                            </Row>
                        </Card>
                        <Card
                            className='scroll'
                            style={{
                                width: 270,
                                margin: '3rem',
                                maxHeight: 350,
                            }}
                            title={'Members'}
                            extra={<Button size={'small'} type="primary" icon={<PlusOutlined />}>Add</Button>}
                        >
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title={<a href="https://ant.design">{item}</a>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </>
        );
    }
}

export default connect(null, { changeStatus, changeAssignedUser, getAllProjects, getUsers })(IssueDetail);
