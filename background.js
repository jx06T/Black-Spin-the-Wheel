const URL = "https://script.google.com/macros/s/AKfycbwnIcFUuGg8dZUXaWvutDDEaOjux1B57Jmf08LYj-IR6K73Ck6E2TLKl8-Eo-m2wBLByw/exec"
let NoCangeState = false
const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
let idddd
chrome.storage.local.get('idddd').then((a) => {
    idddd = a.idddd
})
chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (areaName === 'local') {
        if (changes.idddd) {
            idddd = changes.idddd.newValue;
        }
        if (changes.state) {
            if (changes.state.newValue[0] == "N") {
                fetch(URL + `?idddd=${idddd}&state=${changes.state.newValue[1]}`, requestOptions)
                NoCangeState = true
                chrome.storage.local.set({ "state": changes.state.newValue[1] })
            }
        }

    }
});

setInterval(() => {
    fetch(URL + `?idddd=${idddd}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (!NoCangeState) {
                chrome.storage.local.set({ "state": result.state })
            } else {
                chrome.storage.local.get("state").then((a) => {
                    if (result.state == a.state) {
                        NoCangeState = false
                    }
                })
            }
            if (result.state == "U") {
                chrome.storage.local.set({ "Allname": result.All.name.join("\n") })
                chrome.storage.local.set({ "percent": result.All.percent.join("\n") })
                fetch(URL + `?idddd=${idddd}&type=C`, requestOptions)
            }
        })
        .catch(error => console.log('error', error));
}, 1000);

