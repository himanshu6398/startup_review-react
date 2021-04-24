import React, {useEffect, useState} from "react";

import {Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Container, CardImg} from "reactstrap";
import StartupService from "../../services/startup.service";
import AuthService from "../../services/auth.service";
import ReactStars from "react-rating-stars-component";
import AddReview from "./AddReview";
const StartupDetails = props =>{

    const user = AuthService.getCurrentUser();
    const [showAddReviewForm,SetShowAddReviewForm] = useState(false);
    const initialStartupState = {
        id: null,
        name: "",
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
        <div className="container">
            <Card  className="card-style">
                <h3> {currentStartup.name.toUpperCase()} </h3>
                <CardSubtitle className="mb-2 text-muted">
                    <div>Launch year - {currentStartup.launchDate.substring(0,4)} </div>
                    <div style={{display: 'flex', justifyContent:'flex-end'}}>

                        <ReactStars
                            id={"startupRating"}
                            count={10}
                            size={30}
                            value={8}
                            activeColor="#ffd700"
                            edit={false}
                        />

                    </div>
                </CardSubtitle>
                <p> {currentStartup.description}</p>
                <div>
                    {(user) ? (<Button onClick={()=> SetShowAddReviewForm(true)}>Write a Review</Button>):("Please login to write a review")}

                </div>

                <div>

                </div>
            </Card>
            <Card  className="card-style">
                <h4>Reviews</h4>
            </Card>
            <div>
                <AddReview trigger={showAddReviewForm} startup={currentStartup} setTrigger={SetShowAddReviewForm}></AddReview>
            </div>
        </div>
    );


}

export default StartupDetails;