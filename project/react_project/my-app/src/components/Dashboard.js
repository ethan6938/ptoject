import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const itemsCollection = collection(db, 'items');

  const fetchItems = async () => {
    const snapshot = await getDocs(itemsCollection);
    setItems(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const handleAdd = async () => {
    if (input.trim()) {
      if (editId) {
        const docRef = doc(db, 'items', editId);
        await updateDoc(docRef, { text: input });
        setEditId(null);
      } else {
        await addDoc(itemsCollection, { text: input });
      }
      setInput('');
      fetchItems();
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'items', id));
    fetchItems();
  };

  const handleEdit = (item) => {
    setInput(item.text);
    setEditId(item.id);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleAdd}>{editId ? 'Update' : 'Add'}</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
