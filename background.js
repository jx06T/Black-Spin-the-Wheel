const URL = "https://script.google.com/macros/s/AKfycbxsCwIBe-sl-6CUvl42Y787wrWvuYZnPFpM6CyqU9YCnXYq_JFdB4Q280PRImwQ8ELuhg/exec"
const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (areaName === 'local') {
        if (changes.idddd) {
            idddd = changes.idddd.newValue;
        }

    }
});
function randId() {
    const timeeee = new Date()
    return `${timeeee.getMonth()}/${timeeee.getDate()} ${timeeee.getHours()}:${timeeee.getMinutes()}.` + Math.random().toString(36).substring(2.9)
}

let idddd
chrome.storage.local.get("idddd").then((a) => {
    if (!a.idddd) {
        let randID = randId()
        chrome.storage.local.set({ "idddd": randID })
        idddd = randID
        chrome.storage.local.set({ "Allname": "1\n_xx_" })
        chrome.storage.local.set({ "percent": "50\n50" })
        chrome.storage.local.set({ "state": "T" })
        let n = ["1", "_xx_"]
        let p = ["50", "50"]
        let l = p.length
        for (let i = 0; i < n.length - l; i++) {
            p.push("")
        }
        fetch(URL + `?idddd=${idddd}&type=V&name=${n.join("^")}&percent=${p.join("^")}&state=T`, requestOptions)
            .then(response => response.json())
            .then(result => {
            })
            .catch(error => console.log('error', error));
        return
    }
    idddd = a.idddd
})

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