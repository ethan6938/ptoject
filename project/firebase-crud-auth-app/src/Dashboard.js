import React, { useEffect, useState } from "react";
import { auth, db } from './firebase';
import { ref, onValue, push, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const navigate = useNavigate();

  const topicsRef = ref(db, "topics");

  useEffect(() => {
    const unsubscribe = onValue(topicsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const parsed = Object.entries(data).map(([id, value]) => ({ id, ...value }));
      setTopics(parsed);
    });
    return () => unsubscribe();
  }, []);

  const addTopic = () => {
    if (newTopic.trim()) {
      push(topicsRef, { name: newTopic });
      setNewTopic("");
    }
  };

  const deleteTopic = (id) => remove(ref(db, `topics/${id}`));

  const logout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Welcome to My Topics</h2>
        <p className="mb-6 text-gray-600">Add and manage topics you like!</p>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            placeholder="Enter a topic"
            className="border p-2 rounded-l w-full focus:outline-none"
          />
          <button
            onClick={addTopic}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <ul className="list-disc pl-5 space-y-2">
          {topics.map((topic) => (
            <li key={topic.id} className="flex justify-between items-center">
              <span className="text-gray-700">{topic.name}</span>
              <button
                onClick={() => deleteTopic(topic.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={logout}
          className="mt-6 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
