function validateForm()
{

    const orgNameInput = document.getElementById('orgName');
    const leagueNameInput = document.getElementById('leagueName');
    const budgetInput = document.getElementById('budget');
  

    const errororgNameInput = document.getElementById('errorOrgName');
    const errorleagueNameInput = document.getElementById('errorLeagueName');
    const errorbudgetInput = document.getElementById('errorBudget');
    const errorsSummary = document.getElementById('errorsSummary');

    const fieldRequiredMessage = document.getElementById('errorMessage-required').innerText;
    const field2_60CharMessage = document.getElementById('field2_60Char').innerText;
    const fieldNumberMessage = document.getElementById('fieldNumber').innerText;
    const fieldNumberRange20_10mlnMessage = document.getElementById('fieldNumberRange20_10mln').innerText;

    resetErrors([orgNameInput,leagueNameInput,budgetInput],
                [errororgNameInput, errorleagueNameInput, errorbudgetInput],
                errorsSummary);
    
    let valid = true;

    if(!checkRequired(orgNameInput.value))
    {
        valid = false;
        orgNameInput.classList.add("error-input");
        errororgNameInput.innerText = fieldRequiredMessage;
    }else if (!checkTextLengthRange(orgNameInput.value, 2, 60))
    {
        valid = false;
        orgNameInput.classList.add("error-input");
        errororgNameInput.innerText = field2_60CharMessage;
    }

    if(!checkRequired(leagueNameInput.value))
    {
        valid = false;
        leagueNameInput.classList.add("error-input");
        errorleagueNameInput.innerText = fieldRequiredMessage;
    }else if (!checkTextLengthRange(leagueNameInput.value, 2, 60))
    {
        valid = false;
        leagueNameInput.classList.add("error-input");
        errorleagueNameInput.innerText = field2_60CharMessage;
    }

    if(!checkRequired(budgetInput.value))
    {
        valid = false;
        budgetInput.classList.add("error-input");
        errorbudgetInput.innerText = fieldRequiredMessage;
    }else if (!checkNumber(budgetInput.value))
    {
        valid = false;
        budgetInput.classList.add("error-input");
        errorbudgetInput.innerText = fieldNumberMessage;
    }else if(!checkNumberRange(budgetInput.value, 20000, 10000000))
    {
        valid = false;
        budgetInput.classList.add("error-input");
        errorbudgetInput.innerText = fieldNumberRange20_10mlnMessage;
    }

    
    if(!valid)
    {
        errorsSummary.innerText = "Form contains errors.";
    }

    return valid;

}