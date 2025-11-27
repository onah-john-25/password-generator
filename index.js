
const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

let numCharacters = characters.filter(char => {
    return /[0-9]/.test(char)
})

let specialCharacters= characters.filter(char => {
    return /[^0-9a-zA-Z]/.test(char)
})

let alphabetCharacters = characters.filter(char => {
    return /[a-zA-Z]/.test(char)
})

let newCharacters = [...alphabetCharacters]

// DOM VARIABLES
const passwordTextsEl = document.querySelectorAll('.password-text-el')
const passwordBtnEl = document.querySelector('.generate-password-btn-el')
const passwordLengthEl = document.getElementById('pass-length')

const checkboxesEl = document.querySelectorAll('input[type="checkbox')

let isNumber = false
let isSpecialChar = false

// check if password would include number or special characters;
for(let i = 0; i < checkboxesEl.length; i++) {
    checkboxesEl[i].addEventListener('change', () => {  
        
        if(checkboxesEl[i].value === 'num') {
            isNumber = checkboxesEl[i].checked
        }
        else if (checkboxesEl[i].value = 'char') {
            isSpecialChar = checkboxesEl[i].checked
        }

        if(isNumber && !isSpecialChar) {
            newCharacters = [...numCharacters, ...alphabetCharacters]
        }
        else if(isSpecialChar && !isNumber) {
            newCharacters = [...specialCharacters, ...alphabetCharacters]
        }
        else if(isSpecialChar && isNumber) {
            newCharacters = [...characters]
        }
        else if(!isSpecialChar && !isNumber) {
            newCharacters = [...alphabetCharacters]
        }
    })
}

// PREVENT FORM DEFAULT BEHAVIOUR
document.addEventListener('submit', (e) => e.preventDefault())

//  RENDER PASSWORD 
passwordBtnEl.addEventListener('click', renderPassword)

function renderPassword() {
    if(!passwordLengthEl.value) {
        return
    }
     else if(passwordLengthEl.value > 18) {
        alert("Password length can't be greater than 18 character!")
    }
    else if(passwordLengthEl.value < 8) {
        alert("Password length can't be less than 6 character!")
    }
    passwordTextsEl[0].textContent = generatePassword()
    passwordTextsEl[1].textContent = generatePassword()
}

// GENERATE PASSWORD
function generatePassword() {
    let text = ''

    function getRandomNumber() {
        return Math.floor(Math.random() * newCharacters.length)
    }

    for(let i = 0; i < passwordLengthEl.value; i++) {
        text += newCharacters[getRandomNumber()]
    }
    return text
}
renderPassword()

// COPY PASSWORD to CLIPBOARD 
let i = 0;
for(i; i < passwordTextsEl.length; i++) {
    passwordTextsEl[i].addEventListener('click', (e) => copyText(e.target))
}

// COPY PASSWORD FUNCTION
function copyText(text) {
navigator.clipboard.writeText(text.innerText)
    .then(() => {
        alert('Text copied to clipboard')
    })
    .catch(err => {
        alert('Failed to copy text.')
    })
}
