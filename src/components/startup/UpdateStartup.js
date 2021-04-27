import React, {Fragment, useState} from 'react'
import EditStartupTile from "./EditStartupTile";
import'../../assets/css/popup.css'
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {TextField} from "@material-ui/core";
import StartupService from "../../services/startup.service";

const UpdateStartup=({startup,trigger,setTrigger}) =>{

    const [startupDetail,setStartup]=useState({});
    // const [successful, setSuccessful] = useState(false);
    // const [msg, setMessage] = useState("");
    console.log(startup);
    const update = (e) =>{
        // setMessage("");
        // setSuccessful(false);

        StartupService.updateStartup(startup.id, startupDetail)
            .then(response => {
                // setMessage(response.data.message);
                // setSuccessful(true);
                console.log(response.data);
                alert("updated successfully!");

            })
            .catch((e) => {
                console.log(e);
            });
        e.preventDefault();
    };

    return (
        (trigger) ? (
            <div className={'popup'}>
                <div className={'popup-inner'}>
                    <h2>Update details for {startup.name}</h2>

                    <Form onSubmit={update}>

                        <FormGroup>
                            <Label for={"name"}>Startup Title</Label>
                            <Input type={"text"} placeholder={"Enter Here"}  id={"name"}
                                   required defaultValue={startup.name}
                                   onChange={(e)=>{
                                       setStartup({...startup,name:e.target.value});
                                   }}
                            />

                        </FormGroup>
                        <FormGroup>
                            <Label for={"description"}>Startup Description</Label>
                            <Input type={"textarea"} id={"description"} placeholder={"Enter the Course description"} style={{height:75}}
                                   required defaultValue={startup.description}
                                   onChange={(e)=>{
                                       setStartup({...startup,description:e.target.value});
                                       console.log(startup);
                                   }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for={"launchDate"}>Launch Date (in yyyy-MM-dd)</Label>
                            <Input type={"text"} placeholder={"Enter Here"}  id={"launchDate"}
                                   required defaultValue={startup.launchDate}
                                   onChange={(e)=>{
                                       setStartup({...startup,name:e.target.value});
                                   }}
                            />
                        </FormGroup>

                        <Container className={"text-center"}>
                            <Button type="submit" color={"success"}>Update Startup</Button>
                        </Container>

                    </Form>
                    <button onClick={()=>setTrigger(false)} className={"close-btn"}>close</button>
                </div>

            </div>
        ):("")
    );

}

export default UpdateStartup;