import {Collapse} from "antd";
import "./styles.scss";

const ProfileSettings = () => {
  const { Panel } = Collapse;
  const collapseHeaderProfile = (
    <div className="collapse-header">
      <span className="copllapse-name">Profile</span>
      <span className="material-icons copllapse-icon">arrow_drop_down</span>
    </div>
  );
  const collapseHeaderLanguage = (
    <div className="collapse-header">
      <span className="copllapse-name">Change Language</span>
      <span className="material-icons copllapse-icon">arrow_drop_down</span>
    </div>
  );
  const collapseHeaderPassword = (
    <div className="collapse-header">
      <span className="copllapse-name">Change Passwrod</span>
      <span className="material-icons copllapse-icon">arrow_drop_down</span>
    </div>
  );
  return (
    <div className="profile-settings">
      <Collapse accordion>
        <Panel
          header={collapseHeaderProfile}
          key="1"
          showArrow={false}
          className="accordion-container"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          totam, eum, laboriosam iste dicta eveniet ratione nisi quas ad
          perferendis, aliquid tempora asperiores pariatur esse ipsa sed eaque?
          Soluta, laudantium!
        </Panel>
        <Panel
          header={collapseHeaderLanguage}
          key="2"
          showArrow={false}
          className="accordion-container"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          totam, eum, laboriosam iste dicta eveniet ratione nisi quas ad
          perferendis, aliquid tempora asperiores pariatur esse ipsa sed eaque?
          Soluta, laudantium!
        </Panel>
        <Panel
          header={collapseHeaderPassword}
          key="3"
          showArrow={false}
          className="accordion-container"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          totam, eum, laboriosam iste dicta eveniet ratione nisi quas ad
          perferendis, aliquid tempora asperiores pariatur esse ipsa sed eaque?
          Soluta, laudantium!
        </Panel>
      </Collapse>
    </div>
  );
};

export default ProfileSettings;
