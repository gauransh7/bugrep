import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Row, Col, Form, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { editProject } from '../../store/actions/projectActions';

const { Option } = Select;


class AddMembers extends React.Component {
    state = {
        visible: false,
        confirmLoading: false,
        members: []
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        // this.setState({
        //     confirmLoading: true,
        // });
        // setTimeout(() => {
        //     this.setState({
        //         visible: false,
        //         confirmLoading: false,
        //     });
        // }, 2000);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    handleSubmit = () => {
        console.log(this.state.members);
        let form_data = new FormData();
        for (const val of this.state.members) {
            form_data.append('members', val);
        }
        this.props.editProject(form_data, this.props.id);
        this.setState({
            members: [],
            visible: false
        })
    }

    addMember = e => {
        let members = [...e]
        for (const val of this.props.members) {
            members.push(val.id);
        }
        this.setState({
            members
        })
    }

    render() {
        const { visible, confirmLoading } = this.state;
        return (
            <>
                <Button type="primary" onClick={this.showModal}>
                    <PlusOutlined /> Add
                </Button>

                <Modal
                    title="Add Members"
                    visible={visible}
                    okText={'Add'}
                    onOk={this.handleSubmit}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Form layout="vertical" onFinish={this.handleSubmit}>
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
                                        onChange={this.addMember}
                                    >
                                        {this.props.users ? this.props.users.map((user, index) => {
                                            return this.props.members.find(element => element.id == user.id) ? null :< Option value = { user.id } label = { user.first_name + ' ' + user.last_name } > { user.first_name + ' ' + user.last_name }</Option>
                                        }) : ''}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
    users: state.user.users
})

export default connect(mapStateToProps, { editProject })(AddMembers);
