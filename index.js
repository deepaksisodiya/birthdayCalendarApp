/**
 * Created by deepaksisodiya on 20/10/16.
 */


(function () {

  var finalObject = {};
  var year;
  var jsonData;
  var initialNameBoxClassName = 'initialNameBox';

  var button = document.getElementById('updateBtn');
  button.addEventListener('click', function(e) {
    e.preventDefault();
    clearDom();
    getFormData();
    if(isValidForm()) {
      parseJson();
      mapObjToDom();
    }
  }, false);

  function isValidForm() {
    if(jsonData && year) {
      if(isValidJSON()) {
        if(isValidYear()) {
          return true;
        } else {
          alert('Year field is not correct!');
        }
        return true;
      } else {
        alert('JSON is not correct!');
        return false;
      }
    } else {
      alert('Please fill all fields of form');
    }
  }

  function isValidYear() {
    var date = new Date(year.toString());
    if(date.toDateString() === 'Invalid Date') {
      return false;
    } else {
      return true;
    }
  }

  function isValidJSON() {
    var json = typeof jsonData !== 'string' ? JSON.stringify(jsonData) : jsonData;
    try {
      var data = JSON.parse(json);
    } catch (e) {
      return false;
    }
    if(typeof data === 'object' && data !== null) {
      return true;
    }
    return false;
  }

  function clearDom() {
    finalObject = {};
    var initialNameBoxNodeList = document.getElementsByClassName(initialNameBoxClassName);
    Array.prototype.slice.call(initialNameBoxNodeList).map(function (value) {
      value.parentNode.removeChild(value);
    });
  }
  
  function getFormData() {
    year = document.getElementById('year').value;
    jsonData = document.getElementById('jsonData').value;
  }

  function parseJson() {
    var jsonObjArr = JSON.parse(jsonData);
    jsonObjArr.map(function (obj) {
      var initialName = findInitialsFromName(obj.name);
      var day = getDate(obj.birthday);
      var age = getAge(obj.birthday);
      if(finalObject[day] === undefined) {
        finalObject[day] = [[initialName, age]];
        //finalObject[day] = [initialName]
      } else {
        finalObject[day].push([initialName, age]);
        //finalObject[day].push(initialName);
      }
      return obj;
    });
  }

  function getAge(birthday) {
    var birthday = birthday.split('/');
    var day = birthday[0];
    var month = birthday[1];
    var year = birthday[2];
    var birthDate = new Date(year, month - 1, day);
    var ageDifMs = Date.now() - birthDate.getTime();
    var ageDate = new Date(ageDifMs);
    var age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
  }

  function _calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  function findInitialsFromName(name) {
    return name.split(" ").map(function (str) {
      return str.charAt(0);
    }).join("");
  }

  function getDate(birthdayDate) {
    var birthdayDateArr = birthdayDate.split("/");
    var date = birthdayDateArr[0];
    var month = birthdayDateArr[1] - 1;
    var day = new Date(year, month, date).getDay();
    return day;
  }

  function mapObjToDom() {
    for(var arr in finalObject) {
      var nameArr = finalObject[arr];
      var nameArrLength = nameArr.length;
      var divider = getDivider(1, 5, nameArrLength, 2, 0);
      var percentage = 100 / divider;
      var docFrag = document.createDocumentFragment();
      nameArr.map(function (innerArray) {
        docFrag.appendChild(createDiv(innerArray[0], percentage, innerArray[1]));
      });
      var divList = docFrag.querySelectorAll('div.initialNameBox');
      divList = Array.prototype.slice.call(divList, 0);
      divList.sort(function(a, b) {
        return parseInt(a.getAttribute("age")) - parseInt(b.getAttribute("age"));
      }).forEach(function(bug) {
        document.getElementById(arr).appendChild(bug);
      });
      //console.log('elements ', elements);
      //document.getElementById(arr).appendChild(docFrag);
    }
  }
  
  function createDiv(text, percentage, age) {
    var div = document.createElement('div');
    div.className = initialNameBoxClassName;
    div.setAttribute('age', age);
    div.style.backgroundColor = getRandomColor();
    div.style.width = percentage + '%';
    div.style.height = percentage + '%';
    var div2 = document.createElement('div');
    div2.className = 'initialNameText';
    var node = document.createTextNode(text);
    div2.appendChild(node);
    div.appendChild(div2);
    return div;
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getDivider(a, b, numberOfElements, divider, incrementValue) {
    if(numberOfElements > 1) {
      if(numberOfElements > a && numberOfElements < b) {
        return divider;
      } else {
        a = b - 1;
        b = b + 5 + incrementValue;
        divider = divider + 1;
        incrementValue = incrementValue + 2;
        return getDivider(a, b, numberOfElements, divider, incrementValue);
      }
    } else {
      return 1;
    }
  }

})();