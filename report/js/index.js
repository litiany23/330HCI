// const ref = new Firebase("https://comment-39452.firebaseio.com/");

var config = {
    apiKey: "AIzaSyAVgcDBibUjClM8vBdg4byXAHmx3aaCEs0",
    authDomain: "comment-39452.firebaseapp.com",
    databaseURL: "https://comment-39452.firebaseio.com",
    projectId: "comment-39452",
    storageBucket: "comment-39452.appspot.com",
    messagingSenderId: "116883092156"
  };
firebase.initializeApp(config);
var db = firebase.database().ref('Comments/');

const form = document.querySelector("form");

form.addEventListener("submit", postComment);

const timeStamp = () => {
  let options = {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute:'2-digit'
  };
  let now = new Date().toLocaleString('en-US', options);
  return now;
};

function postComment(e) {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let comment = document.getElementById("comment").value;

  if (name && comment) {
    db.push({
      name: name,
      comment: comment,
      time: timeStamp()
    });
  }

  document.getElementById("name").value = '';
  document.getElementById("comment").value = '';
};

db.on('child_added', data => {
  var comment = data.val();
  addComment(comment.name, comment.comment, comment.time);
});


const addComment = (name, comment, timeStamp) => {
  let comments = document.getElementById("comments");
  comments.innerHTML = `<hr><h4>${name} says<span>${timeStamp}</span></h4><p>${comment}</p>${comments.innerHTML}`;
}
