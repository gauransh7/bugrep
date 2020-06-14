import React from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, Upload, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import { getUsers } from '../../store/actions/userActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const { Option } = Select;

const children = [];

for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class CreateProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
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

    handleSubmit = e => {
        console.log(e)
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
                                    label="members"
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
                                        {this.props.users?this.props.users.map(user => {
                                            return <Option value={user.id} label={user.first_name + ' ' + user.last_name}>{user.first_name + ' ' + user.last_name}</Option>
                                        }):''}
                                    </Select>
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
                    </Form>
                </Drawer>
            </>
        );
    }
}

const mapStateToProps = state => ({
    users: state.user.users
})

export default connect(mapStateToProps, { getUsers })(CreateProject);