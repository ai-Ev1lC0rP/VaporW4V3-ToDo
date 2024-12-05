import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTodos } from './hooks/useTodos';
import { db } from './lib/db';
import headerImage from './assets/header.jpg';
// ... rest of imports

function App() {
  const [activeTab, setActiveTab] = useState('active');
  const { 
    todos, 
    loading, 
    error, 
    addTodo, 
    updateTodo, 
    deleteTodo, 
    archiveTodo 
  } = useTodos(activeTab === 'archived');

  useEffect(() => {
    db.init();
  }, []);

  // ... rest of your state declarations

  if (loading) {
    return <div className="loading" />;
  }

  return (
    <div className="container">
      <div className="todo-app">
        <motion.div
          className="app-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ backgroundImage: `url(${headerImage})` }}
        >
          <h1 className="app-title">Cason's Task List</h1>
        </motion.div>

        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.div>
        )}

        <div className="tab-container">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`tab ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active Tasks
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`tab ${activeTab === 'archived' ? 'active' : ''}`}
            onClick={() => setActiveTab('archived')}
          >
            Old Tasks
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Rest of your todo list rendering */}
          </motion.div>
        </AnimatePresence>

        {/* Rest of your component */}
      </div>
    </div>
  );
}

export default App;
