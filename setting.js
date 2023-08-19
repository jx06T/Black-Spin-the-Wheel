const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
const URL = "https://script.google.com/macros/s/AKfycbxsCwIBe-sl-6CUvl42Y787wrWvuYZnPFpM6CyqU9YCnXYq_JFdB4Q280PRImwQ8ELuhg/exec"

function send(idddd, msg) {
    fetch(URL + `?idddd=${idddd}&state=${msg}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            loader.style.display = 'none';
        })
        .catch(error => console.log('error', error));
}

const switch1 = document.querySelector("#switch")
const choose = document.querySelector("#choose")
const getB = document.querySelector("#getD")
const changeB = document.querySelector("#changeD")
const loader = document.getElementById('loader')
const percentD = document.querySelector("#percent")
const nameD = document.querySelector("#name")
const OnLineUl = document.querySelector("#OnLine")
const DDDDB = document.querySelector("#DDD")
let Idddd = ""
let Allidddd = []

choose.addEventListener("change", () => {
    Idddd = choose.value
})
switch1.addEventListener("change", () => {
    loader.style.display = 'block';
    send(Idddd, !!switch1.checked ? "T" : "F")
})
getB.addEventListener("click", () => {
    loader.style.display = 'block';
    GetAll(Idddd)
})
DDDDB.addEventListener("click", () => {
    loader.style.display = 'block';
    DDDD(Idddd)
})
changeB.addEventListener("click", () => {
    loader.style.display = 'block';
    SentAll(Idddd)
})

window.addEventListener("load", () => {
    loader.style.display = 'block';
    GetAll("")
})

function GetAll(idddd) {
    if (Allidddd.indexOf(idddd) == -1) {
        Allidddd.push(idddd)
        const li = document.createElement('li');
        li.textContent = idddd;
        OnLineUl.appendChild(li)
    }
    fetch(URL + `?idddd=${idddd}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            loader.style.display = 'none';
            if (/^\s*$/.test(idddd)) {
                OnLineUl.innerHTML = ''
                Allidddd = []
                for (let i = result.idddds.length - 1; i > -1; i--) {
                    const li = document.createElement('li');
                    li.textContent = result.idddds[i];
                    Allidddd.push(result.idddds[i])
                    OnLineUl.appendChild(li)
                }
                return
            }
            switch1.checked = result.state == "T"
            nameD.value = result.All.name.join("\n")
            percentD.value = result.All.percent.join("\n")
            Idddd = result.idddd
            choose.value = Idddd
        })
        .catch(error => console.log('error', error));
}

function SentAll(idddd) {
    if (Allidddd.indexOf(idddd) == -1) {
        Allidddd.push(idddd)
        const li = document.createElement('li');
        li.textContent = idddd;
        OnLineUl.appendChild(li)
    }
    let n = nameD.value.split("\n")
    let p = percentD.value.split("\n")
    let l = p.length
    for (let i = 0; i < n.length - l; i++) {
        p.push("")
    }
    fetch(URL + `?idddd=${idddd}&type=U&name=${n.join("^")}&percent=${p.join("^")}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            switch1.checked = result.state == "T"
            loader.style.display = 'none';
            Idddd = result.idddd
            choose.value = Idddd
        })
        .catch(error => console.log('error', error));
}
OnLineUl.addEventListener('click', (event) => {
    const clickedElement = event.target;
    Idddd = clickedElement.textContent
    if (!Idddd) {
        return
    }
    choose.value = Idddd
    loader.style.display = 'block';
    GetAll(Idddd)
});
function DDDD(idddd) {
    OnLineUl.childNodes[Allidddd.indexOf(idddd)].remove()
    Allidddd.splice(Allidddd.indexOf(idddd), 1
    )
    fetch(URL + `?idddd=${idddd}&type=D`, requestOptions)
        .then(response => response.json())
        .then(result => {
            loader.style.display = 'none';
            Idddd = ""
            choose.value = Idddd
        })
        .catch(error => console.log('error', error));
}