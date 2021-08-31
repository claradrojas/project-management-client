
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditProject from './EditProject'

class ProjectDetails extends Component {
    state = {}

    componentDidMount() {
        this.getSingleProject();
    }

    getSingleProject = () => {
        const { params } = this.props.match;// to make a query to an specific point using react
        axios.get(`http://localhost:5000/api/projects/${params.id}`, { withCredentials: true })
            .then(responseFromApi => {
                const theProject = responseFromApi.data;
                this.setState(theProject);
            })

            .catch((err) => {
                console.log(err)
            })
    }

    // DELETE PROJECT:

    deleteProject = () => {
        const { params } = this.props.match;
        axios.delete(`http://localhost:5000/api/projects/${params.id}`, { withCredentials: true })
            .then(() => {
                this.props.history.push('/projects');
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        const isProjectOwner = this.state.owner === this.props.userData?._id

        return (
            <div>
                <h1>{this.state.title}</h1>
                <p>{this.state.description}</p>


                {
                    this.state.title &&
                    isProjectOwner &&
                    <EditProject theProject={this.state} getTheProject={this.getSingleProject} />
                }
                {/* passing the info of the last state of the form before is updated */}



                {
                    isProjectOwner &&
                    <p><button onClick={this.deleteProject}>Delete project</button>  </p>
                }

                {/* delete button included in the details form, method for it up as well */}

                <Link to={'/projects'}>Back to projects</Link>
            </div>
        )
    }
}

export default ProjectDetails;
