import React, {Fragment, useEffect,useState} from "react";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import AuthService from "../../services/auth.service";
import StartupService from "../../services/startup.service";
import {TextField} from "@material-ui/core";


const AddStartup=()=>{

    const currentUser = AuthService.getCurrentUser();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [dateRequired,setDateRequired] =useState(false);
    const [tags,setTags]= useState([]);

    useEffect( ()=>{
        document.title="Add Startup";
    },[])
    const [startup,setStartup]=useState({});



    //form handler function
    const handleForm = (e) =>{
        console.log(startup);
        setMessage("");
        setSuccessful(false);
        if(startup.launchDate === undefined){
            setDateRequired(true);
        } else {
            StartupService.addStartup(startup).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }


        e.preventDefault();
    };

    return(

        <div>

            <Fragment>
                <h1 className={'text-center my-3'}> Add New Startup</h1>
                <Form onSubmit={handleForm}>

                    <FormGroup>
                        <Label for={"name"}>Startup Title</Label>
                        <Input type={"text"} placeholder={"Enter Here"}  id={"name"}
                               required
                               onChange={(e)=>{
                                   setStartup({...startup,name:e.target.value});
                               }}
                        />

                    </FormGroup>

                    <FormGroup>
                        <Label for={"tags"}>Startup Title(Enter tags separated by comma)</Label>
                        <Input type={"text"} placeholder={"Enter Here"}  id={"tags"}
                               required
                               onChange={(e)=>{
                                   setStartup({...startup,tags:e.target.value});
                               }}
                        />

                    </FormGroup>

                    <FormGroup>
                        <Label for={"logoLink"}>Enter the link of the logo</Label>
                        <Input type={"text"} placeholder={"Enter Here"}  id={"logoLink"}
                               required
                               onChange={(e)=>{
                                   setStartup({...startup,logoLink:e.target.value});
                               }}
                        />

                    </FormGroup>



                    <FormGroup>
                        <Label for={"description"}>Startup Description</Label>
                        <Input type={"textarea"} id={"description"} placeholder={"Enter the Course description"} style={{height:75}}
                               required
                               onChange={(e)=>{
                                   setStartup({...startup,description:e.target.value});
                                   console.log(startup);
                               }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for={"launchDate"}>Launch Date</Label>
                        <br/>
                        <TextField
                            id={"launchDate"}
                            type="date"
                            // defaultValue="2017-05-24"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            onChange={(e)=>{
                                setStartup({...startup,launchDate:e.target.value});
                                setDateRequired(false);
                            }}
                        />
                        {(dateRequired)&&
                         <div className="alert alert-danger" role="alert">
                             This field is required!
                         </div>
                        }

                    </FormGroup>
                    <Container className={"text-center"}>
                        <Button type="submit" color={"success"}>Add Startup</Button>
                        <Button
                            type="button"
                            color={"warning ml-2"}
                            onClick={()=>{
                                Array.from(document.querySelectorAll("input")).forEach(
                                    input => (input.value = "")
                                );
                                Array.from(document.querySelectorAll("textarea")).forEach(
                                    input => (input.value = "")
                                );
                                setStartup({});
                            }}
                        >Clear</Button>

                    </Container>
                    {message && (
                        <div className="form-group">
                            <div
                                className={ successful ? "alert alert-success" : "alert alert-danger" }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                </Form>
            </Fragment>
        </div>
    );
}

export default AddStartup;