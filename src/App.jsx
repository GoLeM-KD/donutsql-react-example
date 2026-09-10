import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import Transaction from "./views/Transaction";
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/transaction">Transaction</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  );
}