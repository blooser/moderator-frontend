import { Badge } from "react-bootstrap"
import React, {useState} from 'react'



function Evaluator({name}) {

    return (
        <div>
            <h1>
                <Badge>{name}</Badge>
            </h1>
        </div>
    )
}

export default Evaluator