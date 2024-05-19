const showOutput = (output) => {
  document.getElementById("output").innerHTML = output;
}
const clearOutput = () => {
  document.getElementById("output").innerHTML = "";
}

// function getFieldValue(feildId){
//   return document.getElementById(feildId).value
// }

function getRandomId() {
  return Math.random().toString(36).slice(2);
}

let emailFormate = /^([a-za-z0-9_\.\-])+@(([a-za-z0-9_\.\-])+\.)+([a-za-z0-9]{2,4})+$/

// -------------------------------------------------------------------------------------------------------

var users = [];

function User(firstName, lastName, email, dob) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.dob = dob;
}

// referance of this function https://www.javatpoint.com/calculate-age-using-javascript
User.prototype.calculateAge = function () {
  var dob = new Date(this.dob);
  var currentDate = new Date();

  //calculate month difference from current date in time  
  var month_diff = currentDate.getTime() - dob.getTime();

  //convert the calculated difference in date format  
  var age_dt = new Date(month_diff);

  //extract year from date      
  var year = age_dt.getUTCFullYear();

  //now calculate the age of the user  
  var age = Math.abs(year - 1970);

  return age;
}

// function handlesubmit

const handleSubmit = () => {
  event.preventDefault();

  let firstName = document.getElementById("firstname").value; //getFieldValue("firstName");
  let lastName = document.getElementById("lastname").value; //getFieldValue("lastName");
  let email = document.getElementById("email").value; //getFieldValue("email");
  let dob = document.getElementById("dob").value; //getFieldValue("dob");

  firstName = firstName.trim();
  lastName = lastName.trim();
  email = email.trim();

  if (firstName.length < 3) {
    showNotification("Please enter your first name correctly.");
    return;
  }
  if (!emailFormate.test(email)) {
    showNotification("Please enter your email correctly.");
    return;
  }
  if (!dob) {
    showNotification("Please enter your date of birth.");
    return;
  }

  let user = new User(firstName, lastName, email, dob);

  user.id = getRandomId();

  user.dateCreated = new Date().getTime();
  // console.log(user.dateCreated);

  users.push(user);

  showNotification("A new user has been successfully added.");
}

// showTable function

const showTable = () => {
  if (!users.length) {
    showNotification("There is not a singal user availible.")
    return;
  }
  let tableStartingCode = `<div class="table-responsive"><table class="table">`;

  let tableEndingCode = `</table></div>`;

  let tableHead = '<thead><tr><th scop="col">#</th><th scop="col">First Name</th><th scop="col">Last Name</th><th scop="col">Email</th><th scop="col">Date of Birth</th><th scop="col">Age</th></tr></thead>';

  let tableBody = '';

  for (let a = 0; a < users.length; a++) {
    tableBody += '<tr><th scop="row">' + (a + 1) + '</th><td>' + users[a].firstName + '</td><td>' + users[a].lastName + '</td><td>' + users[a].email + '</td><td>' + users[a].dob + '</td><td>' + users[a].calculateAge() + '</td></tr>';
  }
  let table = tableStartingCode + tableHead + '<tbody>' + tableBody + '</tbody>' + tableEndingCode
  showOutput(table)
}

// print User
function printUser() {
  if (!users.length) {
    showNotification("There is not a singal user availible.")
    return;
  }
  showNotification("Check console");
  console.log(users);
}

// shownotification
function showNotification(msg) {
  Toastify({
    text: msg,
    duration: 3000,
    // destination: "https://github.com/apvarun/toastify-js",
    // newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #B79891, #94716B)",
    },
    onClick: function () { } // Callback after click
  }).showToast();
}

// footer javascript
var now = new Date()

var getYear = now.getFullYear();

year.innerText = getYear;

// set max today date in dob field:https://stackoverflow.com/questions/32378590/set-date-input-fields-max-date-to-today
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
  dd = '0' + dd;
}

if (mm < 10) {
  mm = '0' + mm;
}

today = yyyy + '-' + mm + '-' + dd;
document.getElementById("dob").setAttribute("max", today);