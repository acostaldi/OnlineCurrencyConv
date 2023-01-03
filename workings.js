var currType = 0;
var currOutType = 0;
var currAmount = 0;
var apikey = "";

function convert() {
    apikey = document.getElementById('apiKey').value;
    console.log(apikey);

    var myHeaders = new Headers();
    myHeaders.append("apikey", apikey);

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    currAmount = document.getElementById('currAmount').value;
    fetch("https://api.apilayer.com/exchangerates_data/convert?to=" + currOutType+ "&from="+currType+"&amount="+currAmount, requestOptions)
   .then(response => response.text())
   .then(result => getResult(result))
   .catch(error => console.log('error', error))
    
  }

  function activeMenu() {
    document.getElementById("inDrop").classList.toggle("show");
  }

  function activeMenu1() {
    document.getElementById("inDrop1").classList.toggle("show");
  }

  function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("inDrop");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

  function setCurr(input){
    currType = internalType(input);
    document.getElementById("inDrop").classList.toggle("show");
    document.getElementById("dropMenu").textContent = currType;
  }

  function setOutCurr(input){
    currOutType = internalType(input);
    document.getElementById("inDrop1").classList.toggle("show");
    document.getElementById("dropMenu1").textContent = currOutType;
  }

  function getResult(result){
    var result1 = result.split("\n");
    var i = result1[12].indexOf(":");
    result1 = result1[12];
    var output = result1.slice(i + 1, result1.length).trim();
    document.getElementById("result1").innerHTML = currAmount + " " + currType +  " converts to " + output + " " + currOutType;  
  }

  function internalType(input){
  var output;
  switch(input){
    case 1: output = "USD";
    break;
    case 2: output = "EUR";
    break;
    case 3: output = "CAD";
    break;
    case 4: output = "CHF";
    break;
    case 5: output = "JPY";
    break;
    case 6: output = "GBP";
    break;
  }
  return output;
  }
