// Interest calculation Script

// Add click event listener to calcIt button
document.getElementById("calcIt").addEventListener("click", function () {
    var amount = parseFloat(document.getElementById("input1").value);
    var interestRate = parseFloat(document.getElementById("input2").value);
    var loanLength = parseInt(document.getElementById("input3").value);
    if(isNaN(amount) || amount <= 0) {
        alert("Please enter the money amount to borrow");
        return;
    }
    if(isNaN(interestRate) || interestRate <= 0) {
        alert("Please enter the annual interest rate");
        return;
    }
    if(isNaN(loanLength) || loanLength <= 0) {
        alert("Please enter the length to loan");
        return;
    }

    // Calculate the total interest
    var totalInterest = calcTotalInterest(amount, interestRate, loanLength);
    // Calculate the monthly interest
    var monthInterest = calcMonthInterest(amount, interestRate);
    var monthInterestInt = Math.floor(monthInterest);
    var firstMonthInterest = totalInterest - monthInterestInt * (loanLength - 1);

    document.getElementById("result").innerHTML = "<p>Monthly interest payment: £"+
        monthInterest.toFixed(3)+"(First month: £"+firstMonthInterest.toFixed(2)+", after that £"+
        monthInterestInt.toFixed(2)+"/month)</p><p>Total interest paid: £"+
        totalInterest.toFixed(2)+"</p>";
});

// Calculate the monthly interest
function calcMonthInterest(amount, interestRate) {
    return amount * interestRate / 12.0 / 100;
}

// Calculate the total interest
function calcTotalInterest(amount, interestRate, loadLength) {
    return amount * interestRate * loadLength / 12.0 / 100;
}

// Add keydown event listener to input3 (months input) to check is a invalid input of period 
// or an enter to try
document.getElementById("input3").addEventListener("keydown", function (e) {
    if(!e) {
        e = window.event;
    }
    
    console.log(e.keyCode);
    switch(e.keyCode) {
        case 13: // enter key, do the Try
            calcIt.click();
            return false;
        case 46: // period (46, 190) and "E" (69) key, need to be skipped
            preventKeyInput(e);
            //alert(e.keyCode);
            return false;
        case 190: // period (46, 190) and "E" (69) key, need to be skipped
            //alert(e.keyCode);
            preventKeyInput(e);
            return false;
        case 69: // period (46, 190) and "E" (69) key, need to be skipped
            //alert(e.keyCode);
            preventKeyInput(e);
            return false;
    }
});

// Prevent false input key
function preventKeyInput(e) {
    if(e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
}
    
// Add keydown event listener to input1 (months input) and input2 to move to the next input
function moveToOtherInput(input) {
    var inputEl = document.getElementById(input);
    inputEl.focus();
    inputEl.select();
}

function moveInputOnEnterKey(e) {
    if(!e) {
        e = window.event;
    }
    
    console.log(e.keyCode);
    switch(e.keyCode) {
        case 13: // enter key, do the Try
            var target = e.target || e.srcElement;
            var input = "";
            console.log(target.id);
            input = target.id === "input1" ? "input2" : "input3";

            moveToOtherInput(input);
            return false;
    }
}

document.getElementById("input1").addEventListener("keydown", moveInputOnEnterKey);
document.getElementById("input2").addEventListener("keydown", moveInputOnEnterKey);
