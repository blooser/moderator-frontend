import React, { useState, useRef, useEffect } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { MEETING_UPDATE, REMOVE } from "./const";

const ATTR_VOTING = {
    "speakers": "NM/info",
    "evaluators": "NE/info",
    "hot": "NG/info",   
}


function CollectionItem({item, index, feedback, onRemove}) {
    return (
        <div class="d-flex align-items-center p-2 collection-item ">
            <div class="flex-fill" style={{cursor: "default"}}>
                <h2>
                    {item}
                </h2>
        </div>
        {feedback &&
            <div class=" m-1">
                <button class="btn btn-warning" onClick={() => {
                    const feedbackInfo = `${window.location}M/${index+1}/info`


                    window.open(feedbackInfo)
                }}>
                    Informacja
                </button>
            </div>
        }
            <div class="m-1">
                <button class="btn btn-danger" onClick={() => {
                    onRemove(item)
                }}>
                    Usuń
                </button>
            </div>
        </div>
    )
}


function Collection({header, placeholder, attr, initialItems, feedback=false}) {
    let [items, setItems] = useState([])

    const input = useRef(null)

    useEffect(() => {
        setItems(initialItems)

    }, [initialItems])

    let addItem = () => {
        let item = input.current.value

        if (item === '') {
            return
        }

        let index = items.findIndex((currentItem) => currentItem === item)

        if (index !== -1) {
            input.current.value = ''

            return
        }

        let newItems = [...items, item]

        setItems(newItems)

        input.current.value = ''

        update(newItems)
    }

    let removeItem = (item) => {
        let index = items.findIndex((currentItem) => currentItem === item)

        if (index === -1) {
            return
        }
        
        items.splice(index, 1)

        setItems([...items])

        remove(item)
    }

    const noItems = () => {
        return items.length === 0
    }

    const moreThanOneItems = () => {
        return items.length > 1
    }

    let update = (newItems) => {
        fetch(MEETING_UPDATE, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                [attr]: newItems
              })
        }).then((response) => {
            console.log(response.status)
        }).catch((error) => {
            console.error(error)
        })
    }

    let remove = (item) => {
        fetch(REMOVE, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "attr": attr,
                "value": item
            })
        }).then((response) => {
            console.log(response.status)
        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <div class="collections">
            <div class="row">
                <h1>
                    {header}
                </h1>
            </div>
            
            <div class="row">
                <div class="input-group mb-3">
                    <input ref={input} type="text" onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            addItem()
                        }
                    }} class="form-control" placeholder={placeholder} aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button class="btn btn-success" type="button" id="button-addon2" onClick={addItem}>
                        Dodaj
                    </button>
                </div>
            </div>
            {!noItems() &&
            <div class="row justify-content-center mt-4">
                <button class="btn btn-primary dynamic-button w-auto" disabled={!moreThanOneItems()} type="button" onClick={() => {
                    const votingPath = `${window.location}${ATTR_VOTING[attr]}`
                    
                    window.open(votingPath)
                }}>
                        Głosowanie
                </button>
            </div>
            }
            <TransitionGroup>
                {items.map((item, index) => 
                    <CSSTransition key={item} timeout={500} classNames="dynamic">
                        <div class="row justify-content-center align-items-center mt-4">
                            <CollectionItem item={item} index={index} feedback={feedback} onRemove={(i) => {
                                removeItem(i)
                            }}>

                            </CollectionItem>
                        </div>
                    </CSSTransition>
                )}
            </TransitionGroup>            
        </div>
    )
}

export default Collection;