import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import firebaseConfig from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function createTask(userId, day, taskName) {
  try {
    const taskData = { name: taskName, completed: false };
    await setDoc(doc(db, "users", userId, "days", day, "tasks", taskName), taskData);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function removeTask(userId, day, taskName) {
  try {
    const taskRef = doc(db, "users", userId, "days", day, "tasks", taskName);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function toggleTaskCompletion(userId, day, taskName, completed) {
  try {
    await updateDoc(doc(db, "users", userId, "days", day, "tasks", taskName), {
      completed: !completed
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function loadTasksForDay(userId, day) {
  try {
    const querySnapshot = await getDocs(collection(db, "users", userId, "days", day, "tasks"));
    const tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return tasks;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { createTask, removeTask, toggleTaskCompletion, loadTasksForDay };
