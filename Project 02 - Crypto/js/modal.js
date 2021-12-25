
// this function used to trigger the modal
function modal() {
    // loop on all the data stored on LocalStorage and find 
    let checkedCryptos = localStorage.getItem("checkedCryptos");
    // checkedCryptos is a string on this style [{first crypto details}, {second crypto}, ... ,{}] of five elements,
    // it's implicit that there is exactly five cryptos, otherwise we shouldn't trigger the modal
    checkedCryptos = JSON.parse(checkedCryptos);
    // now checkedCryptos is an array 

    let modalBodyHTML = ``;
    for (const crypto of checkedCryptos) {
        `<div class="d-flex justify-content-around">
            <h5>${crypto}</h5>
            <label class="switch">
                <input type="checkbox" checked>
                <span class="slider round"></span>
            </label>
        </div>
        `
    }
    
    // <label for="${crypto.symbol}">${crypto.symbol}</label>
    $(".modal-body").append(modalBodyHTML);
}

$('.modal-body').empty();

function launchModal() {
    modal();
    $('#launch-modal').trigger("click")
}