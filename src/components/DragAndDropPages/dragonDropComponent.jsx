import React, { useState, useEffect } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import "./dragonDropComponent.css";
import { colors } from "@mui/material";

export const DragonDropComponent = () => {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <Board />
    </div>
  );
};

const Board = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://djangoapibekmurod.pythonanywhere.com/todos/",
        {
          method: "GET",
          headers: {
            // "Content-Type": "application/json",
            Authorization:
              "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0ODM3MzY2LCJpYXQiOjE3MTQ4MzM3NjYsImp0aSI6IjAwMDIzMTgxZjY4MTRkZmJhY2NmZTNiMmUwYTVlNTc5IiwidXNlcl9pZCI6MTV9.YfBI5avRndKIZEQ2GUbKhWKwD2vy4bB15KyraDOH3zk",
          },
          // body: JSON.stringify(cards),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      setCards(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-row h-auto w-full gap-3 overflow-scroll p-12">
      <div className="flex-auto border-2 border-[#5200ff] p-2">
        {/* flex-auto border-2 border-blue-900 p-2 */}
        <h2 className="text-xl font-bold text-center mb-1">TODO</h2>
        <Column column="todo" cards={cards} setCards={setCards} />
      </div>
      <div className="flex-auto h-auto border-2 border-[#5200ff] p-2">
        <h2 className="text-xl font-bold text-center mb-1">In Progress</h2>
        <Column column="doing" cards={cards} setCards={setCards} />
      </div>
      <div className="flex-auto border-2 border-[#5200ff]  p-2">
        <h2 className="text-xl font-bold text-center mb-1">Done</h2>
        <Column column="done" cards={cards} setCards={setCards} />
      </div>
      <div className="w-1/5">
        <BurnBarrel setCards={setCards} />
      </div>
    </div>
  );
};

const Column = ({ title, headingColor, cards, column, setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
    console.log("Dragging:", card.id);
  };

  const handleDrop = (e, newColumn) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    console.log("Dropping:", cardId, "to", newColumn);

    setCards((prev) => {
      return prev.map((card) => {
        if (card.id === cardId) {
          return { ...card, column: newColumn };
        }
        return card;
      });
    });
  };


  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  // const filteredCards = cards;

  return (
    <div className="contain">
      <div className="mb-3 flex items-center justify-between ">
        <h3 className={`font-medium ${headingColor} `}>{title}</h3>
        {/* <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span> */}
      </div>
      <div
        onDrop={(e) => handleDrop(e, column)}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return (
            <Card
              key={c.id}
              {...c}
              title={c.title}
              handleDragStart={handleDragStart}
            />
          );
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

const Card = ({ title, id, column, handleDragStart }) => {
  return (
    <>
      {/* <DropIndicator beforeId={id} column={column} /> */}
      <DropIndicator beforeId={id} column=" todo" />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab rounded border border-[#5200ff]  bg-[#98E2F6] p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </>
  );
};

const DropIndicator = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

const BurnBarrel = ({ setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    setCards((pv) => pv.filter((c) => c.id !== cardId));

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

const AddCard = ({ column, setCards }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      column,
      name: text.trim(),
      id: Math.random().toString(),
    };

    setCards((pv) => [...pv, newCard]);

    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};
