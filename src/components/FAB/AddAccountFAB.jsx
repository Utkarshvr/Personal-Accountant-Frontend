import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function AddAccountFAB() {
  return (
    <Link
      // data-bs-toggle="modal"
      // data-bs-target="#accountFormModal"
      style={{
        borderRadius: "100%",
        position: "fixed",
        bottom: "2em",
        right: "1em",
      }}
      to={`create-account`}
      className="btn btn-primary p-2"
    >
      <BsPlus size={28} />
    </Link>
  );
}
