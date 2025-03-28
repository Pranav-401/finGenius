"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  PiggyBank,
  TrendingUp,
  CreditCard,
  User,
  Send,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import debounce from "lodash/debounce";

export default function FinancialAdvisorChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  // Handle user scrolling to prevent auto-scroll when user is manually scrolling
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatContainer;
      if (scrollHeight - scrollTop - clientHeight < 50) {
        setIsUserScrolling(false);
      } else {
        setIsUserScrolling(true);
      }
    };

    chatContainer.addEventListener("scroll", handleScroll);
    return () => chatContainer.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    if (!isUserScrolling && messagesEndRef.current && isOpen) {
      setTimeout(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, isOpen, isUserScrolling]);

  // Set mounted state to ensure client-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Quick action buttons for common queries
  const quickActions = [
    {
      icon: <PiggyBank className="mr-2 h-4 w-4" />,
      text: "Saving Tips",
      prompt: "What are some effective strategies for saving money?",
    },
    {
      icon: <TrendingUp className="mr-2 h-4 w-4" />,
      text: "Investments",
      prompt: "What investment options are good for beginners?",
    },
    {
      icon: <CreditCard className="mr-2 h-4 w-4" />,
      text: "Debt Management",
      prompt: "How can I effectively manage and reduce my debt?",
    },
    {
      icon: <DollarSign className="mr-2 h-4 w-4" />,
      text: "Budgeting",
      prompt: "How do I create a monthly budget?",
    },
  ];

  const handleInputChange = (e) => setInput(e.target.value);

  // Debounced function to handle message submission
  const debouncedSubmit = useCallback(
    debounce(async (userMessage) => {
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [...messages, userMessage] }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(
            data.error || `Request failed with status ${response.status}`
          );
        }

        const data = await response.json();
        console.log("API Response:", data.message);

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.message,
            id: (Date.now() + 1).toString(),
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      } catch (err) {
        console.error("Error sending message:", err);
        setError("Oops! Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [messages]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: "user",
      content: input,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    debouncedSubmit(userMessage);
  };

  const handleQuickAction = (prompt) => {
    setInput(prompt);
    const fakeEvent = {
      preventDefault: () => {},
      currentTarget: { reset: () => {} },
    };
    setTimeout(() => handleSubmit(fakeEvent), 100);
  };

  if (!mounted) return null;

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 sm:w-14 sm:h-14 shadow-lg bg-emerald-500 hover:bg-emerald-600 transition-all z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-[90vw] max-w-[400px] sm:max-w-md max-h-[80vh] sm:max-h-[70vh] flex flex-col shadow-xl z-50 transition-all duration-300 border border-emerald-200 rounded-xl">
          <CardHeader className="bg-emerald-50 border-b border-emerald-200 shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg sm:text-xl flex items-center text-emerald-800">
                <DollarSign className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
                Financial Advisor
              </CardTitle>
              <Badge
                variant="outline"
                className="bg-emerald-100 text-emerald-800 border-emerald-300 text-xs sm:text-sm"
              >
                Powered by Gemini
              </Badge>
            </div>
          </CardHeader>

          <Tabs defaultValue="chat" className="flex-1 flex flex-col">
            <TabsList className="mx-4 mt-2 justify-start shrink-0">
              <TabsTrigger value="chat" className="text-xs sm:text-sm">
                Chat
              </TabsTrigger>
              <TabsTrigger value="quick-actions" className="text-xs sm:text-sm">
                Quick Actions
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="chat"
              className="flex-1 flex flex-col p-0 m-0 min-h-0"
              style={{ maxHeight: "100%" }}
            >
              <CardContent
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-emerald-100"
                style={{ maxHeight: "calc(80vh - 200px)" }}
              >
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4 sm:p-8 text-slate-500">
                    <DollarSign className="h-10 w-10 sm:h-12 sm:w-12 mb-4 text-emerald-500" />
                    <h3 className="text-base sm:text-lg font-medium mb-2">
                      Welcome to Financial Advisor
                    </h3>
                    <p className="text-sm sm:text-base max-w-md">
                      Ask me anything about personal finance, investments,
                      saving strategies, budgeting tips, or debt management.
                    </p>
                  </div>
                ) : (
                  <>
                    {error && (
                      <div className="p-3 sm:p-4 mb-4 text-red-700 bg-red-100 rounded-md">
                        <p className="font-medium text-sm sm:text-base">
                          {error}
                        </p>
                      </div>
                    )}
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex items-start gap-2 sm:gap-3 mb-4 animate-slide-in",
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        )}
                      >
                        {message.role === "assistant" && (
                          <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                            <DollarSign className="h-4 w-4 text-emerald-600" />
                          </div>
                        )}
                        <div
                          className={cn(
                            "max-w-[80%] rounded-lg p-2 sm:p-3 break-words shadow-sm",
                            message.role === "user"
                              ? "bg-emerald-600 text-white"
                              : "bg-emerald-50 border border-emerald-200 text-emerald-900",
                            "overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-emerald-100"
                          )}
                          style={{ maxHeight: "150px", minHeight: "50px" }}
                        >
                          <div className="text-sm sm:text-base">
                            <ReactMarkdown>{message.content}</ReactMarkdown>
                          </div>
                          <div className="text-xs text-emerald-600 mt-1">
                            {message.timestamp}
                          </div>
                        </div>
                        {message.role === "user" && (
                          <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                            <User className="h-4 w-4 text-emerald-600" />
                          </div>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex items-start gap-2 sm:gap-3 mb-4 justify-start animate-slide-in">
                        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                          <DollarSign className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div className="max-w-[80%] rounded-lg p-2 sm:p-3 bg-emerald-50 border border-emerald-200">
                          <div className="flex space-x-2">
                            <div
                              className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </CardContent>
              <CardFooter className="border-t border-emerald-200 p-4 shrink-0 bg-emerald-50">
                <form onSubmit={handleSubmit} className="flex w-full space-x-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask about financial advice..."
                    className="flex-1 text-sm sm:text-base border-emerald-300 focus:ring-emerald-500"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-pulse text-xs sm:text-sm">
                          Thinking...
                        </div>
                      </div>
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              </CardFooter>
            </TabsContent>
            <TabsContent
              value="quick-actions"
              className="flex-1 p-0 m-0 min-h-0"
            >
              <div className="p-4 sm:p-6 grid grid-cols-1 gap-4 overflow-y-auto">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto py-3 px-4 sm:py-4 sm:px-6 flex items-center justify-start text-left w-full hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all duration-200"
                    onClick={() => handleQuickAction(action.prompt)}
                    disabled={isLoading}
                  >
                    <div className="flex items-center">
                      <div className="mr-2 sm:mr-3 p-2 rounded-full bg-emerald-100 text-emerald-700">
                        {action.icon}
                      </div>
                      <div>
                        <div className="font-medium text-sm sm:text-base">
                          {action.text}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Get personalized advice
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </>
  );
}
