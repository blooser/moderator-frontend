import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Loading from "./Loading"; 
import Finished from "./Finished";
import Dead from "./Dead";

import { SPEAKER, FEEDBACK_UPDATE } from "./const";



function Questions({onAnswer}) {
    const questions = [
        "Jaki był Twoim zdaniem cel mowy?",
        "Jakie uczucia wzbudziło w tobie wystąpienie?",
        "Czy struktura była poprawna i czy miała elementy zaawansowane?",
        "Co sądzisz o mowie ciała?",
        "Co sądzisz o sposobie mówienia?",
        "Co Ci się podobało w wystąpieniu  i dlaczego?",
        "Co mówca mógłby zrobić lepiej i dlaczego przyniosło by to pozytywny skutek?",
        "Dodatkowe informacje"
    ]

    return (
        <div>
            {questions.map((question) => 
                <div class="row p-4 mt-4 feedback-item">
                        <p>{question}</p>
                        <textarea placeholder="Twoje spostrzeżenia" onChange={(e) => {
                            onAnswer({[question]: e.target.value})
                        }} class="form-control" style={{height: "100px"}}></textarea>
                    
                </div>
            )}
        </div>
    )
}


function Feedback() {
    let {number} = useParams()

    const [speaker, setSpeaker] = useState('')
    const [finished, setFinished] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const [feedback, setFeedback] = useState({})

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

    
    const sendFeedback = () => {
        fetch(FEEDBACK_UPDATE, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                "speaker": speaker,
                "answers": feedback
            })
        }).then((response) => {
            if (response.status === 200) {
                setFinished(true)
            }
        }).catch((error) => {
            console.error(error)
        })
    }

    const isFeedbackEmpty = () => {
        for (let key in feedback) {
            if (feedback[key] !== '') {
                return false
            }
        }

        return true
    }

    if (notFound) {
        return <Dead banner={"Nie znaleziono mówcy"}></Dead>
    }

    if (finished) {
        return <Finished banner={"Informacja wysłana"}></Finished>
    }

    if (speaker !== '') {
        return (
            <div class="container">
                <div class="row pb-2 pt-4 feedback-header">
                    <h1>Informacja dla <b> {speaker}</b></h1>
                </div>
                <div class="row p-2 ">
                    <Questions onAnswer={(answer) => {
                        setFeedback({...feedback, ...answer})
                    }}>
                    </Questions>
                </div>
                <div class="row p-2 align-items-center justify-content-center">
                    <button disabled={isFeedbackEmpty()} class="btn btn-primary m-4" onClick={sendFeedback}>
                        <b>Wyślij</b>    
                    </button>
                </div>
            </div>
        )
    }
     

    return (
        <Loading></Loading>
    )

}

export default Feedback;