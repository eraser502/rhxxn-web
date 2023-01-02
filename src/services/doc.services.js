import { UserCredential } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, db, storage } from "../firebase";

export function getData(storageName){
    return JSON.parse(localStorage.getItem(storageName))
}

export function setData(storageName, item){
    localStorage.setItem(storageName, JSON.stringify(item));
}

// To Do List doc

export const getTodo = async () => {
    //todo 값을 db에서 받아옴
    const docRef = collection(db, "user");
    const docRef2 = doc(docRef, auth.currentUser?.uid)

    const docRef3 = collection(docRef2, "TODOLIST");
    //const docRef4 = doc(docRef3, date);

    const querySnapshot = await getDoc(doc(docRef3,"TODO"));
    // let arr = [];
    // querySnapshot.forEach((doc) => {
    //     //console.log(doc.id, " => ", doc.data());
    //     arr[doc.id] = doc.data();
    // });
    return querySnapshot.data().todoDB;
}

export const setTodo = async () => {
    //todo db를 서버에 생성
    const docRef = collection(db, "user");
    const docRef2 = doc(docRef, auth.currentUser?.uid)
    const docRef3 = collection(docRef2, "TODOLIST")

    await setDoc(doc(docRef3, "TODO"),
        {
            todoDB : [] 
        }, { merge: true })
}

export const updateTodo = async (TDLDB) => {
    //서버의 todo db 값을 props값으로 바꿔줌 
    const docRef = collection(db, "user");
    const docRef2 = doc(docRef, auth.currentUser?.uid);
    const docRef3 = collection(docRef2, "TODOLIST");
    await updateDoc(doc(docRef3, "TODO"), {
        todoDB: TDLDB
    });
}

export const deleteTDL = async (kind) => {
    const docRef = collection(db, "user");
    const docRef2 = doc(docRef, auth.currentUser?.uid);
    const docRef3 = collection(docRef2, "plan");
    await deleteDoc(doc(docRef3, kind));
}