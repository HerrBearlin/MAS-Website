
 let nowDate = new Date(),
 month = '' + (nowDate.getMonth()+1),
 day = '' + nowDate.getDate(),
 year = nowDate.getFullYear();

 if(month.length <2){
 month = '0' + month;
 }
 if(day.length < 2){
 day = '0' + day;
 }
 const nowString= [year, month, day].join('-');
 console.log(nowString);
 console.log(nowDate);

function resetErrors(inputs, errrorTexts, errorInfo)
{
    for (let i = 0; i<inputs.length; i++)
    {
        inputs[i].classList.remove("error-input");
    }
    for(let i=0; i<errrorTexts.length; i++)
    {
        errrorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}

function checkRequired(value){
    if (!value ){
        return false;
    }
    value = value.toString().trim();
    if (value === ""){
        return false;
    }
    return true;
}

function checkTextLengthRange(value, min, max)
{
    if (!value){
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (max && length > max){
        return false;
    }
    if (min && length < min){
        return false;
    }
    return true;
}

function checkDate(value)
{
    if (!value)
    {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    return pattern.test(value);
}


function checkNumber(value)
{
    if (!value)
    {
        return false;
    }
    if (isNaN(value))
    {
        return false;
    }
    return true;
}

function checkNumberRange( value, min, max)
{
    if (!value)
    {
        return false;
    }
    if (isNaN(value))
    {
        return false;
    }
    value = parseFloat(value);
    if (value < min){
        return false;
    }
    if (value > max){
        return false;
    }
    return true;
}

function checkDateIsAfter(value, compareTo)
{
    if (!value)
    {
        console.log("Date is wrong");
        return false;
    }

    if (!compareTo)
    {
        console.log("Compared date is wrong");
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    if (!pattern.test(value))
    {
        console.log("Value date pattern  is wrong");
        return false;
    }
    if (!pattern.test(compareTo))
    {
        console.log("Compared date pattern is wrong");
        return false;
    }
    const valueDate = new Date(value);
    const compareToDate = new Date(compareTo);
    if (valueDate.getTime() > compareToDate.getTime())
    {
        return false;
    }
    return true;
}

function checkPhoneNumber(value)
{
    if(!value)
    {
        return false;
    }
    value = value.toString().trim();
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return regex.test(value);
}