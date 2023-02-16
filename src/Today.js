import { useState } from "react";


function Today() {
    const months = [
        "Styczeń",
        "Luty",
        "Marzec",
        "Kwiecień",
        "Maj",
        "Czerwiec",
        "Lipiec",
        "Sierpien",
        "Wrzesień",
        "Październik",
        "Listopad",
        "Grudzień"
    ]

    const currentDate = new Date()

    let day = currentDate.getDate();
    let month = months[currentDate.getMonth()];
    let year = currentDate.getFullYear();

    return (
        <div>
            <p>
                {day} {month} {year}
            </p>
        </div>
    )   
}

export default Today;