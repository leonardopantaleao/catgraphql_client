import React from 'react'
import CardDisplay from "../components/CardDisplay/CardDisplay"
import { useQuery, gql } from "@apollo/client"

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

function LandingPage() {

    const { loading, error, data } = useQuery(CATS_QUERY);

    if(loading) return <div>Carregando...</div>;

    if(error) return <div>Erro....</div>

    return (
        <div>
          <div>
            <h1>Bem vindo ao CatGraphQL</h1>
            <h2>Um exemplo de client de Apollo Server + Firebase Realtime Database.</h2>
          </div>
          <CardDisplay cats={data.cats}/>
        </div>
    )
}

export default LandingPage
