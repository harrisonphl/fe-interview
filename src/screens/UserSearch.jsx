import { ErrorMessage, Field, Form, Formik } from "formik";
import { string, object } from "yup";

const formInitialValues = { trackingNumber: "" };

const trackingNumberRegex = /^[A-Za-z\d-]*$/;

const validationSchema = object().shape({
  trackingNumber: string()
    .matches(
      trackingNumberRegex,
      ({ label }) =>
        `${label} may only contain alphanumeric characters and dashes (-)`
    )
    .required()
    .label("Tracking Number"),
});

const UserSearch = () => {
  return (
    <div>
      <h1>User Search</h1>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationSchema}
        validateOnBlur
        onSubmit={console.log}
      >
        <Form>
          <div className="search-input">
            <Field name="trackingNumber" placeholder="Tracking Number" />
            <button type="submit">Search</button>
          </div>
          <div className="search-error">
            <ErrorMessage name="trackingNumber" />
          </div>
        </Form>
      </Formik>
      <div className="search-results">{/* To Do */}</div>
    </div>
  );
};

export { UserSearch };
