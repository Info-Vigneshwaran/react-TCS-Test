import React, { useState, useEffect } from 'react';
import './style.css';
const intialList = [
  { name: 'test1', id: 1 },
  { name: 'test2', id: 2 },
];
export default function App() {
  const [lists, setLists] = useState(intialList);
  const [name, setName] = useState('');
  const [showTodo, setShowTodo] = useState(false);
  useEffect(() => {
    let login_check = sessionStorage.getItem('login');
    if (!login_check) {
      setShowTodo(false);
    }
  }, [showTodo]);
  const handleRemove = (id) => {
    let update_list = lists.filter(function (list) {
      return list.id !== id;
    });
    setLists(update_list);
  };
  const handleClick = () => {
    let new_todo = { id: lists.length + 1, name: name };
    setLists([...lists, new_todo]);
    setName('');
  };
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleLogin = (e) => {
    sessionStorage.setItem('login', true);
    setShowTodo(true);
  };
  const handleLogout = (e) => {
    sessionStorage.setItem('login', false);
    setShowTodo(false);
  };
  return (
    <div>
      {showTodo ? (
        <input type="button" value="logout" onClick={handleLogout} />
      ) : (
        <input type="button" value="login" onClick={handleLogin} />
      )}
      <h1>List</h1>
      {showTodo ? (
        <ul>
          <input type="text" onChange={handleChange} value={name} />
          <input type="button" onClick={handleClick} value="Add" />
          {lists.map((list) => (
            <li>
              {list.name}
              <input
                type="button"
                value="remove"
                onClick={() => handleRemove(list.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div>Need to login</div>
      )}
    </div>
  );
}
