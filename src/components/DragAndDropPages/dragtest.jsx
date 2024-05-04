import React, { useState, useEffect } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";

export const CustomKanban = () => {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <Board />
    </div>
  );
};

const Board = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://djangoapibekmurod.pythonanywhere.com/todos/", {
          method: "GET",
          headers: {
            "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0ODMzNjEyLCJpYXQiOjE3MTQ4MzAwMTIsImp0aSI6IjdiMmMxYzNlOWEwMjRiZDc5MDc1NTIwNjVmZGMwNDRkIiwidXNlcl9pZCI6MTV9.URe_ZD7Yy_YB5ToLklkNujW7TZlCwrJDJnFiNCZgm2Y"
          }
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCards(data.map(card => ({ ...card, id: card.id.toString() }))); // Convert ID to string if necessary
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      {['todo', 'doing', 'done'].map(column => (
        <Column
          key={column}
          title={column.charAt(0).toUpperCase() + column.slice(1)}
          column={column}
          cards={cards.filter(card => card.column === column)}
          setCards={setCards}
        />
      ))}
    </div>
  );
};

const Column = ({ title, column, cards, setCards }) => {
  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
    console.log('Dragging:', card.id);
  };

  const handleDrop = (e, newColumn) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    console.log('Dropping:', cardId, 'to', newColumn);

    setCards(prev => {
      return prev.map(card => {
        if (card.id === cardId) {
          return { ...card, column: newColumn };
        }
        return card;
      });
    });
  };

  return (
    <div 
      className="w-56 flex flex-col space-y-4 p-4 bg-neutral-800"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, column)}
    >
      <h2 className="text-xl font-bold text-neutral-100">{title}</h2>
      {cards.map(card => (
        <motion.div
          key={card.id}
          layout
          draggable
          onDragStart={(e) => handleDragStart(e, card)}
          className="cursor-grab rounded border bg-neutral-700 p-2"
        >
          {card.title}
        </motion.div>
      ))}
    </div>
  );
};

const BurnBarrel = ({ setCards }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    console.log('Deleting card:', cardId);

    setCards(prev => prev.filter(card => card.id !== cardId));
  };

  return (
    <div
      className="mt-10 p-10 bg-red-500 text-white text-center"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <FiTrash size={24} />
      <p>Drag here to delete</p>
    </div>
  );
};
