import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Tabs } from 'antd';
import PropTypes from 'prop-types';
import IssueList from '../issues/IssueList';
import CreateIssue from '../issues/CreateIssue';

const { TabPane } = Tabs


class MyPage extends React.Component {
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
                    <Tabs tabBarExtraContent={this.operations}>
                        <TabPane tab="Reported Bugs" key="1">
                            <IssueList projectId={null} reportedUserId={this.props.userId} userId={null} />
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

export default connect(mapStateToProps)(MyPage);
