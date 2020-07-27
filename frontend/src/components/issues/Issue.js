import React from 'react';
import IssueDetail from './IssueDetail';
import axios from 'axios';
import Loader from '../../common/Loader';

class Issue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bug: null
        }
    }
    componentDidMount() {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        axios.get('http://127.0.0.1:8000/backend/issues/' + this.props.match.params.bugId + '/', config)
            .then(response => {
                this.setState({
                    bug: response.data
                })
            })
            .catch(error => {
                console.log(error);
                console.log(this.props.match.params.bugId)
            });
    }

    render() {
        if(!this.state.bug){
            return <Loader />
        }
        return (
            <IssueDetail bug={this.state.bug} />
        );
    }
}

export default Issue;
