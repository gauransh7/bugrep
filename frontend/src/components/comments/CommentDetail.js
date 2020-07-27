import React from 'react';
import { Avatar, Tooltip, Comment } from 'antd';
import {
    LikeFilled,
    LikeOutlined
} from '@ant-design/icons';
import ReactTimeAgo from 'react-time-ago';
import AddComment from './AddComment';

const date = (date) => {
    const thedate = new Date(date);
    return thedate.toLocaleTimeString() + " " + thedate.toLocaleDateString();
}

const CommentDetail = ({ item, user, users, onLike, children, reply }) => {

    return (
        <Comment
            actions={[
                <Tooltip key="comment-basic-like" title="Like">
                    <span
                        onClick={() => onLike(item.id, item.likes.find(element => element === user.id) ? 1 : 0)}
                    >
                        {React.createElement(item.likes.find(element => element === user.id) ? LikeFilled : LikeOutlined)}
                                                &nbsp;
                        <span className="comment-action">{Object.keys(item.likes).length}</span>
                    </span>
                </Tooltip>,
                // reply?<span key={item.id}>Reply</span>:null
                reply ? <AddComment bugId={item.issue} reply={item.id} rows={1} />:null
            ]}
            author={users.find(element => element.id === item.user).first_name + " " + users.find(element => element.id === item.user).last_name}
            avatar={
                users.find(element => element.id === item.user).profile ?
                    <Avatar
                        src={item.profile}
                        alt={item.id}
                    />
                    : <Avatar alt={item.id}>{users.find(element => element.id === item.user).first_name[0]}</Avatar>
            }
            content={item.description}
            datetime={<Tooltip title={date(item.date)}><ReactTimeAgo date={item.date} /></Tooltip>}
        >
            {children}
        </Comment>
    );
}



export default CommentDetail;;