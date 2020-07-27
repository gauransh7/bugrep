import React from 'react';
import { connect } from 'react-redux';
import { Tooltip } from 'antd';
import { MinusCircleTwoTone } from '@ant-design/icons';
import { editProject } from '../../store/actions/projectActions';


class RemoveMember extends React.Component {
    onClick = () => {
        let form_data = new FormData();
        for (const val of this.props.members) {
            if(val.id===this.props.userId) {
                continue;
            }
            form_data.append('members', val.id);
        }
        this.props.editProject(form_data, this.props.projectId);
    }

    render() {
        return (
            this.props.user.is_superuser || this.props.members.find(element => element.id == this.props.user.id)?
            <Tooltip title={'Remove'}>
                <MinusCircleTwoTone twoToneColor='#ff4d4f' onClick={this.onClick} /> 
            </Tooltip> : null
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps, { editProject })(RemoveMember);
