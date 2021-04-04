var canvas;
var score;
var button;
var initialInput;
var submitButton;
let deny = " ";
var col = color(25, 23, 200);

function setup() {
  //Canvas

  canvas = createCanvas(200,200);
  button = createButton('Click')
  button.mousePressed(increaseScore);
  button.style("background-color", "#003648");

  score = 0;
  //inputs
  initialInput = createInput('Name');
  submitButton = createButton('Submit Score!')
  submitButton.mousePressed(submited);
  submitButton.style("background-color", "#003658");
  submitButton.style("color","#FFFFFF");
  button.style("color","#FFFFFF");
  //firebase
  var firebaseConfig = {
    apiKey: "AIzaSyCtmQcauSGJgvDBKPZTqbC67wuTYBqqucs",
    authDomain: "clicking-list-game.firebaseapp.com",
    databaseURL: "https://clicking-list-game-default-rtdb.firebaseio.com",
    projectId: "clicking-list-game",
    storageBucket: "clicking-list-game.appspot.com",
    messagingSenderId: "545314605579",
    appId: "1:545314605579:web:61fe182dae47ca664b150e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  database = firebase.database();
  var ref = database.ref('scores');
  ref.on('value', gotData, errData)
}
function gotData(data){
   //console.log(data.val());
   var scorelistings = selectAll('.scorelisting');
   for (var i = 0; i < scorelistings.length; i++) {
     scorelisting[i].remove();
   }
  var scores = data.val();
  var keys = Object.keys(scores);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var initials = scores[k].initials;
    var score = scores[k].score;
    //console.log(initials,score);
    var li = createElement('li',initials+"'s Score: " +score);
    li.class('scorelisting')
    li.parent()

  }


}

function errData(err){
  console.log('Error!');
  console.log(err);
}
//increaseScore
function increaseScore(){
  score++;
}
//sumbit
function submited(){
  if(score > 5){


  var data = {
  initials: initialInput.value(),
  score: score

 }

 var database = firebase.database();
 var ref = database.ref('scores');
 ref.push(data)
 reset();

}else{
  console.log("Score To Low To Submit");
  deny = "Score Is To Low To Submit (Less Than 5)."
 }
}



//reset Function

function reset(){
  score = 0;
  deny = "Refresh To See Your Name On Leaderboard!"
}

function draw() {
  background(112,128,144);
  textAlign(CENTER);
  textSize(32);
  fill(255,255,255);
  text(score,width/2,height/2);
  textSize(10)
  fill(255,0,0)
  text(deny,width/2,height-20);
}
