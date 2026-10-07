import React from "react";
import ReactDOM from "react-dom/client";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  React.createElement(
    "div",
    {
      style: {
        padding: "40px",
        fontFamily: "Arial"
      }
    },
    React.createElement("h1", null, "🧯 Požárník AI"),
    React.createElement("p", null, "React render funguje!")
  )
);