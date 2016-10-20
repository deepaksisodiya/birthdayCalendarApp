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
      var docFrag = document.createDocumentFragment();
      nameArr.map(function (initialName) {
        docFrag.appendChild(createDiv(initialName));
      });
      document.getElementById(arr).appendChild(docFrag);
    }
  }
  
  function createDiv(text) {
    var div = document.createElement('div');
    div.className = initialNameBoxClassName;
    var node = document.createTextNode(text);
    div.appendChild(node);
    return div;
  }

})();

