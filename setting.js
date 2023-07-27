const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
const URL = "https://script.google.com/macros/s/AKfycbyK621zuDNrBwrg8gaROvwNZMa57hLzEFrEG-Ma4dQiR9xJ5jXGmqK63xo0GeEsnJ4tyA/exec"

function send(idddd, msg) {
    fetch(URL + `?idddd=${idddd}&state=${msg}`, requestOptions)
        .then(response => response.json())
        .then(result => {
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
let Idddd = ""
choose.addEventListener("change", () => {
    Idddd = choose.value
})
switch1.addEventListener("change", () => {
    send(Idddd, !!switch1.checked ? "T" : "F")
})
getB.addEventListener("click", () => {
    loader.style.display = 'block';
    GetAll(Idddd)
})
changeB.addEventListener("click", () => {
    loader.style.display = 'block';
    SentAll(Idddd)
})
window.addEventListener("load", () => {
    loader.style.display = 'none';
})
function GetAll(idddd) {
    fetch(URL + `?idddd=${idddd}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            switch1.checked = result.state == "T"
            loader.style.display = 'none';
            nameD.value = result.All.name.join("\n")
            percentD.value = result.All.percent.join("\n")
            Idddd = result.idddd
            choose.value = Idddd
        })
        .catch(error => console.log('error', error));
}

function SentAll(idddd) {
    fetch(URL + `?idddd=${idddd}&type=U&name=${nameD.value.split("\n").join("^")}&percent=${percentD.value.split("\n").join("^")}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            switch1.checked = result.state == "T"
            loader.style.display = 'none';
            Idddd = result.idddd
            choose.value = Idddd
        })
        .catch(error => console.log('error', error));
}
