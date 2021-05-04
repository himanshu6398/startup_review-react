import React, {Fragment, useEffect, useState} from 'react'
import {Card} from "reactstrap";


const AddComment=({rating,trigger,setTrigger,commentWrittenTrigger}) =>{


    return(
        (trigger) ? (
            <div className={'popup'}>

                <div className={'popup-inner'}>
                    <Card  className="card-style">
                        <div className={"container col-md-12"}>
                            <button onClick={()=>setTrigger(false)} className={"close-btn"}  aria-label="Close">  <span aria-hidden="true">&times;</span></button>

                            <h3 className={'text-center my-3'}> Write a comment}</h3>
                        </div>
                    </Card>
                </div>
            </div>

        ):("")
    );


}
export default AddComment;