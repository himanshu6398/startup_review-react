import React, { useEffect, useState} from 'react';
import StartupService from "../../services/startup.service"
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";


const UpdateStartup = () => {

        const [startup, setStartup] = useState({id :null, name:"", description:"",launchDate:"",tags:""});

        const getStartup =() => {
                StartupService.get(localStorage.getItem("startupId"))
                    .then(response => {
                            console.log(response.data.name);
                            setStartup(response.data);
                            console.log(startup);

                    })
                    .catch(e=>{
                            console.log(e);
                    })

        };
        useEffect( ()=> {
            getStartup();
        },[])


        const update = (e) =>{
            // setMessage("");
            // setSuccessful(false);

            StartupService.updateStartup(startup.id, startup)
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
            <div>
                    <h1 className={'text-center my-3'}>Update Startup Details</h1>
                { startup.name && (
                    <Form onSubmit={update}>

                        <FormGroup>
                            <Label for={"name"}>Startup Title</Label>
                            <Input type={"text"} placeholder={"Enter Here"}  id={"name"}
                                   required value={startup.name}
                                   onChange={(e)=>{
                                       setStartup({...startup,name:e.target.value});
                                   }}
                            />

                        </FormGroup>
                        <FormGroup>
                            <Label for={"tags"}>Startup Title(Enter tags separated by comma)</Label>
                            <Input type={"text"} placeholder={"Enter Here"}  id={"tags"} value={startup.tags}
                                   required
                                   onChange={(e)=>{
                                       setStartup({...startup,tags:e.target.value});
                                   }}
                            />

                        </FormGroup>

                        <FormGroup>
                            <Label for={"logoLink"}>Enter the link of the logo</Label>
                            <Input type={"text"} placeholder={"Enter Here"}  id={"logoLink"} value={startup.logoLink}
                                   required
                                   onChange={(e)=>{
                                       setStartup({...startup,logoLink:e.target.value});
                                   }}
                            />

                        </FormGroup>


                        <FormGroup>
                            <Label for={"description"}>Startup Description</Label>
                            <Input type={"textarea"} id={"description"} placeholder={"Enter the Course description"} style={{height:75}}
                                   required value={startup.description}
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

                        {/*<FormGroup>*/}
                        {/*    <Label for={"launchDate"}>Launch Date</Label>*/}
                        {/*    <br/>*/}
                        {/*    <TextField*/}
                        {/*        id={"launchDate"}*/}
                        {/*        type="date"*/}
                        {/*        // defaultValue="2017-05-24"*/}
                        {/*        InputLabelProps={{*/}
                        {/*            shrink: true,*/}
                        {/*        }}*/}
                        {/*        required*/}
                        {/*        onChange={(e)=>{*/}
                        {/*            setStartup({...startup,launchDate:e.target.value});*/}
                        {/*            setDateRequired(false);*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*    {(dateRequired)&&*/}
                        {/*    <div className="alert alert-danger" role="alert">*/}
                        {/*        This field is required!*/}
                        {/*    </div>*/}
                        {/*    }*/}

                        {/*</FormGroup>*/}
                        {/*<Container className={"text-center"}>*/}
                        {/*    <Button type="submit" color={"success"}>Add Startup</Button>*/}
                        {/*    <Button*/}
                        {/*        type="button"*/}
                        {/*        color={"warning ml-2"}*/}
                        {/*        onClick={()=>{*/}
                        {/*            Array.from(document.querySelectorAll("input")).forEach(*/}
                        {/*                input => (input.value = "")*/}
                        {/*            );*/}
                        {/*            Array.from(document.querySelectorAll("textarea")).forEach(*/}
                        {/*                input => (input.value = "")*/}
                        {/*            );*/}
                        {/*            setStartup({});*/}
                        {/*        }}*/}
                        {/*    >Clear</Button>*/}

                        {/*</Container>*/}
                        {/*{message && (*/}
                        {/*    <div className="form-group">*/}
                        {/*        <div*/}
                        {/*            className={ successful ? "alert alert-success" : "alert alert-danger" }*/}
                        {/*            role="alert"*/}
                        {/*        >*/}
                        {/*            {message}*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*)}*/}
                    </Form>
                )}
            </div>
        );

};

export default UpdateStartup;