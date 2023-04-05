import React, { useState } from 'react'
import CardDisplay from "../components/CardDisplay/CardDisplay"
import { useQuery, useMutation, gql } from "@apollo/client"

const CATS_QUERY = gql`
{
  cats {
    id
    catName
    description
    imageURL
    rating
  }
}
`

// const ADD_CAT_MUTATION = gql`
// mutation(
//   $catName: String, 
//   $description: String, 
//   $id: String, 
//   $imageUrl: String, 
//   $rating: Int
// ) {
//   addCat(
//     catName: $catName, 
//     description: $description, 
//     id: $id, 
//     imageURL: $imageUrl, 
//     rating: $rating
//   ) {
//       catName
//       description
//       id
//       imageURL
//       rating
//     }
//   }
// `

const ADD_CAT_MUTATION = gql`
mutation(
  $catName: String,
  $description: String,
  $id: String,
  $imageURL: String,
  $rating: Int
  ){
  addCat(
    catName: $catName, 
    description: $description,
    id: $id, 
    imageURL: $imageURL, 
    rating: $rating
  ) {
      catName
      description
      id
      imageURL
      rating
    }
  }
`

function LandingPage() {
  const [id, setId] = useState("");
  const [catName, setCatName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [rating, setRating] = useState("");
  const { loading, error, data } = useQuery(CATS_QUERY);
  const [addCat, { addCatData, addCatLoading, addCatError }] = useMutation(ADD_CAT_MUTATION);

  if (loading || addCatLoading) return <div>Loading...</div>;

  if (error || addCatError) return <div>Error....</div>



  return (
    <div>
      <div>
        <h1>Welcome to CatGraphQL</h1>
        <h2>A webclient example with Apollo Server + Firebase Realtime Database.</h2>
      </div>
      <div style={{ backgroundColor: '#DCEDFF' }}>
        <h4 style={{ color: 'gray', padding: '1rem' }}>Insert the cat data</h4>
        <>
          <form
            onSubmit={e => {
              e.preventDefault();
              addCat({
                variables: {
                  id: id,
                  catName: catName,
                  description: description,
                  imageURL: imageURL,
                  rating: rating
                }
              });
              window.location.reload();
            }
            }
          >
            <label style={{ color: 'gray', paddingLeft: '1rem' }}>
              Id
              <br />
              <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
            </label>
            <br />
            <label style={{ color: 'gray', paddingLeft: '1rem' }}>
              Name
              <br />
              <input type="text" value={catName} onChange={(e) => setCatName(e.target.value)} />
            </label>
            <br />
            <label style={{ color: 'gray', paddingLeft: '1rem' }}>
              Description
              <br />
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <br />
            <label style={{ color: 'gray', paddingLeft: '1rem' }}>
              Image URL
              <br />
              <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
            </label>
            <br />
            <label style={{ color: 'gray', paddingLeft: '1rem' }}>
              Rating
              <br />
              <input type="text" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} />
            </label>
            <br />
            <input type="submit" value="Submit" style={{ margin: '1rem', padding: '0.5rem' }}></input>
          </form>
        </>
      </div>
      <CardDisplay cats={data.cats} />
    </div>
  )
}

export default LandingPage
