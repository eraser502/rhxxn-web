import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { signOut } from "../services/login.services";
import { getTodo } from "../services/doc.services";
import { db } from "../firebase";
import { ReactComponent as RH } from "../CustomIcon/RH.svg"

export const Header = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tdlDB, setTdlDB] = useState();
    let cnt = 0;
  const getInitData = async () => {
    setTdlDB(await getTodo())
  };
  
  useEffect(() => {
    getInitData()
  }, []);

  return (
    <div>
      <div className="logoutBox">
      <RH
          className="mainButton"
          onClick={() => {
            navigate("/main");
          }}
        >
          Main
        </RH>
        <button
          className="logoutButton"
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          Logout
        </button>
        {modalIsOpen ? (
          //
          <Modal
            name=""
            handleClose={() => setModalIsOpen(false)}
            handleOk={() => signOut()}
          >
            로그아웃 하시겠습니까?
          </Modal>
        ) : null}
      </div>
      <div className="mainComponentButtons">
        <ButtonGroup>
          <Button
            className="TDLComponentButton"
            onClick={() => {navigate("/todo", { state: { db: tdlDB } })}}
          >
            TodoList
          </Button>
          <Button className="DiaryComponentButton">Diary</Button>
          <Button className="BlogComponentButton">Blog</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
