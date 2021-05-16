import React, {useEffect, useState} from 'react'
import {Button, Comment, Form, Header, Message} from 'semantic-ui-react'
import AuthService from "../../services/auth.service";

import CommentService from "../../services/comment.service";

import ReactTimeAgo from "react-time-ago";
import EditComment from "../comment/EditComment";




const TopComments = (rating_id) =>{


    const user = AuthService.getCurrentUser();
    const initialCommentState = {
        rating_id:rating_id.rating_id,
        description: ""

    };
    const [showComments,SetShowComments]=useState([]);

    const [comment,setComment]=useState(initialCommentState);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [showUpdateCommentForm,SetShowUpdateCommentForm] = useState(false);
    const [selectedComment,setSelectedComment] = useState([]);

    const userIcons=['https://react.semantic-ui.com/images/avatar/small/matt.jpg',
        'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
        'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
        'https://react.semantic-ui.com/images/avatar/small/joe.jpg' ]   ;
    const retrieveTopComments = () => {
        let params = {};
        params["rating_id"]=rating_id.rating_id;
        console.log(params);
        CommentService.getFirst3Comments(params)
            .then((response) => {

                SetShowComments(response.data);
                console.log(response.data);


            })
            .catch((e) => {
                console.log(e);
            });

    };
    useEffect(() => {
        retrieveTopComments();
    }, []);
    // const handleForm = (e) =>{
    //
    //     setMessage("");
    //     setSuccessful(false);
    //     console.log(comment);
    //
    //     CommentService.addComment(comment).then(
    //         (response) => {
    //             setMessage(response.data.message);
    //             setSuccessful(true);
    //             Array.from(document.querySelectorAll("textarea")).forEach(
    //                 input => (input.value = "")
    //             );
    //             retrieveComments();
    //         },
    //         (error) => {
    //             const resMessage =
    //                 (error.response &&
    //                     error.response.data &&
    //                     error.response.data.message) ||
    //                 error.message ||
    //                 error.toString();
    //
    //             setMessage(resMessage);
    //             setSuccessful(false);
    //         }
    //     );
    //
    //     e.preventDefault();
    // };
    const handleEditButtonEvent = (event) => {
        console.log(event.target.value);
        setSelectedComment(event.target.value);
        SetShowUpdateCommentForm(true);

    };
    return(
        <div>
            <Comment.Group className={"container"}>
                {showComments && (
                (showComments.length > 0) ?(
                        <Header as='h3' dividing>
                            Comments
                        </Header>
                    ):"No Comments"
                )}

                {showComments  &&
                showComments.map((item) => (
                    <Comment key={item.id}>
                        <Comment.Avatar src={userIcons[item.id%4]} />
                        <Comment.Content>
                            <Comment.Author as='a'>{item.userName}</Comment.Author>
                            <Comment.Metadata>
                                <div style={{fontWeight:"bold",color:'black'}}><ReactTimeAgo date={item.dateTime} locale="en-US"/></div>
                            </Comment.Metadata>
                            <Comment.Text>{item.description}</Comment.Text>
                            <Comment.Actions>
                                {/*<Comment.Action>Reply</Comment.Action>*/}
                                {  user != undefined && user.id === item.userId ? (<Comment.Action ><Button size='small' value={item.id} onClick={handleEditButtonEvent}>Edit</Button></Comment.Action>):""}

                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>

                ))}

                {message && (

                    (successful?
                            <Message positive>
                                <Message.Header>{message}</Message.Header>
                            </Message>
                            :
                            <Message negative>
                                <Message.Header>{message}</Message.Header>
                            </Message>
                    )

                )}
                {/*{(user) ? (*/}
                {/*    <Form  onSubmit={handleForm} reply>*/}
                {/*        <Form.TextArea id={"description"} placeholder={"Enter the comment"} required style={{height:"auto"}} rows={3}*/}
                {/*                       onChange={(e)=>{*/}
                {/*                           setComment({...comment,description:e.target.value});*/}
                {/*                       }}*/}
                {/*        />*/}

                {/*        <Button type="submit" content='Add Comment' labelPosition='left' icon='edit' primary />*/}
                {/*    </Form>*/}

                {/*):("Please login to write a comment")}*/}

            </Comment.Group>
            <div>
                { (user) ? (
                    <div>
                        <EditComment trigger={showUpdateCommentForm}  comment_id={selectedComment} setTrigger ={SetShowUpdateCommentForm} updateCommentList={retrieveTopComments}></EditComment>
                    </div>
                ): ""}
            </div>
        </div>
    );
}

export default TopComments