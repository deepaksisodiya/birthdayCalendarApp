/**
 * Created by deepaksisodiya on 20/10/16.
 */


(function () {

  var finalObject = {};
  var year;
  var jsonData;
  var initialNameBoxClassName = 'initialNameBox';

  /*
  click event listener to update button
   */
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

  /*
  blur event listener to textarea input
   */
  var textArea = document.getElementById('jsonData');
  textArea.addEventListener('blur', function (e) {
    e.preventDefault();
    var jsonD = document.getElementById('jsonData').value;
    if(jsonD && isValidJSON(jsonD)) {
      jsonD = JSON.parse(jsonD);
      var textedJson = JSON.stringify(jsonD,null, '\t');
      document.getElementById('jsonData').value = textedJson;
    }
  }, false);

  /*
  checking if form is valid or not
   */
  function isValidForm() {
    if(jsonData && year) {
      if(isValidJSON(jsonData)) {
        if(isValidYear()) {
          return true;
        } else {
          alert('You have entered an invalid year. Please try again.');
          return false;
        }
        return true;
      } else {
        alert('You have entered an invalid json. Please try again.');
        return false;
      }
    } else {
      alert('Please fill all fields of form.');
    }
  }

  /*
  checking if year is valid or not
   */
  function isValidYear() {
    var date = new Date(year.toString());
    if(date.toDateString() === 'Invalid Date') {
      return false;
    } else {
      return true;
    }
  }

  /*
  checking if json is valid or not
   */
  function isValidJSON(jsonData) {
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

  /*
  clear all the nodes from each card
   */
  function clearDom() {
    finalObject = {};
    var myNode;
    for(var i = 0; i < 7; i++) {
      myNode = document.getElementById(i);
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }
    }
  }

  /*
  getting data from form
   */
  function getFormData() {
    year = document.getElementById('year').value;
    jsonData = document.getElementById('jsonData').value;
  }

  /*
  parsing the json and constructing an object (finalObject)
   */
  function parseJson() {
    var jsonObjArr = JSON.parse(jsonData);
    var initialName;
    var day;
    var age;
    jsonObjArr.map(function (obj) {
      initialName = findInitialsFromName(obj.name);
      day = getDate(obj.birthday);
      age = getAge(obj.birthday);
      if(finalObject[day] === undefined) {
        finalObject[day] = [[initialName, age]];
      } else {
        finalObject[day].push([initialName, age]);
      }
      return obj;
    });
  }

  /*
  takes date in formate 25/12/1990 and return age
   */
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

  /*
  takes name (John Doe) and return initials of name (JD)
   */
  function findInitialsFromName(name) {
    return name.split(" ").map(function (str) {
      return str.charAt(0);
    }).join("");
  }

  /*
  takes date in formate 25/12/1990 and return day of 25/12/year
  year is the value of year input field
   */
  function getDate(birthdayDate) {
    var birthdayDateArr = birthdayDate.split("/");
    var date = birthdayDateArr[0];
    var month = birthdayDateArr[1] - 1;
    var day = new Date(year, month, date).getDay();
    return day;
  }

  /*
  iterating the finalObject
  making element list
  sorting element list by age
  adding element list to Dom
   */
  function mapObjToDom() {
    var nameAgeArr;
    var nameAgeArrLength;
    var divider;
    var percentage;
    var docFrag;
    var divList;
    var node;
    for(var arr in finalObject) {
      nameAgeArr = finalObject[arr];
      nameAgeArrLength = nameAgeArr.length;
      divider = getDivider(1, 5, nameAgeArrLength, 2, 0);
      percentage = 100 / divider;
      docFrag = document.createDocumentFragment();
      nameAgeArr.map(function (innerArray) {
        docFrag.appendChild(createDiv(innerArray[0], percentage, innerArray[1]));
      });
      divList = docFrag.querySelectorAll('div.' + initialNameBoxClassName);
      divList = Array.prototype.slice.call(divList, 0);
      divList.sort(function(a, b) {
        a = parseInt(a.getAttribute("age"));
        b = parseInt(b.getAttribute("age"));
        return a - b;
      }).forEach(function(div) {
        document.getElementById(arr).appendChild(div);
      });
    }
    for(var i = 0; i < 7; i++) {
      node = document.getElementById(i);
      if(node.childNodes.length === 0) {
        document.getElementById(i).appendChild(createImageDiv());
      }
    }
  }

  function createImageDiv() {
    var div = document.createElement('div');
    div.className = 'noBirthday';
    div.style.width = '100%';
    div.style.height = '100%';
    var childDiv = document.createElement('img');
    childDiv.src = './finalImage.png';
    div.appendChild(childDiv);
    return div;
  }

  /*
  creating div element
   */
  function createDiv(text, percentage, age) {
    var div = document.createElement('div');
    div.className = initialNameBoxClassName;
    div.setAttribute('age', age);
    div.style.backgroundColor = getRandomColor();
    div.style.width = percentage + '%';
    div.style.height = percentage + '%';
    var childDiv = document.createElement('div');
    childDiv.className = 'initialNameText';
    var node = document.createTextNode(text);
    childDiv.appendChild(node);
    div.appendChild(childDiv);
    return div;
  }

  /*
  return random color string
   */
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  /*
  takes a, b, numberOfElements, divider, incrementValue and return number
   */
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