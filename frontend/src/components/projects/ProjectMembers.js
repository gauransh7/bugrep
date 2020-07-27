import React, { useEffect } from 'react';
import { Card, List, Avatar } from 'antd';
import AddMembers from './AddMembers';
import RemoveMember from './RemoveMember';


const ProjectMembers = ({ members, id }) => {
    const memberArray = new Array();
    let i = 0
    for (const key in members) {
        memberArray[i] = members[key];
        i = i + 1;
    }
    return (
        <Card
            className='scroll'
            style={{
                width: '100%',
                maxHeight: '60vh',
            }}
            title={'Members'}
            extra={<AddMembers members={members} id={id} />}
        >
            <List
                itemLayout="horizontal"
                dataSource={memberArray}
                renderItem={ item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={item.profile?<Avatar src={item.profile} />:<Avatar>{item.name[0]}</Avatar>}
                            title={item.name}
                        />
                        <RemoveMember members={members} userId={item.id} projectId={id} />
                    </List.Item>
                )}
            />
        </Card>
    );
}

export default ProjectMembers;
