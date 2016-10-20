/**
 * Created by deepaksisodiya on 20/10/16.
 */


(function () {

  console.log('Deepak Sisodiya');

  var finalObject = {};
  var year;
  var jsonData;

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
    var initialNameBoxArr = document.getElementsByClassName('initialNameBox');
    Array.prototype.slice.call(initialNameBoxArr).map(function (value) {
      console.log('value ', value);
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
    div.className = 'initialNameBox';
    var node = document.createTextNode(text);
    div.appendChild(node);
    return div;
  }

})();

