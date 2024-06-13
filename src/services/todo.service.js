import { db } from "./firebase.config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "@firebase/firestore";

const todoCollectionRef = collection(db, "todos");

class TodoDataService {
  addTodo = (newtodo) => {
    return addDoc(todoCollectionRef, newtodo);
  };

  updateTodo = (id, updateTodo) => {
    const tododoc = doc(db, "todos", id);
    return updateDoc(tododoc, updateTodo);
  };
  deleteTodo = (id) => {
    const tododoc = doc(db, "todos", id);
    return deleteDoc(tododoc);
  };

  getAllTodos = () => {
    return getDocs(todoCollectionRef);
  };

  getTodo = (id) => {
    const todoDoc = doc(db, "todos", id);
    return getDoc(todoDoc);
  };
}

export default new TodoDataService();
