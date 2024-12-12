import { useState } from 'react'
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
    background-color: #577563;
  }

  * {
    box-sizing: inherit;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #577563;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Form = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  flex: 1;
  border: 1px solid #577563;
  border-radius: 4px;
`;

const AddButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const TaskList = styled.ul`
  width: 100%;
  max-width: 400px;
  list-style: none;
  padding: 0;
`;

const TaskItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const DeleteButton = styled.button`
  background-color: #F1152B;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #a71d2a;
  }
`;

const ClearAllButton = styled.button`
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #F1152B;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #a71d2a;
  }
`;

const Box = styled.div`
  background-color: #a1baab;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
  text-align: left;
  width: 100%;
  max-width: 600px;
`;

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [error, setError] = useState("");

  const handleAddTask = () => {
    const trimmedTask = taskInput.trim().toLowerCase();

    if (!trimmedTask) {
      setError("El campo de tarea está vacío.");
      return;
    }
    
    if (tasks.some(task => task.toLowerCase() === trimmedTask)) {
      setError("¡La tarea ya existe!");
      return;
    }

    setTasks([...tasks, taskInput.trim()]);
    setTaskInput("");
    setError("");
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Box>
          <Title>Nuctasks</Title>
          <Form>
            <Input
              type="text"
              placeholder="¿Qué tarea desea agregar?"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            />
            <AddButton onClick={handleAddTask}>Agregar</AddButton>
          </Form>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <TaskList>
            {tasks.map((task, index) => (
              <TaskItem key={index}>
                {task}
                <DeleteButton onClick={() => handleDeleteTask(index)}>
                  Borrar
                </DeleteButton>
              </TaskItem>
            ))}
          </TaskList>
          {tasks.length > 0 && (
            <ClearAllButton onClick={handleClearAll}>Borrar todas</ClearAllButton>
          )}
        </Box>
      </Container>
    </>
  );
};

export default App;
