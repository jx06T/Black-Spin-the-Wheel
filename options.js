const URL = "https://script.google.com/macros/s/AKfycbxsCwIBe-sl-6CUvl42Y787wrWvuYZnPFpM6CyqU9YCnXYq_JFdB4Q280PRImwQ8ELuhg/exec"
const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
const IDDDD = "T1"

const Allname = document.querySelector("#name")
const percent = document.querySelector("#percent")

Allname.addEventListener("change", () => {
    let v = Allname.value
    chrome.storage.local.set({ Allname: v })
    sentt()
})
percent.addEventListener("change", () => {
    let v = percent.value
    chrome.storage.local.set({ percent: v })
    sentt()
})

function initAll() {
    chrome.storage.local.get("Allname").then((a) => {
        if (!a.Allname) {
            chrome.storage.local.set({ "Allname": "" })
            Allname.value = ""
            return
        }
        Allname.value = a.Allname
    })
    chrome.storage.local.get("percent").then((a) => {
        if (!a.percent) {
            chrome.storage.local.set({ "percent": "" })
            percent.value = ""
            return
        }
        percent.value = a.percent
    })
}

const ShowState = document.querySelector("#state")
const Idddd = document.querySelector("#idddd")

function GetState() {
    chrome.storage.local.get("state").then((a) => {
        if (!a.state) {
            chrome.storage.local.set({ "state": "T" })
            ShowState.innerText = ""
            return
        }
        ShowState.innerText = a.state
    })
}

chrome.storage.local.get("idddd").then((a) => {
    console.log(a)
    if (!a.idddd) {
        chrome.storage.local.set({ "idddd": IDDDD })
        Idddd.value = IDDDD
        return
    }
    Idddd.value = a.idddd
})

Idddd.addEventListener("change", () => {
    chrome.storage.local.set({ "idddd": Idddd.value })
})


GetState()
initAll()
chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (areaName === 'local') {
        GetState()
        initAll()
    }
});

ShowState.addEventListener("click", () => {
    let neww = ShowState.innerText == "T" ? "F" : "T"
    ShowState.innerText = neww
    chrome.storage.local.set({ "state": neww })
    fetch(URL + `?idddd=${Idddd.value}&state=${neww}`, requestOptions)
})

function sentt() {
    fetch(URL + `?idddd=${Idddd.value}&type=V&name=${Allname.value.split("\n").join("^")}&percent=${percent.value.split("\n").join("^")}`, requestOptions)
        .then(response => response.json())
        .then(result => {
        })
        .catch(error => console.log('error', error));
}