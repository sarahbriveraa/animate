//api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=c39058c47e4145b1478e5527daa32e5a
fetch('https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=c39058c47e4145b1478e5527daa32e5a')
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        console.log(JSON.stringify(myJson.weather[0].description));
    });

//Figma
fetch('https://api.figma.com/v1/files/ccc4ALHZdr9TgQ5rdvt67dFP', {
            method: 'GET',
            headers: { "x-figma-token": "15496-63aee0fb-e066-4949-a9f2-0c02b9d20bb3"}
        })
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        console.log(JSON.stringify(myJson));
    });

    //Playing with the api
    //style callout
    //ff05c7f27bbcce9a1699f062acee981b3222d919

    //file - error callout
    //ccc4ALHZdr9TgQ5rdvt67dFP

    //component
    //90d62ecdf5af11e88cabab12cf01e0ed445cbb47

    //style typography
    //1fc716f92545d1e860cd168642a2af2b17852b15

    //component generic callout
    //a8d9898771624d4ada5f13760c7ec3ea208e0130