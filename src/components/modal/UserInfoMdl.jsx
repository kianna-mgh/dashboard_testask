import { useState } from "react";
import classes from "./UserInfoMdl.module.css";
const UserInfoMdl = ({ data, show, editHandlr, fdMessage, mdlvisHndlr }) => {
  const [formData, setFormData] = useState({
    name: "",
    job: "",
  });
  const onchngHndlr = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={`modal ${classes.cus_mdl} ${show ? "show" : ""}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              edit
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={mdlvisHndlr}
            ></button>
          </div>
          <div className="modal-body">
            <form
              onSubmit={async (e) => {
                await editHandlr(e, formData, data.id);
                setFormData({
                  name: "",
                  job: "",
                });
                mdlvisHndlr();
              }}
            >
              <div className="mb-3">
                <label className="form-label">name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={onchngHndlr}
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">job</label>
                <input
                  name="job"
                  value={formData.job}
                  onChange={onchngHndlr}
                  type="text"
                  className="form-control"
                />
              </div>
              {/* <div className="col-12 mb-3">
                <span>{fdMessage}</span>
              </div> */}
              <div className={`col-12 mb-3 ${classes.mdl_butcol}`}>
                <button type="submit" className="btn btn_cusmain">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={mdlvisHndlr}
                  className="btn btn_cusmain_trsp ms-3"
                >
                  cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoMdl;
