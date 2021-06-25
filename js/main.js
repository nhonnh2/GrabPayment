//variable
var priceGrab, kilometers, WaitTimes, grabType;
var totalMoney;
//get element function
var getEles = function(selector) {
    return document.querySelectorAll(selector);
}
var getEle = function(selector) {
        return document.querySelector(selector);
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

        kilometers = parseFloat(getEle('#kilometers').value);
        WaitTimes = parseFloat(getEle('#WaitTimes').value);
        if (validate(kilometers, WaitTimes) == true) {
            grabType = getEle('input[name="selector"]:checked').value;

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
            getEle('#xuatTien').innerHTML = totalMoney;
            getEle('#divThanhTien').style.display = "block";
            getEle('.errInput').style.display = "none";
        } else {
            getEle('#divThanhTien').style.display = "none";
            getEle('.errInput').style.display = "block";
        }

    }
    //function set innerHTML ValueInvoice
var setValueInvoice = function(use, price, intoMoney, object) {
        getEle('[data-object="' + object + '"] td:nth-of-type(2)').innerHTML = use;
        getEle('[data-object="' + object + '"] td:nth-of-type(3)').innerHTML = price;
        getEle('[data-object="' + object + '"] td:nth-of-type(4)').innerHTML = intoMoney;
    }
    //invoice
var invoidce = function() {
        calculationGrab();
        var itemInvoices = getEles('.invoice__item');
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
        getEle('.totalMoney').innerHTML = totalMoney;


        document.getElementById("invoice").classList.add("show");
    }
    //function validate value input
var validate = function(kilometers, WaitTimes) {
    if (kilometers < 0 || isNaN(kilometers) || kilometers == 0 ||
        WaitTimes < 0 || isNaN(WaitTimes) || WaitTimes == 0 ||
        getEle('input[name="selector"]:checked') == null) {
        return false;
    }
    return true;
}
var checkNegative = function(element) {
    var parent;
    if (element.id == "kilometers") {
        parent = '.kilometers-form';
    } else {
        parent = '.WaitTimes-form';
    }
    var err = getEle(parent + ' .errorNumber');
    var line = getEle(parent + ' .focus-input100 .line');
    if (element.value < 0) {
        err.style.display = "block";
        line.style.background = "red";
    } else {
        err.style.display = "none";
        line.style.background = "linear-gradient(45deg, #884747, #e0c04d)";
    }
}