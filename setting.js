let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
function send(d) {
    fetch("https://script.google.com/macros/s/AKfycbzxQggtns7GG185xv_xh75KbTo1iG-j7Anh-a58ltmc_QAYH2wMdOwS4eEVumepVp_kow/exec?data=" + d, requestOptions)
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

fetch("https://script.google.com/macros/s/AKfycbzxQggtns7GG185xv_xh75KbTo1iG-j7Anh-a58ltmc_QAYH2wMdOwS4eEVumepVp_kow/exec", requestOptions)
    .then(response => response.json())
    .then(result => {
        switch1.checked = result.data == "T"
    })
    .catch(error => console.log('error', error));


setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    
}, 1500);