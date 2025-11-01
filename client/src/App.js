import './App.css';
import GoogleSignIn from './components/GoogleSignIn';
import ImageGallery from './components/ImageGallery';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ImageGallery />}></Route>
          <Route path="/googleSignIn" element={<GoogleSignIn />}></Route>
          <Route path="/profile" element={<Profile />}></Route>

        </Routes>


      </Router>
    </div>
  );
}

export default App;
