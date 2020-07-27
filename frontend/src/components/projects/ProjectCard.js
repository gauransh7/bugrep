import React from 'react';
import { Card, Avatar, Tooltip, Typography } from 'antd';
import ReactHtmlParser from 'react-html-parser';
import ReactTimeAgo from 'react-time-ago';

const { Meta } = Card;
const { Paragraph } = Typography;

const ProjectCard = ({ project }) => {
    return (
        <Card
            // style={{ width: '100%' }}

            cover={
                project.thumbnail ? <img
                    alt="example"
                    src={project.thumbnail}
                /> : ''
            }
            actions={[
                <Tooltip title={project.members_detail.map((member, index) => { return <div>{index + 1 + '. ' + member.name}</div> })}><div>Members</div></Tooltip>,
                <div>Issues : {project.no_of_issues}</div>
            ]}
        >
            <Meta
                avatar={project.logo ? <Avatar src={project.logo} /> : <Avatar>{project.name[0]}</Avatar>}
                title={project.name + ' ' + project.version}
                description={<><ReactTimeAgo date={project.date} /><Paragraph style={{ marginTop: '0.5rem' }} ellipsis={{ rows: 2, expandable: false }}>{ReactHtmlParser(project.wiki)}</Paragraph></>}
            />
        </Card>
    );
}



export default ProjectCard;