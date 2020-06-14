import React from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, Upload } from 'antd';
import { PlusOutlined, InboxOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import { connect } from 'react-redux';
import { getAllProjects } from '../../store/actions/projectActions';
import PropTypes from 'prop-types';
import { addIssue } from '../../store/actions/issueActions';

const { Option } = Select;
const { Dragger } = Upload;

const props = {
    name: 'media',
    multiple: false,
};


class CreateIssue extends React.Component {
    state = {
        visible: false,
    };

    static propTypes= {
        allProjects: PropTypes.array.isRequired,
        addIssue: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getAllProjects()
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
        let tags = e.tags.split(' ')
        let form_data = new FormData();
        form_data.append('heading', e.heading);
        form_data.append('project', e.project);
        form_data.append('description', e.description.level.content);
        if (e.media!=null){
            form_data.append('media', e.media.file, e.media.file.name);
        }
        form_data.append('tags', JSON.stringify(tags));
        for (var value of form_data.values()) {
            console.log(value);
        }
        this.props.addIssue(form_data);
    }

    render() {
        return (
            <>
                <Button type="primary" onClick={this.showDrawer}>
                    <PlusOutlined /> Add Bug
                </Button>
                <Drawer
                    title="Add a New Bug"
                    width={window.innerWidth > 900 ? 800 : window.innerWidth - 100}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Form layout="vertical" onFinish={this.handleSubmit}>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name="heading"
                                    label="Heading"
                                    rules={[{ required: true }]}
                                >
                                    <Input 
                                        style={{ width: '100%' }} 
                                        placeholder="Please enter heading" 
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name="project"
                                    label="Project"
                                    rules={[{ required: true }]}
                                // value={this.state.project}s
                                // onChange={this.handleChange}
                                >
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Select a Project"
                                        optionFilterProp="children"
                                        // onChange={this.handleSelectChange}
                                        // onFocus={onFocus}
                                        // onBlur={onBlur}
                                        // onSearch={onSearch}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.props.allProjects.map(project => (
                                            <Option key={project.id} value={project.id}>{project.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name="tags"
                                    label="Tags"
                                    rules={[{ required: true }]}
                                    // value={this.state.tags}
                                    // onChange={this.handleChange}
                                >
                                    <Input style={{ width: '100%' }} placeholder="Enter space seperated values" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label="Description"
                                    rules={[
                                        {
                                            required: true
                                        },
                                    ]}
                                    
                                >
                                    {/* <Input.TextArea style={{ width: 300 }} rows={5} placeholder="Please enter  description" /> */}
                                    <Editor
                                        apiKey="t79x535w9g53fxpaufz1xmkq9728uu7vnibjc2khvdleb7yk"
                                        init={{
                                            height: 200,
                                            width: '100%',
                                            menubar: false,
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
                                        // onChange={this.handleEditorChange.bind(this)}
                                        // value={this.state.description}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name="media"
                                    label="Media"
                                    rules={[
                                        {
                                            required: false
                                        },
                                    ]}
                                    // onChange={this.handleFileChange}
                                >
                                    <Dragger
                                        style={{ width: "100%", padding: '0.5rem' }}
                                        {...props}
                                        beforeUpload={() => {return false;}}
                                        onRemove={() => {this.setState({media: null})}}
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
                                    <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                                        Cancel
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item>
                                    <Button
                                        // onClick={this.onClose} 
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
    allProjects : state.project.allProjects
});

export default connect(mapStateToProps, { getAllProjects, addIssue })(CreateIssue);
