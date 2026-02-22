import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Movies from "./sections/MovieSection";
import SearchSection from "./sections/SearchSection";
import { MoviesProvider } from "./context/MoviesContext";

function App() {
  return (
    <MoviesProvider>
      <Navbar />
      <main>
        <SearchSection />
        <Movies />
      </main>
      <Footer />
    </MoviesProvider>
  );
}

export default App;