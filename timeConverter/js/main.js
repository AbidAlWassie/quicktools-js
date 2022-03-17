function m2s() {

  const h1 = document.getElementById("h").value; // get hour
  const m1 = document.getElementById("m").value; // get minute

  var hours = Number(h1);
  var minutes = Number(m1);
  
  // calculate
  var timeValue;
  
  if ((hours<=23 && hours>=0) && (minutes>=0 && minutes<=59)) {

    if (hours > 0 && hours <= 12) {
      timeValue= "" + hours;
    } else if (hours > 12) {
      timeValue= "" + (hours - 12);
    } else if (hours == 0) {
      timeValue= "12";
    }

  } else {
    alert("invalid hour");
    var militaryPlaceholder = document.getElementById("cmvalue");
    militaryPlaceholder.innerText = "timeValue";
  }
  
  timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
  timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM
  
  // show
  // alert(timeValue);
  
  var militaryPlaceholder = document.getElementById("cmvalue");
  
  // const militaryValue
  militaryPlaceholder.innerText = timeValue;
  // console.log(timeValue);
}

// var time = "21:27:00"; // your input




// var strUser = e.value;

function s2m() {

  var e = document.getElementById("ampmValue");
  const h2 = document.getElementById("h2").value;
  const m2 = document.getElementById("m2").value;
  
  // const time12h = "01:02 PM";
  const time12h = h2 + ':' + m2 + ' ' + e.value;
  console.log('Standard Time: ' + time12h);
  // console.log(e.value);


const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
}

const standardPlaceholder = document.getElementById("csvalue");
  
// show standard time
standardPlaceholder.innerText = convertTime12to24(time12h);

console.log('Military Time: ' + convertTime12to24(time12h));

}
// s2m();
