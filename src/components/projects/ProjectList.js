
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import AddProject from './AddProject'; // importing the component we just created

class ProjectList extends Component {
    state = { listOfProjects: [] } //list of projects is an empty array

    getAllProjects = () => {
        axios.get(`http://localhost:5000/api/projects`, { withCredentials: true })
            .then(responseFromApi => {
                this.setState({
                    listOfProjects: responseFromApi.data
                })
            })
    }

    componentDidMount() {
        this.getAllProjects();
    }

    render() {
        return (
            <div>
                <div style={{ width: '60%', float: "left" }}>
                    {this.state.listOfProjects.map(project => {
                        return (
                            <div key={project._id}>
                                <Link to={`/projects/${project._id}`}>
                                    <h3>{project.title}</h3>
                                </Link>
                                {/* <p style={{maxWidth: '400px'}} >{project.description} </p> */}
                            </div>
                        )
                    })
                    }
                </div>
                <div style={{ width: '40%', float: "right" }}>
                    {this.props.userIsLoggedIn
                        ? <AddProject getData={() => this.getAllProjects()} />
                        : <p>Please Login to create new projects</p>}

                </div>
            </div>
        )
    }
}

export default ProjectList;
