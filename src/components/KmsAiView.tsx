import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, Mic, MicOff, Image as ImageIcon, Copy, Check, Terminal, Cpu, Zap, RefreshCw, AlertCircle, Wrench, ChevronRight } from 'lucide-react';
import { ChatMessage } from '../types';

export const KmsAiView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'model',
      text: `### Hello, Inventor! I am KMS-AI 🤖
I am the official intelligent robotics and engineering companion of **KITE ROBOTICS**.

How can I accelerate your hardware innovation today?
* **Troubleshoot circuits & sensors** (HC-SR04, L298N, MPU6050, DHT11)
* **Debug firmware code** (Arduino C++, ESP32 WiFi/BLE, Python OpenCV)
* **Circuit Schematics & Pinouts**
* **Project Ideation for ROBOZEST or ATL Competitions**`,
      timestamp: 'Just now',
      suggestedActions: [
        'My ultrasonic sensor is not detecting objects',
        'How do I connect L298N motor driver to Arduino?',
        'Provide ESP32 WiFi connection C++ code',
        'Generate code for 2-sensor line follower robot',
      ],
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleCopy = (text: string, id: string) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
      }
    } catch {
      // Ignore copy error in restricted contexts
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceToggle = () => {
    if (typeof window === 'undefined' || (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window))) {
      setInputQuery("Voice input is not supported in this browser. Please type your query.");
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      if (!isRecording) {
        setIsRecording(true);
        recognition.start();

        recognition.onresult = (event: any) => {
          const transcript = event?.results?.[0]?.[0]?.transcript;
          if (transcript) {
            setInputQuery(transcript);
          }
          setIsRecording(false);
        };

        recognition.onerror = () => {
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };
      } else {
        setIsRecording(false);
      }
    } catch {
      setIsRecording(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery.trim();
    if (!query && !selectedImage) return;

    const userMsgId = 'user-' + Date.now();
    const newUserMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      text: query || 'Uploaded circuit image for diagnostic inspection.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imagePreview: selectedImage || undefined,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputQuery('');
    const imagePayload = selectedImage;
    setSelectedImage(null);
    setLoading(true);

    try {
      // Call full-stack server-side KMS-AI API
      const response = await fetch('/api/kms-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          imageBase64: imagePayload,
          history: messages.slice(-5).map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await response.json();
      const botMsgId = 'bot-' + Date.now();
      const newBotMsg: ChatMessage = {
        id: botMsgId,
        role: 'model',
        text: data.reply || "I've analyzed your robotics query. Check your circuit connections and motor driver power lines.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, newBotMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: 'err-' + Date.now(),
        role: 'model',
        text: "### Hardware Diagnostic Note\nMake sure your power supply provides sufficient current (at least 2A for rovers). If using sensors, verify that common ground is tied between microcontroller and battery.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const renderFormattedContent = (content: string) => {
    // Split text by markdown code blocks (```cpp or ```)
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const lines = part.slice(3, -3).trim();
        const firstLineBreak = lines.indexOf('\n');
        let language = 'code';
        let code = lines;
        if (firstLineBreak > -1) {
          const firstLine = lines.slice(0, firstLineBreak).trim();
          if (firstLine.length < 15 && !firstLine.includes(' ')) {
            language = firstLine;
            code = lines.slice(firstLineBreak + 1);
          }
        }

        return (
          <div key={index} className="my-3 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono-code text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Terminal className="w-3.5 h-3.5" />
                {language.toUpperCase()}
              </span>
              <button
                onClick={() => handleCopy(code, `code-${index}`)}
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                {copiedId === `code-${index}` ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3.5 text-xs font-mono-code text-emerald-300 overflow-x-auto whitespace-pre leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      // Format markdown headers, bold, bullet points
      const lines = part.split('\n');
      return (
        <div key={index} className="space-y-1.5 text-slate-200 text-xs sm:text-sm leading-relaxed">
          {lines.map((line, lIdx) => {
            if (line.startsWith('### ')) {
              return (
                <h4 key={lIdx} className="font-display font-bold text-sm sm:text-base text-cyan-300 mt-2 mb-1">
                  {line.replace('### ', '')}
                </h4>
              );
            }
            if (line.startsWith('#### ')) {
              return (
                <h5 key={lIdx} className="font-display font-semibold text-xs sm:text-sm text-amber-300 mt-1.5">
                  {line.replace('#### ', '')}
                </h5>
              );
            }
            if (line.startsWith('* ') || line.startsWith('- ')) {
              return (
                <div key={lIdx} className="flex items-start gap-2 pl-2">
                  <span className="text-cyan-400 font-bold mt-1 text-[10px]">•</span>
                  <span>{line.replace(/^(\*|-)\s+/, '')}</span>
                </div>
              );
            }
            if (/^\d+\.\s/.test(line)) {
              return (
                <div key={lIdx} className="flex items-start gap-2 pl-2">
                  <span className="text-amber-400 font-mono-code text-xs font-bold shrink-0">
                    {line.match(/^\d+\./)?.[0]}
                  </span>
                  <span>{line.replace(/^\d+\.\s+/, '')}</span>
                </div>
              );
            }
            if (!line.trim()) {
              return <div key={lIdx} className="h-1" />;
            }
            return <p key={lIdx}>{line}</p>;
          })}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-135px)] max-h-[850px] rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Top Copilot Bar */}
      <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 shadow-md shadow-cyan-500/30">
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
          </div>
          <div>
            <div className="font-display font-bold text-sm text-white flex items-center gap-1.5">
              <span>KMS-AI Assistant</span>
              <span className="text-[10px] font-mono-code px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                v2.6 Live
              </span>
            </div>
            <div className="text-[10px] font-mono-code text-slate-400">
              KITE Robotics Embedded & STEM Intelligence
            </div>
          </div>
        </div>

        {/* Quick clear button */}
        <button
          onClick={() => setMessages(messages.slice(0, 1))}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs flex items-center gap-1 font-mono-code transition-colors"
          title="Reset conversation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Message Bubble */}
            <div
              className={`relative max-w-[90%] sm:max-w-[85%] rounded-2xl p-4 shadow-md ${
                msg.role === 'user'
                  ? 'bg-cyan-600 text-white rounded-br-none'
                  : 'bg-slate-950/80 border border-slate-800/90 text-slate-100 rounded-bl-none'
              }`}
            >
              {/* Optional user-uploaded image preview */}
              {msg.imagePreview && (
                <div className="mb-2 rounded-xl overflow-hidden border border-white/20 max-w-xs">
                  <img src={msg.imagePreview} alt="Circuit preview" className="w-full h-auto object-cover" />
                </div>
              )}

              {/* Text content */}
              <div className="break-words">
                {msg.role === 'user' ? (
                  <p className="text-xs sm:text-sm font-medium">{msg.text}</p>
                ) : (
                  renderFormattedContent(msg.text)
                )}
              </div>

              {/* Bot copy button & timestamp */}
              <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-mono-code">
                <span>{msg.timestamp}</span>
                {msg.role === 'model' && (
                  <button
                    onClick={() => handleCopy(msg.text, msg.id)}
                    className="flex items-center gap-1 hover:text-cyan-300 transition-colors"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Suggested Question Chips (if present) */}
            {msg.suggestedActions && (
              <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                {msg.suggestedActions.map((sug, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handleSendMessage(sug)}
                    className="text-[11px] px-3 py-1.5 rounded-full bg-slate-950 border border-cyan-800/50 hover:border-cyan-400 text-cyan-300 hover:text-white transition-all text-left flex items-center gap-1"
                  >
                    <span>{sug}</span>
                    <ChevronRight className="w-3 h-3 shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        ))}

        {/* Loading typing indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 w-fit text-cyan-400 text-xs font-mono-code"
          >
            <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
            <span>KMS-AI is synthesizing circuit diagnostics...</span>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Uploaded image staging strip */}
      {selectedImage && (
        <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={selectedImage} alt="Staged" className="w-10 h-10 object-cover rounded-lg border border-slate-700" />
            <span className="text-xs text-slate-300 font-mono-code">Hardware Image Attached</span>
          </div>
          <button
            onClick={() => setSelectedImage(null)}
            className="text-xs text-rose-400 hover:text-rose-300"
          >
            Remove
          </button>
        </div>
      )}

      {/* Bottom Input Area */}
      <div className="p-3 bg-slate-950/95 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />

          {/* Attach Image Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Upload circuit/project photo for diagnostic analysis"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-slate-700 transition-colors"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleVoiceToggle}
            title="Voice input"
            className={`p-2.5 rounded-xl border transition-all ${
              isRecording
                ? 'bg-rose-500/20 text-rose-400 border-rose-500 animate-pulse'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-slate-700'
            }`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask robotics, Arduino code, sensor troubleshooting..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition-colors"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputQuery.trim() && !selectedImage}
            className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-slate-950 font-bold transition-all shadow-md shadow-cyan-500/20 active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
