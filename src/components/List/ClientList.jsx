import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utility/api/axios";

export default function ClientList() {
  const sellerId = JSON.parse(localStorage.getItem("userInfo"))?.sellerId;
  const [clients, setClients] = useState([]);

  useEffect(() => {
    (async () => {
      if (sellerId) {
        const { data } = await axiosInstance.get(`/clients/all/${sellerId}`);
        setClients(data);
      }
    })();
  }, [sellerId]);

  return (
    <div className="card" style={{ width: "100%" }}>
      <div class="card-header">Clients</div>
      <ul className="list-group list-group-flush">
        {clients.map((client) => (
          <Link
            key={client?._id}
            to={`/clients/${client?._id}`}
            className={`list-group-item list-group-item-action `}
          >
            <p>{client?.client_name}</p>
            <p className="text-secondary-emphasis fs-6 fw-light">
              {client?.address}
            </p>
          </Link>
        ))}
      </ul>
    </div>
  );
}
