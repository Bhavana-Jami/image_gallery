import React from "react"
import { useState } from "react"
import '../styles/Profile.css'
import AIChatWidget from "./AIChatWidget"
const sampleImages = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    caption: "Reach new heights"
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    caption: "Dream car goals"
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    caption: "Find your peace"
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    caption: "Home sweet home"
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1515165562835-c4c3b1b1b0d5",
    caption: "Celebrate wins"
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1571019613576-2b22c76fd955",
    caption: "Stay strong"
  },
];


const motivationalQuotes = [
  "The future belongs to those who believe in the beauty of their dreams.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there.",
  "Your limitation—it's only your imagination.",
]

export default function Profile() {
  const [boardItems, setBoardItems] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [aiQuoteTopic, setAiQuoteTopic] = useState("")
  const [aiQuoteLoading, setAiQuoteLoading] = useState(false)
  const [aiGeneratedQuote, setAiGeneratedQuote] = useState("")
  const [lastQuoteRequestTime, setLastQuoteRequestTime] = useState(0)
  const [quoteCooldownSeconds, setQuoteCooldownSeconds] = useState(0)

  const addImageToBoard = (image) => {
    const newItem = {
      id: `item-${Date.now()}`,
      type: "image",
      content: image.url,
      caption: image.caption,
    }
    setBoardItems((prev) => [...prev, newItem])
  }

  const addQuoteToBoard = () => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
    const newItem = {
      id: `quote-${Date.now()}`,
      type: "quote",
      content: randomQuote,
    }
    setBoardItems((prev) => [...prev, newItem])
    setShowQuoteModal(false)
  }

  const generateAIQuote = async () => {
    if (!aiQuoteTopic.trim()) return

    // Rate limiting: 5 requests per minute (12 second cooldown)
    const now = Date.now()
    const timeSinceLastRequest = (now - lastQuoteRequestTime) / 1000
    const cooldownPeriod = 12 // seconds between requests

    if (timeSinceLastRequest < cooldownPeriod) {
      const remainingTime = Math.ceil(cooldownPeriod - timeSinceLastRequest)
      setQuoteCooldownSeconds(remainingTime)
      // Show countdown
      const countdown = setInterval(() => {
        setQuoteCooldownSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(countdown)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return
    }

    setAiQuoteLoading(true)
    setLastQuoteRequestTime(now)
    setQuoteCooldownSeconds(cooldownPeriod)

    try {
      const response = await fetch("http://localhost:5000/api/generate-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: aiQuoteTopic }),
      })

      if (!response.ok) throw new Error("Failed to generate quote")
      
      const data = await response.json()
      setAiGeneratedQuote(data.quote)
    } catch (error) {
      console.error("Error generating quote:", error)
      setAiGeneratedQuote("Failed to generate quote. Please try again.")
    } finally {
      setAiQuoteLoading(false)
    }
  }

  const addAIQuoteToBoard = () => {
    if (aiGeneratedQuote) {
      const newItem = {
        id: `quote-${Date.now()}`,
        type: "quote",
        content: aiGeneratedQuote,
      }
      setBoardItems((prev) => [...prev, newItem])
      setAiQuoteTopic("")
      setAiGeneratedQuote("")
      setShowQuoteModal(false)
    }
  }

  const clearBoard = () => {
    setBoardItems([])
  }

  const filteredImages = sampleImages.filter(
    (img) => searchQuery === "" || img.caption.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="vision-board-app">
      {/* Header 
      <header className="header-profile">
        <div className="logo">Hi, Welcome!</div>
        <div className="user-section">
          <div className="user-avatar">JD</div>
        </div>
      </header>*/}

      {/* Main Content */}
      <main className="main-content">
        {/* Left Panel */}
        <div className="left-panel">
          <div className="search-section">
            <input
              type="text"
              className="search-bar"
              placeholder="Search images for your vision..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              className="add-quote-btn" 
              onClick={() => setShowQuoteModal(true)} 
              title="Add Quote"
            >
             Add Quote ✨ 
            </button>
          </div>

          <div className="image-results">
            {filteredImages.map((image) => (
              <div key={image.id} className="image-result">
                <img src={image.url || "/placeholder.svg"} alt={image.caption} />
                <button className="add-button" onClick={() => addImageToBoard(image)}>
                  + Add to Board
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <div className="board-header">
            <div>
              <h1 className="board-title">Let's draft your vision board!</h1>
            </div>
            <div className="board-controls">
              <button className="control-button" onClick={clearBoard}>
                Clear Board
              </button>
            </div>
            <div></div>
          </div>

          <div className="vision-board">
            {boardItems.map((item) => (
              <div key={item.id} className="board-item">
                {item.type === "image" ? (
                  <>
                    <img src={item.content || "/placeholder.svg"} alt={item.caption} />
                    <div className="overlay">
                      <div className="caption">{item.caption}</div>
                    </div>
                  </>
                ) : (
                  <div className="quote-card">
                    <div className="quote-text">"{item.content}"</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* AI Chat Widget */}
      <AIChatWidget />

      {showQuoteModal && (
        <div className="modal-overlay" onClick={() => setShowQuoteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add Quote to Vision Board</h3>
            
            <div className="modal-tabs">
              <div className="tab-content">
                <label>What is your topic/goal?</label>
                <input
                  type="text"
                  placeholder="e.g., Success, Health, Creativity..."
                  value={aiQuoteTopic}
                  onChange={(e) => setAiQuoteTopic(e.target.value)}
                  className="topic-input"
                  onKeyPress={(e) => e.key === 'Enter' && generateAIQuote()}
                />
                
                <button 
                  className="modal-button primary ai-generate-btn"
                  onClick={generateAIQuote}
                  disabled={aiQuoteLoading || quoteCooldownSeconds > 0}
                  title={quoteCooldownSeconds > 0 ? `Please wait ${quoteCooldownSeconds}s before generating another quote` : "Generate an AI-powered quote"}
                >
                  {aiQuoteLoading ? "✨ Generating..." : quoteCooldownSeconds > 0 ? `⏱️ Wait ${quoteCooldownSeconds}s` : "✨ Generate AI Quote"}
                </button>

                {aiGeneratedQuote && (
                  <div className="ai-quote-display">
                    <p className="ai-quote-text">"{aiGeneratedQuote}"</p>
                    <div className="ai-quote-actions">
                      <button 
                        className="modal-button secondary"
                        onClick={() => setAiGeneratedQuote("")}
                      >
                        Regenerate
                      </button>
                      <button 
                        className="modal-button primary"
                        onClick={addAIQuoteToBoard}
                      >
                        Add to Board
                      </button>
                    </div>
                  </div>
                )}

                <div className="divider">OR</div>

                <button 
                  className="modal-button secondary"
                  onClick={addQuoteToBoard}
                >
                  Add Random Quote
                </button>
              </div>
            </div>

            <div className="modal-buttons">
              <button 
                className="modal-button secondary" 
                onClick={() => {
                  setShowQuoteModal(false)
                  setAiQuoteTopic("")
                  setAiGeneratedQuote("")
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
