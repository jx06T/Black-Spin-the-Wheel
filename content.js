if (location.href == 'https://tw.piliapp.com/random/wheel/') {
    let STATA = true
    function GetState() {
        chrome.storage.local.get("state").then((a) => {
            STATA = a.state == "T"
        })
    }
    setInterval(() => {
        GetState()
    }, 1000);


    const roulette = document.querySelector("#wheel")
    const pls_click = document.querySelector("#pls-click")
    const peopleDiv = document.querySelector("#names-show")
    const peopleDDiv = document.querySelector("#names")
    const banner = document.querySelector("#banner")
    const button = document.querySelectorAll(".btn-primary.spin-btn")[1]
    let button2 = document.querySelector("#hide-result-wrapper>button")

    function GetTitle(a) {
        let title = `<span>${a}</span> <button id="hide-result" title="隱藏 &quot;8&quot;" style="">S</button> <button id="close-banner">X</button>`
        return title
    }

    let All_NAME = undefined
    let Percent = undefined
    function init() {
        chrome.storage.local.get("Allname").then((a) => {
            All_NAME = a.Allname.split("\n")
        })
        chrome.storage.local.get("percent").then((a) => {
            Percent = a.percent.split("\n")
        })
    }
    init()
    let Allpeople = []
    let count = undefined
    let Apiece = undefined

    function ChangePeople() {
        Allpeople = []
        const people = Array.from(peopleDiv.childNodes);
        people.forEach((person) => {
            Allpeople.push(person.innerText)
        })
        count = Allpeople.length
        Apiece = 360 / count
    }

    ChangePeople()

    peopleDDiv.addEventListener("change", () => {
        ChangePeople()
    })

    function run() {
        if (!STATA) {
            return
        }
        let total = 0
        let Chart = []
        for (let i = 0; i < Percent.length; i++) {
            const person = Percent[i];
            total += parseInt(person) == NaN ? 0 : parseInt(person)
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
        if (Allpeople.indexOf(name) == -1) {
            name = Allpeople[Math.floor(Math.random() * count)]
        }

        let id = Allpeople.indexOf(name)
        id = (count - id - 1) * Apiece + Math.random() * Apiece
        let NowD = roulette.style.transform
        const parts = NowD.split("(")[1].split(")")[0].split("deg")[0].trim();
        NowD = parseFloat(parts);
        roulette.style.transform = `rotate(${Math.floor(NowD / 360) * 360 + 1800 + id}deg)`
        setTimeout(() => {
            banner.innerHTML = GetTitle(name)
            button2.innerText = "隱藏 " + name
        }, 10000)
    }


    window.addEventListener("focus", () => {
        init()
    })

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


    const URL = "https://script.google.com/macros/s/AKfycbyK621zuDNrBwrg8gaROvwNZMa57hLzEFrEG-Ma4dQiR9xJ5jXGmqK63xo0GeEsnJ4tyA/exec"
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
                }
            })
            .catch(error => console.log('error', error));
    }, 2000);

}


