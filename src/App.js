import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddBtn, setShowAddBtn] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksGet = await fetchTasks();
      setTasks(tasksGet);
    };

    getTasks();
  }, []);

  // Fetch Tasks From Server
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:4000/tasks");
    const data = await res.json();
    return data;
  };

  // Fetch Task From Server
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:4000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  // Add New Task
  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);

    const res = await fetch("http://localhost:4000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  };

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:4000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggles reminder
  const toggleReminder = async (id) => {
    const taskToggle = await fetchTask(id);
    const updatedTask = { ...taskToggle, reminder: !taskToggle.reminder };
    const res = await fetch(`http://localhost:4000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  // Update Task Name --NOT WORKING
  // const updateTaskName = async (id) => {
  //   const taskName = await fetchTask(id);
  //   const taskText = { ...taskName, text: taskName.text };
  //   const res = await fetch(`http://localhost:4000/tasks/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(taskText),
  //   });
  //   const data = await res.json();

  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === id ? { ...task, taskName: data.text } : task
  //     )
  //   );
  // };

  return (
    <BrowserRouter>
      <div className="container">
        <Header onAdd={() => setShowAddBtn(!showAddBtn)} showAdd={showAddBtn} />
        {showAddBtn && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? (
          <Tasks
            tasks={tasks}
            onDelete={deleteTask}
            onToggle={toggleReminder}
          />
        ) : (
          "No Tasks To Show"
        )}
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
