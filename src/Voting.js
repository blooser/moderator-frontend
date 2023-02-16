import React, {useEffect, useState} from 'react'
import { Container, Row, Button } from 'react-bootstrap';
import { withRouter } from "react-router";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import Loading from './Loading';
import Finished from './Finished';

import { VOTING_UPDATE, MEETING } from './const';


function VotingItems({items, onSelectedItemChanged}) {
    let [selectedItem, setSelectedItem] = useState(null)

    useEffect(() => {
        onSelectedItemChanged(selectedItem)
    }, [selectedItem])

    return (
        <div class="container">
            {items.map((item, index) =>
            <div class="row justify-content-center">  
                    <div className={item === selectedItem ? "m-2 p-2 voting-item voting-item-active" : "m-2 p-2 voting-item"} onClick={() => {
                        setSelectedItem(item)
                    }}>
                        
                        <div class="form-check"> 
                            <input class="form-check-input" type="radio" checked={item === selectedItem} value={item} onChange={(e) => {
                                setSelectedItem(e.target.value)
                            }} />
                            <label class="form-check-label" onClick={() => {
                                setSelectedItem(item)
                            }} >
                                <span>
                                    {item}
                                </span>
                            </label>
                        </div>
                </div>
            </div>
            )}
        </div>
    )
}



function Voting({header, attr, item}) {
    const [items, setItems] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
    const [finished, setFinished] = useState(false)

    const getItems = () => {
        fetch(MEETING, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            return response.json()
        }).then((jData) => {
            setItems(jData[attr])
        }).then((error) => {
            console.error(error)
        })
    }

    useEffect(() => {
        getItems()
    }, [])

    const Sent = () => {
        fetch(VOTING_UPDATE, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    attr: attr,
                    value: selectedItem
                }
            )
        }).then((response) => {
            if (response.status === 200) {
                setFinished(true)
            }
        }).catch((error) => {
            console.error(error)
        })
    }
    

    if (finished) {
        return <Finished banner={"Informacja wysłana"}></Finished>
    }

    if (items.length !== 0) {
        return    (
            <div class="d-flex align-items-center justify-content-center h-full">

            <div class="container">
                <div class="row">
                    <h3>{header}</h3>
                </div>
                <div class="row p-2">
                    <div class="separator"></div>
                </div>
                <div class="spacer-small"></div>

                    <div>
                        <VotingItems items={items} onSelectedItemChanged={setSelectedItem}></VotingItems>
                    </div>
                    <div class="spacer-small"></div>

                <div class="row p-3 justify-content-center">
                    <button class="btn btn-primary " onClick={Sent} disabled={selectedItem === null}>
                        Wyślij    
                    </button>
                </div>
                </div>
            </div>
        )
    }

    return (
        <Loading></Loading>    
    )
}


export default Voting;
