const URL = "https://script.google.com/macros/s/AKfycby7xj42v0yHY1cpELXwpWDZfqJS74EuThg23P8FljNImBQiYhpYfpUfCxLnxV62Qru8Sw/exec"
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

    }
});

setInterval(() => {
    fetch(URL + `?idddd=${idddd}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.E == "U") {
                chrome.storage.local.set({ "state": result.state })
                chrome.storage.local.set({ "Allname": result.All.name.join("\n") })
                chrome.storage.local.set({ "percent": result.All.percent.join("\n") })
                fetch(URL + `?idddd=${idddd}&type=C`, requestOptions)
                chrome.runtime.sendMessage({
                    type: "UUU",
                });
            }
        })
        .catch(error => console.log('error', error));
}, 1000);

