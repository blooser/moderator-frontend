import React, { useEffect, useState } from 'react';

import { LOGIN } from './const';
import Logo from './Logo';



function LoginPage({onLogged}) {
    let [error, setError] = useState(false)
    let [form, setForm] = useState({
        username: null,
        password: null
    })

    const login = () => {
        let {username, password} = form

        fetch(LOGIN, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    username: username,
                    password: password
                }
            )
        }).then((response) => {
            if (response.status === 200) {
                onLogged()
            }

            if (response.status == 401) {
                setError(true)
            }
        })
    }

    const isFormReady = () => {
        return form.username !== null && form.username !== '' &&
               form.password !== null && form.password !== ''
    }

    useEffect(() => {
        if (error) {
            const interval = setInterval(() => setError(false), 5000)

            return () => clearInterval(interval)
        }
    }, [error])
    
    
    return (
        <div class="d-flex justify-content-center align-items-center h-full" >
          
            <form>
            <div class="mb-3">
                <Logo></Logo>
            </div>
            <div class="mb-3">
                <div class="separator"></div>
            </div>
            <div class="mb-3">
                <label for="emailInput" class="form-label">Login</label>
                <input type="text" placeholder='Nazwa' onChange={(e) => {
                    setForm({...form, username: e.target.value})
                }} class="form-control" id="emailInput" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
                <label for="passwordInput" class="form-label">Hasło</label>
                <input type="password" placeholder='Hasło' onChange={(e) => {
                    setForm({...form, password: e.target.value})
                }} class="form-control" id="passwordInput" />
                <div className={error === true ? "form-text login login-show" : "form-text login login-hide"}>Błędny login lub hasło</div>
            </div>
            <button type="submit" disabled={!isFormReady()} onClick={(e) => {
                e.preventDefault()
                login()
            }} class="btn btn-primary">Logowanie</button>
        </form>

        </div>
    ) 
}

export default LoginPage;


