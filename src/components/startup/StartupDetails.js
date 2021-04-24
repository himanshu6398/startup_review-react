import React, {useEffect, useState} from "react";

import {Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Container, CardImg} from "reactstrap";
import StartupService from "../../services/startup.service";

const StartupDetails = props =>{
    const initialStartupState = {
        id: null,
        title: "",
        description: "",
        launchDate:"",
        dateTime:""
    };
    const [currentStartup, setCurrentStartup] = useState(initialStartupState);
    const getStartup = id => {
        StartupService.get(id)
            .then(response => {
                setCurrentStartup(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getStartup(props.match.params.id);
    }, [props.match.params.id]);

    return(
        <div>
            <h1> SHOW START UP DETAILS {props.match.params.id}</h1>
        </div>
    );


}

export default StartupDetails;