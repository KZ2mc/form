import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Calendar from "./components/Calendar";
import BookingForm from "./components/BookingForm";
import Home from "./Home";
import Services from "./Services";
import Residential from "./Residential";
import Commercial from "./Commercial";
import Long from "./Long";
import Packing from "./Packing";
import HeavyItems from "./HeavyItems";
import FurnitureAssembly from "./FurnitureAssembly";
import Senior from "./Senior";
import Local from "./Local";
import Storage from "./Storage";
import Prices from "./Prices";
import Blog from "./Blog";
import Blog_movers_or_uhaul from "./Blog-movers-or-uhaul";
import Blog_estimate_move_size from "./Blog-estimate-move-size";
import Blog_what_to_expect from "./Blog-what-to-expect";
import Blog_prepare_for_move from "./Blog-prepare-for-move";
import Blog_choose_mc from "./Blog-choose-mc";
import GetQuote from "./GetQuote";
import Book from "./Book";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Calendar year={2023} month={4} />
    <BookingForm />
  </React.StrictMode>

  /*
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prices" element={<Prices />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services-residential" element={<Residential />} />
        <Route path="/services-commercial" element={<Commercial />} />
        <Route path="/services-long-distance" element={<Long />} />
        <Route path="/services-packing" element={<Packing />} />
        <Route path="/services-heavy-items" element={<HeavyItems />} />
        <Route path="/services-furniture-assembly" element={<FurnitureAssembly />} />
        <Route path="/services-senior-moving" element={<Senior />} />
        <Route path="/services-local-moving" element={<Local />} />
        <Route path="/services-storage" element={<Storage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-hire-movers-or-rent-uhaul" element={<Blog_movers_or_uhaul />} />
        <Route path="/blog-estimate-move-size" element={<Blog_estimate_move_size />} />
        <Route path="/blog-what-to-expect" element={<Blog_what_to_expect />} />
        <Route path="/blog-how-to-prepare" element={<Blog_prepare_for_move />} />
        <Route path="/blog-how-to-choose-moving-company" element={<Blog_choose_mc />} />
        <Route path="/get-quote" element={<GetQuote />} />
        <Route path="/book" element={<Book />} />
      </Routes>
    </Router>
  </React.StrictMode>*/
);
