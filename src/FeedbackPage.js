import React, { useEffect, useState } from 'react';

import { Buffer } from 'buffer';

import { FEEDBACK, FEEDBACK_PDF } from './const';
import Select from './Select';
import Waiting from './Waiting';


function Questions({questions}) {    
    return (
        <div class="m-2 ">
            {Object.keys(questions).map((question) => 
            <div class="p-4  mt-4 question">
                <div class="row">
                    <p>
                        <b>
                            {question}
                        </b>
                    </p>
                </div>
                <div class="question-line mt-2 mb-2">
                </div>

                <div>
                {questions[question].map((answer) => 
                    <p>
                        {answer}
                    </p>
                )}
                </div>
            </div>
            )}
        </div>
    )
}

function isEqual(obj1, obj2) {
    if (obj1 === null || obj2 === null) {
        return false
    }

    for (let k in obj1) {
        for (let kk in obj1[k]) {
            if (obj1[k][kk] !== obj2[k][kk]) {
                return false
            }
        }
    }

    return true
}


function FeedbackPage() {
    let [data, setData] = useState(null)
    let [speaker, setSpeaker] = useState(null)

    const getData = () => {
        fetch(FEEDBACK, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            return response.json()
        }).then((jData) => {
            if (!isEqual(data, jData)) {
                setData(jData)
            }
        }).catch((error) => {
            console.error(error)
        })
    }

    useEffect(() => {
        const interval = setInterval(getData, 1000)

        return () => clearInterval(interval)
    }, [data])

    const downloadPdf = () => {
        fetch(FEEDBACK_PDF, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    speaker: speaker,
                    feedback: data[speaker]
                }
            )
        }).then((response) => {
            return response.json()
        }).then((jData) => {
            let filename = jData.filename
            let file = jData.file

            let buffer = Buffer.from(file, "base64")

            let blob = new Blob([buffer], {type: "application/pdf"})
            let url = URL.createObjectURL(blob)

            let a = document.createElement("a")
            a.href = url
            a.download = filename
            a.click()

            URL.revokeObjectURL(url);

        }).catch((error) => {
            console.error(error)
        })
    }

    const isDataEmpty = () => {
        return data === undefined ||        
               data === null ||
               Object.keys(data).length === 0
    }

    return (
        <div class="container">
            <div class="row">
                <h1>Informacja zwrotna {speaker !== null && 
                    <>dla <b>{speaker}</b></> }
                </h1>
            </div>
            {!isDataEmpty() ?
                <>
                    <div class="row mt-4 justify-content-center align-items-center">
                        <Select items={Object.keys(data)} placeholder={"-- Wybierz mówce --"} onItemSelect={(item) => {
                            setSpeaker(item)
                        }}>

                        </Select>
                    </div>
                    <div class="row">
                        {speaker !== null ? 
                                            <div class="justify-content-center mt-2 mb-2" >
                                                    <Questions questions={data[speaker]}></Questions>
                                                    <button class="btn btn-primary w-auto mt-4 mb-4" onClick={downloadPdf}>Pobierz</button>
                                                </div>
                                          : <>
                                            </>
                        }
                    </div>
                   
                </>
                : <div>
                    <div class="spacer"></div>
                    <Waiting banner={"Czekanie na dane"}></Waiting>
                  </div>
            }
       
            
        </div>

    )
}

export default FeedbackPage;