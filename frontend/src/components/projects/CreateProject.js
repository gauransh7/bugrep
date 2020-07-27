import React from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, Upload, InputNumber } from 'antd';
import { PlusOutlined, InboxOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import { getUsers } from '../../store/actions/userActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/projectActions';
import Loader from '../../common/Loader';

const { Option } = Select;
const { Dragger } = Upload;

const props = {
    name: 'logo',
    multiple: false,
};

class CreateProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            logo: null,
            loading: false
        }
    }

    static propTypes = {
        getUsers: PropTypes.func.isRequired,
        users: PropTypes.array.isRequired
    }

    componentDidMount() {
        this.props.getUsers()
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    handleUpload = (file) => {
        this.setState({
            logo: file.file
        })
    }

    handleSubmit = e => {
        console.log(e);
        let form_data = new FormData();
        form_data.append('name', e.name);
        form_data.append('wiki', e.wiki.level.content);
        form_data.append('version', e.version);
        form_data.append('user', this.props.userId)
        if (this.state.logo) {
            form_data.append('logo', this.state.logo);
        }
        let userAppend = 1;
        for (const val of e.members){
            form_data.append('members', val);
            if(val === this.props.userId){
                userAppend = 0
            }
        }
        if(userAppend){
            form_data.append('members', this.props.userId);
        }
        this.setState({
            loading: true
        })
        this.props.createProject(form_data);
        this.setState({
            logo: null
        })
    }

    render() {
        return (
            <>
                <Button type="primary" onClick={this.showDrawer}>
                    <PlusOutlined /> Add Project
                </Button>
                <Drawer
                    title="Add a New Project"
                    width={window.innerWidth > 900 ? 800 : window.innerWidth - 100}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    {this.state.loading?<Loader />:
                    <Form layout="vertical" onFinish={this.handleSubmit}>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        placeholder="Please enter name"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name="wiki"
                                    label="Wiki"
                                    rules={[
                                        {
                                            required: true
                                        },
                                    ]}

                                >
                                    <Editor
                                        apiKey="t79x535w9g53fxpaufz1xmkq9728uu7vnibjc2khvdleb7yk"
                                        init={{
                                            height: 300,
                                            width: '100%',
                                            menubar: true,
                                            plugins: [
                                                'advlist autolink lists link image charmap print preview anchor',
                                                'searchreplace visualblocks code fullscreen',
                                                'insertdatetime media table paste code help wordcount'
                                            ],
                                            toolbar:
                                                'undo redo | formatselect | bold italic backcolor | \
                                                alignleft aligncenter alignright alignjustify | \
                                                bullist numlist outdent indent | removeformat | help'
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Item
                                    name="version"
                                    label="Version"
                                    rules={[{ required: true }]}
                                >
                                    <InputNumber 
                                        min={0} 
                                        step={0.1}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name="members"
                                    label="Members"
                                    rules={[{ required: false }]}
                                >
                                    <Select
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="Please select members"
                                        optionLabelProp="label"
                                    >
                                        {this.props.users?this.props.users.map((user, index) => {
                                            return <Option value={user.id} label={user.first_name + ' ' + user.last_name}>{user.first_name + ' ' + user.last_name}</Option>
                                        }):''}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name="logo"
                                    label="Logo"
                                    rules={[
                                        {
                                            required: false
                                        },
                                    ]}
                                >
                                    <Dragger
                                        style={{ width: "100%", padding: '0.5rem' }}
                                        {...props}
                                        beforeUpload={() => { return false; }}
                                        onRemove={() => { this.setState({ logo: null }) }}
                                        action={this.handleUpload}
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Click or drag file</p>
                                    </Dragger>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify={'center'}>
                            <Col>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>}
                </Drawer>
            </>
        );
    }
}

const mapStateToProps = state => ({
    users: state.user.users,
    userId: state.auth.user.id
})

export default connect(mapStateToProps, { getUsers, createProject })(CreateProject);