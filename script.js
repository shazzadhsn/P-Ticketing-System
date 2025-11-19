// Global Variable declaration
let seatNum, seatPrice, seatCount = 0, totalPrice = 0, grandTotalPrice = 0;
function elementPickerById(elementId) {
    let element = document.getElementById(elementId);
    return element;
}
let seatNumbers = document.getElementsByClassName('seat-numbers');
for(let seatNumber of seatNumbers) {
    seatNumber.addEventListener('click', function(event) {

        // functionality 2
        
        if(event.target.classList.contains('selected')) {
            removeSeatList(event);
            event.target.classList.add('not-selected');
            event.target.classList.remove('!bg-green-500', 'selected', 'text-white')
            seatCount--;
            seatListCount();
            priceMinusCalculation();
            
        } else {
            seatSelection(event);
            listingSeats(event);
            seatCount++;
            seatListCount();
            priceAddCalculation();
        }
    })
}

// listing in price list
let detailedList, listField;
function listingSeats(event) {
    seatNum = event.target.innerText;
    seatPrice = parseInt(elementPickerById('per-seat-price').innerText);
    seatStandard = 'Economy';

    listField = document.createElement('div');
    let varArr = [seatNum, seatStandard, seatPrice];

    for(let i = 0; i < 3; i++) {
        let p = document.createElement('p');
        p.innerText = varArr[i];
        p.classList.add('my-2')
        listField.appendChild(p);
    }

    detailedList = elementPickerById('detailed-price');
    detailedList.appendChild(listField);
    listField.classList.add('flex', 'justify-between', 'mx-5', 'seat-list-in-price');
    listField.setAttribute('id', event.target.innerText);
}

// remove list seat
let removeElement;
function removeSeatList(event) {
    removeElement = elementPickerById(event.target.innerText);
    removeElement.remove();
}

// selection of seat
function seatSelection(event) {
    event.target.classList.add('selected', '!bg-green-500', 'text-white');
}


// Seat List Calculation
let couponApplyBtn, remainingSeat;
couponApplyBtn = elementPickerById('apply-button');
function seatListCount() {
    remainingSeat = elementPickerById('remaining-seat-count');
    remainingSeat.innerText = 40 - seatCount;
    elementPickerById('count-seat').innerText = seatCount;
    if(seatCount == 4) {
        couponApplyBtn.removeAttribute('disabled');
        for(let seatNumber of seatNumbers) {
            if(seatNumber.classList.contains('selected') == false) {
                seatNumber.setAttribute('disabled', true);
            }
        }
    } else {
        couponApplyBtn.setAttribute('disabled', true);
        for(let seatNumber of seatNumbers) {
            if(seatNumber.classList.contains('selected') == false) {
                seatNumber.removeAttribute('disabled');
            }
        }
    }
}

let totalPriceValue, grandTotalValue;
grandTotalValue = elementPickerById('grand-total-price-value');
totalPriceValue = elementPickerById('total-price-value');

// coupon apply
couponApplyBtn.addEventListener('click', function() {
    applyCouponCode();
})

// Price Calculation

function priceAddCalculation() {
    totalPrice += seatPrice;
    totalPriceValue.innerText = totalPrice;
    grandTotal = totalPrice;
    grandTotalValue.innerText = totalPrice;
}
function priceMinusCalculation() {
    totalPrice -= seatPrice;
    totalPriceValue.innerText = totalPrice;
    grandTotal = totalPrice;
    grandTotalValue.innerText = totalPrice;
}


let new15CouponCode = 'NEW15';
let coupleCouponCode = 'COUPLE20';
let couponCode;

// coupon apply function define
function applyCouponCode() {
    couponCode = elementPickerById('coupon-code-place-field').value;
    if(couponCode === new15CouponCode) {
        grandTotal = grandTotal - grandTotal * 0.15;
        grandTotalValue.innerText = grandTotal;
        elementPickerById('coupon-code-place-field').setAttribute('disabled', true);
        couponApplyBtn.setAttribute('disabled', true);
    } else if(couponCode === coupleCouponCode) {
        grandTotal = grandTotal - grandTotal * 0.20;
        grandTotalValue.innerText = grandTotal;
        elementPickerById('coupon-code-place-field').setAttribute('disabled', true);
        couponApplyBtn.setAttribute('disabled', true);
    } else {
        alert('Wrong Coupon Code Entered');
    }
    elementPickerById('coupon-code-place-field').value = '';
}