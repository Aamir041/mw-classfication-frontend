import { useState, useRef } from "react";
// import "./App.css";
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
import Loader from "../src/components/Loader/Loader";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState();
  const [imageResponse, setImageResponse] = useState([]);
  const [image, setImage] = useState();
  const [showLoader, setShowLoader] = useState(false);

  const [loading, setLoading] = useState(false);

  const MODEL_NAME = "gemini-1.0-pro";
  const API_KEY = "AIzaSyDjPCJ-6gib3fD50eB2tFocB-GyVCeioG8";

  const [base64String, setBase64String] = useState("");

  const fileInputRef = useRef(null);

  const getPredictResponse = async () => {
    setResponse([]);
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

      console.log(apiResponse.data?.predictions[0]?.class);
      setImageResponse(apiResponse.data?.predictions);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const getResponse = async () => {
    setLoading(true);

    getPredictResponse();

    // const predict_image_array = imageResponse?.predictions?.candidates;
    console.log(imageResponse);

    const questions =
      "you are a medical waste detection bot introduce yourself in 30 words and also say that user can ask you any question realted to medical waste photo being uploaded";
    const gemini_res = getGeminiResponse(questions);

    setLoading(false);
  };

  const getGeminiResponse = async (questions) => {
    setShowLoader(() => true);
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
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
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
    setShowLoader(() => false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setBase64String(btoa(reader.result));
      setImage(reader.result);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <div>
        <div
          className="chat-container"
          style={{ color: "rgba(255,255,255,0.6" }}
        >
          {image && (
            <div
              style={{
                width: "60%",
                textAlign: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <img
                src={`data:image/jpeg;base64,${btoa(image)}`}
                alt="Uploaded"
                style={{
                  maxWidth: "50%",
                  maxHeight: "50%",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}
          {showLoader && <Loader dimension={2}></Loader>}
          {imageResponse?.length == 0 ? (
            <div></div>
          ) : (
            <div style={{ marginBottom: "2rem" }}>
              {imageResponse?.map((res, idx) => {
                return (
                  <div key={`imageRes-${idx}`}>
                    <div style={{ fontSize: "1.5rem" }}>
                      class :{" "}
                      <span style={{ color: "#15cf81" }}>
                        {classes[res.class.toLowerCase()]}
                      </span>
                    </div>
                    <div style={{ fontSize: "1.5rem" }}>
                      confidence:{" "}
                      <span style={{ color: "#15cf81" }}>
                        {res.confidence.toFixed(4)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {loading ? (
            <div>Loading ...</div>
          ) : response?.length == 0 ? (
            <div>GET RESPONSE</div>
          ) : (
            <ReactMarkdown>{response}</ReactMarkdown>
          )}
        </div>

        <div className="typing-container">
          <div className="typing-content">
            <div className="typing-textarea">
              <form
                style={{ all: "unset", width: "100%" }}
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("ok");
                  getGeminiResponse(question);
                }}
              >
                <input
                  id="chat-input"
                  placeholder="Enter a prompt here"
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </form>
            </div>

            <div className="typing-controls">
              <label htmlFor="file-input">
                <span className="material-symbols-outlined">add</span>
              </label>

              <input
                style={{ display: "none" }}
                id="file-input"
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
              />

              <span
                style={{ cursor: "pointer" }}
                className="material-symbols-outlined"
                onClick={() => getResponse()}
              >
                keyboard_backspace
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* <input ref={fileInputRef} type="file" onChange={handleFileUpload} /> */}
    </div>
  );
}

export default App;
