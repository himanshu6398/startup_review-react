
import React from "react";

import {Card, CardBody, CardTitle, CardText, Button, CardImg} from "reactstrap";
import {Link} from "react-router-dom";
const Startuptile=({startup}) =>{

    return(
        <div>
            <Card  className="card-style" style={{ width: '20rem' ,flex:1, margin:"1rem 2rem 1rem 2rem" ,padding:'20px'}}>
                <CardImg className={"d-flex justify-content-center"} style={{width:'18',height:'13rem'}} variant="top" src={startup.logoLink} />
                <CardBody style={{padding:"0.5rem"}}>
                    <CardTitle className={"font-weight-bold"}>{startup.name.toUpperCase()}</CardTitle>
                    <CardText>{startup.description.substring(0,95) +"..."}</CardText>
                    <Link to={"/startups/" + startup.id}><Button color={"warning"}>Read More</Button></Link>

                </CardBody>
            </Card>
        </div>

    );
}

export default Startuptile;