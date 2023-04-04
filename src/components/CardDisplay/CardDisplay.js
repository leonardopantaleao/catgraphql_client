import React from 'react'
import Card from '../Card/Card'
import {Container} from "react-bootstrap"

function CardDisplay({cats}) {

    return (
        <div className="card-display">
            <Container className="card-display-container">
                {cats.map(cat => {
                    return <Card cat={cat} key={cat.id}/>
                })}
            </Container>
        </div>
    )
}

export default CardDisplay
