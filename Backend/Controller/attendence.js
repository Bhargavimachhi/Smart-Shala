
import * as canvas from 'canvas';
 
import * as faceapi from 'face-api.js';
import fs from 'fs';


const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });



await faceapi.nets.ssdMobilenetv1.loadFromDisk("../ImageModels");
await faceapi.nets.faceLandmark68Net.loadFromDisk("../ImageModels");

 

export const GenerateIDforaface = async()=>{

     // Update with your image path

    const imageBuffer = fs.readFileSync("../Image1.jpeg");
    
    const img = new Image();
    img.src = imageBuffer;
    const canvas = new Canvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    

    const detection = await faceapi.detectSingleFace(canvas).withFaceLandmarks();

    console.log(detection);
  
};

 



GenerateIDforaface();

