const URL = "https://script.google.com/macros/s/AKfycbxsCwIBe-sl-6CUvl42Y787wrWvuYZnPFpM6CyqU9YCnXYq_JFdB4Q280PRImwQ8ELuhg/exec"
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

function GetAll() {
    fetch(URL + `?idddd=${idddd}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.E == "U") {
                chrome.storage.local.set({ "state": result.state })
                chrome.storage.local.set({ "Allname": result.All.name.join("\n") })
                chrome.storage.local.set({ "percent": result.All.percent.join("\n") })
                fetch(URL + `?idddd=${idddd}&type=C`, requestOptions)
            }
        })
        .catch(error => console.log('error', error));
}

let lastTime = Date.now()
chrome.tabs.onActivated.addListener(function (activeInfo) {
    if (Date.now() - lastTime < 1000) {
        return
    }
    lastTime = Date.now()
    GetAll()
});

chrome.runtime.onStartup.addListener(() => {
    console.log("dd")
    GetAll()
});