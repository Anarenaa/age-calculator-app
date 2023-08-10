const buttonElement = document.querySelector('.input-block__button');
const inputFields = document.querySelectorAll('.input-block__field');

const date = new Date();

function mainFunction() {
    
    let hasErrors = false;

    let day = parseInt(document.getElementById('day').value);
    let month = parseInt(document.getElementById('month').value);
    let year = parseInt(document.getElementById('year').value);

    let nowDay = date.getDate();
    let nowMonth = date.getMonth() + 1;
    let nowYear = date.getFullYear();

    let inputDate = new Date(year, month - 1, day);
    let todayDate = new Date(nowYear, nowMonth - 1, nowDay);

    let resultDay, resultMonth, resultYear;
    
    //validation
    inputFields.forEach(inputField => {
        const inputElement = inputField.closest('.input-block__element');
        const note = inputElement.querySelector('.input-block__note');
        const value = parseInt(inputField.value);
        
        if (inputField.value === '') {
            addError('This field is required');
        } else if (inputField.id === 'day' && (value > 31 || value < 1)) {
            addError('Must be a valid day');
        } else if (inputField.id === 'month' && (value > 12 || value < 1)) {
            addError('Must be a valid month');
        } else if (inputField.id === 'day' && month === 2 && day === 29 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) {
            inputElement.classList.remove('error');
            note.innerHTML = '';
        } else if (inputField.id === 'day' && month === 2 && day > 28) {
            addError('Must be a valid date');
        } else if (inputField.id === 'day' && (day === 31) && (month === 4 || month === 6 || month === 9 || month === 11)) {
            addError('Must be a valid date');
        } else if (inputDate.getTime() > todayDate.getTime()) {
            addError('Must be in the past');
        } else {
            inputElement.classList.remove('error');
            note.innerHTML = ''
        }

        function addError(text) {
            inputElement.classList.add('error');
            note.innerHTML = text;
            hasErrors = true;
        }
    });

    if (!hasErrors) {
        countDate();

        document.getElementById('result__years').innerHTML = resultYear;
        document.getElementById('result__months').innerHTML = resultMonth;
        document.getElementById('result__days').innerHTML = resultDay;
    }

    function countDate() {
        
        resultYear = nowYear - year;

        if (nowMonth >= month) {
            resultMonth = nowMonth - month;
        } else {
            resultYear--;
            resultMonth = 12 + nowMonth - month;
        }

        if (nowDay >= day) {
            resultDay = nowDay - day;
        } else {
            resultMonth--;
            resultDay = getDateInMonth(year, month) + nowDay - day;
        }

        if (resultMonth < 0) {
            resultMonth = 11;
            resultYear--;
        }
        
        function getDateInMonth(y, m) {
            return new Date(y, m, 0).getDate();
        }
    }
}

buttonElement.addEventListener('click', () => {
    mainFunction();
});
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        mainFunction();
    }
});