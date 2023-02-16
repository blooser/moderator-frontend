import React, { Component, useState } from 'react';

import { LOGIN } from './const';
import LoginPage from './LoginPage';
import MainPage from './MainPage';




function Page() {
    let [logged, setLogged] = useState(false)


    return (
        !logged ? <LoginPage onLogged={() => setLogged(true)} ></LoginPage>
                : <MainPage></MainPage>
    )
}

export default Page;