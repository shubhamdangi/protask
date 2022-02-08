import "./taskManager.css";
import Task from "../Task";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../firebase";
import AddTask from "../AddTask";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import CircularProgress from "@material-ui/core/CircularProgress";

function TaskManager() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [user, error] = useAuthState(auth);
  const [loading, setLoading] = useState(true);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const taskColRef = query(
      collection(db, "tasks"),
      orderBy("created", "desc")
    );
    onSnapshot(taskColRef, (snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
        setLoading(false)
      );
    });
  }, []);

  useEffect(() => {
    if (!user) return navigate("/login");
  }, [user]);

  return (
    <div className="taskManager">
      {loading ? (
        <div style={{ marginTop: "80px", textAlign: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <div className="taskManager">
          <div className="taskManager__container">
            <Button
              style={{
                textTransform: "none",
                fontSize: "18px",
                marginTop: "40px",
              }}
              onClick={() => setOpenAddModal(true)}
            >
              Add Pro Task +
            </Button>
            <br />
            <div className="taskManager__tasks">
              {tasks.map((task) => (
                <Task
                  id={task.id}
                  key={task.id}
                  completed={task.data.completed}
                  title={task.data.title}
                  description={task.data.description}
                  deadline={task.data.deadline}
                />
              ))}
            </div>
          </div>

          {openAddModal && (
            <AddTask
              onClose={() => setOpenAddModal(false)}
              open={openAddModal}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default TaskManager;
