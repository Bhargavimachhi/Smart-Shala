from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from deepface import DeepFace
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types
import requests

client = genai.Client(api_key="AIzaSyBjsdGV_doK1EbyPV3HicaPBIkfZBJE2iU")




def verify_with_faces(url1,url2):
    refimage1 = requests.get(url1)
    currentimage1 = requests.get(url2)
    response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=["I want you to do face verfication.If these two faces match , then Print Yes otherwise No.",
              types.Part.from_bytes(data=refimage1.content, mime_type="image/jpeg"),
              types.Part.from_bytes(data=currentimage1.content, mime_type="image/jpeg")
              ])
    return response.text




app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class ImageURLs(BaseModel):
    image1_url: str
    image2_url: str

# @app.post("/verify")
# def verify_faces(image_urls: ImageURLs):
#     try:
#         print(image_urls.image1_url,image_urls.image2_url)
#         resp = DeepFace.verify(img1_path=image_urls.image1_url, img2_path=image_urls.image2_url, model_name="Facenet",
#                          enforce_detection=False, threshold=60.0)
        
#         return resp
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/verification")
def verify_with_AI_faces(image_urls: ImageURLs):
    try:
        print(image_urls.image1_url,image_urls.image2_url)

        ans = verify_with_faces(image_urls.image1_url,image_urls.image2_url)

        return ans
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))