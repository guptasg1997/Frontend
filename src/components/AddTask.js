import React, { Component } from 'react'
import { Button , Form } from 'react-bootstrap'
import { Redirect , Link} from 'react-router-dom'

import axios from 'axios'




class AddTask extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             title :'',
             task : '',
             deadline : '',
             completed : false,
             errorMessage : '',
             assigner : 'admin'
        }
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event)=>{
        event.preventDefault()
        console.log(this.props.location.aboutProps.id)
        axios
        .post('http://localhost:8000/add-task' ,{
            title : this.state.title,
            task : this.state.task,
            deadline : this.state.deadline,
            assigner : this.state.assigner,
            assigned_to : this.props.location.aboutProps.id,
        })
        .then(response =>{
            this.setState({completed : true})
        })
        .catch(error => {
            this.setState({errorMessage : error.message})
        })
    }


    render() {
        // console.log(this.props.location.aboutProps)
        if(!this.props.location.aboutProps || this.state.completed){
            return(
                <Redirect to = "/admin/users"/>
            )
        }

        return (
            <>
                <h4>adding task to {this.props.location.aboutProps.name}</h4>
                { this.state.errorMessage &&
                        <h3 className="error"> { this.state.errorMessage } </h3> }
                <Form onSubmit = {this.handleSubmit}>
                 <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                        name ="title"
                        value = {this.state.title} 
                        onChange = {this.handleChange}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Task</Form.Label>
                        <Form.Control
                        as ="textarea"
                        rows = {5}
                        name ="task"
                        value = {this.state.task} 
                        onChange = {this.handleChange}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Deadline</Form.Label>
                        <Form.Control
                        type = "datetime-local"
                        step = "1"
                        name ="deadline"
                        value = {this.state.deadline}
                        onChange = {this.handleChange}>
                        </Form.Control>
                    </Form.Group>
                    <Button type = "submit">Add</Button>
                </Form>
            </>
        )
    }
}

export default AddTask