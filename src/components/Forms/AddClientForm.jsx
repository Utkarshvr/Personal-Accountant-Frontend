import React from "react";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../utility/api/axios";

export default function AddClientForm() {
  const sellerId = JSON.parse(localStorage.getItem("userInfo"))?.sellerId;

  // Formik hook for form handling
  const { values, handleChange, handleSubmit, errors, resetForm } = useFormik({
    initialValues: {
      client_name: "",
      address: "",
      phone: "",
      email: "",
      seller: sellerId,
    },
    onSubmit: async (values) => {
      try {
        // Send a POST request to create a new client
        const response = await axiosInstance.post("/clients", {
          client_name: values.client_name,
          address: values.address,
          phone: values.phone,
          email: values.email,
          seller: values.seller,
        });

        // Check the response for success
        if (response.status === 201) {
          toast.success("Client Created Successfully", { duration: 2000 });
          resetForm(); // Reset the form after successful submission
        } else {
          toast.error("Failed to create client", { duration: 2000 });
        }
      } catch (error) {
        console.error("Error creating client:", error);
        toast.error("Error creating client", { duration: 2000 });
      }
    },
  });

  return (
    <main>
      <form onSubmit={handleSubmit}>
        {["client_name", "address", "phone", "email"].map((field) => (
          <div key={field} className="mb-3 row">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name={field}
                placeholder={field}
                value={values[field]}
                onChange={handleChange}
              />
            </div>
          </div>
        ))}

        <button className="btn w-100 btn-primary" type="submit">
          Create
        </button>
      </form>
    </main>
  );
}
