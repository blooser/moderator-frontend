import React from 'react'
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';



function Speaker({name}) {
    return (
        <div>
            <h1>
                <Badge>
                    {name}
                </Badge>
            </h1>
        </div>
    )
}


export default Speaker;