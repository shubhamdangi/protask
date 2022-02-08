import { Modal } from "../../containers";

import "./taskItem.css";

function TaskItem({ onClose, open, deadline, title, description }) {
  return (
    <Modal modalLable="Task Item" onClose={onClose} open={open}>
      <div className="taskItem">
        <h2>{title}</h2>
        <p>{description}</p>
        <p>{deadline}</p>
      </div>
    </Modal>
  );
}

export default TaskItem;
