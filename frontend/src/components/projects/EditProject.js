import React from 'react';
import { Form, Button, Col, Row, Input, Select, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import { editProject } from '../../store/actions/projectActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const { Option } = Select;
const { Dragger } = Upload;

const props = {
    name: 'logo',
    multiple: false,
};

class EditProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logo: null
        }
    }

    handleUpload = (file) => {
        this.setState({
            logo: file.file
        })
    }

    static propTypes= {
        editProject: PropTypes.func.isRequired
    }

    handleSubmit = e => { 
        let form_data = new FormData();
        let update = 0;
        if (e.name != this.props.project.name) {
            form_data.append('name', e.name);
            update = 1;
        }
        if(e.wiki.level){
            form_data.append('wiki', e.wiki.level.content);
            update = 1;
        }
        if (this.state.logo) {
            form_data.append('logo', this.state.logo);
            update = 1;
        }
        if(update){
            this.props.editProject(form_data, this.props.project.id);
        } else {
            message.info('No Change')
        }
        this.setState({
            logo: null
        })
    }

    render() {
        return (
            <>
                    <Form layout="vertical" onFinish={this.handleSubmit}>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[{ required: true }]}
                                    initialValue={this.props.project.name}
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
                                    initialValue={this.props.project.wiki}
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
                                        defaulValue={this.props.project.wiki}
                                    />
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
                                        onChange={this.handleUpload}
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
                    </Form>
            </>
        );
    }
}

export default connect(null, { editProject })(EditProject);