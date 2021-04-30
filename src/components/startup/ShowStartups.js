import React, {Component, useEffect, useState} from 'react';
import {Button, Card, CardBody, CardText, CardTitle, Row} from "reactstrap";
import StartupService from "../../services/startup.service";
// import { useHistory } from 'react-router-dom';
import history from "../history"
import UpdateStartup from "./UpdateStartup";
import DeleteStartup from "./DeleteStartup";
import star from "react-rating-stars-component/dist/star";
import AuthService from "../../services/auth.service";
import UserLeftSideMenu from "../UserLeftSideMenu";

const ShowStartups =()=> {

    const currentUser = AuthService.getCurrentUser();

    const [startups, setStartups] = useState([]);
    const [updateStartupForm, SetUpdateStartupForm] = useState(false);
    const [deleteStartupForm, SetDeleteStartupForm] = useState(false);

    const [id, setId] = useState();

    useEffect( () => {
        if(currentUser.roles.includes("ROLE_ADMIN")){
            StartupService.displayStartups().then(
                response => {
                    setStartups(response.data);
                    // console.log(response.data);
                }
            )
        } else {
            StartupService.getStartupByUser().then(
                response => {
                    setStartups(response.data);

                }
            )
        }

    },[])

    const UpdateForm =startupId => {
        console.log(startupId);
        localStorage.setItem("startupId", startupId);
        // const history = useHistory();
        // history.push('/updateStartup');
        history.push("/profile/updateStartup");
        window.location.reload();
    };

    const DeleteForm =startupId => {
        console.log(startupId);
        localStorage.setItem("startupId", startupId);
        history.push("/profile/deleteStartup");
        window.location.reload();
    }

    return (
        <div>
            <Row>
                {   (startups.length > 0) ? (
                       startups.map((item) => (
                        <div key={item.id} style={{display: 'flex', flexDirection: 'row'}}>
                            {/*<EditStartupTile key={item.id} startup={item} />*/}

                            <Card  className="card-style" style={{ width: '18rem' , height:'18rem',flex:1, margin:'1.5rem'}}>
                                <CardBody>
                                    <CardTitle className={"font-weight-bold"}>{item.name.toUpperCase()}</CardTitle>
                                    <CardText>{item.description.substring(0,95) +"..."}</CardText>
                                    {/*<Button onClick={()=> SetUpdateStartupForm(true)} color={"warning"}>Update</Button>*/}
                                    <Button onClick={()=> UpdateForm(item.id)} color={"warning"}>Update</Button>
                                    <Button onClick={()=> DeleteForm(item.id)} color={"danger"}>Delete</Button>

                                </CardBody>
                            </Card>
                            <div>
                                {/*<UpdateStartup trigger={updateStartupForm} setId={item.id} setTrigger={SetUpdateStartupForm}></UpdateStartup>*/}
                                {/*<DeleteStartup trigger ={deleteStartupForm} startupId={item} setTrigger={SetDeleteStartupForm}></DeleteStartup>*/}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={"container"}>
                        <div>
                            You have not added any startups
                        </div>

                    </div>
                )
                }
            </Row>
        </div>
    );

};

export default ShowStartups;