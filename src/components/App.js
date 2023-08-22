import React, { useState } from 'react';

import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Footer from './Footer';

export default function App() {
  const [data, setData] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('All');

  const onChangeHandler = (filter) => {
    setCurrentFilter(filter);
  };
  const [count, setCount] = useState(1);

  const createTask = (text) => ({
    value: text,
    id: count,
    done: false,
    editing: false,
    createDate: new Date(),
  });

  const onDeleted = (id) => {
    setData((prev) => {
      const idx = prev.findIndex((el) => el.id === id);
      const newData = prev.toSpliced(idx, 1);
      return newData;
    });
  };

  const onToggleDone = (id) => {
    setData((p) => {
      const idx = p.findIndex((el) => el.id === id);
      const oldItem = p[idx];
      const newItem = { ...oldItem, done: !oldItem.done };
      const endCopy = p.toSpliced(idx, 1, newItem);
      // console.log(endCopy)
      return endCopy;
    });
  };

  const addItem = (text) => {
    setCount((prev) => prev + 1);
    setData((prev) => [...prev, createTask(text)]);
  };

  const filteredTasks = data.filter((el) => {
    if (currentFilter === 'Active') {
      return !el.done;
    }
    if (currentFilter === 'Completed') {
      return el.done;
    }
    return true;
  });

  const onClearCompleted = () => {
    setData((prev) => prev.filter((el) => !el.done));
  };

  const onToggleEdit = (id) => {
    setData((p) => {
      const idx = p.findIndex((el) => el.id === id);
      const oldItem = p[idx];
      const newItem = { ...oldItem, editing: !oldItem.editing };
      const endCopy = p.toSpliced(idx, 1, newItem);
      // console.log(endCopy)
      return endCopy;
    });
  };

  const onEdit = (newValue, id) => {
    const idx = data.findIndex((el) => el.id === id);
    const oldItem = data[idx];
    const newItem = { ...oldItem, value: newValue, editing: !oldItem.editing };
    const newData = data.toSpliced(idx, 1, newItem);
    setData(newData);
    // console.log(data)
  };
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddItem={addItem} />
      </header>
      <section className="main">
        <TaskList
          data={filteredTasks}
          onDeleted={(id) => onDeleted(id)}
          onToggleDone={(id) => onToggleDone(id)}
          onToggleEdit={(id) => onToggleEdit(id)}
          onEdit={onEdit}
        />
        <Footer
          data={data}
          onChangeHandler={onChangeHandler}
          currentFilter={currentFilter}
          onClearCompleted={onClearCompleted}
        />
      </section>
    </section>
  );
}
