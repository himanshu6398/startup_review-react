import React, {Component} from 'react';
import {Card, CardBody, CardTitle, CardText, Button} from "reactstrap";

export default class About extends Component {

    submitHandler = (event) => {
        this.props.history.push('/add_startup');
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
            <Card className="text-center">
                <CardBody>
                    <CardTitle><h3>About Us</h3></CardTitle>
                    <CardText>description</CardText>
                </CardBody>
            </Card>
            {localStorage.getItem("role") === "ROLE_ADMIN" ?
                <Button variant='primary' type='submit' className='text-lg-right'>Add Startup</Button>
                : null
            }
        </form>
    )
    }
};
