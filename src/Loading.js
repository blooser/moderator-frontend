import React, { useState, useRef, useEffect } from "react";


function Loading() {
    return (
        <div class="d-flex justify-content-center align-items-center h-full">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loading;