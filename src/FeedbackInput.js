import React, { useState, useRef, useEffect } from "react";


function FeedbackInput({header, onChange}) {
    let [text, setText] = useState("")

    useEffect(() => {
        onChange(text)
    }, [text])

    return (
        <>
        <div class="row">
            <h3>{header}</h3>
        </div>
        <div>
            <div class="form-floating">
                <textarea class="form-control" value={text} onChange={(e) => setText(e.target.value)} placeholder="Twój komentarz" style={{height: "100px"}}></textarea>
            </div>
        </div>
        </>
        
    )
}

export default FeedbackInput;