import React, { useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../utility/api/axios";
import { useParams } from "react-router-dom";

const calculateNetPrice = (qty, unitCost) => {
  // Ensure qty and unitCost are not negative
  qty = Math.max(0, qty);
  unitCost = Math.max(0, unitCost);
  return qty * unitCost;
};

export default function AddAccountForm() {
  const { clientId } = useParams();
  console.log({ clientId });
  // Formik hook for form handling
  const { values, handleChange, handleSubmit, setFieldValue, resetForm } =
    useFormik({
      initialValues: {
        products_purchased: [
          {
            product_name: "",
            qty: 0,
            unit_cost: 0,
            net_price: 0,
          },
        ],
      },
      onSubmit: async (values) => {
        try {
          const payload = {
            accounts: values.products_purchased.map((prod) => ({
              product_name: prod?.product_name,
              qty: prod?.qty,
              unit_cost: prod?.unit_cost,
            })),
          };
          // Send a POST request to create a new client
          const response = await axiosInstance.post(
            `/accounts/${clientId}`,
            payload
          );

          // Check the response for success
          if (response.status === 201) {
            toast.success("Account Created Successfully", { duration: 2000 });
            resetForm(); // Reset the form after successful submission
          } else {
            toast.error("Failed to create account", { duration: 2000 });
          }
        } catch (error) {
          console.error("Error creating account:", error);
          toast.error("Error creating account", { duration: 2000 });
        }
      },
    });

  const updateNetPrice = (index, a, b) => {
    setFieldValue(`products_purchased[${index}].net_price`, a * b);
  };
  const handleAddProduct = () => {
    setFieldValue("products_purchased", [
      ...values.products_purchased,
      {
        product_name: "",
        qty: 0,
        unit_cost: 0,
        net_price: 0,
      },
    ]);
  };
  const handleRemoveProd = (i) => {
    setFieldValue(
      "products_purchased",
      values.products_purchased.filter((prod, index) => i !== index)
    );
  };

  console.log(values);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="table-responsive111">
          <div>
            <table className="table table-bordered table-responsive-sm111">
              <thead>
                <tr>
                  <th scope="col">Serial No</th>
                  <th scope="col">Product</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Net Price</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              {values?.products_purchased?.map((prod, index) => {
                return (
                  <>
                    <tbody>
                      <tr key={index + 1}>
                        <td>
                          <p>{index + 1}</p>
                        </td>
                        {[
                          {
                            name: "product_name",
                            placeholder: "Product",
                            type: "text",
                          },
                          {
                            name: "qty",
                            placeholder: "Quantity",
                            type: "number",
                          },
                          {
                            name: "unit_cost",
                            placeholder: "Price",
                            type: "number",
                          },
                          {
                            name: "net_price",
                            placeholder: "Price",
                            type: "number",
                          },
                        ].map(({ name, placeholder, type }) => (
                          <td>
                            <input
                              type={type}
                              className="form-control"
                              name={`products_purchased[${index}].${name}`}
                              placeholder={placeholder}
                              value={prod[name]}
                              onChange={(e) => {
                                handleChange(e);
                                if (name === "qty" || name === "unit_cost")
                                  updateNetPrice(
                                    index,
                                    prod[name === "qty" ? "unit_cost" : "qty"],
                                    e.target.value
                                  );
                              }}
                              readOnly={name === "net_price" ? true : false}
                              min={0}
                            />
                          </td>
                        ))}
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            disabled={values.products_purchased.length === 1}
                            onClick={() => handleRemoveProd(index)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </>
                );
              })}
            </table>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <button
            className="btn mx-auto my-2 btn-outline-primary"
            type="button"
            onClick={handleAddProduct}
            disabled={values.products_purchased.some((prod) => {
              return (
                prod.product_name === "" ||
                prod.qty === "" ||
                prod.unit_cost === "" ||
                prod.net_price === ""
              );
            })}
          >
            Add
          </button>
        </div>

        <button className="btn btn-primary" type="submit">
          Create
        </button>
      </form>
    </>
  );
}
