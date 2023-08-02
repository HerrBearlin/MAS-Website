



function validateForm()
{

   

    const playerIdInput = document.getElementById('pId');
    const orgIdInput = document.getElementById('orgId');
    const dateFromInput = document.getElementById('dateFrom');
    const dateToInput = document.getElementById('dateTo');
    const salaryInput = document.getElementById('salary');

    const errorplayerIdInput = document.getElementById('errorPlayerId');
    const errororgIdInput = document.getElementById('errorOrgId');
    const errordateFromInput = document.getElementById('errorDateFrom');
    const errordateToInput = document.getElementById('errorDateTo');
    const errorsalaryInput = document.getElementById('errorSalary');
    const errorsSummary = document.getElementById('errorsSummary');


    const fieldRequiredMessage = document.getElementById('errorMessage-required').innerText;
    const fieldNumberMessage = document.getElementById('fieldNumber').innerText;
    const fieldNumberRange20_10mlnMessage = document.getElementById('fieldNumberRange20_10mln').innerText;
    const fieldDateIsAfterMessage = document.getElementById('fieldDateIsAfter').innerText;
    const fieldDateFormatMessage = document.getElementById('fieldDateFormat').innerText;
    const fieldDateFromAfterDateToMessage = document.getElementById('fieldDateFromAfterDateTo').innerText;

    resetErrors([playerIdInput,orgIdInput,dateFromInput,dateToInput,salaryInput],
                [errorplayerIdInput, errororgIdInput, errordateFromInput, errordateToInput, errorsalaryInput],
                errorsSummary);
    
    let valid = true;

    if(!checkRequired(playerIdInput.value))
    {
        valid = false;
        playerIdInput.classList.add("error-input");
        errorplayerIdInput.innerText = fieldRequiredMessage;
    }
   

    if(!checkRequired(orgIdInput.value))
    {
        valid = false;
        orgIdInput.classList.add("error-input");
        errororgIdInput.innerText = fieldRequiredMessage;
    }

    if(!checkRequired(dateFromInput.value))
    {
        valid = false;
        dateFromInput.classList.add("error-input");
        errordateFromInput.innerText = fieldRequiredMessage;
    } 
    if(!checkRequired(dateToInput.value))
    {
        valid = false;
        dateToInput.classList.add("error-input");
        errordateToInput.innerText = fieldRequiredMessage;
    }else if (!checkDate(dateFromInput.value))
    {
        valid = false;
        dateFromInput.classList.add("error-input");
        errordateFromInput.innerText = fieldDateFormatMessage;
    }else if (!checkDateIsAfter(dateFromInput.value, nowString))
    {
        valid = false;
        dateFromInput.classList.add("error-input");
        errordateFromInput.innerText = fieldDateIsAfterMessage;
    }else if (!checkRequired(dateFromInput.value) && checkDate(dateToInput.value)
              && !checkDateIsAfter(dateToInput.value, dateFromInput.value))
    {
        valid = false;
        dateToInput.classList.add("error-input");
        errordateToInput.innerText = fieldDateFromAfterDateToMessage;
    }

  

    if(!checkRequired(salaryInput.value))
    {
        valid = false;
        salaryInput.classList.add("error-input");
        errorsalaryInput.innerText = fieldRequiredMessage;
    
    } else if (!checkNumber(salaryInput.value))
    {
        valid = false;
        salaryInput.classList.add("error-input");
        errorsalaryInput.innerText = fieldNumberMessage;
    }else if (!checkNumberRange(salaryInput.value, 20000, 10000000))
    {
        valid = false;
        salaryInput.classList.add("error-input");
        errorsalaryInput.innerText = fieldNumberRange20_10mlnMessage;
    }

    if(!valid)
    {
        errorsSummary.innerText = "Form contains errors.";
    }

    return valid;

}
