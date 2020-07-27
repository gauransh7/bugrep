import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Pagination } from 'antd';
import ProjectCard from './ProjectCard';


const ProjectList = ({ projects }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage, setProjectsPerPage] = useState(9);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    const paginate = (page) => setCurrentPage(page);

    return (
        <>
            <Row gutter={[16, 30]}>
                {currentProjects.map(project => {
                    return (
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Link to={"/Projects/"+project.id}>
                                <ProjectCard project={project}></ProjectCard>
                            </Link>
                        </Col>
                    );
                })}
            </Row>
            <Row justify={'center'}>
                <Pagination onChange={(page) => {paginate(page)}} defaultCurrent={1} total={Object.keys(projects).length} pageSize={projectsPerPage} />
            </Row>
        </>
    );
}


export default ProjectList;