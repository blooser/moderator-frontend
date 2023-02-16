import React, { useState, useRef, useEffect } from "react";


function Logo() {
    return (
        <img  onClick={() => {
                window.open("https://www.tctm.pl")
            }} src="https://toastmasterskrakow.pl/wp-content/uploads/2020/03/Toastmasters-Logo-Color-PNG-1024x850.png" class="rounded float-left toast-logo " />
    )
}

export default Logo;