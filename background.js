const URL = "https://script.google.com/macros/s/AKfycby1bwPIQuuCewO8xA37SXUWRuQZULXebyW5AwHKfX2IPGY4mpmjBMYoZP2Ohh0EPMLh/exec"
const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
setInterval(() => {

    fetch(URL, requestOptions)
        .then(response => response.json())
        .then(result => {
            // console.log(result.data)
            chrome.storage.local.set({ "state": result.data })
            if (result.data == "U") {
                chrome.storage.local.set({ "Allname": result.All.name.join("\n") })
                chrome.storage.local.set({ "percent": result.All.percent.join("\n") })
                fetch(URL + "?type=C", requestOptions)
            }
        })
        .catch(error => console.log('error', error));
}, 1000);