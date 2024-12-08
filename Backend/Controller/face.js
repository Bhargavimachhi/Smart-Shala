import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { put, post, get } from 'axios';
import { createInterface } from 'readline';
import { VideoCapture, imencode, Rect, Vec3, imshow, waitKey } from 'opencv4nodejs';

// Variables
const ENDPOINT = "https://roigirigh.cognitiveservices.azure.com/";
const KEY = "1rFZEHp7MnAeLZsMxkqms4KG6oyoFQTWDJO2X3jppDYCYKiZireGJQQJ99ALACYeBjFXJ3w3AAAKACOGzxol";


const faceApiUrl = `${ENDPOINT}/face/v1.0/detect`;
const headers = { 'Content-Type': 'application/octet-stream', 'Ocp-Apim-Subscription-Key': KEY };
const params = {
  detectionModel: 'detection_01',
  returnFaceId: 'true',
  returnFaceRectangle: 'true',
  returnFaceAttributes: 'age,gender,emotion'
};

const GROUPS = [];
const PEOPLE = [];
const IDS = [];

// Functions
const createGroup = async (group) => {
  try {
    await put(`${ENDPOINT}/face/v1.0/persongroups/${group}`, { name: group }, { headers });
    console.log(`Created group ${group}`);
  } catch (error) {
    console.error('Error creating group:', error);
  }
};

const createPerson = async (person, group) => {
  try {
    const response = await post(
      `${ENDPOINT}/face/v1.0/persongroups/${group}/persons`,
      { name: person },
      { headers }
    );
    const personId = response.data.personId;
    console.log('Person ID:', personId);
    IDS.push(personId);

    const imageFiles = readdirSync(basePath).filter(file => file.startsWith(person) && file.endsWith('.jpg'));
    for (const image of imageFiles) {
      const imageData = readFileSync(join(basePath, image));
      await post(
        `${ENDPOINT}/face/v1.0/persongroups/${group}/persons/${personId}/persistedFaces`,
        imageData,
        { headers }
      );
      console.log(`Included photo ${image}`);
    }
  } catch (error) {
    console.error('Error creating person:', error);
  }
};

const trainGroup = async (group) => {
  try {
    console.log(`Starting training for group ${group}`);
    await post(`${ENDPOINT}/face/v1.0/persongroups/${group}/train`, null, { headers });
    while (true) {
      const response = await get(`${ENDPOINT}/face/v1.0/persongroups/${group}/training`, { headers });
      const status = response.data.status;
      console.log(`Training status for ${group}: ${status}`);
      if (status === 'succeeded') break;
      if (status === 'failed') {
        throw new Error('Training failed');
      }
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  } catch (error) {
    console.error('Error training group:', error);
  }
};

const startProgram = async () => {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  
  rl.question('Define the group name -> ', async (groupName) => {
    const group = groupName.toLowerCase();
    GROUPS.push(group);
    await createGroup(group);

    while (true) {
      const personName = await new Promise(resolve => rl.question("Enter a person's name to associate with the group or 'fim' to finish -> ", resolve));
      if (personName.toLowerCase() === 'fim') break;
      PEOPLE.push(personName);
      await createPerson(personName, group);
    }

    await trainGroup(group);

    const camera = new VideoCapture(0);
    while (true) {
      const frame = camera.read();
      const image = imencode('.jpg', frame).toString('base64');
      try {
        const response = await post(faceApiUrl, Buffer.from(image, 'base64'), { headers, params });
        const faces = response.data;

        for (const face of faces) {
          const rect = face.faceRectangle;
          const { left, top, width, height } = rect;
          const bottom = top + height;
          const right = left + width;

          frame.drawRectangle(new Rect(left, top, width, height), new Vec3(0, 255, 0), 2);
        }

        imshow('Face Detection', frame);
      } catch (error) {
        console.error('Error during detection:', error);
      }

      const key = waitKey(1);
      if (key === 27) {
        console.log('Escape hit, closing...');
        break;
      }
    }

    rl.close();
  });
};

startProgram();
