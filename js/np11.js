/// <reference path="../lib/index.ts" />

window.onload = () => {
    var stage = document.getElementById('stage');

    var request = new XMLHttpRequest();
    request.onload = () => {
        var np11 = new Vidya.Game(stage, request.response);
    }
    request.responseType = 'json';
    request.open('get', 'np11.json');
    request.send();
}
