import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import 'tailwindcss/tailwind.css';
import axios from "axios";

const StudentRecommdation = () => {
  const [data, setData] = useState({ topic: "", videos: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://recommdation-workflow-service.onrender.com/recommed?topic=NerualNetworks");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recommended Videos for {data.topic}</h1>
      <p className="mb-4">Based on your quizzes, your weak topic is <strong>{data.topic}</strong>. Here are some videos to help you improve:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.videos.map((video, index) => (
          <Card key={index} className="shadow-lg">
            <CardHeader>
              <h2 className="text-lg font-semibold">{video.title}</h2>
            </CardHeader>
            <CardContent>
              <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                Watch Video
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentRecommdation;