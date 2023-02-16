import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as ReactDOM from 'react-dom';

import Speaker
 from './Speaker';
import VotingInfo from './VotingInfo';

import {MEETINGButton, MEETING_UPDATE} from "./const"


class Speakers extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            speakers: []
        }

        this.newSpeakerInput = React.createRef();

        this.addNewSpeaker = this.addNewSpeaker.bind(this)
        this.removeSpeaker = this.removeSpeaker.bind(this)
    }

    render() {
        return (
        <>
            <Row>
                <h1>Mówcy</h1>
            </Row>
            <Row>
                <InputGroup className="mb-3">
                    <Form.Control
                        ref={this.newSpeakerInput}
                        placeholder="Mówca"
                        aria-label="Mówca"
                        aria-describedby="basic-addon2"
                    />
                    <Button variant='success' onClick={this.addNewSpeaker}>
                        Dodaj
                    </Button>
                </InputGroup>
            </Row>
          
                
                {this.state.speakers.map((speaker, index) => 
                  <Row>
                    <Col xs={6}>
                        <Speaker name={speaker}></Speaker>
                    </Col>
                    <Col>
                        <Button variant="info" onClick={this.voting}>Głosowanie</Button>
                    </Col>
                    <Col>
                        <Button variant="danger" onClick={(e) => this.removeSpeaker(speaker)}>Usuń</Button>
                    </Col>
                    </Row>
                )}
        </>
        )
    }

    componentDidUpdate(prevProps) {
        this.save()
    }

    componentDidMount() {
        this.load()
    }

    voting() {
        let myWindow = window.open("", "", "width=600,height=600"); 

      //  ReactDOM.createPortal(VotingInfo, myWindow);
    }

    save() {
        if (this.state.speakers.length  === 0) {
            return
        }

        fetch(SAVE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: {
                "speakers": JSON.stringify(this.state.speakers)
            }
        }).then(response => {
            return response.json()
        }).then(jData => {
            console.log(jData)
        }).catch(error => {
            console.error(error)
        }) 
    }

    load() {
        fetch(LOAD, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
              },
        }).then(response => {
            return response.json()
        }).then(jData => {
            this.setState({
                "speakers": jData.speakers
            })
        }).catch((error) => {
            console.error(error)
        })
    }

    removeSpeaker(s) {
        let speakers = this.state.speakers

        let index = speakers.findIndex((speaker) => speaker === s)

        if (index === -1) {
            return
        }

        speakers.splice(index, 1)
    
        this.setState({
            speakers: speakers
        })
    }

    addNewSpeaker() {
        const speaker = this.newSpeakerInput.current.value

        if (speaker === '') {
            return
        }

        this.setState({
            speakers: [...this.state.speakers, speaker]
        })

        this.newSpeakerInput.current.value = ''
    }
}

export default Speakers;