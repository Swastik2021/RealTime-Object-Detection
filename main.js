img="";
dstatus="";
object = "";
function preload(){
    img = loadImage("dog_cat.jpg" );
}
function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}
function modelLoaded(){
    console.log("model loaded");
    dstatus= true;
    objectDetector.detect(video, gotResult);
}
function gotResult(error, results){
if(error){
    console.log(error);
}
console.log(results);
object = results;
}
function start(){
    objectDetector= ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById('status').innerHTML = "Status : Detecting Objects";
}
function draw(){
    image(video, 0, 0, 380, 380);
    if(dstatus != ""){
        objectDetector.detect(video, gotResult)
        r = random(255);
        b =random(255);
        g=random(255)
      for (i = 0; i < object.length; i++){
        fill(r,g,b);
        document.getElementById('status').innerHTML = "Status : Objects Detected";
        document.getElementById('num_of_obj').innerHTML = "Objects Detected = " + object.length;
        percent = floor(object[i].confidence * 100);
        text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
        noFill();
        stroke(r,g,b);
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
      }      
    }
    
}

