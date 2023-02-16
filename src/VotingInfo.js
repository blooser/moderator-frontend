import React from "react";

import QRCode from "react-qr-code";
import Today from "./Today";


function VotingInfo({banner, subpath}) {
    const path = `http://192.168.1.12:3000/${subpath}`

    return (
        <div class="d-flex align-items-center justify-content-center h-full">
            <div class="container">
                <div class="row">
                    <Today></Today>
                </div>

                <div class="row">
                    <p>Głosujemy na {banner}</p>
                </div>

                <div class="spacer-small"></div>

                <div class="row">
                    <span>
                        <b>
                            {path}
                        </b>
                    </span>
                </div>

                <div class="spacer-small"></div>

                <div class="row">
                    <QRCode value={path}></QRCode>
                </div>
            </div>
        </div>
    )
}

export default VotingInfo;