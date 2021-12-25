/// <reference path="jquery-3.6.0.js" />
'use strict'

$(document).ready(function(){
    getCurrencies();
    aboutMe();
  });

function getCurrencies() {
    displayLoader("homeLoader");
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc",
        success: currencies => workWithCurrencies(currencies),
        error: () => alert("Error\nPlease check your internet connection")
    });
}


function workWithCurrencies(currencies) {
    // in this function we will manage all actions the across our site
    displayCurrencies(currencies);
    saveAllCryptosToLocalStorage(currencies);
}


function displayCurrencies(currencies) {
    // clear the cryptos tag before adding new elements there
    $("cryptos").empty();
    let cards = ``;
    for(const currency of currencies) {
        cards += `
        <div id="${currency.id}" class="card">
            <div class="card-body">
                <div class="card-title">
                    <h5>${currency.name}</h5>
                    <label class="switch">
                        <input id="${currency.id}-checkbox" type="checkbox" onclick="checkBoxClicked(this)">
                        <span class="slider round"></span>
                    </label>
                </div>
                <h6 class="card-subtitle mb-2 text-muted">${(currency.symbol).toUpperCase()}</h6>
                <div class="card-text">
                    <p>all time high price: ${currency.ath}</p>
                </div>
                <div class="d-flex justify-content-start">
                    <button id="${currency.id}-show-btn" type="button" class="btn btn-outline-primary card-btn" onclick="getCryptoDetails('${currency.id}')")>More Info 
                        <i class="fas fa-angle-double-down fa-lg"></i>  
                    </button>
                    <button id="${currency.id}-hide-btn" type="button" class="btn btn-outline-secondary card-btn hide" onclick="hideBtn('${currency.id}')")>Hide 
                        <i class="fas fa-angle-double-up fa-lg"></i>  
                    </button>
                    <div id="${currency.id}-loader" class="loader hide">Loading...</div>
                </div>
                <div id="${currency.id}-prices" class="flex-column">
                </div>
            </div>
        </div>`
    }

    $("#cryptos").append(cards);
    hideLoader("homeLoader");
}


function getCryptoDetails(id) {
    $(`#${id}-prices`).empty();
    // check if the info is found in the local storage if yes get it, otherwise get it from the server
    let isFound = localStorage.getItem(id);
    (isFound === null) ? displayCryptoDetailsFromAJAX(id) : displayCryptoDetailsFromLocalStorage(id);
    $(`#${id}-hide-btn`).css({
        display : 'initial'
    });
    $(`#${id}-show-btn`).css({
        display : 'none'
    });
}

function displayCryptoDetailsFromAJAX(id) {
    displayLoader(`${id}-loader`);
    // $(`#${id}-loader`).removeClass('hide');
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/" + id,
        success: currency => displayCurrencyInfo(
                                                currency.image.large,
                                                currency.name,
                                                currency.market_data.current_price.usd,
                                                currency.market_data.current_price.eur,
                                                currency.market_data.current_price.ils,
                                                id
                                                ),
        error: err => alert(err.status)
    });
    hideLoader(`${id}-loader`);
}


function displayCurrencyInfo(img, name, usd, eur, ils, id) {
    saveInfoToLocalStorage(img, name, usd, eur, ils, id);
    let info = `
        <img src="${img}" alt="${name} logo svg">
        <p> <i class="fas fa-dollar-sign fa-lg"></i> ${usd}</p>
        <p> <i class="fas fa-euro-sign fa-lg"></i> ${eur}</p>
        <p> <i class="fas fa-shekel-sign fa-lg"> ${ils}</i></p>
    `
    $(`#${id}-prices`).append(info);
}

function hideBtn(id) {
    $(`#${id}-prices`).empty();
    $(`#${id}-show-btn`).fadeIn("fast");
    // $(`#${id}-show-btn`).removeClass("hide");

    $(`#${id}-hide-btn`).fadeOut("fast");
    // $(`#${id}-hide-btn`).addClass("hide");
}


function dateIsPassed(date) {
    let now = new Date();
    let dateFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    let nowFormat = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}, ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    return nowFormat.localeCompare(dateFormat) > 0;
}


function checkBoxClicked(checkbox) {
    // console.log(checkbox, checkbox.id);
    // console.log((checkbox.checked === true)) 

    // if(checkbox.checked === true) {
    //     let checked = localStorage.getItem("checkedCryptos");
    //     // console.log(checked)
    //     checked = JSON.parse(checked);
    //     if (checked === null || checked.length < 5) {
    //         addCheckedCryptoToLocalStorage(checkbox);
    //     }
    //     else {
    //         launchModal();
    //     }
    // }

    // else {
    //     // removeCheckedCryptoFromLocalStorage();
    // }
}