import AddAccountForm from "../Forms/AddAccountForm";

export default function AccountFormModal() {
  return (
    <div
      className="modal fade"
      id="accountFormModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="accountFormModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="accountFormModalLabel">
              Add Account
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <AddAccountForm />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            {/* <button type="submit" className="btn btn-primary">
              Create
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
