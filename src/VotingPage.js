import { keyboardImplementationWrapper } from '@testing-library/user-event/dist/keyboard';
import React, { useEffect, useState } from 'react';
import Sections from './Sections';
import SectionsSelect from './SectionsSelect';

import { VOTING } from './const';
import Waiting from './Waiting';


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { PolarArea } from 'react-chartjs-2';



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement,
  );



const sections = [
    {
        text: "Mówcy",
        attr: "speakers"
    },
    {
        text: "Ewaluatorzy",
        attr: "evaluators"
    },
    {
        text: "Gorące Pytania",
        attr: "hot"
    },
    {
        text: "Najlepszy humor",
        attr: "humor"
    },
]

function Winner({items}) {
    let winners = []

    if (items === null) {
        return (
            <></>
        )
    }

    const max = Math.max(...Object.values(items))

    for (let item in items) {
        if (items[item] === max) {
            winners.push(item)
        }
    }

    return (
        <div class="row justify-content-center">
            <p class="mb-4">Zwyciężył(a)</p>
            {winners.map((winner) => 
                <div class="col-4 mt-4 w-auto">
                    <h2>
                        <b>
                            <span class="voting-winner">{winner}</span>
                        </b>
                    </h2>
                </div>
            )}
        </div>
    )
}


function VotingPolarArea({labels, data}) {
    const chartData = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                borderColor: [
                    '#6495ce'
                ],
                borderWidth: 3,
                barThickness: 100,
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'rgb(255, 255, 255)'
                },
              position: 'top',
            },
            title: {
              display: true,
              text: 'Wyniki',
            },
          },
    }

    return (
        <div class="p-2 visual-voting-background">
                <PolarArea
            options={options}
            data={chartData}
        />
        </div>
    )
}


function VotingBar({labels, data}) {
    const chartData = {
        labels: labels,
        datasets: [{
            label: "Ilość głosów",
            data: data,
            backgroundColor: [
                '#3e7bc1'
            ],
            borderColor: [
                '#6596cd'
            ],
            borderWidth: 3,
            barThickness: 100,
        }]
    }

    const options = {
        responsive: true,
          plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'rgb(255, 255, 255)'
                }
            },
            title: {
                text: "Wyniki",
                display: true,
            },
            tooltips: {
                enabled: false
            },

          }
    };

    return (
        
        <Bar data={chartData} options={options} ></Bar>
    )
}


function isEqual(obj1, obj2) {
    if (obj1 === null || obj2 === null) {
        return false
    }

    for (let k in obj1) {
        for (let kk in obj1[k]) {
            if (obj1[k][kk] !== obj2[k][kk]) {
                return false
            }
        }
    }

    return true
}


function VotingPage() {
    let [data, setData] = useState(null)
    let [currentSection, setCurrentSection] = useState("speakers")

    const getData = () => {
        fetch(VOTING, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            return response.json()
        }).then((jData) => {
            if (!isEqual(jData, data)) {
                setData(jData)
            }
        }).then((error) => {
            console.error(error)
        })
    }

    useEffect(() => {
        const interval = setInterval(getData, 1000)

        return () => clearInterval(interval)
    }, [data])

    return (
            <div class="container">
                <div class="row">
                    <h1>Wyniki głosowania</h1>
                </div>
            
            <div class="spacer-small"></div>

            <div class="row justify-content-center">
            {window.innerWidth <= 550 ?

            <SectionsSelect sections={sections} onSectionSelect={(newSection) => {
                setCurrentSection(newSection.attr)
            }}>

            </SectionsSelect>

            :

            <Sections sections={sections} defaultSection={sections[0]} onSectionChange={(section) => {
                setCurrentSection(section.attr)
            }}>

            </Sections>

            }
                
            </div>

            <div class="spacer-small"></div>
            
            {data !== null  && data !== undefined && Object.keys(data[currentSection]).length !== 0 ? 
                <div class="row p-2 justify-content-center align-items-center">
                    <Winner items={data[currentSection]}></Winner>
                    <div class="spacer-small"></div>
                            {currentSection !== "humor" ? <VotingBar labels={Object.keys(data[currentSection])} data={Object.values(data[currentSection])}></VotingBar>
                                                        : <VotingPolarArea labels={Object.keys(data[currentSection])} data={Object.values(data[currentSection])}></VotingPolarArea>
                            }
                    <div class="spacer-small"></div>
                </div>

                : <div class="row justify-content-center">
                    <Waiting banner={"Czekanie na wyniki"}></Waiting>
                  </div>
            }
          
        </div>
        )
}

export default VotingPage;