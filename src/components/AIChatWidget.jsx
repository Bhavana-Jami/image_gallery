import React, { useState, useRef, useEffect } from 'react';
import '../styles/AIChatWidget.css';

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hi! 👋 I\'m your Vision Board AI Assistant. Need help creating your perfect vision board?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastChatRequestTime, setLastChatRequestTime] = useState(0);
  const [chatCooldownSeconds, setChatCooldownSeconds] = useState(0);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Rate limiting: Allow 1 message per 2 seconds
    const now = Date.now();
    const timeSinceLastRequest = (now - lastChatRequestTime) / 1000;
    const cooldownPeriod = 2; // seconds between messages

    if (timeSinceLastRequest < cooldownPeriod) {
      const remainingTime = Math.ceil(cooldownPeriod - timeSinceLastRequest);
      setChatCooldownSeconds(remainingTime);
      const countdown = setInterval(() => {
        setChatCooldownSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return;
    }

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setLastChatRequestTime(now);
    setChatCooldownSeconds(cooldownPeriod);

    try {
      const response = await fetch('http://localhost:5000/api/vision-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: data.response,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          className="chat-widget-button"
          onClick={() => setIsOpen(true)}
          title="Vision Board AI Assistant"
        >
          <span className="chat-icon">💬</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-widget-window">
          {/* Header */}
          <div className="chat-widget-header">
            <div className="chat-widget-title">
              <span className="chat-widget-icon">✨</span>
              Vision Board AI
            </div>
            <button
              className="chat-widget-close"
              onClick={() => setIsOpen(false)}
              title="Close"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="chat-widget-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-widget-message ${message.type}`}
              >
                <div className="message-bubble">
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-widget-message bot">
                <div className="message-bubble typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-widget-input-area">
            <textarea
              className="chat-widget-textarea"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading || chatCooldownSeconds > 0}
              rows="2"
            />
            <button
              className="chat-widget-send"
              onClick={sendMessage}
              disabled={isLoading || !input.trim() || chatCooldownSeconds > 0}
              title={chatCooldownSeconds > 0 ? `Please wait ${chatCooldownSeconds}s before sending another message` : "Send message"}
            >
              {isLoading ? '⏳' : chatCooldownSeconds > 0 ? '⏱️' : '→'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
