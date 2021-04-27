
import React, {useState} from "react";
import {Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Container, CardImg, Row, Col} from "reactstrap";
import {Link} from "react-router-dom";
import UpdateStartup from "./UpdateStartup";
import AuthService from "../../services/auth.service";

const EditStartupTile=({startup}) =>{

    const user = AuthService.getCurrentUser();
    const [updateStartupForm, SetUpdateStartupForm] = useState(false);
    const [deleteStartupForm, SetDeleteStartupForm] = useState(false);
    // SetUpdateStartupForm(startup);
    return(
        <div>
            <Card  className="card-style" style={{ width: '18rem' , height:'18rem',flex:1, margin:'1.5rem'}}>
                <CardBody>
                    <CardTitle className={"font-weight-bold"}>{startup.name.toUpperCase()}</CardTitle>
                    <CardText>{startup.description.substring(0,95) +"..."}</CardText>
                    <Button onClick={()=> SetUpdateStartupForm(true)} color={"warning"}>Update</Button>
                    <Button onClick={()=> SetDeleteStartupForm(true)} color={"danger"}>Delete</Button>
                </CardBody>
            </Card>

            <div>
                <UpdateStartup trigger={updateStartupForm} startup={startup} setTrigger={SetUpdateStartupForm}></UpdateStartup>

            </div>
        </div>
    );
}

export default EditStartupTile;