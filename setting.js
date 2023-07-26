let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
const URL = "https://script.google.com/macros/s/AKfycbx1oXfoIls9ue0_y_ClzN3bVdoru9AIBdV6vVKvOYZsibx_n2Yj39Yce7KoUDM5fOMgKQ/exec"
function send(d) {
    fetch(URL + "?data=" + d, requestOptions)
        .then(response => response.json())
        .then(result => {
        })
        .catch(error => console.log('error', error));
}
const switch1 = document.querySelector("#switch")

switch1.addEventListener("change", () => {
    console.log(!!switch1.checked)
    send(!!switch1.checked ? "T" : "F")
})

fetch(URL, requestOptions)
    .then(response => response.json())
    .then(result => {
        switch1.checked = result.data == "T"
    })
    .catch(error => console.log('error', error));


setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('content').style.display = 'block';

}, 1500);