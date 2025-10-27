import React, { useState, useEffect } from "react";

function App() {
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState([]);

  
  useEffect(() => {
  const savedNotes = localStorage.getItem("notes");
  if (savedNotes) {
    setNotes(JSON.parse(savedNotes));
  }
}, []);


  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
 }, [notes]);

  
  const addNote = () => {
    if (input.trim() === "") return; 
    setNotes([...notes, input]);
    setInput("");
  };

  
  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-black p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-500">My Notes App</h1>

      <div className="w-full max-w-md">
        {/* Input row */}
        <div className="flex mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a note..."
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button
            onClick={addNote}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Notes List */}
        <div>
          {notes.length === 0 ? (
            <p className="text-gray-500 text-center">No notes yet — add one!</p>
          ) : (
            notes.map((note, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded-md shadow-sm flex justify-between items-center mb-2"
              >
                <span>{note}</span>
                <button
                  onClick={() => deleteNote(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
