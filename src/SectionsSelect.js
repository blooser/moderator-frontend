import React, {useEffect, useState} from 'react'


function SectionsSelect({sections, onSectionSelect}) {
    let [currentSection, setCurrentSection] = useState(sections[0])

    useEffect(() => {
        onSectionSelect(currentSection)
    }, [currentSection])

    return (
        <select class="feedback-select w-auto" onChange={(e) => {
            setCurrentSection(sections.find(item => item.text === e.target.value))

        }}>
            {sections.map((section, index) => 
                <option selected={currentSection.attr === section.attr} onSelect={() => {
                }}>
                    {section.text}
                </option>
            )}
        </select>
    )
}

export default SectionsSelect;