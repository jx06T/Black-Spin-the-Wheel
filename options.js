const Allname = document.querySelector("#name")
// console.log(Allname)
chrome.storage.local.get("Allname").then((a) => {
    if (!a.Allname) {
        chrome.storage.local.set({ "Allname": "" })
        Allname.value = ""
        return
    }
    Allname.value = a.Allname
})
Allname.addEventListener("change", () => {
    let v = Allname.value
    chrome.storage.local.set({ Allname: v })
})

const percent = document.querySelector("#percent")
// console.log(percent)
chrome.storage.local.get("percent").then((a) => {
    if (!a.percent) {
        chrome.storage.local.set({ "percent": "" })
        percent.value = ""
        return
    }
    percent.value = a.percent
})
percent.addEventListener("change", () => {
    let v = percent.value
    chrome.storage.local.set({ percent: v })
})

const ShowState = document.querySelector("#state")
function GetState() {
    console.log("sss")
    chrome.storage.local.get("state").then((a) => {
        if (!a.state) {
            chrome.storage.local.set({ "state": "T" })
            ShowState.innerText = ""
            return
        }
        ShowState.innerText = a.state
    })
}
setInterval(() => {
    GetState()
}, 1000);
GetState()
ShowState.addEventListener("click", GetState)