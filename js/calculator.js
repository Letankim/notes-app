let calculator = document.querySelector('.calculator'),
    calculApp = document.querySelector('.cal-container'),
    overlay = document.querySelector('.overlay'),
    input = document.querySelector('.display'),
    lists = Array.from(document.querySelectorAll('.btn button'));

calculator.onclick = function () {
    overlay.classList.add('active');
    calculApp.classList.add('active');
}

overlay.onclick = function () {
    overlay.classList.remove('active');
    calculApp.classList.remove('active');
};

lists.forEach(function(btn) {
    btn.onclick = function() {
        if(input.innerHTML == "0") {
            input.innerHTML = "";
        };
        if(btn.innerText == 'AC') {
            input.innerHTML = '0';
        }
        else if(btn.innerHTML == "DEL") {
            var arrayText = Array.from(input.innerHTML);
            arrayText.splice(arrayText.length-1, 1);
            if(arrayText.length != 0) {
                input.innerHTML = arrayText.join('');
            }else {
                input.innerHTML = '0';
            }
        }
        if(btn.innerHTML == "=") {
            input.innerHTML = eval(input.innerHTML);
        } else {
            if (btn.innerText != "AC" && btn.innerText != "DEL") {
                input.innerHTML += btn.innerHTML;
            }
        };
    };
});