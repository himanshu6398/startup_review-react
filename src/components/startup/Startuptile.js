
import React from "react";

import {Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Container, CardImg} from "reactstrap";
import {Link} from "react-router-dom";
const Startuptile=({startup}) =>{

    return(
        <div>
            <Card  className="card-style" style={{ width: '18rem' , height:'18rem',flex:1, margin:'1.5rem'}}>
                <CardBody>
                    <CardTitle className={"font-weight-bold"}>{startup.name.toUpperCase()}</CardTitle>
                    <CardText>{startup.description.substring(0,95) +"..."}</CardText>
                    <Link to={"/startups/" + startup.id}><Button color={"warning"}>Read More</Button></Link>

                </CardBody>
            </Card>
        </div>
    );
}

export default Startuptile;