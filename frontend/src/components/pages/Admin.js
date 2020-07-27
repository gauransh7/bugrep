import React from 'react';
import { connect } from 'react-redux';
import { List, Avatar, Row, Col, Switch, Typography } from 'antd';
import { getUsers, changeStatus } from '../../store/actions/userActions';
import Unauthorised from '../../common/Unauthorised';

const { Title } = Typography;


class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        }
    }

    componentDidMount() {
        this.props.getUsers();
    }

    static getDerivedStateFromProps(props, state) {
        return {
            data: props.users
        }
    }

    onAdmin = (e, id) => {
        console.log(e, id);
        console.log(this.state.data);
        let form_data = new FormData();
        form_data.append('is_superuser', e);
        this.props.changeStatus(id, form_data);
    }

    onActive = (e, id) => {
        console.log(e, id);
        console.log(this.state.data);
        let form_data = new FormData();
        form_data.append('is_active', e);
        this.props.changeStatus(id, form_data);
    }

    render() {
        if(!this.props.user.is_superuser){
            return (
                <Unauthorised />
            )
        }
        return (
            <Row>
                <Col span={22} style={{ margin: '1.5rem' }}>
                    <Typography>
                        <Title>Users</Title>
                    </Typography>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item
                                id={item.id}
                                actions={this.props.user.id!==item.id?[<Switch onClick={(e) => this.onAdmin(e, item.id)} checkedChildren="admin" unCheckedChildren="admin" checked={item.is_superuser} />, <Switch checkedChildren="active" unCheckedChildren="active" onClick={(e) => this.onActive(e, item.id)} checked={item.is_active} />]:null}
                            >
                                <List.Item.Meta
                                    avatar={item.profile ? <Avatar src={item.profile} /> : <Avatar>{item.first_name[0]}</Avatar>}
                                    title={item.first_name+' '+item.last_name}
                                    description={"Reported Bugs:"+item.no_of_issues+", Projects:"+item.no_of_projects}
                                />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
            
        );
    }
}

const mapStateToProps = state => ({
    users: state.user.users,
    user: state.auth.user
})

export default connect(mapStateToProps, { getUsers, changeStatus })(Admin);
