import React from 'react';
import CommentList from './CommentList';
import WebSocketInstance from '../../websocket';

class Comment extends React.Component {
    componentDidMount() {
        if (this.props.bugId != null && this.props.token != null) {
            WebSocketInstance.connect(this.props.bugId, this.props.token);
        }
    }

    componentWillUnmount() {
        WebSocketInstance.disconnect();
    }

    render() {
        return (
            <CommentList />
        );
    }
}

export default Comment;
