
const display = document.getElementById("display");




function clearDisplay(){
    display.value = '';
}

function addToDisplay(input){
    let lastChar = display.value.slice(-1);
    const operators = ['+', '-', '*', '/', '%', '^'];
    const nums = [];
    for(let i = 0; i < 10; i++){
        nums.push(i)
    }
    
    if(input == '^' || input == '**'){
        display.value += ' **';
    }


    else {

        if(input == 'π' || input.toLowerCase() == 'pi'){
            if (lastChar == '-' ||operators.includes(display.value.slice(-2))){
                display.value += '3.14';

            } else {
                display.value += ' 3.14';

            }
        }

        else if (input == '-' && (operators.includes(lastChar) || display.value == '')){ // input is minus sign and last char is operator or display is empty
            display.value += ' ' + input;
        }

        else if (input == '0' && lastChar == '0'){
            display.value += ''; // if last character is 0 and input is 0, do nothing

        }

        else if (!operators.includes(input) && (lastChar == '-' || operators.includes(display.value.slice(-2)))){
            display.value += input; // if the last character is a minus sign or an operator, and  input is a number
        }

        else if (operators.includes(input) && display.value == ''){ // if  display is empty and input is operator
            display.value += '';

        }

        else if (!operators.includes(lastChar) && !operators.includes(input)){ // if last character is a number and input is a number (more than one digit num)
            display.value += input;
        }

        else if (operators.includes(lastChar) && operators.includes(input)){ // if last character is an operator and input is a number
            display.value += '' // add space before the operator
        }

        else if (operators.includes(lastChar) || operators.includes(input)) { // if last character is an operator or input is an operator
            display.value += ' ' + input;
            
        }
    }
    
}
function calculateDisplay(){
    try{
        display.value = eval(display.value);
    }
    catch(error){
        display.value = "Error";
    }

    display.focus();
}


function backspaceDisplay(){
    let lastChar = display.value.slice(-1);

    if (lastChar == ' ' || lastChar == 'π' || lastChar.toLowerCase() == 'pi') {
        display.value = display.value.slice(0, -2); // remove last character and space
    }

    else if (display.value == '') {
        display.value = '';
    }
    
    else {
        display.value = display.value.slice(0, -1);
    }

}

document.addEventListener('keydown', e => {

  /* Evaluate the expression */
  if (e.key === 'Enter') {
    calculateDisplay();
    e.preventDefault();          // stop form-submit blip
    return;
  }

  /* Backspace handling */
  if (e.key === 'Backspace') {
    backspaceDisplay();
    e.preventDefault();          // stop browser from going “Back”
    return;
  }

  if (e.key === 'c') {
    clearDisplay();
    e.preventDefault();          // stop browser from going “Back”
    return;
  }

  if (e.key === 'Space') {
    return;
  }

  const allowed = '0123456789+-*/%^.';
  if (allowed.includes(e.key)) {
    addToDisplay(e.key);
    e.preventDefault();
    return;
  }

});


