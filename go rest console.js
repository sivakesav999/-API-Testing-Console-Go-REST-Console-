let consoleFormEl = document.getElementById("consoleForm");
let requestUrlEl = document.getElementById("requestUrl");
let requestUrlErrMsgEl = document.getElementById("requestUrlErrMsg");
let requestMethodEl = document.getElementById("requestMethod");

let requestBodyEl = document.getElementById("requestMethod");

let responseStatusEl = document.getElementById("responseStatus");
let responseBodyEl = document.getElementById("responseBody");

let formData = {
    requestUrl: "https://gorest.co.in/public-api/users",
    requestMethod: "POST",
    requestBody: ""
};
requestUrlEl.addEventListener("change", function(event) {
    formData.requestUrl = event.target.value;
});
requestMethodEl.addEventListener("change", function(event) {
    formData.requestMethod = event.target.value;
});
requestBodyEl.addEventListener("change", function(event) {
    formData.requestBody = event.target.value;
});

function validateRequestUrl(formData) {
    let {
        requestUrl
    } = formData;
    if (requestUrl === "") {
        requestUrlErrMsgEl.textContent = "Required*";
    } else {
        requestUrlErrMsgEl.textContent = "";
    }
}

function sendRequest(formData) {
    let {
        requestUrl,
        requestMethod,
        requestBody
    } = formData;
    let options = {
        method: requestMethod,
        headers: {
            Accept: "application/json",
            Authorization: "Bearer 9b9922e863f9c51f614b0588bac843a7baed45d9d564646756f58d39efe60d26"
            /* The above api key is my personal key . please create your own 
            account and get the api key individually and replace above in my key*/
        },
        body: requestBody
    };
    fetch(requestUrl, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let responseStatus = jsonData.code;
            let responseBody = JSON.stringify(jsonData);
            responseStatusEl.value = responseStatus;
            responseBodyEl.value = responseBody;
        });
}
consoleFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    validateRequestUrl(formData);
    sendRequest(formData);
})