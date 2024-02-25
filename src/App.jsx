import { useState, useRef } from "react";
import "./App.css";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import axios from "axios";

const classes = {
  white: "scissor",
  black: "mask",
  blue: "pillbottle",
  red: "gloves",
};

import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const [loading, setLoading] = useState(false);

  const MODEL_NAME = "gemini-1.0-pro";
  const API_KEY = "AIzaSyDjPCJ-6gib3fD50eB2tFocB-GyVCeioG8";

  const [base64String, setBase64String] = useState("");
  const fileInputRef = useRef(null);

  const getPredictResponse = async () => {
    try {
      const apiResponse = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/bio-medical-waste-classification/1",
        params: {
          api_key: "tFZhkFUM55V1yOIc5eR0",
        },
        data: base64String,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log(apiResponse.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const getResponse = async () => {
    setLoading(true);

    getPredictResponse();

    const questions = `how are you ?`;

    getGeminiResponse(questions)

    setLoading(false);
  };

  const getGeminiResponse = async (questions) => {
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 4096,
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

      const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
          {
            role: "user",
            parts: [{ text: "hi" }],
          },
          {
            role: "model",
            parts: [{ text: "Hello! How can I assist you today?" }],
          },
        ],
      });

      const result = await chat.sendMessage(questions);
      console.log(result.response);
      setResponse(result.response?.candidates[0]?.content?.parts[0]?.text);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setBase64String(btoa(reader.result));
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input ref={fileInputRef} type="file" onChange={handleFileUpload} />

      <label>Question</label>
      <input type="text" onChange={(e) => setQuestion(e.target.value)} />

      {loading ? (
        <div>Loading ...</div>
      ) : response.length == 0 ? (
        <div>No Response Yet</div>
      ) : (
        <ReactMarkdown>{response}</ReactMarkdown>
      )}

      <button onClick={() => getResponse()} type="submit">
        Submit
      </button>
    </div>
  );
}

export default App;
