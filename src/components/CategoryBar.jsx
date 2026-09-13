import React from "react";
import { CATEGORIES } from "../data/mockData";

export default function CategoryBar({ activeCategory, onSelectCategory }) {
  return (
    <div className="category-bar-wrapper">
      <div className="category-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`category-pill ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => onSelectCategory(cat.id)}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}