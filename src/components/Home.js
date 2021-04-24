import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import StartupService from "../services/startup.service";
import Pagination from "@material-ui/lab/Pagination";

const Home = () => {

    const [content, setContent] = useState("");
    const [startups, setStartups] = useState([]);
    const [searchData, setSearchData] = useState("");

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(1);

    const pageSizes = [1, 2, 3];

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
        retrieveStartups();

    }, []);
    const retrieveStartups = () => {
        const params = getRequestParams(searchData ,page, pageSize);
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

    const getRequestParams = (searchData, page, pageSize) => {
        let params = {};
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

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>

            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Startups"
                        value={searchData}
                        onChange={onChangeSearchData}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={retrieveStartups}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
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
            <ul className="list-group">
                {startups &&
                startups.map((item) => (
                    <li
                        className={
                            "list-group-item "
                        }

                        key={item.id}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;