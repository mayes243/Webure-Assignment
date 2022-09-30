import { Formik, Form } from "formik";
import { styles } from "../../../constants";
import { SignInvalidation } from "../../../components/Form/validation";
import { Input } from "../../../components";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../../../Feature/Action/userAction";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  document.title = "Sign in";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // user sign up handler
  const formHandler = (values, submitProps) => {
    // signin action
    dispatch(signIn({ ...values, navigate }));

    submitProps.resetForm();
  };

  return (
    <div className="mt-6 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignInvalidation}
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
                label="email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />

              <Input
                label="password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />

              <div className="mt-8">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={styles.fullWidthButton}
                >
                  Sign in
                </button>
              </div>
            </Form>
          )}
        </Formik>
        {/*  */}
        <p className="text-md font-semibold mt-2 pt-1 mb-0">
          Don't have an account?
          <NavLink
            to="/admin/signup"
            className="text-indigo-600 hover:text-indigo-500"
          >
            {" "}
            Register
          </NavLink>{" "}
          |{" "}
          <NavLink to="/" className="text-indigo-600 hover:text-indigo-500">
            Home
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
