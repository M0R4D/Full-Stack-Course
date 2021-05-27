/// <reference path="jquery-3.6.0.js" />
"use strict";

function getAllCountries(id) {
    let url = $("#searchInput").val();
    if (id === "all") {
        url = "http://restcountries.eu/rest/v2/all";
    }
    else {
        if (url === "" | url === undefined) {
            console.log(url);
            alert("No No, your search should not be empty\nif you want to see the whole list there is a button exactly for this");
            return;
        }
        url = `http://restcountries.eu/rest/v2/name/${$("#searchInput").val()}`;
    }
    ajaxTime(url);
}

function ajaxTime(url) {
    $.ajax({
        url : url,
        success: countries => displayCountries(countries),
        error: err => alert(err.status)
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
                <td>${country.topLevelDomain}</td>
                <td>${country.capital}</td>
                <td>${formatCurrencies(country.currencies)}</td>
                <td><img class="flag" src="${country.flag}" alt=""></td>
                <td>${country.borders}</td>
                <td>${country.region}</td>
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
