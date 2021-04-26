import React, { useState, useEffect } from "react";
import Home from "../Home";
import ReviewService from "../../services/review.service";
import Pagination from "@material-ui/lab/Pagination";
import Startuptile from "./Startuptile";
import {Button, Card, CardSubtitle, Row} from "reactstrap";
import ReactStars from "react-rating-stars-component";


const Reviews = (startupId) => {

    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(2);
    const pageSizes = [1, 2, 3];

    const retrieveReviews = () => {
        const params = getRequestParams( page, pageSize);
        console.log(startupId);
        ReviewService.getStartupsReviews(params)
            .then((response) => {
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
            <Row >

                {reviews &&
                reviews.map((item) => (

                            <Card  className="card-style" style={{margin:'2px',width: '100%'}}>
                                <h3> {item.title.toUpperCase()} </h3>
                                <CardSubtitle className="mb-2 ">
                                    <div>Review Date - {item.dateTime.substring(0,10)} </div>
                                    <div style={{display: 'flex', justifyContent:'flex-end'}}>
                                        <p style={{margin:'13px'}}>{item.rating}/10</p>

                                            <ReactStars
                                                id={"startupRating"}
                                                count={10}
                                                size={30}
                                                value={item.rating}
                                                activeColor="#ffd700"
                                                edit={false}
                                            />

                                    </div>
                                </CardSubtitle>

                                <p> {item.description}</p>

                            </Card>


                ))}

            </Row>
        </div>
    );
};

export default Reviews;