import { useState, useEffect, useRef } from 'react';
import './ChatBot.css';
import predefinedQA from './predifinedQA.json';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! How can I help you today?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const [qaData] = useState(predefinedQA);

  // auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = (e) => setInputValue(e.target.value);

  // find match msg from json
  const findBestMatch = (input) => {
    const userInput = input.toLowerCase();
    
    const exactMatch = qaData.find(item => 
      item.question.toLowerCase() === userInput
    );
    
    if (exactMatch) return exactMatch.answer;
    
    // doesnt need exact match, even partial will do
    const partialMatch = qaData.find(item => 
      item.question.toLowerCase().includes(userInput) || 
      userInput.includes(item.question.toLowerCase().substring(0, 10))
    );
    
    if (partialMatch) return partialMatch.answer;
    
    // default res
    return "I'm not sure about that. Would you like to ask about one of these topics instead?";
  };

  // reusable seperate add msg func
  const addMessage = (text, sender) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      sender
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    return newMessage.id + 1;
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    
    addMessage(inputValue, "user");
    const botResponse = findBestMatch(inputValue);
    setInputValue("");
    
    setTimeout(() => {
      addMessage(botResponse, "bot");
      
      if (botResponse.includes("Would you like to ask about")) {
        const suggestedQuestions = qaData.map(item => item.question).slice(0, 3);
        addMessage(suggestedQuestions, "suggestions");
      }
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const handleSuggestionClick = (question) => {
    addMessage(question, "user");
    
    const qaItem = qaData.find(item => item.question === question);
    const answer = qaItem ? qaItem.answer : "I couldn't find information on that topic.";
    
    setTimeout(() => addMessage(answer, "bot"), 600);
  };

  return (
    <div className="chat-widget-container">
      <button 
        className={`chat-widget-button ${isOpen ? 'active' : ''}`} 
        onClick={toggleChat}
        aria-label="Toggle chat widget"
      >
        {isOpen ? '×' : '💬'}
      </button>
      
      {/* chat window */}
      {isOpen && (
        <div className="chat-widget-window">
          <div className="chat-widget-header">
            <h3>FLIN Assistant</h3>
            <button 
              className="minimize-button" 
              onClick={toggleChat}
              aria-label="Minimize chat"
            >
              —
            </button>
          </div>
          
          {/* suggestion pop up when no qa is found */}
          <div className="chat-widget-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                {message.sender === "suggestions" ? (
                  <div className="suggestion-buttons">
                    <p>Here are some things you can ask about:</p>
                    {message.text.map((suggestion, index) => (
                      <button 
                        key={index} 
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="suggestion-button"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="message-text">{message.text}</div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-widget-input">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your question here..."
              aria-label="Type your message"
            />
            <button 
              onClick={handleSendMessage}
              disabled={inputValue.trim() === ""}
              aria-label="Send message"
            >
              Send
            </button>
          </div>
          
          {/* bottom suggestions */}
          <div className="chat-widget-suggestions">
            <p>Common questions:</p>
            <div className="suggestion-chips">
              {qaData.slice(0, 3).map((qa) => (
                <button 
                  key={qa.id} 
                  onClick={() => handleSuggestionClick(qa.question)}
                  className="suggestion-chip"
                >
                  {qa.question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;