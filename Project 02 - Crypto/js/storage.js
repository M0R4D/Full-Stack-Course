// Here all the functions that there work based mainly on localStorage, sessionStorage, Cookies

function saveAllCryptosToLocalStorage(cryptos) {
    let allCryptos = [];
    for(const crypto of cryptos) {
        allCryptos.push({
            id : crypto.id,
            name : crypto.name,
            symbol : crypto.symbol
        })
    }
    localStorage.setItem("allCryptos", JSON.stringify(allCryptos));
}


function saveInfoToLocalStorage(_img, _name, _usd, _eur, _ils, id) {
    let item = {
        img : _img,
        name: _name,
        usd: _usd,
        eur: _eur,
        ils: _ils,
        date: dateAfter2Minutes()
    }
    localStorage.setItem(id, JSON.stringify(item));
}

function dateAfter2Minutes() {
    let date = new Date();
    date.setMinutes(date.getMinutes() + 2);
    return date;
}


function displayCryptoDetailsFromLocalStorage(id) {
    let infoToDisplay = localStorage.getItem(id);
    infoToDisplay = JSON.parse(infoToDisplay);
    // check if the date was gone or not,
    // if we passed it then return to ajax, else continue here
    let date = new Date(infoToDisplay.date);
    if (dateIsPassed(date)) {
        localStorage.removeItem(id);
        displayCryptoDetailsFromAJAX(id);
    }
    else {
        displayCurrencyInfo(
            infoToDisplay.img, 
            infoToDisplay.name,
            infoToDisplay.usd,
            infoToDisplay.eur,
            infoToDisplay.ils,
            id
        );
    }
}


function addCheckedCryptoToLocalStorage(checkbox) {
    let checkedCryptos = localStorage.getItem("checkedCryptos");
    checkedCryptos = JSON.parse(checkedCryptos);
    if (checkedCryptos === null) checkedCryptos = [];
    let length = checkbox.id.length;
    checkedCryptos.push(checkbox.id.substring(length, -9));
    localStorage.setItem("checkedCryptos", JSON.stringify(checkedCryptos));
}

function clearLocalStorage() {
    const allCryptos = localStorage.getItem("allCryptos");
    localStorage.clear();
    localStorage.setItem("allCryptos", allCryptos);
}