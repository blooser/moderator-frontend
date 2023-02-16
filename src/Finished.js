import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'



function Finished({banner}) {
    return (
        <div class="d-flex justify-content-center align-items-center h-full">
            <div class="container">
                <div class="row mt-4 justify-content-center">
                    <p>
                        {banner}
                    </p>
                </div>
                <div class="row justify-content-center">
                    <FontAwesomeIcon icon={faCheckCircle} size="2x"></FontAwesomeIcon>
                </div>
            </div>
        </div>
    )
}

export default Finished;