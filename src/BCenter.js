

(function () {

    'use strict';

    let url = "bowers.php";

    //these are the global variables that will be used and updated

    let dayCount = 40;
    let currentChart = [];
    const timeOfDay = ['7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '1:00', '1:30',
        '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00'];
    let dayOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    let counter = [];

    //insert date veriable
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let dayInt = today.getDay();
    let dayweek = dayOfWeek[dayInt];
    let timeHours = today.getHours();
    let timeMinutes = today.getMinutes();


    let currentDay = yyyy + '/' + mm + '/' + dd;


    window.addEventListener("load", init);

    function init() {
        let dropdown = document.getElementById("select-day");
        dropdown.value = dayweek;
        changeDayChart(dayweek);

        id("select-day").addEventListener("change", changeDayChart);

        //change current count in the fitness center
        id("enter-btn").addEventListener("click", addCurrentCount);
        id("exit-btn").addEventListener("click", removeCurrentCount);

        intervalCounter();
    }

    function intervalCounter() {
        console.log(timeHours);
        if (timeHours > 7 && timeHours < 20) {
            if (timeMinutes == 0 || timeMinutes == 30) {
                counter.add(dayCount);

                // upload newest count to database
            }
        }
        if (timeHours == 23 && timeMinutes == 0) {


            let sendData = new FormData();
            sendData.append("date", currentDay);
            sendData.append("day", dayweek);
            sendData.append("count", counter);
            fetch(url, { method: "POST", body: sendData }) //requires a post request, sends to my-card or their-card and a pokemon name
                .then(checkStatus)
                .then(console.log(checkStatus))
                .catch();
        }
        if (timeHours == 23 && timeMinutes == 30) {
            counter = [];
        }
        setTimeout(intervalCounter, 30 * 60 * 1000);
    }

    function addCurrentCount() {
        dayCount = dayCount + 1;
        id("currentNumber").innerHTML = dayCount;
    }

    function removeCurrentCount() {
        if (dayCount == 0) {
            return;
        }
        else {
            dayCount = dayCount - 1;
            id("currentNumber").innerHTML = dayCount;
        }
    }

    /* changeDayChart changes the uploaded chart based on the day of the week selected in the dropdown menu

    */
    function changeDayChart() {

        let dropdown = document.getElementById("select-day");
        let selectedDay = dropdown.value;
        console.log(selectedDay);
        id("chart-header").innerHTML = "Busyness Summary from " + selectedDay + " last week:";
        uploadChart(selectedDay);

    }



    /* requires a day of the week from the dropdown menu
        returns the chart for the desired day of the week
    */

    function uploadChart(weekDay) {


        let u = url + "?selected-day=" + weekDay.toLowerCase();

        fetch(u)
            .then(checkStatus)
            .then(JSON.parse)
            .then((data) => {
                currentChart = data
                displayChart(currentChart);
            });



    }

    function displayChart(chartData) {

        const labels = timeOfDay;

        let values = {
            labels: labels,
            datasets: [{
                label: 'Busyness Chart',
                enabled: false,
                //backgroundColor: 'rgb(0, 0, 0)',
                borderColor: 'rgb(0, 0, 0)',
                data: chartData,
            }]
        }

        let config = {
            type: 'line',
            color: 'rbg(0,0,0)',
            backgroundColor: 'rgb(0,0,0)',
            data: values,
            options: {
            }
        }

        document.getElementById('chart').remove();
        let newCanvas = document.createElement('canvas');
        newCanvas.id = "chart";

        let chart = new Chart(
            newCanvas,
            config
        );

        id("chartBox").append(newCanvas);


    }


    /* ------------------------------ Helper Functions  ------------------------------ */
    // Note: You may use these in your code, but do remember that your code should not have
    // any functions defined that are unused.

    /**
     * Helper function to return the response's result text if successful, otherwise
     * returns the rejected Promise result with an error status and corresponding text
     * @param {object} response - response to check for success/error
     * @returns {object} - valid result text if response was successful, otherwise rejected
     *                     Promise result
     */
    function checkStatus(response) {
        if (response.ok) {
            return response.text();
        } else {
            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    }

    /**
     * Returns the element that has the ID attribute with the specified value.
     * @param {string} idName - element ID
     * @returns {object} DOM object associated with id.
     */
    function id(idName) {
        return document.getElementById(idName);
    }

    /**
     * Returns the first element that matches the given CSS selector.
     * @param {string} query - CSS query selector.
     * @returns {object} The first DOM object matching the query.
     */
    function qs(query) {
        return document.querySelector(query);
    }

    /**
     * Returns the array of elements that match the given CSS selector.
     * @param {string} query - CSS query selector
     * @returns {object[]} array of DOM objects matching the query.
     */
    function qsa(query) {
        return document.querySelectorAll(query);
    }




})();







