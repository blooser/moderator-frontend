import React, { useState, useRef, useEffect } from "react";


function Waiting({banner}) {
    return (
        <div class="container">
            <div class="row justify-content-center">
                <p>{banner}</p>
                </div>
            <div class="row justify-content-center">
                <div class="spinner-grow text-info" role="status">
                    <span class="sr-only"></span>
                </div>
            </div>
        </div>
    )
}

export default Waiting;