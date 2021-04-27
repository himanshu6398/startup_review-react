import React from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';
import {Link} from "react-router-dom";

const AdminLeftSideMenu=()=>{
    return (
        <ListGroup>
            <Link className={"list-group-item list-group-item-action"} tag={"a"} to={"/profile"} >Admin</Link>
            <Link className={"list-group-item list-group-item-action"} tag={"a"} to={"/profile/user-details"} >User Details</Link>
            <Link className={"list-group-item list-group-item-action"} tag={"a"} to={"/profile/add-startup"} >Add startup</Link>
            <Link className={"list-group-item list-group-item-action"} tag={"a"} to={"/profile/show-startups"} >Show startups</Link>
            <Link className={"list-group-item list-group-item-action"} tag={"a"} to={"#!"} >Contact</Link>

        </ListGroup>
    );
}

export default AdminLeftSideMenu;