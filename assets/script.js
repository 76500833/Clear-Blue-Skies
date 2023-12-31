// FYI for the grader. You have to refresh the page to use the most recently created history button.
$(document).ready(function () {
    //This name section is where the searched city will display at the top.
    let nameSection = $('<section>')
    let dropdown = $('.dropdown-content')

    nameSection.attr("id", "nameSection")
    nameSection.css({
        "color": "black"
    })
  

    const key = "78c13c7d14026703c4632a7298ef5634"
    let main = $('main')
    //If we can, set search array to the parsed value of local storage key: 'searchArray'. Otherwise, create it.
    searchArray = JSON.parse(localStorage.getItem('searchArray')) || [];
    function renderHistory (searchArray) {
        for (let i = 0; i < searchArray.length; i++){
            // Create a history button for each entry
            let historyButton = $(`<button>${searchArray[i]}</button>`);
            // Add a click event listener to the history button
            historyButton.on("click", function () {
                // Extract city and state from the button's text
                let buttonText = $(this).text();
                let [city, state] = buttonText.split(', ');

                // Call the getData function with the extracted city and state
                $("#cardContainer").empty();
                getData(city, state);
            });
            dropdown.append(historyButton);
        }
    }
        
    renderHistory(searchArray)

    // create cards container
    let cardsContainer = $('<div>').attr("id", "cardContainer").css({
        "color": "white",
        "display": "flex",
        "flex-wrap": "wrap",
        "flex-flow": "row",
        "justify-content": "space-around",
        "margin-top": "20px",
        "gap": "10px",
        "flex-direction": "row",
        // "width": "25%",
        // "margin-left": "40%",
        // "margin-right": '50%',
    })
    // convert kelvin to fahrenheit function. I realized after implementing it that this is an api feature.
    function kelvinToFahrenheit(kelvin) {
        return (kelvin - 273.15) * 9 / 5 + 32;
    }

    // This line drops down to reveal a function that was going to get todays weather info but it says that i need a subscription I will put the screenshot in assets.
    // function getToday (city, state) {
    //     let requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state}"&limit=1&appid=${key}`;
    //     fetch(requestUrl)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (data) {
    //         console.log(data)
    //         console.log("this is the data")
    //         let long = data[0].lon
    //         let lat = data[0].lat
    //         let todayUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=minutely&appid=${key}`
    //             fetch(todayUrl)
    //                 .then(function (response) {
    //                     return response.json()
    //                 })
    //                 .then(function (data) {
    //                     console.log(data)
    //                 }) 
    // })}
    
    function getData(city, state) {
        // this is the five day forecast function. It makes and appends the cards to their containers. Get coords of city and state:
        let requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state}"&limit=1&appid=${key}`;
        fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

                // name creation. append name to a newly created section. append section to main.
                $(cardsContainer)
                main.append(cardsContainer)
                main.append(nameSection)
                // creates cards, & simple styling of cards.
                let dayOne = $('<div>').attr("id", "dayOne")
                dayOne.css({
                    "background": "rgba(255, 255, 255, 0.2)", // Make sure this color has an opacity of less than 1
                    "backdrop-filter": "blur(8px)", // This be the blur
                    "border": "1px solid orange",
                    "padding": "10px",
                    "border-radius": "20px",
                })
                let dayTwo = $('<div>').attr("id", "dayTwo").attr("class", "card")
                dayTwo.css({
                    "background": "rgba(255, 255, 255, 0.2)", // Make sure this color has an opacity of less than 1
                    "backdrop-filter": "blur(8px)", // This be the blur
                    "padding": "10px",
                    "border": "1px solid orange",
                    "border-radius": "20px",
                })
                let dayThree = $('<div>').attr("id", "dayThree").attr("class", "card")

                dayThree.css({
                    "background": "rgba(255, 255, 255, 0.2)", // Make sure this color has an opacity of less than 1
                    "backdrop-filter": "blur(8px)", // This be the blur
                    "padding": "10px",
                    "border-radius": "20px",
                    "border": "1px solid orange",

                })
                let dayFour = $('<div>').attr("id", "dayFour").attr("class", "card")
                dayFour.css({
                    "background": "rgba(255, 255, 255, 0.2)", // Make sure this color has an opacity of less than 1
                    "backdrop-filter": "blur(8px)", // This be the blur
                    "padding": "10px",
                    "border-radius": "20px",
                    "border": "1px solid orange",
                })
                let dayFive = $('<div>').attr("id", "dayFive").attr("class", "card")
                dayFive.css({
                    "background": "rgba(255, 255, 255, 0.2)", // Make sure this color has an opacity of less than 1
                    "backdrop-filter": "blur(8px)", // This be the blur
                    "padding": "10px",
                   
                    "border-radius": "20px",
                    "border": "1px solid orange",
                })
                // appends cards to the container
                cardsContainer.append(dayOne)
                cardsContainer.append(dayTwo)
                cardsContainer.append(dayThree)
                cardsContainer.append(dayFour)
                cardsContainer.append(dayFive)
                // appends container to main
                main.append(cardsContainer)
                // grab latitude and longitude for fetching city weather in weather url, a few lines down
                let long = data[0].lon
                let lat = data[0].lat
                let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}`
                fetch(weatherUrl)
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (data) {
                        // 1. put JSON contents into variables. // store date in a variable let dateStr = data.list[0].dt_txt; make it a new date object let date = new Date(dateStr); after we get the coordinates we can plug them into the api:      
//! Day one - 1
                        let unix1 = parseInt(data.list[0].dt)
                        let unix1Formatted = new Date(unix1 * 1000)
                        let unix1Date = unix1Formatted.toDateString()
                        let unix1Time = unix1Formatted.toLocaleTimeString()
                        console.log(unix1Date)
                        console.log(unix1Time)
                        // use toLocalDateString() to format the date and remove the timestamp.let formattedDate = date.toLocaleDateString() convert kelvin to fehreinheit
                        let tempKelvin = data.list[0].main.temp;
                        let tempFahrenheit = kelvinToFahrenheit(tempKelvin);
                        let icon = data.list[0].weather[0].icon
                        let succinct = data.list[0].weather[0].main
                        console.log(succinct)
                        let descr = data.list[0].weather[0].description
                        let imgForIcon = $("<img>")
                        imgForIcon.css({
                            "width": "50px",  // Set your desired width
                            "height": "50px",  // Set your desired height
                            "display": "inline"
                        });
                        imgForIcon.attr("src", "http://openweathermap.org/img/w/" + icon + ".png")
                        let wind = data.list[0].wind.speed;
                        let humidity = data.list[0].main.humidity;
    //!day one - 2
                        let unix1_2 = parseInt(data.list[1].dt)
                        let unix1_2Formatted = new Date(unix1_2 * 1000)
                        // let unix1_2Date = unix1_2Formatted.toDateString()
                        let unix1_2Time = unix1_2Formatted.toLocaleTimeString()
                        console.log(unix1Date)
                        console.log(unix1Time)
                        // use toLocalDateString() to format the date and remove the timestamp.let formattedDate = date.toLocaleDateString() convert kelvin to fehreinheit
                        let tempKelvin1_2 = data.list[1].main.temp;
                        let tempFahrenheit1_2 = kelvinToFahrenheit(tempKelvin1_2);
                        let icon1_2 = data.list[1].weather[0].icon
                        let succinct1_2 = data.list[1].weather[0].main
                        console.log(succinct)
                        let descr1_2 = data.list[1].weather[0].description
                        let imgForIcon1_2 = $("<img>")
                        imgForIcon.css({
                            "width": "50px",  // Set your desired width
                            "height": "50px",  // Set your desired height
                            "display": "inline"
                        });
                        imgForIcon1_2.attr("src", "http://openweathermap.org/img/w/" + icon1_2 + ".png")
                        let wind1_2 = data.list[1].wind.speed;
                        let humidity1_2 = data.list[1].main.humidity;
                                            dayOne.append(`
                                        <div class="cardDate">
                                        <p>${unix1Date}</p>
                                        </div>
                                        <div1 id="container">
                                            <div class="div1">
                                                <p class="time">${unix1Time}</p>
                                                <p>${tempFahrenheit.toFixed(2)} F</p>
                                                <div class="column">
                                                    <img src="http://openweathermap.org/img/w/${icon}.png" alt="${descr}" style="width: 50px; height: 50px; display: inline;">
                                                    <p>${descr}</p>
                                                    <p>${wind} mph wind</p>
                                                    <p>${humidity} % humidity</p>
                                                </div>
                                            </div>

                                        <div1 id="container">
                                            <div class="div1_2">
                                                <p class="time">${unix1_2Time}</p>
                                                <p>${tempFahrenheit1_2.toFixed(2)} F</p>
                                                <div class="column">
                                                    <img src="http://openweathermap.org/img/w/${icon1_2}.png" alt="${descr1_2}" style="width: 50px; height: 50px; display: inline;">
                                                    <p>${descr1_2}</p>
                                                    <p>${wind1_2} mph wind</p>
                                                    <p>${humidity1_2} % humidity</p>
                                                </div>
                                            </div>
                                            `);

//! DAY TWO
                        let unix2 = parseInt(data.list[8].dt)
                        let unix2Formatted = new Date(unix2 * 1000)
                        let unix2Date = unix2Formatted.toDateString()
                        let unix2Time = unix1Formatted.toLocaleTimeString()
                        let tempKelvin2 = data.list[8].main.temp;
                        let tempFahrenheit2 = kelvinToFahrenheit(tempKelvin2);
                        let icon2 = data.list[8].weather[0].icon
                        let descr2 = data.list[8].weather[0].description
                        let imgForIcon2 = $("<img>")
                        imgForIcon.css({
                            "width": "50px",  // Set your desired width
                            "height": "50px",  // Set your desired height
                            "display": "inline"
                        });
                        imgForIcon2.attr("src", "http://openweathermap.org/img/w/" + icon2 + ".png")
                        let wind2 = data.list[8].wind.speed;
                        let humidity2 = data.list[8].main.humidity;

                        let unix2_2 = parseInt(data.list[9].dt)
                        let unix2_2Formatted = new Date(unix2_2 * 1000)
                        let unix2_2Date = unix2_2Formatted.toDateString()
                        let unix2_2Time = unix1_2Formatted.toLocaleTimeString()
                        let tempKelvin2_2 = data.list[9].main.temp;
                        let tempFahrenheit2_2 = kelvinToFahrenheit(tempKelvin2_2);
                        let icon2_2 = data.list[9].weather[0].icon
                        let descr2_2 = data.list[9].weather[0].description
                        let imgForIcon2_2 = $("<img>")
                        imgForIcon2_2.css({
                            "width": "50px",  // Set your desired width
                            "height": "50px",  // Set your desired height
                            "display": "inline"
                        });
                        imgForIcon2_2.attr("src", "http://openweathermap.org/img/w/" + icon2_2 + ".png")
                        let wind2_2 = data.list[9].wind.speed;
                        let humidity2_2 = data.list[9].main.humidity;
                        dayTwo.append(`
                        <div class="cardDate">
                    <p>${unix2Date}</p>
                    </div>
                    <div1 id="container">
                        <div class="div2">
                            <p>${unix2Time}</p>
                            <p>${tempFahrenheit2.toFixed(2)} F</p>
                            <div class="column">
                                <img src="http://openweathermap.org/img/w/${icon2}.png" alt="${descr2}" style="width: 50px; height: 50px; display: inline;">
                                <p>${descr2}</p>
                                <p>${wind2} mph wind</p>
                                <p>${humidity2} % humidity</p>
                            </div>
                        </div>
  

                    <div id="container2_2">
                        <div class="div2_2">
                            <p>${unix2_2Time}</p>
                            <p>${tempFahrenheit2_2.toFixed(2)} F</p>
                            <div class="column">
                                <img src="http://openweathermap.org/img/w/${icon2_2}.png" alt="${descr2_2}" style="width: 50px; height: 50px; display: inline;">
                                <p>${descr2_2}</p>
                                <p>${wind2_2} mph wind</p>
                                <p>${humidity2_2} % humidity</p>
                            </div>
                        </div>
                        
                        
                        `);
                        //! DAY THR
                        let unix3 = parseInt(data.list[16].dt)
                        let unix3Formatted = new Date(unix3 * 1000)
                        let unix3Date = unix3Formatted.toDateString()
                        let unix3Time = unix3Formatted.toLocaleTimeString()
                        let tempKelvin3 = data.list[16].main.temp;
                        let tempFahrenheit3 = kelvinToFahrenheit(tempKelvin3);
                        let wind3 = data.list[16].wind.speed;
                        let humidity3 = data.list[16].main.humidity;
                        let icon3 = data.list[16].weather[0].icon
                        let descr3 = data.list[16].weather[0].description
                        let imgForIcon3 = $("<img>")
                        imgForIcon3.css({
                            "width": "50px",  // Set your desired width
                            "height": "50px",  // Set your desired height
                            "display": "inline"
                        });
                        imgForIcon3.attr("src", "http://openweathermap.org/img/w/" + icon3 + ".png")

                        //!Day 3_2

                        let unix3_2 = parseInt(data.list[17].dt)
                        let unix3_2Formatted = new Date(unix3_2 * 1000)
                        let unix3_2Date = unix3_2Formatted.toDateString()
                        let unix3_2Time = unix3_2Formatted.toLocaleTimeString()
                        let tempKelvin3_2 = data.list[17].main.temp;
                        let tempFahrenheit3_2 = kelvinToFahrenheit(tempKelvin3_2);
                        let wind3_2 = data.list[17].wind.speed;
                        let humidity3_2 = data.list[17].main.humidity;
                        let icon3_2 = data.list[17].weather[0].icon
                        let descr3_2 = data.list[17].weather[0].description
                        let imgForIcon3_2 = $("<img>")
                        imgForIcon3_2.css({
                            "width": "50px",  // Set your desired width
                            "height": "50px",  // Set your desired height
                            "display": "inline"
                        });
                        imgForIcon3_2.attr("src", "http://openweathermap.org/img/w/" + icon3 + ".png")

                        dayThree.append(`
                        <div class="cardDate">
                    <p>${unix3Date}</p>
                    </div>
                    <div1 id="container">
                        <div class="div3">
                            <p>${unix3Time}</p>
                            <p>${tempFahrenheit3.toFixed(2)} F</p>
                            <div class="column">
                                <img src="http://openweathermap.org/img/w/${icon3}.png" alt="${descr3}" style="width: 50px; height: 50px; display: inline;">
                                <p>${descr3}</p>
                                <p>${wind3} mph wind</p>
                                <p>${humidity3} % humidity</p>
                            </div>
                        </div>
                        <div1 id="container">
                        <div class="div3_2">
                            <p>${unix3_2Time}</p>
                            <p>${tempFahrenheit3_2.toFixed(2)} F</p>
                            <div class="column">
                                <img src="http://openweathermap.org/img/w/${icon3_2}.png" alt="${descr3_2}" style="width: 50px; height: 50px; display: inline;">
                                <p>${descr3_2}</p>
                                <p>${wind3_2} mph wind</p>
                                <p>${humidity3_2} % humidity</p>
                            </div>
                        </div>
                        `);
                        //! DAY FOUR
                        let unix4 = parseInt(data.list[24].dt)
                        let unix4Formatted = new Date(unix4 * 1000)
                        let unix4Date = unix4Formatted.toDateString()
                        let unix4Time = unix4Formatted.toLocaleTimeString()
                        let tempKelvin4 = data.list[24].main.temp;
                        let tempFahrenheit4 = kelvinToFahrenheit(tempKelvin4);
                        let wind4 = data.list[24].wind.speed;
                        let humidity4 = data.list[24].main.humidity;
                        let icon4 = data.list[24].weather[0].icon
                        let descr4 = data.list[24].weather[0].description
                        let imgForIcon4 = $("<img>")
                        imgForIcon4.css({
                            "width": "50px",  // Set your desired width
                            "height": "50px",  // Set your desired height
                            "display": "inline"
                        });
                        imgForIcon4.attr("src", "http://openweathermap.org/img/w/" + icon4 + ".png")
            //! 4 - 2
                        
                    let unix4_2 = parseInt(data.list[25].dt)
                    let unix4_2Formatted = new Date(unix4_2 * 1000)
                    let unix4_2Date = unix4_2Formatted.toDateString()
                    let unix4_2Time = unix4_2Formatted.toLocaleTimeString()
                    let tempKelvin4_2 = data.list[25].main.temp;
                    let tempFahrenheit4_2 = kelvinToFahrenheit(tempKelvin4_2);
                    let wind4_2 = data.list[25].wind.speed;
                    let humidity4_2 = data.list[25].main.humidity;
                    let icon4_2 = data.list[25].weather[0].icon
                    let descr4_2 = data.list[25].weather[0].description
                    let imgForIcon4_2 = $("<img>")
                    imgForIcon4_2.css({
                        "width": "50px",  // Set your desired width
                        "height": "50px",  // Set your desired height
                        "display": "inline"
                    });
                    imgForIcon4_2.attr("src", "http://openweathermap.org/img/w/" + icon4 + ".png")

                        dayFour.append(`
                        <div class="cardDate">
                    <p>${unix4Date}</p>
                    </div>
                    <div1 id="container">
                        <div class="div4">
                            <p>${unix4Time}</p>
                            <p>${tempFahrenheit4.toFixed(2)} F</p>
                            <div class="column">
                                <img src="http://openweathermap.org/img/w/${icon4}.png" alt="${descr4}" style="width: 50px; height: 50px; display: inline;">
                                <p>${descr4}</p>
                                <p>${wind4} mph wind</p>
                                <p>${humidity4} % humidity</p>
                            </div>
                        </div>
                        
                        <div id="container">
                        <div class="div4_2">
                            <p>${unix4_2Time}</p>
                            <p>${tempFahrenheit4_2.toFixed(2)} F</p>
                            <div class="column">
                                <img src="http://openweathermap.org/img/w/${icon4_2}.png" alt="${descr4_2}" style="width: 50px; height: 50px; display: inline;">
                                <p>${descr4_2}</p>
                                <p>${wind4_2} mph wind</p>
                                <p>${humidity4_2} % humidity</p>
                            </div>
                        </div>
                        
                        `);
                        //! DAY FIVE
                        let unix5 = parseInt(data.list[32].dt)
                        let unix5Formatted = new Date(unix5 * 1000)
                        let unix5Date = unix5Formatted.toDateString()
                        let unix5Time = unix5Formatted.toLocaleTimeString()
                        let tempKelvin5 = data.list[32].main.temp;
                        let tempFahrenheit5 = kelvinToFahrenheit(tempKelvin5);
                        let wind5 = data.list[32].wind.speed;
                        let humidity5 = data.list[32].main.humidity;
                        let icon5 = data.list[32].weather[0].icon
                        let descr5 = data.list[32].weather[0].description
                        let imgForIcon5 = $("<img>")
                        imgForIcon5.css({
                            "width": "50px",  // Set your desired width
                            "height": "50px",  // Set your desired height
                            "display": "inline"
                        });
                        imgForIcon5.attr("src", "http://openweathermap.org/img/w/" + icon + ".png")

//! 5_2                
                         let unix5_2 = parseInt(data.list[33].dt)
                        let unix5_2Formatted = new Date(unix5_2 * 1000)
                        let unix5_2Date = unix5_2Formatted.toDateString()
                        let unix5_2Time = unix5_2Formatted.toLocaleTimeString()
                        let tempKelvin5_2 = data.list[33].main.temp;
                        let tempFahrenheit5_2 = kelvinToFahrenheit(tempKelvin5_2);
                        let wind5_2 = data.list[33].wind.speed;
                        let humidity5_2 = data.list[33].main.humidity;
                        let icon5_2 = data.list[33].weather[0].icon
                        let descr5_2 = data.list[33].weather[0].description
                        let imgForIcon5_2 = $("<img>")
                        imgForIcon5.css({
                            "width": "50px",  // Set your desired width
                            "height": "50px",  // Set your desired height
                            "display": "inline"
                        });
                        imgForIcon5.attr("src", "http://openweathermap.org/img/w/" + icon + ".png")


                        dayFive.append(`
                        <div class="cardDate">
                    <p>${unix5Date}</p>
                    </div>
                    <div1 id="container">
                        <div class="div5">
                            <p>${unix5Time}</p>
                            <p>${tempFahrenheit5.toFixed(2)} F</p>
                            <div class="column">
                                <img src="http://openweathermap.org/img/w/${icon5}.png" alt="${descr5}" style="width: 50px; height: 50px; display: inline;">
                                <p>${descr5}</p>
                                <p>${wind5} mph wind</p>
                                <p>${humidity5} % humidity</p>
                            </div>
                        </div>
                        </div>
                    <div id="container">
                        <div class="div5_2">
                            <p>${unix5_2Time}</p>
                            <p>${tempFahrenheit5_2.toFixed(2)} F</p>
                            <div class="column">
                                <img src="http://openweathermap.org/img/w/${icon5_2}.png" alt="${descr5_2}" style="width: 50px; height: 50px; display: inline;">
                                <p>${descr5_2}</p>
                                <p>${wind5_2} mph wind</p>
                                <p>${humidity5_2} % humidity</p>
                            </div>
                        </div>
                        
                        `);
                        console.log(data)

                    })
            })
    }



    console.log(searchArray)
    $("#searchButton").on("click", function () {
        $("#cardContainer").empty()
        $("#nameSection").remove()
        
        // grab city and state so we can use it in getData() by getting the latitude and longitude
        // of each city, which can be used to get the weather from the seperate api.
        let city = $("#searchCity").val()
        let state = $("#searchState").val()
        if (!city || !state) {
            alert("Please enter both city and state.");
            return; // Stop execution if either city or state is missing
        }
        
         // Check if the entry already exists in searchArray
        const searchEntry = `${city}, ${state}`;
        if (!searchArray.includes(searchEntry)) {
            searchArray.push(searchEntry);
            localStorage.setItem('searchArray', JSON.stringify(searchArray));

            // Append the new history button
            let historyButton = $(`<button>${searchEntry}</button>`);
            historyButton.on("click", function () {
                let buttonText = $(this).text();
                let [clickedCity, clickedState] = buttonText.split(', ');

                $("#cardContainer").empty();
                getData(clickedCity, clickedState);
            });

            nameSection.append(historyButton);
    }
        // getToday(city, state)
        getData(city, state)

    })
})
// 6 9 12 3 6

