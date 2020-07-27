import React from 'react';
import Loader from '../../common/Loader';
import WebSocketInstance from '../../websocket';
import { List } from 'antd';
import AddComment from './AddComment';
import { connect } from 'react-redux';
import { getUsers } from '../../store/actions/userActions';
import CommentDetail from './CommentDetail';



class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: null,
            isclick: false
        }

        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(
                this.setComments.bind(this),
                this.addComment.bind(this),
                this.likedComment.bind(this)
            );
            WebSocketInstance.fetchComments(this.props.bugId);
        })
    }

    componentDidMount() {
        this.props.getUsers();
    }

    waitForSocketConnection(callback) {
        const component = this;
        setTimeout(
            function() {
                if(WebSocketInstance.state() === 1){
                    console.log('Connection is secure')
                    callback();
                    return;
                }
                else {
                    console.log('Waiting for socket connection...');
                    component.waitForSocketConnection(callback)
                }
            }, 100
        )
    }

    addComment(comment) {
        this.setState({
            comments: [comment, ...this.state.comments]
        })
    }

    setComments(comments) {
        this.setState({
            comments: comments.reverse()
        })
    }

    likedComment(comment) {
        let comments = this.state.comments;
        const index = comments.findIndex(element => element.id === comment.id);
        comments[index] = comment;
        this.setState({
            comments
        })
    }

    onLike = (id, status) => {
        WebSocketInstance.likeComment(id, status)
    }

    render() {
        if (this.state.comments === null) {
            return <Loader />
        }
        return this.props.users?
             (
                <>
                    <AddComment bugId={this.props.bugId} reply={0} rows={4} visible={true} />
                    <List
                        className="comment-list"
                        header={`${Object.keys(this.state.comments).length} comments`}
                        itemLayout="horizontal"
                        dataSource={this.state.comments}
                        renderItem={item => (
                            item.reply?null:
                            <li>
                                <CommentDetail reply={1} item={item} user={this.props.user} users={this.props.users} onLike={this.onLike}>
                                    {/* <AddComment bugId={this.props.bugId} reply={item.id} rows={1} /> */}
                                    {this.state.comments.map((comment) => {
                                        if(item.id === comment.reply){
                                            return <CommentDetail reply={0} item={comment} user={this.props.user} users={this.props.users} onLike={this.onLike} />
                                        }
                                    })}
                                </CommentDetail>
                            </li>
                        )}
                    />
                </>
            )
        : null
    }
}

const mapStateToProps = state => ({
    users: state.user.users,
    user: state.auth.user
})

export default connect(mapStateToProps, {getUsers})(CommentList);
