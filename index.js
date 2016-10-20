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
    getFormData();
    parseJson();
  }, false);
  
  function getFormData() {
    year = document.getElementById('year').value;
    jsonData = document.getElementById('jsonData').value;
  }

  function parseJson() {
    var jsonObjArr = JSON.parse(jsonData);
    jsonObjArr.map(function (obj) {
      console.log(obj);
      var initialName = findInitialsFromName(obj.name);
      var day = getDate(obj.birthday);
      if(finalObject[day] === undefined) {
        finalObject[day] = [initialName]
      } else {
        finalObject[day].push(initialName);
      }
      console.log(finalObject);
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

})();

