import React from 'react';
import "./Card.css";
import star from "../../assets/svg/star.svg";
import { gql, useMutation } from "@apollo/client";

const REMOVE_CAT_MUTATION = gql`
    mutation($id: String) {
        removeCat(id: $id)
    }
`

function Card(props) {
    let input;
    const rating = props.cat.rating;
    const catId = props.cat.id;
    const [removeCat, { data, loading, error }] = useMutation(REMOVE_CAT_MUTATION);
    if (loading) return 'Loading...';
    if (error) return `Error after trying to remove ${catId}! ${error.message}`
    var stars = [];
    for (let index = 0; index < rating; index++) {
        stars.push(<img src={star}/>);
    }    
    return (
        <div className="catCard" id={catId}>
            <img className="main-img" src={props.cat.imageURL}/>
            <h2>
                {props.cat.catName}
            </h2>
            <div className="card-start" id="rating">
                {stars}
            </div>
            <div className="card-price" >
                <h4>{props.cat.description}</h4>
            </div>
            <div className="remove-cat" id="removeCatDiv">
                <form
                onSubmit={e => {
                    e.preventDefault();
                    removeCat({variables: { id: catId }});
                    window.location.reload();
                }}
            >
        <button type="submit">Remove</button>
            </form>
            </div>
        </div>
    )
}

export default Card
