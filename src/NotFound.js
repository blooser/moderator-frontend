import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRadiation } from '@fortawesome/free-solid-svg-icons'



function NotFound() {

    return (
        <div class="d-flex align-items-center justify-content-center h-full">
            <div class="container">
                <div class="row justify-content-center">
                    <p>Wychodzisz po za strefe</p>
                </div>
                <div class="row justify-content-center">
                    <FontAwesomeIcon icon={faRadiation} size="2x"></FontAwesomeIcon>
                </div>
            </div>
        </div>
    )
}



export default NotFound;