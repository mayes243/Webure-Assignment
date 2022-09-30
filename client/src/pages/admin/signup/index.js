import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Input } from "../../../components";
import { SignUpvalidation } from "../../../components/Form/validation";
import { styles } from "../../../constants";
import { NavLink, useNavigate } from "react-router-dom";
import { signUp } from "../../../Feature/Action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Signup = () => {
  document.title = "Sign up";

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const { error, success } = useSelector((state) => state.userReducer);

  const formHandler = async (values, submitProps) => {
    const form = new FormData();
    form.append("email", values.email);
    form.append("password", values.password);
    form.append("name", values.name);
    if (values.avatar) {
      form.append("avatar", values.avatar);
    }
    // signup action
    await dispatch(signUp(form));

    navigation("/admin/signin");

    submitProps.resetForm();
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  // success message

  useEffect(() => {
    success && toast.success(success);
  }, [success]);
  return (
    <div className="mt-6 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            avatar: null,
          }}
          validationSchema={SignUpvalidation}
          onSubmit={formHandler}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
            handleBlur,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Input
                label="name"
                type="name"
                name="name"
                value={values.name}
                onChange={handleChange}
              />

              <Input
                label="email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />

              <Input
                label="avatar"
                type="file"
                name="avatar"
                onChange={(event) =>
                  setFieldValue("avatar", event.target.files[0])
                }
              />

              <Input
                label="password"
                value={values.password}
                type="password"
                name="password"
                onChange={handleChange}
              />

              <div className="mt-8">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={styles.fullWidthButton}
                >
                  Sign Up
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <p className="text-sm font-semibold mt-2 pt-1 mb-0">
          Already have an account?
          <NavLink
            to="/admin/signin"
            className="text-indigo-600 hover:text-indigo-500"
          >
            {" "}
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
