<<<<<<< HEAD
/// <reference path="jquery-3.6.0.js" />
"use strict";

function getCountries(id) {
    displayLoader();
    let url = $("#searchInput").val();
    if (id === "all") {
        url = "https://restcountries.eu/rest/v2/all";
    }
    else {
        if (url === "" | url === undefined) {
            hideLoader();
            alert("No No, your search should not be empty\nif you want to see the whole list there is a button exactly for this");
            return;
        }
        url = `https://restcountries.eu/rest/v2/name/${$("#searchInput").val()}`;
    }
    ajaxTime(url);
    hideLoader();
}

function ajaxTime(url) {
    $.ajax({
        url : url,
        success: countries => displayCountries(countries),
        error: err => errorMessage(err.status)
    });
}

function displayCountries(countries) {
    $('table').css('display','block');
    $("tbody").empty();
    let countriesList = ``;
    for(const country of countries) {
        countriesList += `
            <tr>
                <td>${country.name}</td>
                <td>${country.capital}</td>
                <td>${country.population}</td>
                <td>${country.area}</td>
                <td>${country.topLevelDomain}</td>
                <td><img class="flag" src="${country.flag}" alt=""></td>
                <td>${formatCurrencies(country.currencies)}</td>
                <td>${country.borders}</td>
                <td>${country.region},${country.subregion}</td>
                </tr>
            `;
        }

    $("tbody").append(countriesList);
}


function formatCurrencies(currencies) {
    let formattedCurrencies = ``;
    for (const currency of currencies) {
        formattedCurrencies += `(${currency.symbol})${currency.code} `;
    }
    return formattedCurrencies;
}


function errorMessage(status) {
    if (status === 404) {
        alert(
        `Invalid Search, try to:
            - Check your spill
            - Search with another words
            - Check your connection`
        )
    }
}

function displayLoader() {
    // $("#loader").fadeIn("fast");
    $(".loader").css({
        display: 'block'
    });
}
function hideLoader() {
    $(".loader").fadeOut("fast");
}
=======
/// <reference path="jquery-3.6.0.js" />
"use strict";

function getCountries(id) {
    displayLoader();
    let url = $("#searchInput").val();
    if (id === "all") {
        url = "https://restcountries.eu/rest/v2/all";
    }
    else {
        if (url === "" | url === undefined) {
            hideLoader();
            console.log(url);
            alert("No No, your search should not be empty\nif you want to see the whole list there is a button exactly for this");
            return;
        }
        url = `https://restcountries.eu/rest/v2/name/${$("#searchInput").val()}`;
    }
    ajaxTime(url);
    hideLoader();
}

function ajaxTime(url) {
    $.ajax({
        url : url,
        success: countries => displayCountries(countries),
        error: err => errorMessage(err.status)
    });
}

function displayCountries(countries) {
    $('table').css('display','block');
    $("tbody").empty();
    let countriesList = ``;
    for(const country of countries) {
        countriesList += `
            <tr>
                <td>${country.name}</td>
                <td>${country.capital}</td>
                <td>${country.population}</td>
                <td>${country.area}</td>
                <td>${country.topLevelDomain}</td>
                <td><img class="flag" src="${country.flag}" alt=""></td>
                <td>${formatCurrencies(country.currencies)}</td>
                <td>${country.borders}</td>
                <td>${country.region},${country.subregion}</td>
                </tr>
                `;
            }
    $("tbody").append(countriesList);
}


function formatCurrencies(currencies) {
    let formattedCurrencies = ``;
    for (const currency of currencies) {
        formattedCurrencies += `(${currency.symbol})${currency.code} `;
    }
    return formattedCurrencies;
}


function errorMessage(status) {
    if (status === 404) {
        alert(`Invalid Search, try to:
        - Check your spill
        - Search with another words `);
    }
}

function displayLoader() {
    $(".loader").fadeIn("fast");
}
function hideLoader() {
    $(".loader").fadeOut("fast");
}
>>>>>>> dbf0532a5c9f5f8bc3a38ab102a90e9b525c6e48
