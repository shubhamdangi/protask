import "./task.css";
import { useState } from "react";
import TaskItem from "../TaskItem";
import EditTask from "../EditTask";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useAuthState } from "react-firebase-hooks/auth";

function Task({ id, title, description, deadline, identity, completed }) {
  const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });
  const [user, loading, error] = useAuthState(auth);

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  /* function to update firestore */
  const handleChange = async () => {
    const taskDocRef = doc(db, "tasks", id);
    try {
      await updateDoc(taskDocRef, {
        completed: checked,
      });
    } catch (err) {
      alert(err);
    }
  };

  /* function to delete a document from firstore */
  const handleDelete = async () => {
    const taskDocRef = doc(db, "tasks", id);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  const valid = () => {
    if (user.email == identity) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className={`task ${checked && "task--borderColor"}`}>
        <div>
          <input
            id={`checkbox-${id}`}
            className="checkbox-custom"
            name="checkbox"
            checked={checked}
            onChange={handleChange}
            type="checkbox"
          />
          <label
            htmlFor={`checkbox-${id}`}
            className="checkbox-custom-label"
            onClick={() => setChecked(!checked)}
          ></label>
        </div>
        <div className="task__body">
          <h3>◦ {title}</h3>
          <p style={{ fontSize: "20px" }}>◦ {description}</p>

          <p>
            Deadline:{" "}
            <span style={{ color: "red", alignItems: "items" }}>
              {deadline}
            </span>
          </p>
          <div className="task__buttons">
            <div className="task__deleteNedit">
              <IconButton
                className="task__editButton"
                onClick={() => setOpen({ ...open, edit: true })}
              >
                <EditIcon />
              </IconButton>
              <IconButton className="task__deleteButton" onClick={handleDelete}>
                <DeleteOutlineIcon />
              </IconButton>
            </div>
            <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                // backgroundColor: "red",
              }}
              onClick={() => setOpen({ ...open, view: true })}
            >
              View
            </Button>
          </div>
        </div>

        {open.view && (
          <TaskItem
            onClose={handleClose}
            title={title}
            description={description}
            open={open.view}
          />
        )}

        {open.edit && (
          <EditTask
            onClose={handleClose}
            toEditTitle={title}
            toEditDescription={description}
            open={open.edit}
            id={id}
          />
        )}
      </div>
    </>
  );
}

export default Task;
