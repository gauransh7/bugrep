import React from 'react';
import { Card, Avatar, Tooltip, Typography, Row, Col } from 'antd';
import {
    CheckCircleTwoTone,
    LoadingOutlined,
    CloseCircleTwoTone,
} from '@ant-design/icons';
import ReactHtmlParser from 'react-html-parser';
import ReactTimeAgo from 'react-time-ago';

const { Meta } = Card;
const { Paragraph } = Typography;

const IssueCard = ({ bug }) => {
    const assignedUserName = bug.members.find(item => item.id === bug.assigned_user) ? bug.members.find(item => item.id === bug.assigned_user).name:""

    const status = (status) => {
        if (status === 0) {
            return <CloseCircleTwoTone twoToneColor="#eb2f96" />
        }
        else if (status === 1) {
            return <LoadingOutlined />
        }
        else {
            return <CheckCircleTwoTone twoToneColor="#52c41a" />
        }
    }

    return (
        <Card
            actions={[
                <Tooltip title={assignedUserName}><div>Assigned User</div></Tooltip>,
                <div>Comments : {bug.no_of_comments}</div>
            ]}
        >
            <Meta
                avatar={bug.reported_user_profile ? <Avatar src={bug.reported_user_profile} /> : <Avatar>{bug.reported_user_name?bug.reported_user_name[0]:null}</Avatar>}
                title={<Row justify="space-between"><Col>{bug.heading}</Col><Col>{status(bug.status)}</Col></Row>}
                description={<><ReactTimeAgo date={bug.date} /><Paragraph style={{ marginTop: '0.5rem' }} ellipsis={{ rows: 2, expandable: false }}>{ReactHtmlParser(bug.description)}</Paragraph></>}
            />
        </Card>
    );
}



export default IssueCard;