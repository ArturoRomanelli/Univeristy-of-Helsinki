import type { NoteInterface } from "./interfaces/NoteInterface";
import Note from "./components/Note.tsx";
import { useState, useEffect } from "react";
import noteService from "./services/notes";
import Notification from "./components/Notification.tsx";
import Footer from "./components/Footer.tsx";

const App = () => {
  //Hooks
  const [notes, setNotes] = useState<NoteInterface[]>([]);
  const [newNote, setNewNote] = useState<string>("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState<string | null>("");
  useEffect(() => {
    noteService.getAll().then((initialNotes: NoteInterface[]) => {
      setNotes(initialNotes);
    });
  }, []);

  //Functions
  const toggleImportanceOf = (id: number) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = {
      content: note!.content,
      id: note!.id,
      important: !note!.important,
    };

    noteService
      .update(id, changedNote)
      .then((returnedNote: NoteInterface) => {
        setNotes(notes.map((note) => (note.id === id ? returnedNote : note)));
      })
      .catch(() => {
        setMessage(`Note '${note!.content}' was already removed from server`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: null,
    };
    noteService.create(noteObject).then((returnedNote: NoteInterface) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  //variables

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  //Render
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <Notification message={message} />
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id!)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
