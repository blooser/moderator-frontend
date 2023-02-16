import React, { useEffect, useState } from 'react';

import EditPage from './EditPage';
import VotingPage from './VotingPage';
import FeedbackPage from './FeedbackPage';
import NavbarButtons from './NavbarButtons';
import Logo from './Logo';
import Today from './Today';


function MainPage() {
    let [currentSection, setCurrentSection] = useState("edit")

    const sections = [
        {
            attr: "edit",
            text: "Edytowanie"
        },

        {
            attr: "voting",
            text: "Głosowanie"
        },

        {
            attr: "feedback",
            text: "Informacja zwrotna"
        },
    ]

    const CurrentPage = () => {
        if (currentSection === 'edit') {
            return <EditPage></EditPage>
        } 

        if (currentSection === 'voting') {
            return<VotingPage></VotingPage>
        } 

        if (currentSection === 'feedback') {
            return <FeedbackPage></FeedbackPage>
        } 
    }


    return (
        <>
        <nav class="navbar navbar-toast position-absolute top-0 w-100">
            <div class="container-fluid">
                <div class="row w-100 justify-content-start align-items-center">
                    <div class="col-1">
                        <Logo></Logo>
                    </div>
                    <div class="col-9">
                        <NavbarButtons sections={sections} onSectionChange={(section) => {
                            setCurrentSection(section.attr)
                        }}>
                        </NavbarButtons>
                    </div>
                </div>
            </div>
        </nav>
            <div class="spacer"></div>
            <CurrentPage></CurrentPage>
        </>
        
    )
}

export default MainPage;