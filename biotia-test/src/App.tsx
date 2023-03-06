import { Route, Routes } from "react-router-dom";
import { Pokemon } from "./pages/Pokemon";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:name" element={<Pokemon />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
