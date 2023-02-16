import React, {useEffect, useState} from 'react'


function Select({items, placeholder, onItemSelect}) {
    return (
        <select class="feedback-select w-auto" onChange={(e) => {
            onItemSelect(e.target.value)
        }}>
            <option disabled selected value>{placeholder}</option>
            {items.map((item) => 
                <option>
                    {item}
                </option>
            )}
        </select>
    )
}

export default Select;