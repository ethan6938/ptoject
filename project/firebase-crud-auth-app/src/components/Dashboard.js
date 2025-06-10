import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from 'firebase/firestore';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const user = auth.currentUser;

  const fetchItems = async () => {
    const q = query(collection(db, 'items'), where('uid', '==', user.uid));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItems(data);
  };

  useEffect(() => {
    if (user) fetchItems();
  }, [user]);

  const addItem = async () => {
    await addDoc(collection(db, 'items'), { text: newItem, uid: user.uid });
    setNewItem('');
    fetchItems();
  };

  const updateItem = async (id, newText) => {
    const itemRef = doc(db, 'items', id);
    await updateDoc(itemRef, { text: newText });
    fetchItems();
  };

  const deleteItem = async (id) => {
    const itemRef = doc(db, 'items', id);
    await deleteDoc(itemRef);
    fetchItems();
  };

  return (
    <div>
      <h2>Welcome, {user.email}</h2>
      <button onClick={() => signOut(auth)}>Logout</button>
      <input value={newItem} onChange={e => setNewItem(e.target.value)} />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => updateItem(item.id, prompt('New text:', item.text))}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
