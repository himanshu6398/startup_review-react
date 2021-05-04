import React, {useEffect, useState} from "react";

import {Card, CardSubtitle, Button} from "reactstrap";
import StartupService from "../../services/startup.service";
import ReviewService from "../../services/review.service";
import AuthService from "../../services/auth.service";
import ReactStars from "react-rating-stars-component";
import AddReview from "../review/AddReview";
import UpdateReview from "../review/UpdateReview";
import Reviews from "../review/Reviews";
import {Avatar, Chip} from "@material-ui/core";
const StartupDetails = props =>{

    const user = AuthService.getCurrentUser();
    const [showAddReviewForm,SetShowAddReviewForm] = useState(false);
    const [showUpdateReviewForm,SetShowUpdateReviewForm] = useState(false);
    const [tags,setTags]= useState([]);
    const [startupRating,setStartupRating] = useState(0);
    const [reviewWritten,setReviewWritten] = useState();
    const initialStartupState = {
        id: null,
        name: "",
        tags:"",
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
                console.log(response.data.tags);
                var tags = response.data.tags;
                tags = tags.split(",")
                setTags(tags);
                // setTags(tags.split(','));
                // console.log(tags.split(','));

            })
            .catch(e => {
                console.log(e);
            });
    };
    const getStartupRating = id => {
            ReviewService.getStartupRating(id)
                .then(response => {
                    setStartupRating(response.data);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
    };
    const checkUserWrittenReview = startupId => {
        if(user){
            let params = {};
            params['startup_id'] = startupId;
            params['user_id'] = user.id;
            ReviewService.checkUserWrittenReview(params)
                .then(response => {
                    setReviewWritten(response.data);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }

    };
    useEffect(() => {
        getStartup(props.match.params.id);
        getStartupRating(props.match.params.id);
        checkUserWrittenReview(props.match.params.id);
    }, [props.match.params.id]);

    return(
        <div className="container">
            <div>
            <Card  className="card-style">
                <h3> {currentStartup.name.toUpperCase()} </h3>
                <CardSubtitle className="mb-2 ">
                    <div>Launch year - {currentStartup.launchDate.substring(0,4)} </div>
                    <div>
                    {tags &&
                            tags.map((item) => (
                                 <Chip key={item} size="small" avatar={<Avatar>T</Avatar>} label={item}/>
                            ))
                    }</div>
                    <div style={{display: 'flex', justifyContent:'flex-end'}}>
                        <p style={{margin:'5px'}}>{startupRating.avgRating}/10 {startupRating.totalRatings} reviews</p>
                        { startupRating && (
                        <ReactStars
                            id={"startupRating"}
                            count={10}
                            size={30}
                            value={startupRating.avgRating}
                            activeColor="#ffd700"
                            edit={false}
                        />
                        )}
                    </div>
                </CardSubtitle>

                <p> {currentStartup.description}</p>
                <div>
                    {(user) ? (

                            (reviewWritten) ?( <Button onClick={()=> SetShowUpdateReviewForm(true)}>Update your Review</Button>
                            ):(
                                <Button onClick={()=> SetShowAddReviewForm(true)}>Write a Review</Button>
                            )


                    ):("Please login to write a review")}

                </div>


            </Card>

            <Card  className="card-style">
                <h4>Reviews</h4>
                <Reviews startupid={props.match.params.id}></Reviews>
            </Card>
            </div>
            <div>
                { (user) ? (
                    <div>
                <AddReview trigger={showAddReviewForm} startup={currentStartup} setTrigger={SetShowAddReviewForm} reviewWrittenTrigger={setReviewWritten}></AddReview>
                <UpdateReview trigger={showUpdateReviewForm} user={user} startup={currentStartup} setTrigger ={SetShowUpdateReviewForm}></UpdateReview>
                    </div>
                    ): ""}
            </div>
        </div>
    );


}

export default StartupDetails;