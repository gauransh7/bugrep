import React from 'react';
import { Comment, Form, Avatar, Button, Input } from 'antd';
import { connect } from 'react-redux';
import WebSocketInstance from '../../websocket';

const { TextArea } = Input;

const Editor = ({ onSubmit, rows }) => (
    <Form onFinish={onSubmit}>
        <Form.Item
            name="description"
            rules={[{ required: true }]}
        >
            <TextArea rows={rows} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </Form>
);

class AddComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            description: null,
            visible: false
        }
    }

    handleSubmit = (event) => {
        const commentObject = {
            reply: this.props.reply,
            description: event.description,
            issueId: this.props.bugId
        }
        WebSocketInstance.newComment(commentObject);
        this.setState({
            visible: false
        })
    }

    handleClick = () => {
        this.setState({
            visible: true
        })
    }

    render() {
        if(!this.props.user){
            return null
        }
        if(this.state.visible){
            return (
                <Comment
                    avatar={
                        this.props.user.profile ?
                            <Avatar
                                src={this.props.user.profile}
                                alt={this.props.user.id}
                            /> : <Avatar alt={this.props.user.id}>{this.props.user.first_name[0]}</Avatar>
                    }
                    content={
                        <Editor
                            onSubmit={this.handleSubmit}
                            submitting={this.state.submitting}
                            rows={this.props.rows}
                        />
                    }
                />
            );
        }
        if (!this.props.visible) {
            return <span onClick={this.handleClick} className="comment-action">Reply</span>
        }
        return (
            <Comment
                avatar={
                    this.props.user.profile ?
                        <Avatar
                            src={this.props.user.profile}
                            alt={this.props.user.id}
                        /> : <Avatar alt={this.props.user.id}>{this.props.user.first_name[0]}</Avatar>
                }
                content={
                    <Editor
                        onSubmit={this.handleSubmit}
                        submitting={this.state.submitting}
                        rows={this.props.rows}
                    />
                }
            />
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(AddComment);
