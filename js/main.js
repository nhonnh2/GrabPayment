//get element function
var getEle = function(selector) {
        return document.querySelectorAll(selector);
    }
    //class object PriceGrab
function PriceGrab(_priceFirst, _priceNormal, _priceFar, _priceWaitTime) {
    this.priceFirst = _priceFirst;
    this.priceNormal = _priceNormal;
    this.priceFar = _priceFar;
    this.priceWaitTime = _priceWaitTime;
}
//totalMoney function
var totalMoney = function(kilometers, WaitTimes, priceGrab) {
    var result = priceGrab.priceFirst;
    if (kilometers < 1) {
        result = result * kilometers;
    } else if (kilometers < 19) {
        result += (kilometers - 1) * priceGrab.priceNormal;
    } else {
        result += (kilometers - 1) * priceGrab.priceFar;
    }
    if (WaitTimes > 3) {
        result += priceGrab.priceWaitTime;
    }
    return result;

}

//CalculationGrab function event click
var calculationGrab = function() {
    var grabType = getEle('input[name="selector"]:checked')[0].value;
    var kilometers = getEle('#kilometers')[0].value;
    var WaitTimes = getEle('#WaitTimes')[0].value;
    var priceGrab;
    switch (grabType) {
        case 'car':
            priceGrab = new PriceGrab(8000, 7500, 7000, 2000);
            break;
        case 'suv':
            priceGrab = new PriceGrab(9000, 8500, 8000, 3000);
            break;
        case 'black':
            priceGrab = new PriceGrab(10000, 8500, 9000, 3500);
            break;
    }
    var result = totalMoney(kilometers, WaitTimes, priceGrab);
    getEle('#xuatTien')[0].innerHTML = result;
    getEle('#divThanhTien')[0].style.display = "block";
}