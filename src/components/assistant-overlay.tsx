
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mic } from "lucide-react";

type Message = {
    sender: 'user' | 'assistant';
    text: string;
};

export default function AssistantOverlay({ onClose }: { onClose: () => void }) {
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const speak = (text: string) => {
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 1;
        utter.pitch = 1.1;
        // Optional: select a specific voice
        const voices = window.speechSynthesis.getVoices();
        const femaleVoice = voices.find(voice => voice.name.includes('Google US English') && voice.gender === 'female');
        if (femaleVoice) {
            utter.voice = femaleVoice;
        }
        speechSynthesis.speak(utter);
    } else {
        console.warn("Speech synthesis not supported in this browser.");
    }
  };

  useEffect(() => {
    // Preload voices
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.getVoices();
        };
    }
    
    speak("Hello, I’m NeuraChat, your personal assistant. How may I help you today?");
    setMessages([{ sender: 'assistant', text: "Hello, I’m NeuraChat, your personal assistant. How may I help you today?" }]);

  }, []);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Speech recognition not supported in this browser.");
        return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setListening(true);

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setMessages((m) => [...m, { sender: "user", text: transcript }]);
      setListening(false);
      recognition.stop();

      // 🔹 Step 1: Send to AI model for intent parsing
      try {
        const res = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userInput: transcript }),
        });
        const data = await res.json();
        // 🔹 Step 2: Handle AI Response
        handleAIResponse(data);
      } catch (error) {
        console.error("Error calling assistant API:", error);
        const errorMessage = "Sorry, I had trouble understanding that.";
        speak(errorMessage);
        setMessages((m) => [...m, { sender: "assistant", text: errorMessage }]);
      }
    };
    
    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setListening(false);
        recognition.stop();
    };
  };

  const handleAIResponse = (data: any) => {
    const { action, contact, message } = data;
    let responseText = "";

    if (action === "make_call") {
      responseText = `Calling ${contact}.`;
      // TODO: 🔗 Call API endpoint /api/makeCall
    } else if (action === "send_sms") {
      if (!message) {
        responseText = `What would you like to say to ${contact}?`;
        // TODO: listen for next user input for message
      } else {
        responseText = `Got it. Should I send this message to ${contact} now?`;
        // TODO: Confirm & call /api/sendSMS
      }
    } else {
        responseText = data.response || "I'm not sure how to handle that yet.";
    }

    speak(responseText);
    setMessages((m) => [...m, { sender: "assistant", text: responseText }]);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-lg flex flex-col items-center justify-between p-4 text-white z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
      >
        <X size={24}/>
      </button>

      <div className="w-full text-center mt-12">
        <AnimatePresence>
            {messages.map((msg, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-2 my-1 rounded-lg max-w-sm mx-auto ${msg.sender === 'assistant' ? 'text-left' : 'text-right'}`}
                >
                     <p className={`text-lg ${msg.sender === 'user' ? 'font-semibold' : ''}`}>{msg.text}</p>
                </motion.div>
            ))}
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center">
         <div className="relative w-48 h-48">
            <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <button
                onClick={startListening}
                disabled={listening}
                className="relative w-full h-full flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
                <Mic size={48} className={listening ? "text-red-400" : "text-white"} />
            </button>
        </div>
        <p className="mt-6 text-sm text-gray-300">
            {listening ? "Listening..." : "Tap the mic to speak"}
        </p>
      </div>

    </motion.div>
  );
}
