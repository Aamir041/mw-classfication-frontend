import "./GeminiApp.css";
import { useState, useRef } from "react";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

import ReactMarkdown from "react-markdown";
import SideNavbar from "../../components/SideNavbar/SideNavbar";

const GeminiApp = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState();

  const [loading, setLoading] = useState(false);

  const MODEL_NAME = "gemini-1.0-pro";
  const API_KEY = "AIzaSyDjPCJ-6gib3fD50eB2tFocB-GyVCeioG8";


  const getResponse = async () => {
    setLoading(true);

    const questions =
      "you are a medical waste detection bot introduce yourself in 30 words and also say that user can ask you any question realted to medical waste photo being uploaded";
    const gemini_res = await getGeminiResponse(question);

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
      // console.log(result.response);
      setResponse(result.response?.candidates[0]?.content?.parts[0]?.text);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <SideNavbar>
      <div className="gemini-app">
          <div className="chat-container">
            {loading ? (
              <div>Loading ...</div>
            ) : response?.length == 0 ? (
              <div>Error in Getting Response :(</div>
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
    </SideNavbar>
  );
};

export default GeminiApp;
