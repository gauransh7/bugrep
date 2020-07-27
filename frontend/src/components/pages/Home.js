import React from 'react';
import IssueSider from '../issues/IssueSider';
import IssueDetail from '../issues/IssueDetail'
import { Divider, Row, Col, Tabs, message } from 'antd';
import { connect } from 'react-redux';
import { getLatestIssues } from '../../store/actions/issueActions';
import PropTypes from 'prop-types';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bug: {},
        }
    }

    static propTypes= {
        latestIssues: PropTypes.array.isRequired,
    }

    componentDidMount() {
        this.props.getLatestIssues();
    }
    
    static getDerivedStateFromProps(props, state) {
        if(props.latestIssues.length){
            if (!Object.keys(state.bug).length){
                return {
                    bug: props.latestIssues[0],
                };
            }
        }
    }
    
    changeBug = (bug) => {
        this.setState({
            bug: bug.bug,
        })
    };

    render() {
        return (
            <>
                <Row>
                    <Col xs={23} sm={5}>
                        <IssueSider name={'Latest Bugs'} bugs={this.props.latestIssues} changeBug={this.changeBug}></IssueSider>
                    </Col>
                    <Divider type='vertical' style={{ minHeight: '100vh' }} />
                    <Col xs={0} sm={18}>
                        {/* <Tabs defaultActiveKey="1" onChange={callback} style={ { margin: '2rem' }}>
                            <TabPane tab="Detail" key="1">
                                {Object.keys(this.state.bug).length?<IssueDetail bug={this.state.bug} ></IssueDetail>:""}
                            </TabPane>
                            <TabPane tab="Comments" key="2">
                                Content of Tab Pane 2
                            </TabPane>
                        </Tabs> */}
                        {Object.keys(this.state.bug).length ? <IssueDetail comments={true} bug={this.state.bug} ></IssueDetail> : ""}
                    </Col>
                </Row>
            </>
        );
    }
}

const mapStateToProps = state => ({
    latestIssues: state.issue.latestIssues,
});

export default connect(mapStateToProps, { getLatestIssues })(Home);
