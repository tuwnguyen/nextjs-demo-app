import React from "react";
import { Droppable } from "react-beautiful-dnd";
import SingleTodo from "./SingleTodo";
import { Todo } from "lib/server/models/todo";
import styles from "@/styles/Note.module.css";
interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <div className={styles.container}>
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={[
              styles.todos,
              snapshot.isDraggingOver ? styles.dragactive : "",
            ].join(" ")}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className={styles.todos__heading}> Active Tasks</span>
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                todos={todos}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={[
              styles.todos,
              styles.remove,
              snapshot.isDraggingOver ? styles.dragcomplete : "",
            ].join(" ")}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className={styles.todos__heading}> Complete Tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                todos={completedTodos}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
