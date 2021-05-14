import React, {useEffect, useState} from "react";
import ReviewService from "../../services/review.service";
import {Button, Card, CardSubtitle} from "reactstrap";
import ReactStars from "react-rating-stars-component";
import AuthService from "../../services/auth.service";

import AddComment from "../comment/AddComment";
import Reviews from "./Reviews";
import Comments from "../comment/Comments";
import ReactTimeAgo from "react-time-ago";

const ReviewDetails = props =>{

    const initialRatingState = {

        id: null,
        title: "",
        rating:"",
        description: "",
        dateTime:"",
        startup:"",
        userName:"",

    };
    const user = AuthService.getCurrentUser();
    const [currentRating, setCurrentRating] = useState(initialRatingState);
    const [commentWritten,setCommentWritten] = useState();

    const getReview = id => {
        let params = {};
        params["id"]=id;
        ReviewService.getReviewFromId(params)
            .then(response => {
                setCurrentRating(response.data);
                console.log(response.data);

            })
            .catch(e => {
                console.log(e);
            });
    };
    useEffect(() => {
        getReview(props.match.params.id);

    }, [props.match.params.id]);
return (
    <div className={"container"}>
        {currentRating.id != null  && (
            <div>
                <Card  className="card-style">
                    <h5> STARTUP - {currentRating.startup.toUpperCase()} </h5>
                    <h5> {currentRating.title.toUpperCase()} </h5>
                    <CardSubtitle className="mb-2 ">

                        <div>By- {currentRating.userName} </div>
                        <div> On  -  <ReactTimeAgo date={currentRating.dateTime} locale="en-US"/></div>

                    </CardSubtitle>
                    <div style={{display: 'flex', justifyContent:'flex-end'}}>
                        <p style={{margin:'5px'}}>{currentRating.rating}/10 </p>
                        { currentRating.rating && (
                            <ReactStars
                                id={"startupRating"}
                                count={10}
                                size={30}
                                value={currentRating.rating}
                                activeColor="#ffd700"
                                edit={false}
                                isHalf={true}
                            />
                        )}
                    </div>
                    <p> {currentRating.description}</p>

                </Card>
            </div>
            )}

        <Comments rating_id={props.match.params.id} ></Comments>

    </div>
);

}

export default ReviewDetails;