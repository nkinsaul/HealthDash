// imports 👇🏻

import './images/turing-logo.png'
import './css/styles.css';
import User from './User'
import UserRepository from './UserRepository';
import Sleep from './Sleep';
import {fetchUserData} from './apiCalls'
import {fetchSleepData} from './apiCalls';
import {fetchHydrationData} from './apiCalls';

// query selectors 👇🏻

const userInfoBox = document.getElementById("userInfoBox");
const stepGoalBox = document.getElementById("stepGoalBox");
const userName = document.getElementById("name");
const userAddress = document.getElementById("address");
const userStrideLength = document.getElementById("strideLength");
const userDailyStepGoal = document.getElementById("dailyStepGoal");
const userEmail = document.getElementById("email");
// const userFriends = document.getElementById("friends");
const userFirstName = document.getElementById("firstName");
const userStepComparison = document.getElementById("stepCompareResults");
const dailySleepHours = document.getElementById("dailySleepHours");
const weeklySleepHours = document.getElementById("weeklySleepHours")
const dailySleepQuality = document.getElementById("dailySleepQuality")
const weeklySleepQuality = document.getElementById("weeklySleepQuality")

// global variables 👇🏻

let newRepo;
let aNewUser;
let userId = 1;
let usersAvgSteps;
let userData;
let hydrationData;
let sleepData;
let userSleepData;

// event listeners 👇🏻


// functions 👇🏻

Promise.all([fetchUserData(), fetchSleepData(), fetchHydrationData()])
.then(data => {
    // console.log(data)
    userData = data[0].userData;
    sleepData = data[1].sleepData;
    hydrationData = data[2].hydrationData;
    instantiateSleep(sleepData);
    onLoad(userData);
});

function onLoad() {
    addUser();
    displayDailySleep();
    displayWeeklySleep();
    displayWeeklySleepQuality();
    displayAvgQualAllTime();
};

const createUserArray = (userData) => {
    newRepo = new UserRepository(userData);
    usersAvgSteps = newRepo.avgStepGoal();
    userStepComparison.innerText = `${usersAvgSteps} steps`;
    return newRepo;
};

function createNewUser() {
    createUserArray(userData);
    const userObject = newRepo.getUserData(userId);
    aNewUser = new User(userObject);
    return aNewUser;
};

const addUser = () => {
    createNewUser(userData);
    userName.innerText = aNewUser.name;
    userAddress.innerText = aNewUser.address;
    userStrideLength.innerText = aNewUser.strideLength;
    userDailyStepGoal.innerText = aNewUser.dailyStepGoal;
    userEmail.innerText = aNewUser.email;
    userFirstName.innerText = `Hi ${aNewUser.getFirstName()}!`;
};

const instantiateSleep = () => {
    userSleepData = new Sleep(sleepData)
    return userSleepData
}

const displayDailySleep = () => {
    let user1 = userSleepData.getUserData(1).reverse()
    let lastNightDate = user1[0].date
    dailySleepHours.innerText = userSleepData.getHoursSleptOnDay(1, lastNightDate)
    dailySleepQuality.innerText = userSleepData.getSleepQualityOnDay(1, lastNightDate)
    // console.log(user1)
}

const displayWeeklySleep = () => {
    const user = userSleepData.getUserData(1).slice(-7)
    // const lastDate = user[6].date
    // const weeklySleep = userSleepData.getHoursSleptOverWeek(1, lastDate)
    // console.log("weekly sleep", weeklySleep)
    weeklySleepHours.innerHTML = `              
    <ul>
        <li id="day1">Day 1: ${user[6].hoursSlept} hours</li>
        <li id="day2">Day 2: ${user[5].hoursSlept} hours</li>
        <li id="day3">Day 3: ${user[4].hoursSlept} hours</li>
        <li id="day4">Day 4: ${user[3].hoursSlept} hours</li>
        <li id="day5">Day 5: ${user[2].hoursSlept} hours</li>
        <li id="day6">Day 6: ${user[1].hoursSlept} hours</li>
  </ul>`
}


const displayWeeklySleepQuality = () => {
    const user = userSleepData.getUserData(1).slice(-7)
    weeklySleepQuality.innerHTML = `              
    <ul>
        <li id="day1">Day 1: ${user[6].sleepQuality}</li>
        <li id="day2">Day 2: ${user[5].sleepQuality}</li>
        <li id="day3">Day 3: ${user[4].sleepQuality}</li>
        <li id="day4">Day 4: ${user[3].sleepQuality}</li>
        <li id="day5">Day 5: ${user[2].sleepQuality}</li>
        <li id="day6">Day 6: ${user[1].sleepQuality}</li>
  </ul>`
}

const displayAvgQualAllTime = () => {
    const user = userSleepData.getSleepQualityAllUsers()
    stepGoalBox.innerHTML += `
    <h4 id="compareSleepQual">Average all-time sleep quality: ${user}</h4>
    `
}