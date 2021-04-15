import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import axios from "axios";
// import {Card} from "reactstrap";

export default class Sign_in extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        email :'',
        password :''
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name] : event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault()  //avoid page refresh
        console.log(this.state)

        const user = {
            email: this.state.email,
            password: this.state.password,
        };

        axios.post(`http://localhost:8081/user/signin`, user)
            .then(response => {
                console.log(response);
                if(response.data !== "") {
                    this.setState(this.initialState);
                    localStorage.setItem("role", response.data); //storing the Role of USER
                    this.props.history.push('/about');
                    console.log(localStorage.getItem("role"));
                }
                else {
                    alert("wrong login credentials");
                }
            })
            .catch(error => {
                console.log(error)
            });

    }

    render() {
        const {email, password} = this.state;
        return (
                <form onSubmit={this.submitHandler}>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" name="email"
                               value={email} onChange={this.changeHandler}/>
                    </div>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" name="password"
                               value={password} onChange={this.changeHandler}/>
                    </div>

                    <Button variant="primary" type="submit">Sign In</Button>
                    <p className='text-center'>
                        New User? <Link to='/sign_up'>Sign Up here</Link>
                    </p>
                </form>
        );
    }
}
