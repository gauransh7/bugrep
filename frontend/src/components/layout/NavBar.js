import React from 'react';
import { Link } from 'react-router-dom';
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
            <Sider 
                style={{
                    overflow: 'hidden',
                    minHeight: '100vh',
                    position: 'sticky',
                    // left: 0,
                }}
                theme="light" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}
            >
                <Row justify="center" style={ { margin: '1rem 0 5rem 0' }}>
                <div className="logo"><img src="https://img.icons8.com/fluent/48/000000/bug.png" alt="logo"/></div>
                </Row>
                <Menu theme="light" defaultSelectedKeys={[`${this.state.key}`]} mode="inline">
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to="/" />Home
                    </Menu.Item>
                    <Menu.Item key="2" icon={<FundProjectionScreenOutlined />}>
                        <Link to="/Projects">Projects</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<BugOutlined />}>
                        <Link to="/AssignedBugs">Assigned Bugs</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="5" icon={<FrownOutlined />}><Link to="/My_Page">My Page</Link></Menu.Item>
                        <Menu.Item key="6" icon={<SettingOutlined />}><Link to="/Admin">Admin Page</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="4" icon={<LogoutOutlined />}><Link to='/login' onClick={this.props.logout}>Logout</Link></Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default connect(null, { logout })(NavBar);

