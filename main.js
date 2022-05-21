img = "";
status1 = "";
objects = [];

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modlLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects"; 
}

function modlLoaded(){
    console.log("Model is Loaded");
    status1 = true;
    objectDetector.detect(img, gotResult);
    document.getElementById("heading")
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results); 
    objects = results;  
}

function preload(){
    img = loadImage('dog_cat.jpg');
}

function draw(){
    image(img, 0, 0, 640, 420);
    if(status1 != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Decteded";
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}