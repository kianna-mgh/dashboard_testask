import axios from "axios";
import { useEffect, useState } from "react";
import UserInfoMdl from "../../components/modal/UserInfoMdl";
import Navbar from "../../components/navbar/NavBar";
import classes from "./Dashboard.module.css";
const Dashboard = () => {
  const [usersData, setUsersData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [fdMessage, setFdMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios("https://reqres.in/api/users?page=?");
        setUsersData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  const mdlVisHndlr = () => {
    setIsOpen(!isOpen);
  };
  const editMdlHndlr = (user) => {
    setUser(user);
    mdlVisHndlr();
  };
  const updUsrData = (data, id) => {
    const old_data = [...usersData];
    let userData = [];
    old_data.forEach((user) => {
      if (user.id === id) {
        userData.push({
          ...user,
          first_name: data.name,
          job: data.job,
        });
      } else {
        userData.push(user);
      }
    });
    setUsersData(userData);
    //userData = {...userData,first_name:data.name,job:data.job}
  };

  const editHandlr = async (e, formData, id) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://reqres.in/api/users/${id}`,
        formData
      );
      setFdMessage("user info has been updated succesfully");
      updUsrData(formData, id);
    } catch (error) {
      console.log(error);
    }
  };
  const delUser = (id) => {
    const data = [...usersData];
    const newData = data.filter((user) => {
      return user.id !== id;
    });
    setUsersData(newData);
  };
  const delHndlr = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      delUser(id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={`container-fluid`}>
        {user && (
          <UserInfoMdl
            show={isOpen}
            mdlvisHndlr={mdlVisHndlr}
            data={user}
            editHandlr={editHandlr}
            fdMessage={fdMessage}
          />
        )}
        <Navbar />
        <div className="row m-0">
          <div className="col-12">
            <div className="row m-0">
              <div className={`col-12 users_tblmcol table-responsive`}>
                <table className={` table ${classes.users_tbl}`}>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col"></th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Job</th>
                      <th scope="col">Email</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersData &&
                      usersData.map((user) => (
                        <tr key={user.id}>
                          <th scope="row">{user.id}</th>
                          <td>
                            <img
                              src={user.avatar}
                              className={classes.tbl_img}
                            />
                          </td>
                          <td>{user.first_name}</td>
                          <td>{user.last_name}</td>
                          <td>{user.job ? user.job : ""}</td>
                          <td>{user.email}</td>
                          <td>
                            <button
                              onClick={() => {
                                editMdlHndlr(user);
                              }}
                              type="button"
                              className="btn btn_cusmain_trsp"
                            >
                              edit
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                delHndlr(user.id);
                              }}
                              type="button"
                              className="btn btn_cusmain"
                            >
                              delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
