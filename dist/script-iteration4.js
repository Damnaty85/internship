document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded!!!');

    const options = [
        {name: 'addition', value: '+'},
        {name: 'subtraction', value: '-'},
        {name: 'multiply', value: '*'},
        {name: 'degree', value: '/'},
        {name: 'to the extent', value: '**'},
        {name: 'emainder of the division', value: '%'},
        {name: 'square root of', value: '1/2'},
        {name: 'cubic root of', value: '1/3'},
    ]

    const optionTemplate = (name, value) => {
        return(
            `<option value="${value}">${name}</option>`
        )   
    }

    const app = document.getElementById('app');
    const templateInput = document.getElementById('input');
    const templateSelect = document.getElementById('select');
    const cloneInput1 = templateInput.content.cloneNode(true);
    const cloneSelect = templateSelect.content.cloneNode(true);
    const cloneInput2 = templateInput.content.cloneNode(true);

    app.insertAdjacentHTML('beforebegin', `<h3 style="text-align:center;margin-top:20px;">Simple calculator</h3>`)
    app.insertAdjacentHTML('afterbegin', `<p class="error"></p>`)
    app.appendChild(cloneInput1);
    app.appendChild(cloneSelect);
    app.appendChild(cloneInput2);
    app.insertAdjacentHTML('beforeend', `<span class="equal"></span>`)
    app.insertAdjacentHTML('beforeend', `<button class="save">Save result</button>`)

    options.map((it) => {
        const {name, value} = it;
        document.querySelector("select").insertAdjacentHTML('beforeend', optionTemplate(name, value))
    })

    const equal = document.querySelector('.equal');
    const select = document.querySelector('select');
    const error = document.querySelector('.error')
    const inputs = [...document.querySelectorAll('.field-template')];
    let savedValue;

    const isNumber = new RegExp(/^\d*\.?\d*$/);

    for (const input of inputs) {
        input.addEventListener('input', () => {
            if (!isNumber.test(input.value)) {
                error.textContent = 'Only number please';
                error.style.color = 'red';
                input.value = input.value.replace(/[^\d.]/g, '');
                input.classList.add('_error')
            } else {
                error.innerHTML = '';
                input.classList.remove('_error')
            }
            const operand = select.value;
            const firstVal = parseInt(inputs[0].value);        
            const secondVal = parseInt(inputs[1].value);

            equal.innerHTML = `calculation result: <b style="color:green;font-size:1.2em;">${findingAction(firstVal, secondVal, operand)}</b>`;
        })
        input.addEventListener('focus', () => {
            input.value = '';
            input.classList.add('_selected');
        })
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.value = 0;
                input.classList.remove('_error')
            }
            input.classList.remove('_selected');
        })
    }

    select.addEventListener('change', function() {
        const operand = select.value;
        const firstVal = parseInt(inputs[0].value);        
        const secondVal = parseInt(inputs[1].value);

        equal.innerHTML = `calculation result: <b style="color:green;font-size:1.2em;">${findingAction(firstVal, secondVal, operand)}</b>`;
    });

    const saveButton = document.querySelector('button');
    saveButton.addEventListener('click', function(evt) {
        evt.stopPropagation;
        try{
            if(equal.querySelector('b') && equal.querySelector('b').textContent !== '0'){
                savedValue = equal.querySelector('b').textContent;
                this.insertAdjacentHTML('afterend', `<span>Saved value: ${savedValue}</span>`)
            } else {
                throw new SyntaxError('Nothing to save, calculate first')
            }
        } catch(err) {
            if (err.name === "SyntaxError") {
                alert(err.message);
            }     
        }
    })

    const wrapper = document.querySelector('.external-script');
    const elements = wrapper.querySelectorAll('.external-script__item');

    elements[0].addEventListener('mouseenter', function() {
        this.classList.add('_mouseenter');
    })

    elements[0].addEventListener('mouseleave', function() {
        this.classList.remove('_mouseenter');
    })

    elements[1].addEventListener('click', function() {
        this.classList.toggle('_clickable');
    })

    const input = elements[3].querySelector('input');
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('_input-focus');
    })
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('_input-focus');
    })

    const container = document.getElementById('textGenerate');
    container.addEventListener('click', createEvents);

    function createEvents(evt) {
        this.innerHTML = 'Hello World!'
    }
})

function findingAction(a, b, expression) {
    const errorProcessing = (result) => {
        try {
            if (isFinite(result)) {
                return result
            } else {
                throw new SyntaxError('Invalid data type "'+ result +'"');
            }
        } catch(err) {
            if (err.name === "SyntaxError") {
                console.error(err.message);
            }
        }
    }

    switch (expression) {
        case '+':
            return errorProcessing(a + b)
            break;
        case '-':
            return errorProcessing(a - b)
            break;
        case '*':
            return errorProcessing(a * b)
            break;
        case '/':
            return errorProcessing(a / b)
            break;
        case '**':
            return errorProcessing(a ** b)
            break;
        case '%':
            return errorProcessing(a % b)
            break
        case '1/2':
            return errorProcessing(b ** 1/2)
            break;
        case '1/3':
            return errorProcessing(b ** 1/3)
            break
    }
};