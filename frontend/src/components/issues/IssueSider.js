import React from 'react'
import { Menu, Typography, Button, Row, Dropdown, message, Divider, Col, Descriptions, Select } from 'antd';
import {
    DownOutlined,
    CheckCircleTwoTone,
    LoadingOutlined,
    CloseCircleTwoTone,
} from '@ant-design/icons';
import CreateIssue from '../issues/CreateIssue';
import ReactTimeAgo from 'react-time-ago';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;
const { Option } = Select;


const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
};

const CategoryMenu = (changeCategory) => {
    return(
        <Menu onClick={changeCategory.bind(this)}>
            <Menu.Item key={0} id={null}>All Issues</Menu.Item>
            <Menu.Item key={1} id={0}><CloseCircleTwoTone twoToneColor="#eb2f96" />Open</Menu.Item>
            <Menu.Item key={2} id={1}><LoadingOutlined />In Progress</Menu.Item>
            <Menu.Item key={3} id={2}><CheckCircleTwoTone twoToneColor="#52c41a" />Done</Menu.Item>
        </Menu>
)};

const Bug = ({heading, time, project, tags, status, bug, changeBug}) => {
    const Status = () => {
        if (status === 0) {
            return <CloseCircleTwoTone twoToneColor="#eb2f96" />
        }
        else if (status === 1) {
            return <LoadingOutlined />
        }
        else {
            return <CheckCircleTwoTone twoToneColor="#52c41a" />
        }
    }
    let tagsList = []
    if (tags != null) {
        tagsList = tags.split(' ');
    }
    return ( 
        <div onClick={() => {changeBug({bug})}} style={{ cursor: 'pointer'}}>
            <Link to={window.innerWidth<575?'/Bugs/' + bug.id + '/':''}>
            <Row  justify = { 'space-between'} >
                <Col>
                    <Status></Status>
                    <Divider type={'vertical'} />
                    <Text strong>
                        {heading}
                    </Text>
                </Col>
                <Col>
                    <ReactTimeAgo date={time} />
                </Col>
            </Row >
            <Descriptions style={{ margin: '2rem 0 0 0' }} column={1}>
                <Descriptions.Item label='Project'>{project}</Descriptions.Item>
                <Descriptions.Item label='Tags'>{tagsList.map(tag => (tag+' '))}</Descriptions.Item>
            </Descriptions>
            <Divider dashed />
            </Link>
        </div>
    )
}

class IssueSider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bugStatus: null
        };
    }

    changeCategory = (status) => {
        console.log(status)
        this.setState({
            bugStatus: status.item.props.id
        })
    }

    bugStatus = () => {
        if(this.state.bugStatus==0){
            return "Open"
        } else if(this.state.bugStatus==1){
            return "In Progress"
        } else if(this.state.bugStatus==2){
            return "Done"
        }
    }

    render() {
        return (
            <>
                <Row style={{ margin: '2rem 1rem' }} align="middle" justify={'space-between'}>
                    <Col>
                        <Title level={3} style={{ margin: 0 }}>
                            {this.props.name}
                        </Title>
                    </Col>
                    <Col>
                        <CreateIssue></CreateIssue>
                    </Col>
                </Row>
                <Row 
                    // style={{ margin: '2rem 1rem' }} 
                    justify={'center'} align={"middle"}
                >
                    <Col>
                        <Dropdown overlay={CategoryMenu(this.changeCategory)} trigger={['click']}>
                            <Button>
                                {this.state.bugStatus!==null?this.bugStatus():"All Issues"} <DownOutlined />
                            </Button>
                        </Dropdown>
                    </Col>
                    <Col>
                        {/* <Select
                            showSearch
                            style={{ width: 110 }}
                            placeholder="Project"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select> */}
                    </Col>
                </Row>
                <Divider />
                <Row 
                    className='scroll'
                    style={{
                        height: '65vh',
                        margin: '2rem 0.1rem 0 1rem'
                        }}
                >
                    {this.props.bugs.length?
                    this.props.bugs.map(bug => 
                        {
                            if (this.state.bugStatus === null){
                            return (
                                    // window.innerwidth < 575? <Link to={'Bugs/'+bug.id+'/'}>:{null}
                                    <Bug
                                        changeBug={this.props.changeBug}
                                        heading={bug.heading}
                                        time={bug.date}
                                        project={bug.project_name}
                                        tags={bug.tags}
                                        status={bug.status}
                                        key={bug.id}
                                        bug={bug}
                                    />
                                    // window.innerwidth < {575} ? </Link>:null
                                );
                            }
                            else {
                                if(this.state.bugStatus === bug.status){
                                    return (
                                        <Bug
                                            changeBug={this.props.changeBug}
                                            heading={bug.heading}
                                            time={bug.date}
                                            project={bug.project_name}
                                            tags={bug.tags}
                                            status={bug.status}
                                            key={bug.id}
                                            bug={bug}
                                        />
                                    );
                                }
                            }
                        }
                    ) : "You don't have any latest Bugs"}
                </Row>
            </>
        );
    }
}

export default IssueSider;

