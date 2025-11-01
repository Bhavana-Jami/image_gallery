import React from "react"
import { useState } from "react"
import '../styles/Profile.css'
const sampleImages = [
  { id: "1", url: "/majestic-mountain-vista.png", caption: "Reach new heights" },
  { id: "2", url: "/luxury-car-sleek-design.png", caption: "Dream car goals" },
  { id: "3", url: "/peaceful-beach.jpg", caption: "Find your peace" },
  { id: "4", url: "/modern-house.png", caption: "Home sweet home" },
  { id: "5", url: "/success-celebration.png", caption: "Celebrate wins" },
  { id: "6", url: "/diverse-fitness-workout.png", caption: "Stay strong" },
]

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

  const addImageToBoard = (image) => {
    const newItem= {
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

  const clearBoard = () => {
    setBoardItems([])
  }

  const filteredImages = sampleImages.filter(
    (img) => searchQuery === "" || img.caption.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="vision-board-app">
      {/* Header */}
      <header className="header">
        <div className="logo">Vision Board</div>
        <div className="user-section">
          <div className="user-avatar">JD</div>
        </div>
      </header>

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
            <div className="board-controls">
              <button className="control-button" onClick={clearBoard}>
                Clear Board
              </button>
            </div>
            <h1 className="board-title">Your Vision Board ✨</h1>
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

      {/* Floating Action Button */}
      <button className="fab" onClick={() => setShowQuoteModal(true)} title="Add Quote">
        +
      </button>

      {showQuoteModal && (
        <div className="modal-overlay" onClick={() => setShowQuoteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add Inspirational Quote</h3>
            <p>Add a random motivational quote to your vision board?</p>
            <div className="modal-buttons">
              <button className="modal-button secondary" onClick={() => setShowQuoteModal(false)}>
                Cancel
              </button>
              <button className="modal-button primary" onClick={addQuoteToBoard}>
                Add Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
