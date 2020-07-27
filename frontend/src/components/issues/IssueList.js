import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Pagination, Progress } from 'antd';
import IssueCard from './IssueCard';
import Loader from '../../common/Loader';
import axios from 'axios';


const IssueList = ({ projectId, userId, status, reportedUserId }) => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentIssue] = useState(1);
    const [issuesPerPage, setIssuesPerPage] = useState(9);
    const [openPercent, setOpenPercent] = useState();
    const [inProgressPercent, setInProgressPercent] = useState();
    const [donePercent, setDonePercent] = useState();

    const round = (value, decimals) => {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }

    useEffect(() => {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        const fetchIssues = async () => {
            setLoading(true);
            let url = null;
            if (projectId) {
                url = 'http://127.0.0.1:8000/backend/projects/' + projectId + '/issues/'
            } else if (userId) {
                url = 'http://127.0.0.1:8000/backend/users/' + userId + '/assigned_issues/'
            } else if(reportedUserId) {
                url = 'http://127.0.0.1:8000/backend/users/' + reportedUserId + '/reported_issues/'
            }
            axios.get(url, config)
                .then(response => {
                    let issues = response.data
                    if (status != undefined) {
                        issues = issues.filter(issue => issue.status == status)
                    }
                    setIssues(issues);
                    const totalIssues = Object.keys(issues).length;
                    const openIssues = Object.keys(issues.filter(issue => issue.status == 0)).length;
                    const inProgressIssues = Object.keys(issues.filter(issue => issue.status == 1)).length;
                    const doneIssues = totalIssues - openIssues - inProgressIssues;
                    setOpenPercent(round(openIssues / totalIssues * 100, 2));
                    setDonePercent(round(doneIssues / totalIssues * 100, 2));
                    setInProgressPercent(round(inProgressIssues / totalIssues * 100, 2))
                })
                .catch(error => {
                    console.log(error);
                });

            setLoading(false);
        }

        fetchIssues();


    }, [])

    const indexOfLastIssue = currentPage * issuesPerPage;
    const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
    const currentIssues = issues.slice(indexOfFirstIssue, indexOfLastIssue);

    const paginate = (page) => setCurrentIssue(page);

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {status == undefined ? <Row justify="space-around" gutter={[0, 32]}>
                <Col><Row><Col>Open</Col><Col><Progress type="circle" percent={openPercent} strokeColor="red" status="normal" /></Col></Row></Col>
                <Col><Row><Col>In Progress</Col><Col><Progress type="circle" percent={inProgressPercent} status="active" /></Col></Row></Col>
                <Col><Row><Col>Done</Col><Col><Progress type="circle" percent={donePercent} strokeColor="#87d068" /></Col></Row></Col>
            </Row> : null}
            <Row gutter={[16, 30]}>
                {currentIssues.map(issue => {
                    return (
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Link to={"/Bugs/" + issue.id}>
                                <IssueCard bug={issue}></IssueCard>
                            </Link>
                        </Col>
                    );
                })}
            </Row>
            <Row justify={'center'}>
                <Pagination onChange={(page) => { paginate(page) }} defaultCurrent={1} total={Object.keys(issues).length} pageSize={issuesPerPage} />
            </Row>
        </>
    );
}


export default IssueList;