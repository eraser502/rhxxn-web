import React from "react";
import { Header } from "../components/Header";
import "./Note.css";
import { useState, useEffect } from "react";
import { BiArrowBack, BiCalendar } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { getNote, updateNote } from "../services/doc.services";
import { GrAdd } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Modal } from "../components/Modal";

export const Note = () => {
  const [noteDB, setNoteDB] = useState([]);
  const [mode, setMode] = useState("INIT");
  const [notetempDB, setNotetempDB] = useState([]);
  const [titletemp, setTitletemp] = useState("");
  const [contenttemp, setContenttemp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //Mode는 총 4개 INIT:초기상태, DETAIL:세부보기, EDIT:수정, CREATE:생성
  const detailNote = (id) => {
    let index = noteDB.findIndex((value) => value.id === id);
    setNotetempDB(noteDB[index]);
  };
  
  const noteAdd = () => {
    let nextId;
    let date = new Date();
    if (noteDB.length === 0) {
      nextId = "0";
    } else {
      nextId = (parseInt(noteDB[noteDB.length - 1].id) + 1).toString();
    }
    let tmp = noteDB;
    tmp[noteDB.length] = {
      createAt: date.toLocaleDateString(),
      id: nextId,
      title: titletemp,
      content: contenttemp,
    };
    setNoteDB(tmp);
    console.log(titletemp);
    updateNote(tmp);
    setTitletemp("");
    setContenttemp("");
  };

  const getInitData = async () => {
    setNoteDB(await getNote());
    
  };

  const delNote=()=>{
    let index = noteDB.findIndex((value) => value.id === notetempDB.id);
    let tmp1 = [...noteDB];
    tmp1.splice(index, 1);
    setNoteDB(tmp1);
    updateNote(tmp1);
    setModalIsOpen(false)
    setMode("INIT")
  }
  const noteEditEnd = () => {
    let index = noteDB.findIndex((value) => value.id === notetempDB.id);
    let tmp1 = [...noteDB];
    tmp1[index].title = titletemp;
    tmp1[index].content = contenttemp;
    setNoteDB(tmp1);
    setTitletemp("");
    setContenttemp("");
    updateNote(noteDB);
    // setNotetempDB([]);
  };
  useEffect(() => {
    setIsLoading(true);
    getInitData().then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Header />
      {/* ------------------------------------------------------------------------------------- */}
      {mode === "INIT" ? (
        <div className="noteMainContainer">
          <div className="noteMainBox">
            <div className="noteMainTopButtonArea">
              <GrAdd onClick={() => setMode("ADD")} size="24px" />
              <BiCalendar size="24px" />
            </div>
            {noteDB
              .slice(0)
              .reverse()
              .map((value) => (
                <div
                  className="noteItemContainer"
                  key={value.id}
                  onClick={() => {
                    setMode("DETAIL");
                    detailNote(value.id);
                  }}
                >
                  <div className="noteItemBox">
                    <strong className="noteItemTitle">{value.title !== "" ? value.title:"제목 없음"}</strong>
                    <p className="noteItemCreateAt">{value.createAt}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : null}
      {/* ------------------------------------------------------------------------------------- */}
      {mode === "DETAIL" ? (
        <div className="noteMainContainer">
          <div className="noteMainBox">
            <div className="noteMainTopButtonArea">
              <BiArrowBack
                onClick={() => {
                  setMode("INIT");
                  setNotetempDB([]);
                }}
                size="24px"
              />
              <div className="buttonFrame">
                <AiOutlineEdit
                  onClick={() => {
                    setMode("EDIT");
                    setTitletemp(notetempDB.title);
                    setContenttemp(notetempDB.content);
                  }}
                  size="24px"
                />
                <RiDeleteBin6Line onClick={()=>setModalIsOpen(true)} size="24px" />
                {modalIsOpen ? (
                  <Modal
                    name=""
                    handleClose={() => setModalIsOpen(false)}
                    handleOk={() => delNote()}
                  >
                    삭제하시겠습니까?
                  </Modal>
                ) : null}
              </div>
            </div>
            <div className="detailNoteHeader">
              <div className="detailNoteTitle">{notetempDB.title !== "" ? notetempDB.title:"제목 없음"}</div>
              <div className="detailNoteCreateAt">{notetempDB.createAt}</div>
            </div>
            <div className="detailNoteContent">{notetempDB.content}</div>
          </div>
        </div>
      ) : null}
      {/* ------------------------------------------------------------------------------------- */}
      {mode === "EDIT" ? (
        <div className="noteMainContainer">
          <div className="noteMainBox">
            <div className="noteMainTopButtonArea">
              <BiArrowBack
                onClick={() => {
                  setMode("DETAIL");
                }}
                size="24px"
              />
            </div>
            <input
              value={titletemp}
              onChange={(e) => setTitletemp(e.target.value)}
              className="noteTitleEditor"
              placeholder="Enter a title.."
            />
            <div className="noteEditorBox">
              <textarea
                value={contenttemp}
                onChange={(e) => setContenttemp(e.target.value)}
                className="noteContentEditor"
                placeholder="Enter a content.."
              ></textarea>
              <button
                className="noteEditorButton"
                onClick={() => {
                  noteEditEnd();
                  setMode("DETAIL");
                }}
              >
                Modify
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {/* ------------------------------------------------------------------------------------- */}
      {mode === "ADD" ? (
        <div className="noteMainContainer">
          <div className="noteMainBox">
            <div className="noteMainTopButtonArea">
              <BiArrowBack
                onClick={() => {
                  setMode("INIT");
                }}
                size="24px"
              />
            </div>
            <input
              value={titletemp}
              onChange={(e) => setTitletemp(e.target.value)}
              className="noteTitleEditor"
              placeholder="Enter a title.."
            />
            <div className="noteEditorBox">
              <textarea
                value={contenttemp}
                onChange={(e) => setContenttemp(e.target.value)}
                className="noteContentEditor"
                placeholder="Enter a content.."
              ></textarea>
              <button
                className="noteEditorButton"
                onClick={() => {
                  noteAdd();
                  setMode("INIT");
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
