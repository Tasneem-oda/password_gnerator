let passwordEle = document.querySelector('.password');
let password_lenght = document.querySelector('.password-lenght span');
let length_input = document.querySelector('.length-input');
let numberEle = document.getElementById('numbers');
let lowerEle = document.getElementById('lowercase');
let upperEle = document.getElementById('uppercase');
let symbolEle = document.getElementById('symbols');
let checkboxes = document.querySelectorAll('.options input')
let GeneratBtn = document.querySelector('.generat');

let numbers = '1234567890';
let uperletters = 'ABCDEFGHIjKLMNOPQRSTUVWXYZ';
let lowerletters = 'abcdefghijklmnopqrstuvwxyz';
let symbols = '~!@#$%^&*()_+=-';
password_lenght.textContent = length_input.value;
length_input.addEventListener('input', function(){
    password_lenght.textContent = length_input.value;
})

function get_uperletters(){
    return uperletters[Math.floor(Math.random()*uperletters.length)];
};
function get_lowerletters(){
    return lowerletters[Math.floor(Math.random()*lowerletters.length)];
};
function get_numbers(){
  return numbers[Math.floor(Math.random()*numbers.length)] ;
};
function get_symbols(){
    return symbols[Math.floor(Math.random()*symbols.length)] ;
};
function generatexs(){
    let xs =[];
    if(numberEle.checked){
        xs.push(get_numbers())
    }
    if(lowerEle.checked){
        xs.push(get_lowerletters())
    }
    if(upperEle.checked){
        xs.push(get_uperletters())
    }
    if(symbolEle.checked){
        xs.push(get_symbols())
    }
    passwordEle.innerHTML += xs[Math.floor(Math.random()*xs.length)];
}

function genetatePassword(){
    for(let i = 0 ;i<length_input.value;i++){
        generatexs()
    }
}
GeneratBtn.addEventListener('click', function(){
    passwordEle.innerHTML = '';
   genetatePassword()
})
