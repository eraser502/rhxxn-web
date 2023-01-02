import React from "react";
import { TodoList } from "./TodoList";
import "./Main.css";
import { useState } from "react";
import { signOut } from '../services/login.services';
import { Modal } from '../components/Modal';
import { Header } from "../components/Header";


export const Main = () => {
  const [mode, setMode] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      <Header />
      {/* <div className="mainContents">
        {mode === "todo" ? <TodoList /> : null}
      </div> */}
    </div>
  );
};
