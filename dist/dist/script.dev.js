"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

document.addEventListener('DOMContentLoaded', function () {
  console.log('Page loaded!!!');
  var options = [{
    name: 'addition',
    value: '+'
  }, {
    name: 'subtraction',
    value: '-'
  }, {
    name: 'multiply',
    value: '*'
  }, {
    name: 'degree',
    value: '/'
  }, {
    name: 'to the extent',
    value: '**'
  }, {
    name: 'emainder of the division',
    value: '%'
  }, {
    name: 'square root of',
    value: '1/2'
  }, {
    name: 'cubic root of',
    value: '1/3'
  }];

  var optionTemplate = function optionTemplate(name, value) {
    return "<option value=\"".concat(value, "\">").concat(name, "</option>");
  };

  var app = document.getElementById('app');
  var templateInput = document.getElementById('input');
  var templateSelect = document.getElementById('select');
  var cloneInput1 = templateInput.content.cloneNode(true);
  var cloneSelect = templateSelect.content.cloneNode(true);
  var cloneInput2 = templateInput.content.cloneNode(true);
  app.insertAdjacentHTML('beforebegin', "<h3 style=\"text-align:center;margin-top:20px;\">Simple calculator</h3>");
  app.insertAdjacentHTML('afterbegin', "<p class=\"error\"></p>");
  app.appendChild(cloneInput1);
  app.appendChild(cloneSelect);
  app.appendChild(cloneInput2);
  app.insertAdjacentHTML('beforeend', "<span class=\"equal\"></span>");
  app.insertAdjacentHTML('beforeend', "<button class=\"save\">Save result</button>");
  options.map(function (it) {
    var name = it.name,
        value = it.value;
    document.querySelector("select").insertAdjacentHTML('beforeend', optionTemplate(name, value));
  });
  var equal = document.querySelector('.equal');
  var select = document.querySelector('select');
  var error = document.querySelector('.error');

  var inputs = _toConsumableArray(document.querySelectorAll('.field-template'));

  var savedValue;
  var isNumber = new RegExp(/^\d*\.?\d*$/);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var input = _step.value;
      input.addEventListener('input', function () {
        if (!isNumber.test(input.value)) {
          error.textContent = 'Only number please';
          error.style.color = 'red';
          input.value = input.value.replace(/[^\d.]/g, '');
          input.classList.add('_error');
        } else {
          error.innerHTML = '';
          input.classList.remove('_error');
        }

        var operand = select.value;
        var firstVal = parseInt(inputs[0].value);
        var secondVal = parseInt(inputs[1].value);
        equal.innerHTML = "calculation result: <b style=\"color:green;font-size:1.2em;\">".concat(findingAction(firstVal, secondVal, operand), "</b>");
      });
      input.addEventListener('focus', function () {
        input.value = '';
        input.classList.add('_selected');
      });
      input.addEventListener('blur', function () {
        if (!input.value) {
          input.value = 0;
          input.classList.remove('_error');
        }

        input.classList.remove('_selected');
      });
    };

    for (var _iterator = inputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  select.addEventListener('change', function () {
    var operand = select.value;
    var firstVal = parseInt(inputs[0].value);
    var secondVal = parseInt(inputs[1].value);
    equal.innerHTML = "calculation result: <b style=\"color:green;font-size:1.2em;\">".concat(findingAction(firstVal, secondVal, operand), "</b>");
  });
  var saveButton = document.querySelector('button');
  saveButton.addEventListener('click', function (evt) {
    evt.stopPropagation;

    try {
      if (equal.querySelector('b') && equal.querySelector('b').textContent !== '0') {
        savedValue = equal.querySelector('b').textContent;
        this.insertAdjacentHTML('afterend', "<span>Saved value: ".concat(savedValue, "</span>"));
      } else {
        throw new SyntaxError('Nothing to save, calculate first');
      }
    } catch (err) {
      if (err.name === "SyntaxError") {
        alert(err.message);
      }
    }
  });
});

function findingAction(a, b, expression) {
  var errorProcessing = function errorProcessing(result) {
    try {
      if (isFinite(result)) {
        return result;
      } else {
        throw new SyntaxError('Invalid data type "' + result);
      }
    } catch (err) {
      if (err.name === "SyntaxError") {
        console.error(err.message);
      }
    }
  };

  switch (expression) {
    case '+':
      return errorProcessing(a + b);
      break;

    case '-':
      return errorProcessing(a - b);
      break;

    case '*':
      return errorProcessing(a * b);
      break;

    case '/':
      return errorProcessing(a / b);
      break;

    case '**':
      return errorProcessing(Math.pow(a, b));
      break;

    case '%':
      return errorProcessing(a % b);
      break;

    case '1/2':
      return errorProcessing(Math.pow(b, 1) / 2);
      break;

    case '1/3':
      return errorProcessing(Math.pow(b, 1) / 3);
      break;
  }
}

;