import React from "react";
import {Field} from "formik";
import className from "classname";

export const FormElements = ({ message }) => (
  <p
    style={{ padding: 0, marginBottom: 0, paddingLeft: 14 }}
    className="text-danger fs-10 d-block"
  >
    <strong>{message}</strong>
  </p>
);
export const FormField = (props) => (
  <Field component={CustomInputComponent} {...props} />
);
export const FormArea = (props) => (
  <Field component={CustomAreaComponent} {...props} />
);
export const FormSelect = (props) => (
  <Field component={CustomSelectComponent} {...props} />
);

const CustomInputComponent = ({
  field,
  form: { touched, errors, isValid },
  title,
  ...props
}) => {
  const innerClass = className(
    "form-group",
    {
      "has-error": touched[field.name] && errors[field.name],
    },
    props.innerClass
  );

  return (
    <div className={innerClass}>
      {title && (
        <label htmlFor={field.name} className="form__title">
          {title}
        </label>
      )}
      <input
        type="text"
        id={field.name}
        disabled={props.disabled}
        className="form-control"
        {...field}
        {...props}
      />
      {errors[field.name] && touched[field.name] && (
        <FormElements message={errors[field.name]} />
      )}
    </div>
  );
};
const CustomAreaComponent = ({
  field,
  form: { touched, errors, isValid },
  title,
  ...props
}) => {
  const innerClass = className(
    "form-group",
    {
      "has-error": touched[field.name] && errors[field.name],
    },
    props.innerClass
  );

  return (
    <div className={innerClass}>
      {title && (
        <label htmlFor={field.name} className="form__title">
          {title}
        </label>
      )}
      <input
        type="text"
        id={field.name}
        className="form-control"
        {...field}
        {...props}
      />
      {errors[field.name] && touched[field.name] && (
        <FormElements message={errors[field.name]} />
      )}
    </div>
  );
};
const CustomSelectComponent = ({
  field,
  form: { touched, errors, isValid },
  title,
  ...props
}) => {
  const innerClass = className(
    "form-group",
    "form-group-select",
    {
      "has-error": touched[field.name] && errors[field.name],
    },
    props.innerClass
  );

  return (
    <div className={innerClass}>
      {title && (
        <label htmlFor={field.name} className="form__title">
          {title}
        </label>
      )}
      <select id={field.name} className="form-control" {...field} {...props} />
      {errors[field.name] && touched[field.name] && (
        <FormElements message={errors[field.name]} />
      )}
    </div>
  );
};
