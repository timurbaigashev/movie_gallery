import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Movies from './sections/MovieSection';


function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="content">
        <Movies/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
