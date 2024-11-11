/*

Loading ml5 faceMesh model and applying it to a locally loaded image.

*/

let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false }; // refineLandmarks: true

let img;
let hiddenCanvas; // off-screen 2D canvas for image and FaceMesh detection


function preload() {
  // load the faceMesh model
  faceMesh = ml5.faceMesh(options);
  img = loadImage("kylie2.jpg");
}


function setup() {
  createCanvas(1000, 1000);

  hiddenCanvas = createGraphics(1000, 1000); // create hidden 2D canvas for FaceMesh detection
  hiddenCanvas.image(img, 0, 0, 1000, 1000); // draw image on the hidden canvas for FaceMesh detection
  faceMesh.detectStart(hiddenCanvas, gotFaces); // use hidden canvas for detection

}


function draw() {
  background (0, 0, 0);

  // draw the imput image 
  image(img, 0, 0, 1000, 1000);

  
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];

    // draw all face keypoints
    for (let j = 0; j < face.keypoints.length; j++) {
      let keypoint = face.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 5);
    }

    // draw face mesh edges
    stroke(0, 255, 0);
    strokeWeight(1.5);
    for (let n = 0; n < face_edges.length; n++) {
      drawFaceMeshEdges(face, face_edges[n]);
    }
  }
}


// callback function for when faceMesh outputs data
function gotFaces(results) {
  // save the output to the faces variable
  faces = results;
}


// draw face mesh edges
function drawFaceMeshEdges(face, indices) {
  for (let i = 0; i < indices.length - 1; i++) {
      let keypoint1 = face.keypoints[indices[i]];
      let keypoint2 = face.keypoints[indices[i + 1]];
      line(keypoint1.x, keypoint1.y, keypoint2.x, keypoint2.y);  // draw line between consecutive keypoints
  }
}