"use client";

import { useState } from "react";
import Categories from "./Categories";
import Menu, { type Filter } from "./Menu";

/**
 * Owns the filter shared between the category tiles and the menu grid, so
 * tapping a tile actually filters the menu and scrolls you to it.
 */
export default function DrinksSection() {
  const [filter, setFilter] = useState<Filter>("all");

  const pick = (id: string) => {
    setFilter(id as Filter);
    document.getElementById("menu")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  return (
    <>
      <Categories onPick={pick} />
      <Menu filter={filter} setFilter={setFilter} />
    </>
  );
}
