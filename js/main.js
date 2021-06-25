//variable
var priceGrab, kilometers, WaitTimes, grabType;
var totalMoney;
//get element function
var getEle = function(selector) {
        return document.querySelectorAll(selector);
    }
    //class object PriceGrab
function PriceGrab(_grabType, _priceFirst, _priceNormal, _priceFar, _priceWaitTime) {
    this.grabType = _grabType;
    this.priceFirst = _priceFirst;
    this.priceNormal = _priceNormal;
    this.priceFar = _priceFar;
    this.priceWaitTime = _priceWaitTime;
    //totalPrice function
    this.totalPrice = function(kilometers, WaitTimes) {
            var result = this.priceFirst;
            if (kilometers < 1) {
                result = result * kilometers;
            } else if (kilometers < 19) {
                result += (kilometers - 1) * this.priceNormal;
            } else {
                result += (kilometers - 1) * this.priceFar;
            }
            if (WaitTimes > 3) {
                result += this.priceWaitTime;
            }
            return result;

        }
        //priceCurrent function
    this.priceCurrent = function(kilometers) {
        var result = this.priceFirst;
        if (kilometers < 1) {
            return result;
        } else if (kilometers < 19) {
            result = this.priceNormal;
        } else {
            result = this.priceFar;
        }
        return result;
    }
}


//CalculationGrab function event click
var calculationGrab = function() {
        grabType = getEle('input[name="selector"]:checked')[0].value;
        kilometers = parseFloat(getEle('#kilometers')[0].value);
        WaitTimes = parseFloat(getEle('#WaitTimes')[0].value);
        switch (grabType) {
            case 'car':
                priceGrab = new PriceGrab('car', 8000, 7500, 7000, 2000);
                break;
            case 'suv':
                priceGrab = new PriceGrab('suv', 9000, 8500, 8000, 3000);
                break;
            case 'black':
                priceGrab = new PriceGrab('black', 10000, 8500, 9000, 3500);
                break;
        }
        totalMoney = priceGrab.totalPrice(kilometers, WaitTimes);
        getEle('#xuatTien')[0].innerHTML = totalMoney;
        getEle('#divThanhTien')[0].style.display = "block";

    }
    //function set innerHTML ValueInvoice
function setValueInvoice(use, price, intoMoney, object) {
    getEle('[data-object="' + object + '"] td:nth-of-type(2)')[0].innerHTML = use;
    getEle('[data-object="' + object + '"] td:nth-of-type(3)')[0].innerHTML = price;
    getEle('[data-object="' + object + '"] td:nth-of-type(4)')[0].innerHTML = intoMoney;
}
//invoice
var invoidce = function() {
    calculationGrab();
    var itemInvoices = getEle('.invoice__item');
    var use, price, intoMoney;
    var object;
    itemInvoices.forEach(function(e) {
        object = e.getAttribute('data-object');
        switch (object) {
            case 'first-kilometer':
                use = kilometers < 1 ? kilometers : 1;
                price = priceGrab.priceFirst;
                intoMoney = price * use;
                break;
            case 'distance':
                use = kilometers;
                price = priceGrab.priceCurrent(kilometers);
                intoMoney = price * use;
                break;
            case 'waitTimes':
                use = WaitTimes;
                price = WaitTimes > 3 ? priceGrab.priceWaitTime : 0;
                intoMoney = price;
                break;
        }
        setValueInvoice(use, price, intoMoney, object);
    });
    getEle('.totalMoney')[0].innerHTML = totalMoney;


}