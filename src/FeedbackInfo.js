import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom";

import QRCode from 'react-qr-code';

import Loading from './Loading';
import { SPEAKER, SERVER } from './const';
import Today from './Today';


function FeedbackInfo() {
    const [speaker, setSpeaker] = useState(null)
    const [notFound, setNotFound] = useState(false)
    let {number} = useParams()

    useEffect(() => {
        fetch(SPEAKER, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                "number": number
            })
        }).then((response) => {
            if (response.status === 404) {
                setNotFound(true)

                return
            }

            return response.json()
        }).then((jData) => {
            setSpeaker(jData.speaker)
        }).catch((error) => {
            console.error(error)
        })
    }, [])

    if (speaker === null) {
        return <Loading></Loading>
    }

    const FEEDBACK_PATH = `http://192.168.1.12:3000/M/${number}`

    return (
        <div class="d-flex align-items-center justify-content-center h-full">
            <div class="container">
                <div class="row">
                    <Today></Today>
                </div>

                <div class="row">
                    <h1>Informacja zwrotna </h1>
                </div>

                <div class="spacer-small"></div>


                <div class="row">
                    <h2>{speaker}</h2>
                </div>
                

                <div class="spacer-small"></div>

                <div class="row">
                    <span><b>{FEEDBACK_PATH}</b></span>
                </div>

                <div class="spacer-small"></div>

                <div class="row">
                    <QRCode value={FEEDBACK_PATH} />
                </div>
            </div>
            
        </div>
    )
}

export default FeedbackInfo;