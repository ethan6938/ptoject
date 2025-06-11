import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import './Dashboard.css';

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const itemsCollection = collection(db, 'items');

  useEffect(() => {
    const unsubscribe = onSnapshot(itemsCollection, (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(list);
    });
    return () => unsubscribe();
  }, []);

  const handleAddOrUpdate = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setLoading(true);

    try {
      if (editId) {
        // Update existing
        const docRef = doc(db, 'items', editId);
        await updateDoc(docRef, { text: trimmedInput });
        setEditId(null);
      } else {
        // Add new
        await addDoc(itemsCollection, { text: trimmedInput });
      }

      setInput('');
    } catch (err) {
      console.error('Error adding/updating item:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'items', id));
    } catch (err) {
      console.error('Error deleting item:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setInput(item.text);
    setEditId(item.id);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
  <h2>Dashboard</h2>
  <button onClick={handleLogout}>Logout</button>

  <div style={{ marginTop: '20px' }}>
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Enter item"
    />
    <button
      onClick={handleAddOrUpdate}
      disabled={!input.trim()}
    >
      {editId ? 'Update' : 'Add'}
    </button>
  </div>

  <ul>
    {items.map(item => (
      <li key={item.id}>
        {item.text}
        <div>
          <button onClick={() => handleEdit(item)}>Edit</button>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
}

export default Dashboard;
