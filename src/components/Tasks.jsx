import Task from "./Task";
const Tasks = ({ tasks, onDelete, onToggle, onAdd }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onAdd={onAdd}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default Tasks;
