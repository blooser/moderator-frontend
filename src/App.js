import logo from './logo.svg';
import './App.css';
import React, { Component,  Suspense, lazy } from 'react';
import Page from "./Page"
import Voting from './Voting';
import Feedback from './Feedback';
import NotFound from './NotFound';
import VotingHumor from './VotingHumor';
import VotingInfo from './VotingInfo';
import FeedbackInfo from './FeedbackInfo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Page />} />

            <Route path="/M/:number" element={<Feedback />} />
            <Route path="/M/:number/info" element={<FeedbackInfo />} />

            <Route path="/NM" element={<Voting attr={"speakers"} item={"speaker"} header={"Głosowanie na najlepszego mówce"} />} />
            <Route path="/NM/info" element={<VotingInfo banner={"najlepszego mówce"} subpath={"NM"}></VotingInfo>}></Route>

            <Route path="/NE" element={<Voting attr={"evaluators"} item={"evaluator"} header={"Głosowanie na najlepszego ewaluatora"} />} />
            <Route path="/NE/info" element={<VotingInfo banner={"najlepszego ewaluatora"} subpath={"NE"}></VotingInfo>}></Route>

            <Route path="/NG" element={<Voting attr={"hot"} item={"hot"} header={"Głosowanie na najlepszego mówce improwizowanego"} />} />
            <Route path="/NG/info" element={<VotingInfo banner={"najlepszego mówce gorących pytań"} subpath={"NG"}></VotingInfo>}></Route>

            <Route path="/NH" element={<VotingHumor />} />
            <Route path="/NH/info" element={<VotingInfo banner={"najlepszy humor"} subpath={"NH"}></VotingInfo>}></Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      
        <script src="https://kit.fontawesome.com/64ad290612.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
      </header>
    </div>

  );
}

export default App;
