import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceDizzy } from '@fortawesome/free-solid-svg-icons'


function Dead({banner}) {
    return (
        <div class="d-flex align-items-center justify-content-center h-full">
            <div class="container">
                <div class="row justify-content-center">
                    <p>
                        {banner}
                    </p>
                </div>
                <div class="row justify-content-center">
                    <FontAwesomeIcon icon={faFaceDizzy} size="2x" />
                </div>
            </div>

        </div>
    )
}

export default Dead;