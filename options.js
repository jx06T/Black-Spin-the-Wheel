const IDDDD = "T1"
const Allname = document.querySelector("#name")
// console.log(Allname)
Allname.addEventListener("change", () => {
    let v = Allname.value
    chrome.storage.local.set({ Allname: v })
})

const percent = document.querySelector("#percent")
percent.addEventListener("change", () => {
    let v = percent.value
    chrome.storage.local.set({ percent: v })
})
// console.log(percent)
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

setInterval(() => {
    GetState()
}, 1000);
GetState()
initAll()
const URL = "https://script.google.com/macros/s/AKfycbx1oXfoIls9ue0_y_ClzN3bVdoru9AIBdV6vVKvOYZsibx_n2Yj39Yce7KoUDM5fOMgKQ/exec"
let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
ShowState.addEventListener("click", () => {
    let neww = ShowState.innerText == "T" ? "F" : "T"
    fetch(URL + "?data=" + neww, requestOptions)
    ShowState.innerText = neww
    chrome.storage.local.set({ "state": neww })
})