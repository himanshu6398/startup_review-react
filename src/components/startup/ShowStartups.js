import React, {Component, useEffect, useState} from 'react';
import StartupService from "../../services/startup.service";
import {Button, Card, CardBody, CardText, CardTitle, Row} from "reactstrap";
import EditStartupTile from "./EditStartupTile";
import UpdateStartup from "./UpdateStartup";
import UserService from "../../services/user.service";
import DeleteStartup from "./DeleteStartup";


const ShowStartups = () => {

    const [startups, setStartups] = useState([]);
    // const getAllStartups = () => {
    //     // const params="";
    //     StartupService.displayStartups()
    //         .then(response => {
    //             console.log(response.data);
    //             setStartups(response.data);
    //
    //         })
    //         .catch((e) => {
    //             console.log(e);
    //         });
    // };
    useEffect(() => {
        StartupService.displayStartups()
            .then(response => {
                console.log(response.data);
                setStartups(response.data);

            })
            .catch((e) => {
                console.log(e);
            });

    }, []);

    const [updateStartupForm, SetUpdateStartupForm] = useState(false);
    const [deleteStartupForm, SetDeleteStartupForm] = useState(false);

    return (
        <div>
            {/*<button onClick={getAllStartups}>show</button>*/}
            <div>
                <Row>
                    {startups &&
                    startups.map((item) => (
                        <div key={item.id} style={{display: 'flex', flexDirection: 'row'}}>
                            {/*<EditStartupTile key={item.id} startup={item} />*/}

                            <Card  className="card-style" style={{ width: '18rem' , height:'18rem',flex:1, margin:'1.5rem'}}>
                                <CardBody>
                                    <CardTitle className={"font-weight-bold"}>{item.name.toUpperCase()}</CardTitle>
                                    <CardText>{item.description.substring(0,95) +"..."}</CardText>
                                    <Button onClick={()=> SetUpdateStartupForm(true)} color={"warning"}>Update</Button>
                                    <Button onClick={()=> SetDeleteStartupForm(true)} color={"danger"}>Delete</Button>
                                </CardBody>
                            </Card>
                            <div>
                                <UpdateStartup trigger={updateStartupForm} startup={item} setTrigger={SetUpdateStartupForm}></UpdateStartup>
                                <DeleteStartup trigger ={deleteStartupForm} startup={item} setTrigger={SetDeleteStartupForm}></DeleteStartup>
                            </div>
                        </div>

                    ))}

                </Row>
            </div>
        </div>

    );

};

export default ShowStartups;