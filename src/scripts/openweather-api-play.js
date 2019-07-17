//api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=c39058c47e4145b1478e5527daa32e5a
fetch('https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=c39058c47e4145b1478e5527daa32e5a')
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        console.log(JSON.stringify(myJson.weather[0].description));
    });
