import AddClientFAB from "../FAB/AddClientFAB";
import ClientList from "../List/ClientList";

export default function Dashboard() {
  return (
    <main>
      <h4>Your Clients</h4>
      <ClientList />

      <AddClientFAB />
    </main>
  );
}

// {
//   /*

//     1. Show "Your Clients"
//     2. Show Total Revenue (from all the clients' total)
//     3. Click on a Client. See all the account history
//         3.1 Show that Cleint's Accounts
//         3.2 Show the total amount of payment to him / her
//         3.3 Option to add an account
//         3.4 Enable multiple addition of accounts at the same time
//     4. FAB -> Create Another Client

//     */
// }
