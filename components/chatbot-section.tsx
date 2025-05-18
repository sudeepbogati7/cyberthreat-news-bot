"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { BrainCircuit, Send, User, X, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: number;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hello! I'm your AI cybersecurity assistant. Ask me about recent threats, vulnerabilities, or security best practices.",
    sender: "bot",
    timestamp: new Date(),
  },
];

export function ChatbotSection() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponses: { [key: string]: string } = {
        "ransomware": "Recent ransomware attacks have targeted healthcare and education sectors. The most notable is BlackCat/ALPHV, which uses double extortion tactics. I recommend implementing regular backups, network segmentation, and employee training to mitigate risks.",
        "phishing": "There's been a 30% increase in phishing attacks this quarter. Current campaigns are impersonating major financial institutions and cloud services. Look out for urgent requests, spelling errors, and suspicious links. Enable MFA and conduct regular security awareness training.",
        "vulnerability": "Several critical vulnerabilities were recently discovered in popular software. CVE-2023-1234 affects Windows systems and has a CVSS score of 9.8. Patch your systems immediately and implement a vulnerability management program.",
        "breach": "A major data breach was reported last week affecting a cloud service provider. Approximately 5 million user records were exposed. The attack vector was an unpatched API vulnerability. I recommend reviewing your third-party security assessments.",
        "default": "I don't have specific information about that topic in my current knowledge base. Would you like me to provide general cybersecurity best practices instead?"
      };

      // Determine which response to use based on user input
      let responseContent = botResponses.default;
      for (const [keyword, response] of Object.entries(botResponses)) {
        if (input.toLowerCase().includes(keyword)) {
          responseContent = response;
          break;
        }
      }

      const botMessage: Message = {
        id: messages.length + 2,
        content: responseContent,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            AI-Powered Threat Intelligence
          </h2>
          <p className="text-slate-400 md:text-lg">
            Get instant answers about cybersecurity threats, vulnerabilities, and best practices with our AI assistant.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="grid md:grid-cols-5 min-h-[400px]">
            <div className="md:col-span-2 bg-slate-950 p-6 flex flex-col justify-center">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
                  <BrainCircuit className="h-6 w-6 text-cyan-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Security Assistant</h3>
                <p className="text-slate-400">
                  Our AI-powered chatbot provides real-time information about:
                </p>
              </div>
              
              <ul className="space-y-3 text-sm">
                {["Latest cyber threats", "Vulnerability alerts", "Data breaches", "Security best practices", "Threat analysis"].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center mr-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
              
              <Button 
                onClick={toggleChat}
                className="mt-6 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
              >
                Try It Now
              </Button>
            </div>
            
            <div className="md:col-span-3 p-6">
              <div className="bg-slate-950 rounded-lg border border-slate-800 h-full overflow-hidden">
                <div className="p-3 border-b border-slate-800 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="mx-auto text-sm font-medium">CyberPulse AI Assistant</div>
                </div>
                
                <div className="p-4 h-[300px] overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-2 mt-1">
                        <BrainCircuit className="h-4 w-4 text-cyan-500" />
                      </div>
                      <div className="bg-slate-900 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">Hello! I'm your AI cybersecurity assistant. Ask me about recent threats, vulnerabilities, or security best practices.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start justify-end">
                      <div className="bg-slate-800 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">What are the latest ransomware threats?</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center ml-2 mt-1">
                        <User className="h-4 w-4" />
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-2 mt-1">
                        <BrainCircuit className="h-4 w-4 text-cyan-500" />
                      </div>
                      <div className="bg-slate-900 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">Recent ransomware attacks have targeted healthcare and education sectors. The most notable is BlackCat/ALPHV, which uses double extortion tactics. I recommend implementing regular backups, network segmentation, and employee training to mitigate risks.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 border-t border-slate-800">
                  <div className="flex items-center">
                    <Input 
                      type="text" 
                      placeholder="Ask about cyber threats..." 
                      className="bg-slate-900 border-slate-700 focus-visible:ring-cyan-500"
                      value="What are the latest phishing campaigns?"
                      readOnly
                    />
                    <Button size="icon" className="ml-2 bg-cyan-500 hover:bg-cyan-600">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "auto" : "500px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-80 md:w-96 shadow-2xl"
          >
            <Card className="border-slate-800 bg-slate-950 overflow-hidden h-full flex flex-col">
              <CardHeader className="p-3 border-b border-slate-800 flex flex-row items-center space-y-0 gap-2">
                <div className="flex items-center flex-1">
                  <Avatar className="h-8 w-8 mr-2 bg-cyan-500/20">
                    <BrainCircuit className="h-4 w-4 text-cyan-500" />
                  </Avatar>
                  <CardTitle className="text-sm">CyberPulse AI Assistant</CardTitle>
                </div>
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 text-slate-400 hover:text-white"
                    onClick={toggleMinimize}
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 text-slate-400 hover:text-white hover:bg-red-500/10"
                    onClick={toggleChat}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              {!isMinimized && (
                <>
                  <CardContent className="flex-1 overflow-y-auto p-3 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-start ${
                          message.sender === "user" ? "justify-end" : ""
                        }`}
                      >
                        {message.sender === "bot" && (
                          <Avatar className="h-8 w-8 mr-2 mt-1 bg-cyan-500/20">
                            <BrainCircuit className="h-4 w-4 text-cyan-500" />
                          </Avatar>
                        )}
                        
                        <div
                          className={`rounded-lg p-3 max-w-[80%] ${
                            message.sender === "user"
                              ? "bg-slate-800"
                              : "bg-slate-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div className="text-xs text-slate-500 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                        
                        {message.sender === "user" && (
                          <Avatar className="h-8 w-8 ml-2 mt-1 bg-slate-700">
                            <User className="h-4 w-4" />
                          </Avatar>
                        )}
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex items-start">
                        <Avatar className="h-8 w-8 mr-2 mt-1 bg-cyan-500/20">
                          <BrainCircuit className="h-4 w-4 text-cyan-500" />
                        </Avatar>
                        <div className="bg-slate-900 rounded-lg p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 rounded-full bg-slate-600 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                            <div className="w-2 h-2 rounded-full bg-slate-600 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                            <div className="w-2 h-2 rounded-full bg-slate-600 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </CardContent>
                  
                  <CardFooter className="p-3 border-t border-slate-800">
                    <div className="flex w-full items-center space-x-2">
                      <Input
                        type="text"
                        placeholder="Ask about cyber threats..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-slate-900 border-slate-700 focus-visible:ring-cyan-500"
                      />
                      <Button 
                        size="icon" 
                        onClick={handleSendMessage}
                        disabled={!input.trim()}
                        className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={toggleChat}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-lg"
          >
            <BrainCircuit className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </section>
  );
}
