import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./App.css";

import api from "./api";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    api.get("/todos").then((res) => {
      setTodos(res.data);
    });
  }, []);

  const handleCompleteTodo = (id) => {
    const payload = {
      completed: true,
    };
    api.patch(`/todos/${id}`, payload).then((res) => {
      const copy = [...todos];
      const index = copy.findIndex((todo) => todo.id === id);
      copy[index].completed = true;
      setTodos(copy);
    });
  };

  const handleDeleteTodo = (id) => {
    api.delete(`/todos/${id}`).then((res) => {
      const copy = [...todos];
      const index = copy.findIndex((todo) => todo.id === id);
      copy.splice(index, 1);
      setTodos(copy);
    });
  };

  const handleSubmitTodo = (values, action) => {
    const newTodo = {
      title: values.title,
      completed: false,
    };
    api.post("/todos", newTodo).then((res) => {
      setTodos([...todos, res.data]);
      action.resetForm();
    });
  };

  const addTodoSchema = Yup.object().shape({
    title: Yup.string().required("title is required").min(3).max(20),
  });

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Formik
            initialValues={{ title: "" }}
            validationSchema={addTodoSchema}
            onSubmit={handleSubmitTodo}
          >
            {(props) => {
              return (
                <Form>
                  <Field name="title" />
                  <button type="submit">Submit</button>
                  <br />
                  <span style={{ color: "red", fontSize: "18px" }}>
                    <ErrorMessage name="title" />
                  </span>
                </Form>
              );
            }}
          </Formik>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.completed ? "[X]" : "[ ]"}
              {todo.title}
              {!todo.completed && (
                <button
                  onClick={() => {
                    handleCompleteTodo(todo.id);
                  }}
                >
                  set done
                </button>
              )}
              <button
                onClick={() => {
                  handleDeleteTodo(todo.id);
                }}
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
