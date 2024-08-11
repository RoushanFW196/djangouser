import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";

const User = () => {
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);
  const [userdata, setUserdata] = useState();

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },

    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },

    {
      title: "Profile",
      dataIndex: "profile_pic",
      key: "profile_pic",
      render: (img) => (
        <img
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
          src={`http://localhost:8000/media/${img}`}
        />
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span>
          <EditOutlined onClick={() => onedit(record)} />
          <DeleteOutlined onClick={() => onDelete(record.id)} />
        </span>
      ),
    },
  ];

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    const data = await fetch("http://localhost:8000/user/");
    const data1 = await data.json();
    console.log("data1", data1);
    setUser(data1);
  };

  const onedit = (data) => {
    console.log("data", data);
    setOpen(true);
    setUserdata(data);
  };


 const updatethelist=()=>{
    setOpen(false);
    getAllUser();
  }



  const onDelete = (id) => {
    console.log("id", id);
  };

  return (
    <>
      <Table columns={columns} dataSource={user} />

      <Modal open={open} onCancel={() => setOpen(false)}>
        <UserForm data={userdata}  handleupdateuser={updatethelist}/>
      </Modal>
    </>
  );
};

export default User;
