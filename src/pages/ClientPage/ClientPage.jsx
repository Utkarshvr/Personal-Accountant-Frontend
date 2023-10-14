import AddAccountFAB from "../../components/FAB/AddAccountFAB";
import AccountList from "../../components/List/AccountList";
import AccountFormModal from "../../components/Modals/AccountFormModal";

export default function ClientPage() {
  return (
    <>
      <h3>History</h3>
      <AccountList />
      <AddAccountFAB />
      <AccountFormModal />
    </>
  );
}
