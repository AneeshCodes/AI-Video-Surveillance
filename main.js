video = ""
status = ""
objects = [];
percent = ""

function preload() {
  video = createVideo('video.mp4')

}

function setup() {
  canvas = createCanvas(600, 500)
  canvas.center()
  
}

function draw() {
  image(video, 0, 0, 600, 500)
  if(status != ""){
    objectDetected.detect(video, gotResult);
    for(i = 0; i < object.length; i++){
      document.getElementById('status').innerHTML = 'Objects Detected'
      document.getElementById('noOfObjects').innerHTML = 'Number Of Objects Detected are ' + objects.length;
      percent = ((objects[i].confidence).toFixed(2) * 100);
      label = objects[i].label;
      x = objects[i].x
      y = objects[i].y
      width = objects[i].width
      height = objects[i].height
      fill('red')
      text(label + ' ' + confidence + '%', x, y)
      noFill()
      stroke('red')
      rect(x,y, width, height)
    }
  }
}

function start() {
  objectDetected = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById('status').innerHTML = 'Detecting Objects';
  video.play()
}

function modelLoaded() {
  console.log('model is loaded');
  status = true;
  video.loop()
  video.speed(1)
  video.volume(0)
}

function gotResult(error, results){
  if(error){
    console.log(error);
  }
  else{
    console.log(results)
    objects = results
  }
}

