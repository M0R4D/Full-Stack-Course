
// assuming we have all the coins names saved to local storage
// they are represented as follows: [{id1,name1, symbol1}, {id2, name2, symbol2}, ...]

// this function works as follow: 
// first we make all the cards (cryptos) visible again, this is required to make the search for more than one time work properly
// then we get the value of the search bar as "name"
// we compare it to all the cryptos we have inside our site that was saved into the localStorage
// the search functionality work with searching about the name, symbol, id of a crypto (yes, three in one)
// all the cryptos that does not match any of this will be added to an array and to one long string to call the DOM just once
// we slice the last two chars of str to remove the space and comma to make a valid css selector
// we add a 'hide' class to all of those that not match our search
function searchFunc() {
    $('.card').removeClass('hide');
    let name = $('#search').val().toLowerCase();
    // console.log(name);

    let allCryptos = JSON.parse(localStorage.getItem("allCryptos"));
    let filteredCryptosSelector = '';
    // let filteredCryptos = [];
    for (const crypto of allCryptos) {
        if (!crypto.id.toLowerCase().includes(name) && 
                !crypto.name.toLowerCase().includes(name) && 
                !crypto.symbol.toLowerCase().includes(name)
                ) {
            // filteredCryptos.push(crypto);
            filteredCryptosSelector += '#' + crypto.id + ', ';
        }
    }
    filteredCryptosSelector = filteredCryptosSelector.substring(0, filteredCryptosSelector.length - 2);
    // console.log(filteredCryptos);
    // console.log(filteredCryptosSelector);

    $(filteredCryptosSelector).addClass('hide');


}

