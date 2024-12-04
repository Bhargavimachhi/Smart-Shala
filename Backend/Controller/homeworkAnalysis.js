import { readFileSync } from 'fs';
import createClient from '@azure-rest/ai-vision-image-analysis';
import { AzureKeyCredential } from '@azure/core-auth';


const endpoint = 'https://iewhf.cognitiveservices.azure.com/';
const key = '9pT0BpZXU9rXpB76N646tn1rE51pq3E2Rk9QqwWA7vLhcQLfubZ2JQQJ99ALACYeBjFXJ3w3AAAFACOGxPMj';
const credential = new AzureKeyCredential(key);

const client = createClient.default(endpoint, credential);

const feature = [
  
  'Read',
  
];


export const analyzeImageFromFile = async(req,res) => {
  try {
    const imagePath = './Backend/Image1.jpeg';
    const imageBuffer = readFileSync(imagePath);

    const result = await client.path('/imageanalysis:analyze').post({
      body: imageBuffer,
      queryParameters: {
        features: feature,
        'smartCrops-aspect-ratios': [0.9, 1.33]
      },
      contentType: 'application/octet-stream'
    });

    const iaResult = result.body;

  
  
    if (iaResult.readResult) {
      const readResult = iaResult.readResult;
      let fullText = '';
      readResult.blocks.forEach(block => {
          block.lines.forEach(line => {
              fullText += line.text + ' ';
          });
      });

      res.status(200).json({message:"success", text:fullText.trim()})
    }
  } catch (err) {
    res.status(500).json({message:"Error Occured"});
  }
 
}