import React, {Component, useEffect, useState} from 'react';
import StartupService from "../../services/startup.service";
import {Button, Card, CardBody} from "reactstrap";
import {Link} from "react-router-dom";



const DeleteStartup = () => {

    const [startupDetails, setStartupDetails] = useState({id :null, name:"", description:"",launchDate:""});

    const getStartup =() => {
        StartupService.get(localStorage.getItem("startupId"))
            .then(response => {
                console.log(response.data.name);
                setStartupDetails(response.data);
                console.log(startupDetails);

            })
            .catch(e=>{
                console.log(e);
            })

    };
    useEffect( ()=> {
        getStartup();
    },[])

    const deleteHandler =(e) => {
        StartupService.deleteStartup(startupDetails.id)
            .then(response => {
                if(response.data != null) {
                    alert("deleted successfully");
                }
            })
            .catch((e)=> {
                console.log(e)
            });
        e.preventDefault();
    }

    return (
        <div>
            <Card  className="card-style" style={{ width: '18rem' , height:'18rem',flex:1, margin:'1.5rem'}}>
            <form onSubmit={deleteHandler}>
                    <h3>
                    Are you sure you want to delete this startup ?
                    <h3 className="text-danger text-capitalize">{startupDetails.name}</h3>
                </h3>
                <Button type={"submit"} color={"danger"} style={{margin:"5px"}}>Yes</Button>
                <Link to="/profile/showStartups" className="btn btn-primary">Back</Link>
            </form>

        </Card>
        </div>
    );

};

export default DeleteStartup;