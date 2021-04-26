
import React, {Fragment, useEffect, useState} from 'react'
import {Button, Card, Container, Form, FormGroup, Input, Label} from "reactstrap";
import'../../assets/css/popup.css'

import AuthService from "../../services/auth.service";
import ReactStars from "react-rating-stars-component";
import ReviewService from "../../services/review.service";
const UpdateReview=({startup,trigger,setTrigger,user}) =>{


    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [review,setReview]=useState({});

    const getReview = () => {
        console.log(startup);
        console.log(user);
        let params = {};
        params['startup_id'] = startup.id;
        params['user_id'] = user.id;
        console.log(params);
        ReviewService.getSpecificReview(params)
            .then(response => {
                setReview(response.data);

            })
            .catch(e => {
                console.log(e);
            });

    }
    useEffect(() => {
        if(trigger == true){
            getReview();
        }

    }, [trigger]);
    const handleForm = (e) =>{

        setMessage("");
        setSuccessful(false);

            console.log(review);
            ReviewService.updateReview(review,startup.id).then(
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

        e.preventDefault();
    };

    return (
        (trigger) ? (

            <div className={'popup'}>

                <div className={'popup-inner'}>
                    <Card  className="card-style">
                        <div className={"container col-md-12"}>
                            <button onClick={()=>{
                                setTrigger(false);
                                setMessage("");
                                setSuccessful(false);}} className={"close-btn"}  aria-label="Close">  <span aria-hidden="true">&times;</span></button>
                            <Fragment>
                                <h3 className={'text-center my-3'}> Update review for {startup.name.toUpperCase()}</h3>
                                { review.title && (
                                <Form onSubmit={handleForm}>
                                    {!successful && (
                                        <div>
                                            <FormGroup>
                                                <Label for={"title"}>Review Title</Label>
                                                <Input type={"text"} placeholder={"Enter Here"}  id={"title"} value={review.title}
                                                       required
                                                       onChange={(e)=>{
                                                           setReview({...review,title:e.target.value});
                                                           // console.log(review);

                                                       }}
                                                />

                                            </FormGroup>
                                            <FormGroup>
                                                <ReactStars
                                                    count={10}
                                                    onChange={(e)=>{
                                                        console.log(e)
                                                        setReview({...review,rating:e});

                                                    }}
                                                    size={50}
                                                    value={review.rating}
                                                    isHalf={true}
                                                    emptyIcon={<i className="far fa-star"></i>}
                                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                    fullIcon={<i className="fa fa-star"></i>}
                                                    activeColor="#ffd700"

                                                />

                                            </FormGroup>
                                            <FormGroup>
                                                <Label for={"description"}>Review Description</Label>
                                                <Input type={"textarea"} id={"description"} placeholder={"Enter the review description"} style={{height:75}}
                                                       value={review.description}
                                                       required
                                                       onChange={(e)=>{
                                                           setReview({...review,description:e.target.value});

                                                       }}
                                                />
                                            </FormGroup>


                                            <Container className={"text-center"}>
                                                <Button type="submit" color={"success"}>Update Review</Button>


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
                                )}
                            </Fragment>
                        </div>
                    </Card>
                </div>

            </div>
        ):("")
    );

}
export default UpdateReview;