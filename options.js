const password = [65, 66, 67]
const URL = "https://script.google.com/macros/s/AKfycbxsCwIBe-sl-6CUvl42Y787wrWvuYZnPFpM6CyqU9YCnXYq_JFdB4Q280PRImwQ8ELuhg/exec"
const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

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
        Allname.value = a.Allname
    })
    chrome.storage.local.get("percent").then((a) => {
        percent.value = a.percent
    })
}

const ShowState = document.querySelector("#state")
const Idddd = document.querySelector("#idddd")

function GetState() {
    chrome.storage.local.get("state").then((a) => {
        ShowState.innerText = a.state
    })
}

chrome.storage.local.get("idddd").then((a) => {
    Idddd.value = a.idddd
})

Idddd.addEventListener("change", () => {
    chrome.storage.local.set({ "idddd": Idddd.value })
})


GetState()
initAll()
loader.style.display = 'block';
document.addEventListener("keydown", (e) => {
    if (e.keyCode == password[0]) {
        password.shift()
    } else {
        password.unshift(e.keyCode)
    }
    if (password.length == 0) {
        loader.style.display = 'none';
    }
}, false)
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
    let n = Allname.value.split("\n")
    let p = percent.value.split("\n")
    let l = p.length
    for (let i = 0; i < n.length - l; i++) {
        p.push("")
    }
    fetch(URL + `?idddd=${Idddd.value}&type=V&name=${n.join("^")}&percent=${p.join("^")}`, requestOptions)
        .then(response => response.json())
        .then(result => {
        })
        .catch(error => console.log('error', error));
}
