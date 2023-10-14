import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../utility/api/axios";

export default function Login() {
  let location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/dashboard";

  //login submition
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    // validationSchema: signInSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axiosInstance.post(
          "/auth/login",
          JSON.stringify({
            username: values.username,
            password: values.password,
          })
        );

        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            username: data?.seller?.username,
            sellerId: data?.seller?._id,
            access_token: data?.access_token,
          })
        );
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        toast.success("Logged in successfull", { duration: 2000 });
        navigate(from, { replace: true });

        console.log(data);

        // if (data.success) {
        //   const results = data?.data;

        //   const userObj = {
        //     accessToken: results?.auth_token?.access,
        //     dept: results?.dept,
        //     userId: results?.user_id,
        //     orgId: results?.org.id,
        //     orgName: results?.org?.company_name,
        //     firstname: results?.first_name,
        //     lastname: results?.last_name,
        //     phone: results?.mobile,
        //     username: results?.username,
        //     isLoggedIn: true,
        //     sessionStatus: true,
        //   };
        //   setAuth(userObj);
        //   localStorage.setItem("userInfo", JSON.stringify(userObj));

        //   // set userObj  into localstorage
        //   navigate(from, { replace: true });

        //   toast.success("Logged in successfull", { duration: 2000 });
        // }
      } catch (error) {
        console.log(error);
        toast.error("Incorrect Email & Password", { duration: 2000 });
      }
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label for="staticEmail" className="col-sm-2 col-form-label">
            Username
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="staticEmail"
              name="username"
              value={values.username}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              value={values.password}
              onChange={handleChange}
              name="password"
              id="inputPassword"
            />
          </div>
        </div>

        <button className="btn w-100 btn-primary" type="submit">
          Login
        </button>
      </form>
    </>
  );
}
