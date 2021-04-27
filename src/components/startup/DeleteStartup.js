import React from "react";
import {Form,Button,Container} from "reactstrap"
import StartupService from "../../services/startup.service";


const DeleteStartup=({startup,trigger,setTrigger}) => {

    console.log(startup.id);
    const deleteHandler =(e) => {
        StartupService.deleteStartup(startup.id)
            .then(response => {
                alert("deleted successfully");
            })
            .catch((e)=> {
                console.log(e)
            });
        e.preventDefault();
    };

    return (
        (trigger) ? (
            <div className={"popup"}>
                <div className="popup-inner">

                    <Form onSubmit={deleteHandler}>
                        <h2>Are You Sure, you want to delete this startup?</h2>
                        <Container className="text-center">
                            <Button type="submit" color="danger">Yes</Button>
                        </Container>
                    </Form>

                    <button onClick={()=>setTrigger(false)} className={"close-btn"}>close</button>
                </div>
            </div>
        ) :("")
    );
}

export default DeleteStartup;