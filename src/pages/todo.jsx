import { useState } from "react";
import "../assets/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ContentCard from "../components/ContentCard/ContentCard";
import TodoItem from "../components/TodoItem/TodoItem";
import { Button, Input } from "reactstrap";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const data = [
  {
    username: "mark",
    location: "BSD",
    numberOfLikes: 120,
    caption: "Halo kawan-kawan!",
  },
  {
    username: "seto",
    location: "Jakarta",
    numberOfLikes: 3,
    caption: "Lagi overload kerjaan banget, mental health aku parah nih",
  },
  {
    username: "bill",
    location: "Puncak",
    numberOfLikes: 314,
    caption: "Kacau, macet banget!",
  },
];

function TodoPage() {
  const [myUsername, setMyUsername] = useState("seto");
  const [fullName, setFullName] = useState("");
  const [todoList, setTodoList] = useState([]);

  const renderContentList = () => {
    const jsxResult = data.map((val) => {
      return (
        <ContentCard
          username={val.username}
          location={val.location}
          numberOfLikes={val.numberOfLikes}
          caption={val.caption}
        />
      );
    });

    return jsxResult;
  };

  const renderTodoList = () => {
    return todoList.map((val) => {
      return (
        <TodoItem
          date={val.date}
          action={val.action}
          isDone={val.isDone}
          deleteItem={() => deleteTodoItem(val.id)}
          toggleStatus={() => toggleTodoStatus(val.id)}
        />
      );
    });
  };

  const changeUsername = () => {
    setMyUsername("mark");
    setFullName("jane bar");
  };

  const [inputValues, setInputValues] = useState({
    todoInput: "",
    dateInput: "",
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const addTodoItem = () => {
    const newData = {
      date: inputValues.dateInput,
      action: inputValues.todoInput,
      isDone: false,
    };

    axios.post("http://localhost:2000/todos", newData).then(() => {
      fetchTodoList();
    });
  };

  const deleteTodoItem = (id) => {
    axios.delete(`http://localhost:2000/todos/${id}`).then(() => {
      fetchTodoList();
    });
  };

  const toggleTodoStatus = (id) => {
    const dataToFind = todoList.find((val) => {
      return val.id === id;
    });

    // axios.get(`http://localhost:2000/todos/${id}`)
    //   .then((res) => {
    // const newIsDoneValue = !res.data.isDone

    axios
      .patch(`http://localhost:2000/todos/${id}`, {
        isDone: !dataToFind.isDone,
      })
      .then(() => {
        fetchTodoList();
      });
    // })
  };

  const fetchTodoList = () => {
    axios.get("http://localhost:2000/todos").then((res) => {
      setTodoList(res.data);
    });
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="container">
        <div className="row my-3">
          <div className="offset-3 col-5">
            <Input name="todoInput" onChange={inputHandler} />
            <Input name="dateInput" onChange={inputHandler} type="date" />
          </div>
          <div className="col-2">
            <Button onClick={addTodoItem} color="success">
              Add Todo
            </Button>
            <Button onClick={fetchTodoList} color="info">
              Fetch Todo
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-3">
            {/* {renderContentList()} */}
            {renderTodoList()}
          </div>
        </div>
      </div>
      {/* <BandSection />
      <TourSection />
      <ClassComponent /> */}
    </>
  );
}

export default TodoPage;
