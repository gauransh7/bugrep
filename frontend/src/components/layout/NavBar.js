import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Layout, Menu, Row } from 'antd';
import {
    FundProjectionScreenOutlined,
    HomeOutlined,
    BugOutlined,
    FileDoneOutlined,
    UserOutlined,
    LogoutOutlined,
    SettingOutlined,
    FrownOutlined,
} from '@ant-design/icons';
import { logout } from '../../store/actions/authActions';
import { connect } from 'react-redux';

const { Sider } = Layout;
const { SubMenu } = Menu;

class NavBar extends React.Component {
    state = {
        collapsed: true,
        key: 1,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    handleClick = (e) => {
        const key = e.target.getAttribute('key');
        alert(key);
    }

    render() {
        return (
            <Sider style={{ minHeight: '100vh' }} theme="light" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <Row justify="center" style={ { margin: '1rem 0 5rem 0' }}>
                <div className="logo"><img src="https://img.icons8.com/fluent/48/000000/bug.png" alt="logo"/></div>
                </Row>
                <Menu theme="light" defaultSelectedKeys={[`${this.state.key}`]} mode="inline">
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to="/" />Home
                    </Menu.Item>
                    <Menu.Item key="2" icon={<FundProjectionScreenOutlined />}>
                        <NavLink to="/Projects">Projects</NavLink>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<BugOutlined />}>
                        <Link to="/Bugs">Assigned Bugs</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<FileDoneOutlined />}>
                        <Link to="/Board">Board</Link>
                        </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="5" icon={<FrownOutlined />}><Link to="/My_Page">My Page (Admins)</Link></Menu.Item>
                        <Menu.Item key="6" icon={<SettingOutlined />}><Link to="/Settings">Settings</Link></Menu.Item>
                        <Menu.Item key="7" icon={<LogoutOutlined />}><Link to='/login' onClick={this.props.logout}>Logout</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default connect(null, { logout })(NavBar);

