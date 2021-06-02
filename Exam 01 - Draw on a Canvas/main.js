function calc() {
    const radius = document.getElementById("radius").value;
    // const radius = getElementById("radius").value;
    let sp = document.getElementById("span");
    const canvasElement = document.getElementById("myCanvas");
    let flag = validate(radius, canvasElement);

    if (!flag) {
        sp.innerHTML = "";
        alert("Enter a valid input\nMust be a non-negative number and within the canvas borders (250,250)");
    } else {
        calcSphere(radius, sp);
        draw(radius);
        // clearForm()
    }

}

function calcSphere(radius, sp) {
    sp.innerHTML = 4 * Math.PI * Math.pow(radius, 3) / 3;
}

function validate(radius, canvas) {
    return (radius === "" || radius < 0) ? false :
        (radius > (canvas.width / 2) || radius > (canvas.height / 2)) ? false : // is within the borders
        (isNaN(radius)) ? false :
        true;
}

function draw(radius) {
    const canvasElement = document.getElementById("myCanvas");
    const myCanvas = canvasElement.getContext("2d");
    let width = Number(canvasElement.width);
    console.log(width)
    let height = Number(canvasElement.height);

    // Draw Circle:
    myCanvas.beginPath();
    myCanvas.strokeStyle = "blue";
    myCanvas.arc(width / 2, height / 2, radius, 0, 2 * Math.PI); // x, y, radius, start, end 
    myCanvas.stroke(); // draw.
}

function clearCanvas() {
    const canvasElement = document.getElementById("myCanvas");
    const myCanvas = canvasElement.getContext("2d");
    myCanvas.clearRect(0, 0, canvasElement.width, canvasElement.height); // x1, y1, x2, y2
}

// should not be added
function clearForm() {
    document.getElementById("myForm").reset();
    document.getElementById("span").innerHTML = "";
}