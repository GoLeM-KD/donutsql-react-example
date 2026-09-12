import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import Transaction from "./views/Transaction";
import Procedure from "./views/Procedure";
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/transaction">Transaction</Link>
        <Link to="/procedure">Procedure</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/procedure" element={<Procedure />} />
      </Routes>
    </BrowserRouter>
  );
}