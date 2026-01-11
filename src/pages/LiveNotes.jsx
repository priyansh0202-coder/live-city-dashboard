import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function LiveNotes() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const q = query(collection(db, "liveNotes"), orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotes(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const sendNote = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, "liveNotes"), {
      message: text,
      username: user.username,
      createdAt: serverTimestamp(),
    });

    setText("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">💬 Live City Notes</h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-600"
        >
          Back
        </button>
      </div>

      {/* Messages */}
      <div className="p-6 max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow p-4 h-[400px] overflow-y-auto">
          {loading && <p className="text-gray-400">Loading live notes...</p>}

          {!loading && notes.length === 0 && (
            <p className="text-gray-400">No messages yet</p>
          )}

          {notes.map((note) => {
            const isMine = note.username === user.username;

            return (
              <div
                key={note.id}
                className={`mb-3 flex ${
                  isMine ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] px-3 py-2 rounded-lg text-sm shadow
          ${
            isMine
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-gray-100 text-gray-800 rounded-bl-none"
          }`}
                >
                  {!isMine && (
                    <p className="text-xs font-semibold mb-1 text-gray-800">
                      {note.username}
                    </p>
                  )}
                  <p>{note.message}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="mt-4 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded p-2"
          />
          <button
            onClick={sendNote}
            onKeyDown={(e) => e.key === "Enter" && sendNote()}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Send
          </button>
        </div>

        <p className="text-xs text-green-600 mt-2">🔴 Live updates enabled</p>
      </div>
    </div>
  );
}
