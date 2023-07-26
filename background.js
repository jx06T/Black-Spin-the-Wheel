setInterval(() => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://script.google.com/macros/s/AKfycbzxQggtns7GG185xv_xh75KbTo1iG-j7Anh-a58ltmc_QAYH2wMdOwS4eEVumepVp_kow/exec", requestOptions)
        .then(response => response.json())
        .then(result => {
            // console.log(result.data)
            chrome.storage.local.set({ "state": result.data })
        })
        .catch(error => console.log('error', error));
}, 1000);