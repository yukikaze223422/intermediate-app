import React, { memo, useState } from "react";
import "../App.css";

export const TodoList = memo((props) => {
  const {
    setTodoTitle,
    setTodoDetail,
    setTodoId,
    todoList,
    setTodoList,
    todoEdit,
    setTodoEdit,
  } = props;

  const [radio, setRadio] = useState("all");
  const [filteredTodoList, setFilteredTodoList] = useState([]);

  const handleClickDelete = (id) => {
    const copyTodos = [...todoList];
    const newTodos = copyTodos.filter((todo) => id !== todo.id);
    setTodoList(newTodos);
    setFilteredTodoList(newTodos);
  };

  const handleClickEdit = (id, title, detail) => {
    setTodoEdit(!todoEdit);
    setTodoTitle(title);
    setTodoDetail(detail);
    setTodoId(id);
  };

  const handleChange = (e) => {
    setRadio(e.target.value);
    if (e.target.value === "not") {
      const completeTodoList = [...todoList].filter(
        (todo) => todo.status === "not"
      );
      setFilteredTodoList(completeTodoList);
    } else if (e.target.value === "start") {
      const completeTodoList = [...todoList].filter(
        (todo) => todo.status === "start"
      );
      setFilteredTodoList(completeTodoList);
    } else if (e.target.value === "complete") {
      const completeTodoList = [...todoList].filter(
        (todo) => todo.status === "complete"
      );
      setFilteredTodoList(completeTodoList);
    }
    return;
  };

  const onClickSwitch = (e, id) => {
    const copyTodos = [...todoList];
    if (e.target.value === "not") {
      copyTodos[id - 1].status = "not";
    } else if (e.target.value === "start") {
      copyTodos[id - 1].status = "start";
    } else if (e.target.value === "complete") {
      copyTodos[id - 1].status = "complete";
    }
    const newTodos = filteredTodoList.filter(
      (todo) => todo.status !== e.target.value
    );
    setFilteredTodoList(newTodos);
    setTodoList(copyTodos);
  };

  return (
    <div className="todoListContainer">
      <label>
        <input
          type="radio"
          value="all"
          checked={radio === "all"}
          onChange={(e) => handleChange(e)}
        />
        ?????????
      </label>

      <label>
        <input
          type="radio"
          value="not"
          checked={radio === "not"}
          onChange={(e) => handleChange(e)}
        />
        ?????????
      </label>

      <label>
        <input
          type="radio"
          value="start"
          checked={radio === "start"}
          onChange={(e) => handleChange(e)}
        />
        ?????????
      </label>

      <label>
        <input
          type="radio"
          value="complete"
          checked={radio === "complete"}
          onChange={(e) => handleChange(e)}
        />
        ??????
      </label>
      <h2 className="todoListTitle">TODO?????????</h2>
      {radio === "all" ? (
        <ul>
          {todoList.map((list, index) => {
            return (
              <li key={list.id}>
                <p>
                  {index + 1}:{list.title}
                </p>
                <p>{list.detail}</p>
                {!todoEdit ? (
                  <>
                    <select
                      value={list.status}
                      onChange={(e) => onClickSwitch(e, list.id)}
                    >
                      <option value="not">?????????</option>
                      <option value="start">?????????</option>
                      <option value="complete">??????</option>
                    </select>
                    <button
                      className="editButton"
                      type="button"
                      onClick={() =>
                        handleClickEdit(list.id, list.title, list.detail)
                      }
                    >
                      ??????
                    </button>
                    <button
                      type="button"
                      onClick={() => handleClickDelete(list.id)}
                    >
                      ??????
                    </button>
                  </>
                ) : (
                  <>
                    <select value={list.status} disabled={true}>
                      <option value="not">?????????</option>
                      <option value="start">?????????</option>
                      <option value="complete">??????</option>
                    </select>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <ul>
          {filteredTodoList.map((list, index) => {
            return (
              <li key={list.id}>
                <p>
                  {index + 1}:{list.title}
                </p>
                <p>{list.detail}</p>
                {!todoEdit ? (
                  <>
                    <select
                      value={list.status}
                      onChange={(e) => onClickSwitch(e, list.id)}
                    >
                      <option value="not">?????????</option>
                      <option value="start">?????????</option>
                      <option value="complete">??????</option>
                    </select>
                    <button
                      className="editButton"
                      type="button"
                      onClick={() =>
                        handleClickEdit(list.id, list.title, list.detail)
                      }
                    >
                      ??????
                    </button>
                    <button
                      type="button"
                      onClick={() => handleClickDelete(list.id)}
                    >
                      ??????
                    </button>
                  </>
                ) : (
                  <>
                    <select value={list.status} disabled={true}>
                      <option value="not">?????????</option>
                      <option value="start">?????????</option>
                      <option value="complete">??????</option>
                    </select>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
});
