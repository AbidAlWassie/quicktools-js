
var time = "10:30:00"; // your input

time = time.split(':'); // convert to array

// fetch
var hours = Number(time[0]);
var minutes = Number(time[1]);
var seconds = Number(time[2]);

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
timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;  // get seconds
timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

// show
// alert(timeValue);
console.log(timeValue);