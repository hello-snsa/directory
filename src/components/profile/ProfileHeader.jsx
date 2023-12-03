import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import ClockContainer from './ClockContainer';
import { TIME_URL } from '../../utils/constants';

export default function ProfileHeader() {

    const [countryList, setCountryList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState();
    const [timerRunning, setTimerRunning] = useState(true);
    const [newTime, setNewTime] = useState("00:00:00");

    useEffect(()=>{
        const currentTime = new Date();
        setNewTime((currentTime.toISOString()).split("T")[1].split(".")[0]);

    },[])
    const handleTimer = () => {
        setTimerRunning(!timerRunning);
        console.log("timer started", newTime);
    }
    const fetchCountryList = async () => {
        const countries = await fetch(TIME_URL);
        const countriesJson = await countries.json();
        console.log("countriesJson: ", countriesJson);
        setCountryList(countriesJson);
    }

    const fetchCountryTime = async () => {
        const time = await fetch(TIME_URL + selectedCountry);
        const timeJson = await time.json();
        console.log("timeJson: ", timeJson);
        const timeString = (timeJson.datetime).split("T")[1].split(".")[0];
        setNewTime(timeString);
    }

    useEffect(() => {
        fetchCountryList();
    }, []);

    useEffect(() => {
        let startTimer;
        if (timerRunning) {
            startTimer = setInterval(() => {
                setNewTime(newTime => {
                    const timeArray = newTime.split(":");
                    let seconds = parseInt(timeArray[2]);
                    let minutes = parseInt(timeArray[1]);
                    let hours = parseInt(timeArray[0]);
                    seconds++;
                    if (seconds === 60) {
                        seconds = 0;
                        minutes++;
                        if (minutes === 60) {
                            minutes = 0;
                            hours++;
                            if (hours === 24) {
                                hours = 0;
                            }
                        }
                    }
                    return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
                }
                );
            }, 1000);
        }
        return () => clearInterval(startTimer);
    }, [newTime, timerRunning]);

    useEffect(() => {
        if (selectedCountry) {
            fetchCountryTime();
        }
    }, [selectedCountry]);

    return (
        <div className='profile-header flex jc-sb ai-c'>
            <div className="btn btn-secondary">
                <Link  to="/" role="button">Back</Link>
            </div>
            <div className='profile-header-right flex jc-sb ai-c  '>
                <select className='country-select' name="country" id="country" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} >
                    {
                        countryList?.map((country) => {
                            return <option value={country} key={uuid()}>{country}</option>
                        })
                    }
                </select>
                <ClockContainer newTime={newTime} />
                <button className='btn primary' onClick={handleTimer}>{!timerRunning?"Start":"Pause"}</button>
            </div>
        </div>
    )
}
