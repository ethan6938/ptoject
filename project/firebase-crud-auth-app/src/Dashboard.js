
import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
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
    <div>
      <h2>Topics</h2>
      <input value={newTopic} onChange={(e) => setNewTopic(e.target.value)} />
      <button onClick={addTopic}>Add</button>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id}>
            {topic.name}
            <button onClick={() => deleteTopic(topic.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
