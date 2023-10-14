// import DataTable from "react-data-table-component";
import DataTable from "react-data-table-component";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utility/api/axios";
import { CSVLink } from "react-csv";
import { BsDownload } from "react-icons/bs";

const columns = [
  {
    name: "Product",
    selector: (row) => row?.product_name,
    sortable: true,
  },
  {
    name: "Qty",
    selector: (row) => row?.qty,
    sortable: true,
  },
  {
    name: "Price",
    selector: (row) => row?.unit_cost,
    sortable: true,
  },
  {
    name: "Net Price",
    selector: (row) => row?.qty * row?.unit_cost,
    sortable: true,
  },
  {
    name: "Is Paid",
    selector: (row) => (row?.isPaid ? "YES" : "NO"),
    sortable: true,
  },
];

export default function AccountList() {
  const { clientId } = useParams();

  const [accounts, setAccounts] = useState([]);
  const [total, setTotal] = useState(0);
  console.log(accounts);
  const [csv, setCsv] = useState([]);
  useEffect(() => {
    (async () => {
      if (clientId) {
        const { data } = await axiosInstance.get(`/accounts/${clientId}`);
        // console.log({ data });
        setAccounts(data);
      }
    })();
  }, [clientId]);

  useEffect(() => {
    (async () => {
      if (accounts.length > 0) {
        setTotal(
          accounts.reduce(
            (acc, account) => acc + account?.qty * account?.unit_cost,
            0
          )
        );
      }
    })();
  }, [accounts]);

  // export as csv
  const exportAsCsv = () => {
    let data = [];
    accounts.forEach((account) => {
      // @desc sales invoice csv object
      const csvObj = {
        Product: account?.product_name || "",
        Qty: account?.qty || 0,
        Price: account?.unit_cost || 0,
        "Net Price": account?.qty * account?.unit_cost || 0,
        "Is Paid": account?.isPaid ? "YES" : "NO",
      };

      data.push(csvObj);
    });

    // Add the "TOTAL" row to the CSV data
    data.push({
      Product: "",
      Qty: "", // Leave the quantity column empty
      Price: "TOTAL", // Use the total value for the price column
      "Net Price": accounts.reduce(
        (acc, account) => acc + account?.qty * account?.unit_cost,
        0
      ), // Use the total value for the "Net Price" column
      "Is Paid": "", // Leave the "Is Paid" column empty
    });

    setCsv(() => data);
  };

  const columns = [
    {
      name: "Product",
      selector: (row) => row?.product_name,
      sortable: true,
    },
    {
      name: "Qty",
      selector: (row) => row?.qty,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row, index) => {
        if (accounts.length === index)
          return <p className="fs-6 fw-bold">Total</p>;
        else return row?.unit_cost;
      },
      sortable: true,
    },
    {
      name: "Net Price",
      selector: (row, index) => {
        if (accounts.length === index)
          return (
            <p className="fs-6 fw-bold">
              {accounts.reduce(
                (acc, account) => acc + account?.qty * account?.unit_cost,
                0
              )}
            </p>
          );
        else return row?.qty * row?.unit_cost;
      },
      sortable: true,
    },
    {
      name: "Is Paid",
      selector: (row, index) => {
        if (accounts.length !== index) return row?.isPaid ? "YES" : "NO";
      },
      sortable: true,
    },
  ];

  const formattedData = [
    ...accounts,
    {
      name: "TOTAL",
      net_price: "TOTAL",
    },
  ];
  console.log(formattedData);
  return (
    <>
      <div className="card">
        <div className="card-body">
          <DataTable
            data={accounts.concat({})}
            columns={columns}
            noContextMenu
            fixedHeader
            fixedHeaderScrollHeight="550px"
            pagination
            striped
            highlightOnHover
            subHeader
            subHeaderComponent={
              <>
                <h4 className="bg-dark text-white p-2 ">Total: ₹{total}</h4>
              </>
            }
            actions={
              <>
                <CSVLink
                  enclosingCharacter={` `}
                  data={csv}
                  filename={`Account-${new Date(Date.now()).toLocaleDateString(
                    "en-IN"
                  )}`}
                  className="bg-primary btn text-white mb-3 border-0 d-flex align-items-center rounded-1"
                  onClick={exportAsCsv}
                >
                  <BsDownload className="fs-5 me-2" />
                  Export as CSV
                </CSVLink>
              </>
            }
          />
        </div>
      </div>
    </>
  );
}
