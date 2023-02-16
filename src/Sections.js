import React, {useEffect, useState} from 'react'


function Sections({sections, onSectionChange, defaultSection=""}) {
    let [currentSection, setCurrentSection] = useState(defaultSection)

    return (
        <div>
            <div class="row justify-content-around sections">
                {sections.map((section) => 
                    <div class="col justify-content-center">
                        <div className={section === currentSection ? "sectiton-item section-item-active" : "section-item"} aria-current="page" onClick={() => {
                            setCurrentSection(section)
                            onSectionChange(section)
                        }}>
                            {section.text}
                        </div>
                    </div>
                )}
                </div>
                <div class="section-border"></div>

            </div>
    )
}


export default Sections;