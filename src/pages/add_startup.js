import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import axios from "axios";

export default class Add_startup extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        name :'',
        description :'',
        launch_date :'',
    }

    changeHandler = (event) => {
        this.setState({[event.target.name] : event.target.value} )
    }

    submitHandler = (event) => {
        event.preventDefault()  //avoid page refresh
        console.log(this.state)

        const startup = {
            name : this.state.name,
            description: this.state.description,
            launch_date: this.state.launch_date
        }

        axios.post(`http://localhost:8081/admin/add_startup`, startup)
            .then(response => {
                console.log(response);
                console.log(response.data);
                if(response.data != null) {
                    this.setState(this.initialState);
                    alert("user data saved successfully");
                }
            });
    }

    render() {
        const { name, description, launch_date } = this.state;
        return (
            <form onSubmit={this.submitHandler}>
                <h3>Add Startup</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Enter Name" name="name"
                           value={name} onChange={this.changeHandler}/>
                </div>

                <div className="form-group">
                    <label>Enter description</label>
                    <textarea class="form-control" rows="4" name="description"
                              value={description} onChange={this.changeHandler}></textarea>
                </div>

                <div className="form-group">
                    <label>Launch Date</label>
                    <input type="text" className="form-control" placeholder="Enter username" name="launch_date"
                           value={launch_date} onChange={this.changeHandler}/>
                </div>

                <Button variant="primary" type="submit">Add Startup</Button>
            </form>
        );
    }
}
