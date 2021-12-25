
function displayLoader(loaderId) {
    $(`#${loaderId}`).fadeIn("fast");
    // $(`#${loaderId}`).removeClass("hide");
    // $(`#${loaderId}`).css({
    //     display: 'block'
    // });
}


function hideLoader(loaderId) {
    $(`#${loaderId}`).fadeOut("fast");
    // $(`#${loaderId}`).addClass("hide");
    // $(`#${loaderId}`).css({
    //     display: 'none'
    // });
}