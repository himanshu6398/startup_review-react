import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import StartupService from "../services/startup.service";
import Pagination from "@material-ui/lab/Pagination";
import Startuptile from "./startup/Startuptile";
import {Row} from "reactstrap";
import {Image} from "react-bootstrap";


const Home = () => {

    const [content, setContent] = useState("");
    const [startups, setStartups] = useState([]);
    const [searchData, setSearchData] = useState("");
    const [tagData, setTagData] = useState("");

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const pageSizes = [10, 20, 30];

    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
        // retrieveStartups();

    }, []);
    const retrieveStartups = () => {
        const params = getRequestParams(searchData ,page, pageSize,tagData);
        StartupService.getStartups(params)
            .then((response) => {
                const { content, totalPages } = response.data;

                setStartups(content);
                setCount(totalPages);

                console.log(response.data);


            })
            .catch((e) => {
                console.log(e);
            });

    };
    useEffect(retrieveStartups, [page, pageSize]);

    const getRequestParams = (searchData, page, pageSize,tagData) => {
        let params = {};
        if(tagData){
            params["tagData"] = tagData;
        }
        if (searchData) {
            params["searchData"] = searchData;
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
    const onChangeSearchData = (e) => {
        const searchData = e.target.value;

        setSearchData(searchData);
    };
    const onChangeTagData = (e) => {
        const tagData = e.target.value;
        setTagData(tagData);
    };

    return (
        <div className="container">
            <div
                className="bg-image p-5 text-center shadow-1-strong rounded mb-5 text-white banner"
            >
                <h1 className="mb-3 h2">{content}</h1>

            </div>
            {/*<header className="jumbotron">*/}
            {/*    <h3>{content}</h3>*/}
            {/*</header>*/}

            <div className="row">
                <div className="col-sm-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Startups"
                        value={searchData}
                        onChange={onChangeSearchData}
                    />
                </div>
                <div className="col-sm-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Tag name"
                        value={tagData}
                        onChange={onChangeTagData}
                    />
                </div>
                <div className="col-sm-4">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={retrieveStartups}
                    >
                        Search
                    </button>
                </div>
            </div>
            {/*/!*<Image src={"https://logos-world.net/wp-content/uploads/2020/11/Swiggy-Logo.png"}></Image>*!/*/}

            <h4>Latest Startups</h4>
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

            <Row className={'show-grid'}>

                {startups &&
                startups.map((item) => (
                    <div key={item.id} style={{display: 'flex', flexDirection: 'row'}}>
                        <Startuptile key={item.id} startup={item} />
                    </div>
                ))}

            </Row>

        </div>
    );
};

export default Home;
