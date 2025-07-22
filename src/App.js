import './App.css';
import GoogleSignIn from './components/GoogleSignIn';
import ImageGallery from './components/ImageGallery';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ImageGallery />}></Route>
          <Route path="/googleSignIn" element={<GoogleSignIn />}></Route>

        </Routes>


      </Router>
    </div>
  );
}

export default App;
