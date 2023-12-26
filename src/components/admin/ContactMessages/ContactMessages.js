// ContactMessages.js

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesCollection = collection(db, "contactForms");
        const messagesSnapshot = await getDocs(messagesCollection);
        const messagesData = messagesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      const messageRef = doc(db, "contactForms", id);
      await deleteDoc(messageRef);
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleReply = (message) => {
    setSelectedMessage(message);
    // Redirect to default email client with pre-filled subject and body
    const subject = encodeURIComponent(`Reply to: ${message.subject}`);
    const body = encodeURIComponent(`Original Message:\n${message.message}`);
    window.location.href = `mailto:${message.user_email}?subject=${subject}&body=${body}`;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Contact Messages</h2>
      <ul style={styles.list}>
        {messages.map((message) => (
          <li key={message.id} style={styles.listItem}>
            <p><strong>Name:</strong> {message.user_name}</p>
            <p><strong>Email:</strong> {message.user_email}</p>
            <p><strong>Subject:</strong> {message.subject}</p>
            <p><strong>Message:</strong> {message.message}</p>
            <button style={styles.button} onClick={() => handleDelete(message.id)}>Delete</button>
            <button style={styles.button} onClick={() => handleReply(message)}>Reply</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactMessages;

// Inline styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  button: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginRight: '10px',

    ':hover': {
      backgroundColor: '#2980b9',
    },
  },
};
