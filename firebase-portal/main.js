  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA4IDHeqtW5JYMK6YgkScPgntLQZG6bt9s",
    authDomain: "portal-f8ad5.firebaseapp.com",
    databaseURL: "https://portal-f8ad5.firebaseio.com",
    projectId: "portal-f8ad5",
    storageBucket: "portal-f8ad5.appspot.com",
    messagingSenderId: "795295019868"
  };
  firebase.initializeApp(config);
var db = firebase.database();

// CREATE MEMBER

var reviewForm = document.getElementById('reviewForm');

var deviceid = document.getElementById('deviceid');
var email = document.getElementById('email');
var last_entry = document.getElementById('lastentry');
var member_id = document.getElementById('member_id');
var member_initial = document.getElementById('member_init');
var member_name = document.getElementById('member_name');
var password = document.getElementById('pass');

reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!deviceid.value || !email.value || !last_entry.value || !member_id.value || !member_initial.value || !member_name.value || !password.value) return null

  var id = hiddenId.value || Date.now();

  db.ref('members/' + id).set({
    deviceid: deviceid.value,
    email: email.value,
    last_entry: last_entry.value,
    member_id: member_id.value,
    member_initial: member_initial.value,
    member_name: member_name.value,
    password: password.value
  });

  deviceid.value = '';
  email.value = '';
  last_entry.value = '';
  member_id.value = '';
  member_initial.value = '';
  member_name.value = '';
  password.value = '';
  hiddenId.value = '';
});

// SHOW MEMBERS

var reviews = document.getElementById('reviews');
var reviewsRef = db.ref('/members');

reviewsRef.on('child_added', (data) => {
  var li = document.createElement('li')
  li.id = data.key;
  li.innerHTML = reviewTemplate(data.val())
  reviews.appendChild(li);
});

reviewsRef.on('child_changed', (data) => {
  var reviewNode = document.getElementById(data.key);
  reviewNode.innerHTML = reviewTemplate(data.val());
});

reviewsRef.on('child_removed', (data) => {
  var reviewNode = document.getElementById(data.key);
  reviewNode.parentNode.removeChild(reviewNode);
});

reviews.addEventListener('click', (e) => {
  var reviewNode = e.target.parentNode

  // DELETE MEMBERS
  if (e.target.classList.contains('delete')) {
    var id = reviewNode.id;
    db.ref('members/' + id).remove();
  }
});

function reviewTemplate({deviceid, email, last_entry, member_id, member_initial, member_name, password}) {
  return `
    <div class='fullName'> Name: ${member_name}</div>
    <div class='message'> Device ID: ${deviceid}</div>
    <button class='delete btn btn-danger'>Delete</button>
  `
};
