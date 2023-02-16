import React, {useEffect, useState} from 'react'


function NavbarButtons({sections, onSectionChange}) {
    let [currentSection, setCurrentSection] = useState("Edytowanie")

    return (
        <div>
            {sections.map((section) => 
                <button class="navbar-button" onClick={() => {
                    setCurrentSection(section.text)
                    onSectionChange(section)
                }} className={section.text === currentSection ? "navbar-button-active navbar-button" : "navbar-button" }>
                    <span>{section.text}</span>
                </button>
            )}
        </div>
    )
}


export default NavbarButtons; 