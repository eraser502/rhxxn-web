import React from "react";
import "./TodoList.css";
import { useState, useEffect } from "react";
import { getTodo, updateTodo } from "../services/doc.services";
import { TDLCalendar } from "../components/TDLCalendar";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { FiLoader } from "react-icons/fi"
import { Header } from "../components/Header";
import { useLocation } from "react-router-dom";

export const TodoList = () => {
  const loc = useLocation();
  const [todoDB, setTodoDB] = useState(loc.state.db);
  //Localstorage에서 받아온 전체 DB가 들어있는 배열
  const [pointdayDB, setPointdayDB] = useState([]);
  //캘린더에서 선택된 날짜의 데이터들만 모아두는 배열
  //ex([content:"", id:"", checked:false, modify:"false"])
  const [pointday, setPointday] = useState(new Date());
  // 캘린더에서 선택된 날짜가 들어가는 변수
  const [todos, setTodos] = useState("");
  const [modifytodos, setModifytodos] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log("sex")
  const addTodos = (value) => {
    let nextId;
    if (pointdayDB.length === 0) {
      nextId = "0";
    } else {
      nextId = (parseInt(pointdayDB[pointdayDB.length - 1].id) + 1).toString();
    }
    setPointdayDB([
      ...pointdayDB,
      { content: value, id: nextId, checked: false, modify: false },
    ]);
    let tmp = [...todoDB];
    let idx = findPointDayIndex(todoDB, pointday.toLocaleDateString());
    if (idx !== -1) {
      tmp[idx].todo = [
        ...pointdayDB,
        { content: value, id: nextId, checked: false, modify: false },
      ];
    } else {
      tmp = [
        ...todoDB,
        {
          createAt: pointday.toLocaleDateString(),
          todo: [
            ...pointdayDB,
            { content: value, id: nextId, checked: false, modify: false },
          ],
        },
      ];
    }
    updateTodo(tmp);
    setTodoDB(tmp);
    setTodos(""); //todos 값 초기화
  };

  // useEffect(() => {
  //   //todoDB 가져와서 캘린더에서 선택된 날짜의 데이터가 있으면 pointdayDB에 해당날짜의
  //   // 데이터를 넣고, 데이터가 없으면 빈 배열을 넣어줌
  //   let index = todoDB.findIndex(
  //     (e) => e.createAt === pointday.toLocaleDateString()
  //   );
  //   if (index !== -1) {
  //     setPointdayDB(todoDB[index].todo);
  //   } else {
  //     setPointdayDB([]);
  //   }
  // }, [pointday]); // pointday의 값이 변할때마다 랜더링

  // const findPointDayIndex = (propsDb, propsValue) => {
  //   //pointday에 해당하는 배열의 index를 구해주는 함수
  //   let index = propsDb.findIndex((value) => value.createAt === propsValue);

  //   return index;
  // };
  const getInitData = async () => {
    setTodoDB(await getTodo());
  };
  useEffect(() => {
    //todoDB 가져와서 캘린더에서 선택된 날짜의 데이터가 있으면 pointdayDB에 해당날짜의
    // 데이터를 넣고, 데이터가 없으면 빈 배열을 넣어줌
    setIsLoading(true);
    getInitData().then(() => {
      setIsLoading(false);
      let index = todoDB.findIndex(
        (e) => e.createAt === pointday.toLocaleDateString()
      );
      if (index !== -1) {
        setPointdayDB(todoDB[index].todo);
      } else {
        setPointdayDB([]);
      }
    });
  }, [pointday]); // pointday의 값이 변할때마다 랜더링

  const findPointDayIndex = (propsDb, propsValue) => {
    //pointday에 해당하는 배열의 index를 구해주는 함수
    let index = propsDb.findIndex((value) => value.createAt === propsValue);

    return index;
  };

  const deleteTodos = (id) => {
    let index = pointdayDB.findIndex((value) => value.id === id);
    let tmp1 = [...pointdayDB];
    let tmp2 = [...todoDB];
    tmp1.splice(index, 1);
    if (tmp1.length !== 0) {
      setPointdayDB(tmp1);
      tmp2[findPointDayIndex(tmp2, pointday.toLocaleDateString())].todo = tmp1;
    } else {
      setPointdayDB([]);
      tmp2.splice(findPointDayIndex(tmp2, pointday.toLocaleDateString()), 1);
      setTodoDB(tmp2);
    }

    updateTodo(tmp2);
  };

  const handleCheck = (id) => {
    //id를 받아와서 해당 id의 배열의 checked 값을 현재 값과 반대인 값을 넣어주고
    //pointdayDB와 localstorage의 DB의 값을 변경된 값으로 바꿔줌
    let index = pointdayDB.findIndex((value) => value.id === id);
    let tmp1 = [...pointdayDB];
    let tmp2 = [...todoDB];
    tmp1[index].checked = !tmp1[index].checked;
    setPointdayDB(tmp1);
    tmp2[findPointDayIndex(tmp2, pointday.toLocaleDateString())].todo = tmp1;
    updateTodo(tmp2);
  };

  const modifyMode = (id) => {
    pointdayDB.map((value) => {
      value.modify = false;
    });
    let index = pointdayDB.findIndex((value) => value.id === id);
    let tmp = [...pointdayDB];
    tmp[index].modify = true;
    setPointdayDB(tmp);
  };

  const modifyEndMode = (id, content) => {
    let index = pointdayDB.findIndex((value) => value.id === id);
    let tmp1 = [...pointdayDB];
    tmp1[index].modify = false;
    tmp1[index].content = content;
    let tmp2 = [...todoDB];
    setPointdayDB(tmp1);
    tmp2[findPointDayIndex(tmp2, pointday.toLocaleDateString())].todo = tmp1;
    updateTodo(tmp2);
  };

  return (
    <div>
      <Header />
      {isLoading ? (
        <FiLoader className="todoLoader" />
      ) : (
        <div>
          <div className="TDLTitle">
            <span>Todo</span>
            <span>{pointday.toLocaleDateString().slice(0, -1)}</span>
          </div>
          <div className="TDLCalendarBox">
            <TDLCalendar
              pointday={pointday}
              getPointDay={(day) => {
                setPointday(day);
              }}
              calendarDb={todoDB}
            ></TDLCalendar>
          </div>
          <div className="TDLMainContainer">
            <div className="TDLContent">
              {pointdayDB.length !== 0
                ? pointdayDB.map((value) => (
                    <div key={value.id}>
                      {value.modify ? (
                        <div className="TDLTextBox">
                          <input
                            className="TDLInputText"
                            value={modifytodos}
                            placeholder="Modify todos..."
                            onChange={(e) => setModifytodos(e.target.value)}
                          ></input>
                          <button
                            className="TDLModifyEndButton"
                            onClick={() => modifyEndMode(value.id, modifytodos)}
                          >
                            Modify
                          </button>
                        </div>
                      ) : (
                        <div className="TDLTextBox">
                          {value.checked ? (
                            <BiCheckboxChecked
                              size="17px"
                              onClick={() => handleCheck(value.id)}
                            />
                          ) : (
                            <BiCheckbox
                              size="17px"
                              onClick={() => handleCheck(value.id)}
                            />
                          )}

                          <div
                            className={
                              value.checked ? "TDLText checked" : "TDLText"
                            }
                          >
                            {value.content}
                          </div>

                          <AiOutlineEdit
                            className="TDLModifyButton"
                            onClick={() => {
                              modifyMode(value.id);
                              setModifytodos(value.content);
                            }}
                          ></AiOutlineEdit>

                          <div className="TDLDeleteButtonBox">
                            <RiDeleteBin6Line
                              className="TDLDeleteButton"
                              onClick={() => deleteTodos(value.id)}
                            ></RiDeleteBin6Line>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                : null}

              <div className="TDLInputBox">
                <input
                  className="TDLInputText"
                  placeholder="Add todos..."
                  onChange={(e) => setTodos(e.target.value)}
                  value={todos}
                />
                <button
                  className="TDLAddButton"
                  onClick={() => {
                    if (todos !== "") {
                      addTodos(todos);
                    }
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
