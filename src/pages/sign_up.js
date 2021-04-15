import React, { Component } from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import axios from "axios";

export default class Sign_up extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        name :'',
        email :'',
        password :'',
        username :''
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name] : event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault()  //avoid page refresh
        console.log(this.state)

        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            username: this.state.username
        };
        console.log(user);

        axios.post(`http://localhost:8081/user/signup`, user)
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
        const {name, email, password, username} = this.state;
        return (
            <form onSubmit={this.submitHandler}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Enter Name" name="name"
                           value={name} onChange={this.changeHandler}/>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email"
                           value={email} onChange={this.changeHandler}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password"
                           value={password} onChange={this.changeHandler}/>
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter username" name="username"
                           value={username} onChange={this.changeHandler}/>
                </div>

                <Button variant="primary" type="submit">Sign Up</Button>
                <p className="text-center">
                    Already registered? <Link to='/sign_in'>Sign In</Link>
                </p>
            </form>
        );
    }
}