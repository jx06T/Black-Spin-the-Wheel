const URL = "https://script.google.com/macros/s/AKfycbxsCwIBe-sl-6CUvl42Y787wrWvuYZnPFpM6CyqU9YCnXYq_JFdB4Q280PRImwQ8ELuhg/exec"
console.log(`
     ██╗ ██╗  ██╗  ██████╗   ██████╗ ████████╗
     ██║ ╚██╗██╔╝ ██╔═████╗ ██╔════╝ ╚══██╔══╝
     ██║  ╚███╔╝  ██║██╔██║ ███████╗    ██║   
██   ██║  ██╔██╗  ████╔╝██║ ██╔═══██╗   ██║   
╚█████╔╝ ██╔╝ ██╗ ╚██████╔╝ ╚██████╔╝   ██║   
 ╚════╝  ╚═╝  ╚═╝  ╚═════╝   ╚═════╝    ╚═╝   
`)
const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
let Allpeople = []
let count = undefined
let isRun = false
let STATA = true
let Apiece = undefined
const colors = ["royalblue", "salmon", "palegreen", "wheat", 'plum']
let All_NAME = undefined
let Percent = undefined
let idddd


const roulette = document.querySelector("#wheel")
const pls_click = document.querySelector("#pls-click")
const peopleDiv = document.querySelector("#names-show")
const peopleDDiv = document.querySelector("#names")
const banner = document.querySelector("#banner")
const button0 = document.querySelectorAll(".btn-primary.spin-btn")[0]
const button = document.querySelectorAll(".btn-primary.spin-btn")[1]
let button2 = document.querySelector("#hide-result-wrapper>button")

function GetTitle(a) {
    let title = `<span>${a}</span> <button id="hide-result" title="隱藏 &quot;8&quot;" style="">S</button> <button id="close-banner">X</button>`
    return title
}

function GetState() {
    chrome.storage.local.get("state").then((a) => {
        STATA = a.state === "T"
    })
}

function GetColor(i) {
    if (i >= count - (count % 5) && (count % 5 == 1 || count % 5 == 2)) {
        return colors[(i % 5) + 2]
    } else {
        return colors[i % 5]
    }
}

function init() {
    chrome.storage.local.get("Allname").then((a) => {
        All_NAME = a.Allname.split("\n")
    })
    chrome.storage.local.get("percent").then((a) => {
        Percent = a.percent.split("\n")
    })
}

function ChangePeople() {
    Allpeople = []
    const people = Array.from(peopleDiv.childNodes);
    people.forEach((person) => {
        if (person.innerText == '' || person.innerText == '　' || person.classList.contains("strike")) {
            return
        }
        Allpeople.push(person.innerText.trimEnd())
    })
    // console.log(Allpeople)
    count = Allpeople.length
    Apiece = 360 / count
}


function run() {
    console.log(isRun, STATA)
    if (isRun) {
        return
    }
    if (!STATA) {
        return
    }
    isRun = true
    let total = 0
    let Chart = []
    let No = []
    for (let i = 0; i < Percent.length; i++) {
        const person = Percent[i];
        if (isNaN(parseInt(person)) || Allpeople.indexOf(All_NAME[i]) == -1 && All_NAME[i] != "_xx_") {
            total += 0
            No.push(All_NAME[i])
        } else {
            total += parseInt(person)
        }
        Chart.push(total)
    }
    let name
    const rand = Math.floor(Math.random() * total)
    for (let i = 0; i < Chart.length; i++) {
        if (rand < Chart[i]) {
            name = All_NAME[i]
            break
        }
    }
    // console.log(name, Percent, All_NAME)

    if (Allpeople.indexOf(name) == -1) {
        let TempAllpeople = []
        for (let i = 0; i < Allpeople.length; i++) {
            if (No.indexOf(Allpeople[i]) == -1) {
                TempAllpeople.push(Allpeople[i])
            }
        }
        name = TempAllpeople[Math.floor(Math.random() * TempAllpeople.length)]
        if (!name) {
            name = Allpeople[Math.floor(Math.random() * count)]
        }
    }
    let cid = Allpeople.indexOf(name)
    id = (count - cid - 1) * Apiece + Math.random() * Apiece
    let NowD = roulette.style.transform
    const parts = NowD.split("(")[1].split(")")[0].split("deg")[0].trim();
    NowD = parseFloat(parts);
    const temp = name
    setTimeout(() => {
        roulette.style.transform = `rotate(${Math.floor(NowD / 360) * 360 + 1800 + id}deg)`
    }, 5)

    setTimeout(() => {
        banner.innerHTML = GetTitle(temp)
        banner.style.background = GetColor(cid)
        button2.innerText = "隱藏 " + temp
        isRun = false
    }, 10000)
}

ChangePeople()
init()
GetState()

//------------------------------------------------------------------------------
const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
            ChangePeople()
        }
    }
});

const config = {
    attributes: true,         // 監聽屬性變化
    attributeOldValue: true,  // 保留舊屬性值
    subtree: true,            // 監聽所有子元素
};

observer.observe(peopleDiv, config);


document.addEventListener("keydown", (e) => {
    if (event.target === document.body && e.keyCode == 32) {
        run()
    }
}, false)

roulette.addEventListener("click", () => {
    run()
})
pls_click.addEventListener("click", () => {
    run()
})
button.addEventListener("click", () => {
    run()
})
button0.addEventListener("click", () => {
    run()
})

chrome.storage.local.get('idddd').then((a) => {
    idddd = a.idddd
})
chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (areaName === 'local') {
        if (changes.idddd) {
            idddd = changes.idddd.newValue;
        }
        if (changes.state) {
            STATA = changes.state.newValue === "T"
        }
        if (changes.Allname) {
            All_NAME = changes.Allname.newValue.split("\n")
        }
        if (changes.percent) {
            Percent = changes.percent.newValue.split("\n")
        }
        // console.log(All_NAME, Percent)
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
                init()
            }
        })
        .catch(error => console.log('error', error));

}, 2000);

