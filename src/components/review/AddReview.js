import React, {Fragment, useEffect, useState} from 'react'
import Startuptile from "../startup/Startuptile";
import'../../assets/css/popup.css'
import {Button, Card, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {TextField} from "@material-ui/core";
import ReviewService from "../../services/review.service";
import ReactStars from "react-rating-stars-component/dist/react-stars";

const AddReview=({startup,trigger,setTrigger,reviewWrittenTrigger,updateReviewPage}) =>{

    const sp = startup
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [review,setReview]=useState({});
    const [ratingRequired,setRatingRequired] =useState(false);

    // useEffect(() => {
    //     setReview({...review,startupId:sp.id});
    // }, []);

    const handleForm = (e) =>{

        setMessage("");
        setSuccessful(false);

        if(review.rating == undefined || review.rating == 0){
            setRatingRequired(true);
        } else {
            setRatingRequired(false);
            console.log(review);
            ReviewService.addReview(review,startup.id).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                    reviewWrittenTrigger(true);
                    updateReviewPage();
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
    return (
        (trigger) ? (

            <div className={'popup'}>

                <div className={'popup-inner'}>
                    <Card  className="card-style">
                        <div className={"container col-md-12"}>
                            <button onClick={()=>setTrigger(false)} className={"close-btn"}  aria-label="Close">  <span aria-hidden="true">&times;</span></button>
                            <Fragment>
                                <h3 className={'text-center my-3'}> Write a review for {startup.name.toUpperCase()}</h3>
                                <Form onSubmit={handleForm}>
                                    {!successful && (
                                        <div>
                                        <FormGroup>
                                            <Label for={"title"}>Review Title</Label>
                                            <Input type={"text"} placeholder={"Enter Here"}  id={"title"}
                                                   required
                                                   onChange={(e)=>{
                                                       setReview({...review,title:e.target.value});
                                                       // console.log(review);
                                                       console.log(sp.id);
                                                   }}
                                            />

                                        </FormGroup>

                                        <FormGroup >

                                                <ReactStars
                                                    count={10}
                                                    onChange={(e)=>{
                                                        console.log(e)
                                                        setReview({...review,rating:e});

                                                    }}
                                                    size={30}

                                                    isHalf={true}
                                                    emptyIcon={<i className="far fa-star"></i>}
                                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                    fullIcon={<i className="fa fa-star"></i>}
                                                    activeColor="#ffd700"

                                                />
                                            {(ratingRequired)&&
                                            <div className="alert alert-danger" role="alert">
                                                Rating is required!
                                            </div>
                                            }
                                         </FormGroup>
                                        <FormGroup>
                                            <Label for={"description"}>Review Description</Label>
                                            <Input type={"textarea"} id={"description"} placeholder={"Enter the review description"} style={{height:75}}
                                                   required
                                                   onChange={(e)=>{
                                                       setReview({...review,description:e.target.value});

                                                   }}
                                            />
                                        </FormGroup>


                                        <Container className={"text-center"}>
                                            <Button type="submit" color={"success"}>Add Review</Button>


                                        </Container>
                                        </div>
                                        )}
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
                    </Card>
                </div>

            </div>
        ):("")
    );

}

export default AddReview;