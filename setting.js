const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
const URL = "https://script.google.com/macros/s/AKfycbx1oXfoIls9ue0_y_ClzN3bVdoru9AIBdV6vVKvOYZsibx_n2Yj39Yce7KoUDM5fOMgKQ/exec"

function send(idddd) {
    fetch(URL + `idddd=${idddd}`, requestOptions)
        .then(response => response.json())
        .then(result => {
        })
        .catch(error => console.log('error', error));
}

const switch1 = document.querySelector("#switch")
const choose = document.querySelector("#choose")
const getB = document.querySelector("#getD")
const changeB = document.querySelector("changesD")
const loader = document.getElementById('loader')
let Idddd = ""

choose.addEventListener("change", () => {
    Idddd = choose.value
})
switch1.addEventListener("change", () => {
    console.log(!!switch1.checked)
    send(!!switch1.checked ? "T" : "F")
})
getB.addEventListener("click", () => {
    loader.style.display = 'block';
    GetAll(Idddd)
})
window.addEventListener("load", () => {
    loader.style.display = 'none';
})
function GetAll(idddd) {
    fetch(URL + `idddd=${idddd}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            switch1.checked = result.data == "T"
            loader.style.display = 'none';
            console.log("SS")
        })
        .catch(error => console.log('error', error));
}