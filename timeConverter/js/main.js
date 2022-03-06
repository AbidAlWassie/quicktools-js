function m2s() {


  const h = document.getElementById("h").value;
  const m = document.getElementById("m").value;

  var hours = Number(h);
  var minutes = Number(m);
  
  // calculate
  var timeValue;
  
  if (hours > 0 && hours <= 12) {
    timeValue= "" + hours;
  } else if (hours > 12) {
    timeValue= "" + (hours - 12);
  } else if (hours == 0) {
    timeValue= "12";
  }
  
  timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
  timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM
  
  // show
  // alert(timeValue);
  
  const militaryPlaceholder = document.getElementById("cmvalue");
  
  // const militaryValue
  militaryPlaceholder.innerText = timeValue;
  console.log(timeValue);
}

// var time = "21:27:00"; // your input

