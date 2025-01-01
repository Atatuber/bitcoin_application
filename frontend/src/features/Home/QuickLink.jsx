import React from "react";
import { Link } from "react-router-dom";

export default function QuickLink({
  to = "#",
  text = "Get started",
  svgIcon = null,
  color = ""
}) {
  return (
    <Link to={to} className={`inline-flex items-center px-4 py-2 text-white text-sm font-medium rounded-md ${color} `}>
      <span className="me-3">{svgIcon}</span>
      <span className="me-3">{text}</span>
    </Link>
  );
}
