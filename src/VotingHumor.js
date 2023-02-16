import React, {useEffect, useState} from 'react'
import Finished from './Finished'

import { VOTING_UPDATE } from './const'


function VotingHumor() {
    let [speaker, setSpeaker] = useState(null)
    let [finished, setFinished] = useState(false)

    const vote = (speaker) => {
        fetch(VOTING_UPDATE, {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                attr: "humor",
                value: speaker
            })
        }).then((response) => {
            if (response.status === 200) {
                setFinished(true)
            }
        }).catch((error) => {
            console.error(error)
        })
    }

    if (finished) {
        return <Finished banner={"Informacja wysłana!"}></Finished>
    }

    return (
        <div class="d-flex align-items-center justify-content-center h-full">
            <div class="container">
                <div class="row">
                    <h3>Głosowanie na najlepszy humor</h3>
                </div>
                <div class="row p-2">
                    <div class="separator"></div>
                </div>
                <div class="row mt-4 p-4 justify-content-center">
                    <input type="text" onChange={(e) => setSpeaker(e.target.value)} onKeyUp={(e) => {
                         if (e.key === 'Enter') {
                            vote(speaker)
                        }
                    }} class="form-control" placeholder='Kto ci się najbardziej spodobał? :)' aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div class="row p-4 justify-content-center">
                    <button disabled={speaker === null || speaker === ""} class="btn btn-primary" onClick={() => {
                        vote(speaker)
                    }}>Wyślij</button>
                </div>
            </div>
        </div>
    )
}

export default VotingHumor;