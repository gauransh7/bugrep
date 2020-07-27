import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Tabs } from 'antd';
import PropTypes from 'prop-types';
import IssueList from '../issues/IssueList';
import CreateIssue from '../issues/CreateIssue';

const { TabPane } = Tabs


class AssignedBugs extends React.Component {
    operations = (
        <Row gutter={8}>
            <Col>
                <CreateIssue />
            </Col>
        </Row>
    );

    render() {
        return (
            <Row>
                <Col span={22} style={{ margin: '1.5rem' }}>
                    <Tabs tabBarExtraContent={this.operations} >
                        <TabPane tab="All Bugs" key="1">
                            <IssueList projectId={null} userId={this.props.userId} />
                        </TabPane>
                        <TabPane tab="Open" key="2">
                            <IssueList projectId={null} userId={this.props.userId} status={0} />
                        </TabPane>
                        <TabPane tab="In Progress" key="3">
                            <IssueList projectId={null} userId={this.props.userId} status={1} />
                        </TabPane>
                        <TabPane tab="Done" key="4">
                            <IssueList projectId={null} userId={this.props.userId} status={2} />
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    userId: state.auth.user.id
})

export default connect(mapStateToProps)(AssignedBugs);
