import React, {useState} from "react";
import "./styles.scss";
import CancelButton from "../generalButton/cancelButton";
import AcceptButton from "../generalButton/AcceptButton";

const PostForm = ({
  formTitle,
  btnText,
  onFormSubmit,
  closeModal,
  initialLanguage,
  initialTitle,
  initialText,
  initialVariation
}) => {
  const submit = e => {
    e.preventDefault();
    if (title && text) {
      onFormSubmit(e);
    } else {
      setFormError(true);
      setTimeout(() => {
        setFormError(false);
      }, 2500);
    }
  };

  let [title, setTitle] = useState(initialTitle || "");
  let [text, setText] = useState(initialText || "");
  let [language, setLanguage] = useState(initialLanguage || "en");
  let [variation, setVariation] = useState(initialVariation || "news");
  let [formError, setFormError] = useState(false);

  return (
    <React.Fragment>
      <div className="post-form">
        <div className="form-header fs-30">
          <h3>{formTitle}</h3>
        </div>
        {formError && (
          <p style={{ color: "red", fontSize: "12px" }}>
            Fill all required field
          </p>
        )}
        <form onSubmit={submit} method="post" encType="multipart/form-data">
          <div className="form-row">
            <div className="form-col">
              <label className="required">Title: </label>
              <input
                name="title"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-col">
              <label className="required">Text: </label>
              <textarea
                name="text"
                value={text}
                onChange={e => setText(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="form-row">
            <div className="form-col">
              <label>Language: </label>
              <select
                name="language"
                value={language}
                onChange={e => setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
            <div className="form-col">
              <label>Variation:</label>
              <select
                name="variation"
                value={variation}
                onChange={e => setVariation(e.target.value)}
              >
                <option value="news">News</option>
                <option value="awareness">Article</option>
                <option value="gift">Gift</option>
                <option value="donation">Donation</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-col">
              <label>Select Image</label>
              <input type="file" accept="image/*" name="image"  />
            </div>
          </div>

          <div className="form-footer">
            <span style={{ marginRight: "10px" }}>
              <CancelButton buttonText="Cancel" buttonClick={closeModal} />
            </span>
            <AcceptButton buttonText={btnText} submit />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default PostForm;
