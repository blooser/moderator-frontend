import { useState, useRef, useEffect } from "react";


function Dialog({title, show=false, onYes}) {
    const dialog = useRef(null)

    useEffect(() => {
        if (show) {
            dialog.show()
        } else {
            dialog.hide()
        }
    }, [show])

    return (
        <div ref={dialog} class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                    <div class="modal-body">
                                        {title}
                                    </div>
                                <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Nie</button>
                            <button type="button" class="btn btn-primary" onClick={onYes}>Tak</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialog;