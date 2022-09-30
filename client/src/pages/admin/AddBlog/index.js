import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input, Navbar } from "../../../components";
import { blogValidation } from "../../../components/Form/validation";
import { styles } from "../../../constants";
import { addBlog } from "../../../Feature/Action/userAction";

function AddBlog() {
  document.title = "Add Blogs";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success } = useSelector((state) => state.userReducer);

  const formHandler = async (values, submitProps) => {
    // blog action
    const form = new FormData();
    form.append("title", values.title);
    form.append("shortDesc", values.shortDesc);
    form.append("longDesc", values.longDesc);
    if (values.avatar) {
      form.append("avatar", values.avatar);
    }
    await dispatch(addBlog(form));

    navigate("/dashboard");

    submitProps.resetForm();
  };

  // error message
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  // success message
  useEffect(() => {
    success && toast.success(success);
  }, [success]);
  return (
    <div>
      <Navbar />
      <div className="mt-6 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Formik
            initialValues={{
              title: "",
              shortDesc: "",
              longDesc: "",
              avatar: null,
            }}
            validationSchema={blogValidation}
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
                  label="title"
                  type="title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                />

                <Input
                  label="short Description"
                  type="shortDesc"
                  name="shortDesc"
                  value={values.shortDesc}
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
                <label
                  className={styles.label}
                  htmlFor="Long Description"
                  style={{ textTransform: "capitalize" }}
                >
                  Long Description
                </label>

                <textarea
                  name="longDesc"
                  className={styles.field}
                  value={values.longDesc}
                  onChange={handleChange}
                ></textarea>

                <div className="mt-8">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className={styles.fullWidthButton}
                  >
                    Add Blog
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default AddBlog;
