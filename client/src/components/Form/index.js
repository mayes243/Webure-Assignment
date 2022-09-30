import { ErrorMessage } from "formik";
import { styles } from "../../constants";

export const CustomMessage = ({ name }) => {
  return <ErrorMessage component="a" className={styles.errorMsg} name={name} />;
};
