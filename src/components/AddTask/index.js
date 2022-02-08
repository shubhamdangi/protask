import { Modal } from "../../containers";
import { useState } from "react";
import "./addTask.css";
import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { collection, addDoc, Timestamp } from "firebase/firestore";

function AddTask({ onClose, open }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [user, loading, error] = useAuthState(auth);

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tasks"), {
        title: title,
        description: description,
        completed: false,
        deadline: deadline,
        identity: user.email,

        created: Timestamp.now(),
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal modalLable="Add Task" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className="addTask" name="addTask">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
          placeholder="Enter title"
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task decription"
          value={description}
        ></textarea>
        <input
          type="text"
          name="deadline"
          onChange={(e) => setDeadline(e.target.value)}
          value={deadline}
          placeholder="Enter deadline"
        />
        <button type="submit">Done</button>
      </form>
    </Modal>
  );
}

export default AddTask;
