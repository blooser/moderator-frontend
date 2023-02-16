import React, { useEffect, useState } from 'react';
import Collection from './Collection';
import Sections from './Sections';
import Select from './Select';

import {MEETING} from "./const"
import SectionsSelect from './SectionsSelect';


const MEETING_DEFAULT_VALUES = {
    "speakers": [],
    "evaluators": []
}

const sectionData = {
    "speakers": {
        header: "Mowcy",
        placeholder: "Mówca",
        attr: "speakers"
    },

    "evaluators": {
        header: "Ewaluatorzy",
        placeholder: "Ewaluator",
        attr: "evaluators"
    },

    "hot": {
        header: "Mowcy Improwizowani",
        placeholder: "Mówca Improwizowany",
        attr: "hot"
    },
}

const section = [
    {
        text: "Mówcy",
        attr: "speakers"
    },

    {
        text: "Ewaluatorzy",
        attr: "evaluators"
    },

    {
        text: "Gorące Pytania",
        attr: "hot"
    },

    {
        text: "Najlepszy humor",
        attr: "humor"
    }
]


function EditPage() {
    let [meeting, setMeeting] = useState(MEETING_DEFAULT_VALUES)
    let [currentSection, setCurrentSection] = useState("speakers")

    useEffect(() => {
        fetch(MEETING, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                }
        }).then((response) => {
            return response.json()
        }).then((jData) => {
            setMeeting(jData)
        }).catch((error) => {
            console.error(error)
        })}, [currentSection]
    )

    return (
        <div class="container">
            <h1>
                Przygotowywanie mówców
            </h1>
            <div class="spacer-small"></div>
            <div class="container">
                <div class="row justify-content-center">
                    {window.innerWidth <= 550 ?
                        <SectionsSelect sections={section} onSectionSelect={(newSection) => {
                            setCurrentSection(newSection.attr)
                        }}></SectionsSelect>

                        :    
                        
                        <Sections sections={section} defaultSection={section[0]} onSectionChange={(section) => {
                            setCurrentSection(section.attr)
                        }}>
                        </Sections>
                    }
                 
                </div>
                <div class="spacer-small"></div>
                {currentSection !== "humor" &&
                    <div class="row">
                        <Collection header={sectionData[currentSection].header} feedback={currentSection === "speakers"} placeholder={sectionData[currentSection].placeholder} initialItems={meeting[sectionData[currentSection].attr]} attr={sectionData[currentSection].attr}></Collection>
                    </div>
                }
                {currentSection === "humor" &&
                    <div class="row justify-content-center">
                        <button class="btn btn-primary w-auto " onClick={() => {
                              const humorPath = `${window.location}NH/info`

                              window.open(humorPath)
                        }}>Głosowanie</button>
                    </div>
                }
            </div>

            <div class="spacer-small"></div>

        </div>

    )
}


export default EditPage;