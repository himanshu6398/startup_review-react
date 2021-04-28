import React, {Component, useEffect, useState} from 'react';
import StartupService from "../../services/startup.service";
import {Button} from "reactstrap";


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
            <form onSubmit={deleteHandler}>
                <h3>
                    Are you sure you want to delete this startup ?
                    <h1 className="text-danger text-capitalize">{startupDetails.name}</h1>
                </h3>
                <Button type={"submit"} color={"danger"}>Yes</Button>
            </form>
        </div>
    );

};

export default DeleteStartup;