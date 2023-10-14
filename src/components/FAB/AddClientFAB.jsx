import { BsPlus } from "react-icons/bs";
// import ClientFormModal from "../Modals/ClientFormModal";

export default function AddClientFAB() {
  return (
    <button
      data-bs-toggle="modal"
      data-bs-target="#clientFormModal"
      style={{
        borderRadius: "100%",
        position: "fixed",
        bottom: "2em",
        right: "1em",
      }}
      className="btn btn-primary p-2"
    >
      <BsPlus size={28} />
    </button>
  );
}
