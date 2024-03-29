import React, { useContext, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import InputField from "components/Note/InputField";
import { Todo } from "lib/server/models/todo";
import TodoList from "components/Note/TodoList";
import styles from "@/styles/Note.module.css";
import { AppContext } from "lib/context";
const Note = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const { dataAppContext, setDataAppContext } = useContext(AppContext);
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  //bat su kien sau khi drag xong
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log("here");
    console.log(source, destination);
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todos,
      complete = completedTodos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.App}>
        <div className={styles.heading}>
          {dataAppContext.user?.username + `'s Todo list`}
        </div>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};
export default Note;
