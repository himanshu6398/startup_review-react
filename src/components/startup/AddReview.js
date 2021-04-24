import React from 'react'
import Startuptile from "./Startuptile";
import'../../assets/css/popup.css'

const AddReview=({startup,trigger,setTrigger}) =>{

    return (
        (trigger) ? (
            <div className={'popup'}>
                <div className={'popup-inner'}>
                    <h2>Write a review for {startup.name}</h2>

                    <button onClick={()=>setTrigger(false)} className={"close-btn"}>close</button>
                </div>

            </div>
        ):("")
    );

}

export default AddReview;