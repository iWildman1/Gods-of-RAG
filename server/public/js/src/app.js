import { setInterval } from 'timers';
const Counter = require('./Counter');
const axios = require('axios');
const swal = require('sweetalert2');


const counter = new Counter(new Date('2018-04-27T17:00:00'));
let votingActive = false;

let activeTeamName = "";
let activeTeamId = "";

const daysEl = document.querySelector('.counter-days');
const hoursEl = document.querySelector('.counter-hours');
const minutesEl = document.querySelector('.counter-minutes');
const secondsEl = document.querySelector('.counter-seconds');

const teamImages = document.querySelectorAll('.team img');
const body = document.querySelector('body');
const modal = document.querySelector('.modal');


setInterval(() => {
    calculateTime();
}, 1000)

const calculateTime = () => {
    const t = counter.getTimeRemaining();

    if ( t.seconds >= 0 ) {
        daysEl.innerHTML = ' ' + t.days + ' ';
        hoursEl.innerHTML = ' ' + t.hours + ' ';
        minutesEl.innerHTML = ' ' + t.minutes + ' ';
        secondsEl.innerHTML = ' ' + t.seconds + ' ';
    }
}

calculateTime();

if (counter.getTimeRemaining().seconds < 0) {
    votingActive = true;
}

for (let i = 0; i < teamImages.length; i++) {
    teamImages[i].addEventListener('click', function() {
        activeTeamName = this.dataset.teamName;
        activeTeamId = this.dataset.teamId;


        swal.showLoading();
        axios.get('/user/current')
        .then((user) => {
            console.log(user)
            if (user.data == "") {
                swal({
                    title: 'Vote Registration',
                    type: 'info',
                    text: 'You need to be logged in with Facebook for us to register your vote. Please log in and try again',
                    confirmButtonText: 'Login'
                })
                .then((result) => {
                    if (result.value) {
                        window.location = "/auth/facebook"
                    }
                })
            } else {
                swal.queue([{
                    title: 'Vote Registration',
                    type: 'info',
                    text: "Are you sure you'd like to submit a vote for team " + activeTeamName + "?",
                    showCancelButton: true,
                    confirmButtonText: 'Submit Vote',
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        return axios.post('/api/vote/' + activeTeamId)
                        .then(() => {
                            swal.insertQueueStep({
                                type: 'success',
                                title: 'Thank you!',
                                text: 'Your vote for team ' + activeTeamName + ' has been counted. You can vote again in 15 minutes.'
                            })
                        })
                        .catch((err) => {
                            if ( err.response.data.errCode == 0 ) {
                                swal.insertQueueStep({
                                    type: 'error',
                                    title: 'Oh no!',
                                    text: "We weren't able to process your vote - Remember, you need to leave at least 15 minutes between votes",
                                })
                            } else {
                                swal.insertQueueStep({
                                    type: 'error',
                                    title: "It's not you, it's us...",
                                    text: "We've not been able to count your vote. Please try again, and contact a team member if the error persists",
                                })
                            }
                        })
                    }
                }])
            }
        })
        .catch((err) => {
            console.log(err)
        })
    })
}

function addTeam(teamName) {
    axios.post('/api/team/upload/' + teamName)
    .then(() => {
        console.log("Team " + teamName + " saved to database");
    })
    .catch((err) => {
        console.log(err.response);
    })
}

