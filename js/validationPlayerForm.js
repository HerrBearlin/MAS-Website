

function validateForm()
{

    const fNameInput = document.getElementById('fName');
    const lNameInput = document.getElementById('lName');
    const nNameInput = document.getElementById('nName');
    const dateOfBirthInput = document.getElementById('dateOfBirth');
    const isCaptainInput = document.getElementById('isCaptain');
    const pPlayedInput = document.getElementById('pPlayed');
    const phNumberInput = document.getElementById('phNumber');
    const passwordInput = document.getElementById('password');

    const errorfNameInput = document.getElementById('errorFirstName');
    const errorlNameInput = document.getElementById('errorLastName');
    const errornNameInput = document.getElementById('errorNickName');
    const errordateOfBirthInput = document.getElementById('errorDateOfBirth');
    const errorisCaptainInput = document.getElementById('errorIsCaptain');
    const errorpPlayedInput = document.getElementById('errorPositionPlayed');
    const errorphNumberInput = document.getElementById('errorPhoneNumber');
    const errorPasswordInput = document.getElementById('errorPassword');
    const errorsSummary = document.getElementById('errorsSummary');


    const fieldRequiredMessage = document.getElementById('fieldRequired').innerText;
    const field2_60CharMessage = document.getElementById('field260Char').innerText;
    const fieldDateIsAfterMessage = document.getElementById('fieldDateIsAfter').innerText;
    const fieldSuitablePhNumberMessage = document.getElementById('fieldSuitablePhNumber').innerText;


    resetErrors([fNameInput,lNameInput,nNameInput,dateOfBirthInput,isCaptainInput,pPlayedInput,phNumberInput],
                [errorfNameInput, errorlNameInput, errornNameInput, errordateOfBirthInput, errorisCaptainInput, errorpPlayedInput, errorphNumberInput],
                errorsSummary);
    
    let valid = true;

    if(!checkRequired(fNameInput.value))
    {
        valid = false;
        fNameInput.classList.add("error-input");
        errorfNameInput.innerText = fieldRequiredMessage;
    }else if (!checkTextLengthRange(fNameInput.value, 2, 60))
    {
        valid = false;
        fNameInput.classList.add("error-input");
        errorfNameInput.innerText = field2_60CharMessage;
    }

    if(!checkRequired(lNameInput.value))
    {
        valid = false;
        lNameInput.classList.add("error-input");
        errorlNameInput.innerText =fieldRequiredMessage;
    }else if (!checkTextLengthRange(lNameInput.value, 2, 60))
    {
        valid = false;
        lNameInput.classList.add("error-input");
        errorlNameInput.innerText = field2_60CharMessage;
    }

    if(!checkRequired(nNameInput.value))
    {
        valid = false;
        nNameInput.classList.add("error-input");
        errornNameInput.innerText = fieldRequiredMessage;
    }else if (!checkTextLengthRange(nNameInput.value, 2, 60))
    {
        valid = false;
        nNameInput.classList.add("error-input");
        errornNameInput.innerText = field2_60CharMessage;
    }

    if(!checkRequired(dateOfBirthInput.value))
    {
        valid = false;
        dateOfBirthInput.classList.add("error-input");
        errordateOfBirthInput.innerText = fieldRequiredMessage;
    }else if (!checkDateIsAfter(dateOfBirthInput.value, nowString))
    {
        valid = false;
        dateOfBirthInput.classList.add("error-input");
        errordateOfBirthInput.innerText = fieldDateIsAfterMessage;
    }

    if(!checkRequired(isCaptainInput.value))
    {
        valid = false;
        isCaptainInput.classList.add("error-input");
        errorisCaptainInput.innerText = fieldRequiredMessage;
    }

    if(!checkRequired(phNumberInput.value))
    {
        valid = false;
        phNumberInput.classList.add("error-input");
        errorphNumberInput.innerText = fieldRequiredMessage;
    }else if (!checkPhoneNumber(phNumberInput.value))
    {
        valid = false;
        phNumberInput.classList.add("error-input");
        errorphNumberInput.innerText = fieldSuitablePhNumberMessage;
    }

    if(!checkRequired(passwordInput.value))
    {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPasswordInput.innerText = fieldRequiredMessage;
    }

    if(!valid)
    {
        errorsSummary.innerText = "Form contains errors.";
    }

    return valid;

}