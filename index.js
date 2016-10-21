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
    parseJson();
    mapObjToDom();
  }, false);

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
      if(finalObject[day] === undefined) {
        finalObject[day] = [initialName]
      } else {
        finalObject[day].push(initialName);
      }
      return obj;
    });
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
      nameArr.map(function (initialName) {
        docFrag.appendChild(createDiv(initialName, percentage));
      });
      document.getElementById(arr).appendChild(docFrag);
    }
  }
  
  function createDiv(text, percentage) {
    var div = document.createElement('div');
    div.className = initialNameBoxClassName;
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

