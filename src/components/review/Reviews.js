import React, { useState, useEffect } from "react";
import Home from "../Home";
import ReviewService from "../../services/review.service";
import Pagination from "@material-ui/lab/Pagination";
import Startuptile from "../startup/Startuptile";
import {Button, Card, CardSubtitle, Row} from "reactstrap";
import ReactStars from "react-rating-stars-component";
import {Link} from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import {Rating} from "semantic-ui-react";
import Comments from "../comment/Comments";
import TopComments from "../comment/TopComments";


const Reviews = (startupId) => {

    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const pageSizes = [10, 20, 30];

    const retrieveReviews = () => {
        const params = getRequestParams( page, pageSize);
        console.log(startupId);
        ReviewService.getStartupsReviewsFromStartupID(params)
            .then((response) => {
                console.log(response.data);
                const { content, totalPages } = response.data;

                setReviews(content);
                setCount(totalPages);

                console.log(response.data);


            })
            .catch((e) => {
                console.log(e);
            });

    };
    useEffect(retrieveReviews, [page, pageSize]);
    const getRequestParams = ( page, pageSize) => {
        let params = {};
        if (startupId) {
            params["startupId"] = startupId.startupid;
        }
        if (page) {
            params["page"] = page - 1;
        }
        if (pageSize) {
            params["size"] = pageSize;
        }
        return params;
    };
    const handlePageChange = (event, value) => {
        setPage(value);
    };
    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };

    return (
        <div className="container">

            {reviews && (reviews.length>0)?
                 <div>
                     <h4>Reviews</h4>
                     <div className="mt-3">
                         {"Items per Page: "}
                         <select onChange={handlePageSizeChange} value={pageSize}>
                             {pageSizes.map((size) => (
                                 <option key={size} value={size}>
                                     {size}
                                 </option>
                             ))}
                         </select>

                         <Pagination
                             className="my-3"
                             count={count}
                             page={page}
                             siblingCount={1}
                             boundaryCount={1}
                             variant="outlined"
                             shape="rounded"
                             onChange={handlePageChange}
                         />

                     </div>
                 </div>
                :"No Reviews"}

            <Row >

                {reviews &&
                reviews.map((item) => (

                            <Card  key={item.id} className="card-style" style={{margin:'2px',width: '100%'}}>
                                <h3> {item.title.toUpperCase()} </h3>
                                <CardSubtitle className="mb-2 ">
                                    <div>Review Date -  <ReactTimeAgo date={item.dateTime} locale="en-US"/> </div>
                                    <div style={{display: 'flex', justifyContent:'flex-end'}}>
                                        <p style={{margin:'3px'}}>{item.rating}/10</p>
                                            <ReactStars
                                                id={"startupRating"}
                                                count={10}
                                                size={27}
                                                value={item.rating}
                                                activeColor="#ffd700"
                                                edit={false}
                                                isHalf={true}
                                            />

                                            {/*<Rating maxRating={10} defaultRating={item.rating} icon='star' size='huge' disabled/>*/}

                                    </div>
                                </CardSubtitle>

                                <p> {item.description}</p>

                                <TopComments rating_id={item.id} ></TopComments>
                                <Link to={"/review/" + item.id}><Button color={"warning"}>Read All/Add Comments</Button></Link>
                            </Card>


                ))}

            </Row>
        </div>
    );
};

export default Reviews;