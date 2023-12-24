import React, { Component } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { Popconfirm, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getData, postData, deleteData } from "../../services/AccessAPI";

export default class Users extends Component {
  state = {
    users: [],
    isModalVisible: false,
    selectedUser: null,
    roles: [],
    token: null,
  };

  async componentDidMount() {
    await this.getUsers();
    await this.getRoles();
  }
  getUsers = () => {
    getData(`/user`).then((result) => {
      let responseJson = result;
      if (responseJson) {
        this.setState({ users: JSON.parse(responseJson) });
      }
    });
  };

  getRoles = () => {
    getData(`/Generals/GetAllRoleForTableDropdown`).then((result) => {
      let responseJson = result;
      if (responseJson) {
        this.setState({ roles: JSON.parse(responseJson) });
      }
    });
  };
  handleEdit = (user) => {
    this.setState({ selectedUser: user, isModalVisible: true });
  };

  handleDelete = (userId) => {
    deleteData("/user/" + userId).then((result) => {
      let responseJson = result;
      if (responseJson) {
        message.success("Silme işlemi başarıyla gerçekleştirildi.");
        this.getUsers();
      }
    });
  };

  handleUpdate = () => {
    const { selectedUser } = this.state;

    // Eğer selectedUser.Id yoksa (yeni kullanıcı ekleniyor), bu fonksiyonu çağırmamalıyız
    if (!selectedUser || !selectedUser.Id) {
      console.error("Güncellenecek kullanıcı bulunamadı.");
      return;
    }
    if (!this.validateForm()) {
      return;
    }

    // API'ye gönderilecek güncellenmiş kullanıcı verisi
    const updatedUserData = {
      Name: selectedUser.Name,
      Surname: selectedUser.Surname,
      RoleId: selectedUser.RoleId,
      IdentityNumber: selectedUser.IdentityNumber,
      Email: selectedUser.Email,
      Id: selectedUser.Id,
    };
    postData("/user", updatedUserData).then((result) => {
      let responseJson = result;
      if (responseJson) {
        message.success("Kullanıcı başarıyla Güncellendi.");
        this.getUsers();
        this.setState({ isModalVisible: false });
      }
    });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };
  handleAddUser = () => {
    this.setState({
      isModalVisible: true,
      selectedUser: {}, // Yeni bir kullanıcı objesi oluşturuyoruz
    });
  };

  handleCreateUser = () => {
    const { selectedUser } = this.state;

    if (!this.validateForm()) {
      // Gerekli kontrollerden biri başarısızsa işlemi engelle
      return;
    }

    // API'ye gönderilecek yeni kullanıcı verisi
    const newUser = {
      Name: selectedUser.Name,
      Surname: selectedUser.Surname,
      RoleId: selectedUser.RoleId,
      IdentityNumber: selectedUser.IdentityNumber,
      Email: selectedUser.Email,
    };
    postData("/user", newUser).then((result) => {
      let responseJson = result;
      if (responseJson) {
        message.success("Kullanıcı başarıyla eklendi.");
        this.getUsers();
        this.setState({ isModalVisible: false });
      }
    });
  };
  validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "success" : "error";
  };

  validateForm = () => {
    // Formun geçerliliğini kontrol et
    const { selectedUser } = this.state;

    if (!selectedUser || !selectedUser.Name) {
      message.error("Adı boş bırakılamaz.");
      return false;
    }
    if (!selectedUser || !selectedUser.IdentityNumber) {
      message.error("Tc Kimlik No boş bırakılamaz.");
      return false;
    }
    if (!selectedUser || !selectedUser.Surname) {
      message.error("Soyadı boş bırakılamaz.");
      return false;
    }
    if (!selectedUser || !selectedUser.Email) {
      message.error("Email boş bırakılamaz.");
      return false;
    }

    if (!selectedUser || !selectedUser.RoleId) {
      message.error("Role boş bırakılamaz.");
      return false;
    }
    return true;
  };
  render() {
    const { users, isModalVisible, selectedUser, roles } = this.state;

    const columns = [
      {
        title: "Tc Kimlik No",
        dataIndex: "IdentityNumber",
        key: "IdentityNumber",
        filters: [...new Set(users.map((item) => item.IdentityNumber))].map(
          (option) => ({
            text: option,
            value: option,
          })
        ),
        onFilter: (value, record) => record.IdentityNumber === value,
        render: (text) => text,
      },
      {
        title: "İsim",
        dataIndex: "Name",
        key: "Name",
        filters: [...new Set(users.map((item) => item.Name))].map((option) => ({
          text: option,
          value: option,
        })),
        onFilter: (value, record) => record.Name === value,
        render: (text) => text,
      },
      {
        title: "Soyisim",
        dataIndex: "Surname",
        key: "Surname",
      },
      {
        title: "Email",
        dataIndex: "Email",
        key: "Email",
      },
      {
        title: "Role",
        dataIndex: "RoleName",
        key: "RoleName",
        filters: [...new Set(users.map((item) => item.RoleName))].map(
          (option) => ({
            text: option,
            value: option,
          })
        ),
        onFilter: (value, record) => record.RoleName === value,
        render: (text) => text,
      },
      {
        title: "İşlemler",
        key: "actions",
        render: (text, record) => (
          <span>
            <Button
              style={{ margin: "10px" }}
              onClick={() => this.handleEdit(record)}
            >
              Güncelle
            </Button>

            <Popconfirm
              key="delete"
              title="Silmek İstediğinize Emin misiniz?"
              okText="Evet"
              cancelText="Hayır"
              onConfirm={() => this.handleDelete(record.Id)}
            >
              <Button>Sil</Button>
            </Popconfirm>
          </span>
        ),
      },
    ];

    return (
      <div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={this.handleAddUser}
          style={{ float: "left", margin: "20px" }}
        >
          Yeni Kullanıcı Ekle
        </Button>
        <br></br>
        <Table
          dataSource={users}
          columns={columns}
          rowKey={(record) => record.Id}
          scroll={{ x: true }}
        />
        <Modal
          title={
            selectedUser && selectedUser.Id
              ? "Kullanıcı Güncelle"
              : "Yeni Kullanıcı Ekle"
          }
          visible={isModalVisible}
          onOk={
            selectedUser && selectedUser.Id
              ? this.handleUpdate
              : this.handleCreateUser
          }
          onCancel={this.handleCancel}
          okText={selectedUser && selectedUser.Id ? "Güncelle" : "Ekle"}
          cancelText="Vazgeç"
        >
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
            <Form.Item
              label="Tc.Kimlik No"
              required
              hasFeedback
              validateStatus={
                selectedUser && !selectedUser.IdentityNumber ? "error" : ""
              }
              help={
                selectedUser && !selectedUser.IdentityNumber
                  ? "Tc.Kimlik No boş bırakılamaz!"
                  : ""
              }
            >
              <Input
                value={selectedUser ? selectedUser.IdentityNumber : ""}
                onChange={(e) => {
                  this.setState({
                    selectedUser: {
                      ...selectedUser,
                      IdentityNumber: e.target.value,
                    },
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Adı"
              required
              hasFeedback
              validateStatus={selectedUser && !selectedUser.Name ? "error" : ""}
              help={
                selectedUser && !selectedUser.Name ? "Adı boş bırakılamaz!" : ""
              }
            >
              <Input
                value={selectedUser ? selectedUser.Name : ""}
                onChange={(e) => {
                  this.setState({
                    selectedUser: {
                      ...selectedUser,
                      Name: e.target.value,
                    },
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Soy Adı"
              required
              hasFeedback
              validateStatus={
                selectedUser && !selectedUser.Surname ? "error" : ""
              }
              help={
                selectedUser && !selectedUser.Surname
                  ? "Soyadı boş bırakılamaz!"
                  : ""
              }
            >
              <Input
                value={selectedUser ? selectedUser.Surname : ""}
                onChange={(e) => {
                  this.setState({
                    selectedUser: {
                      ...selectedUser,
                      Surname: e.target.value,
                    },
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              required
              hasFeedback
              validateStatus={
                selectedUser && selectedUser.Email
                  ? this.validateEmail(selectedUser.Email)
                  : ""
              }
              help={
                selectedUser && selectedUser.Email
                  ? this.validateEmail(selectedUser.Email) === "error"
                    ? "Geçerli bir email adresi girin."
                    : ""
                  : "Email boş bırakılamaz!"
              }
            >
              <Input
                value={selectedUser ? selectedUser.Email : ""}
                onChange={(e) => {
                  this.setState({
                    selectedUser: {
                      ...selectedUser,
                      Email: e.target.value,
                    },
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Role"
              required
              validateStatus={
                selectedUser && selectedUser.RoleId ? "success" : "error"
              }
              help={
                selectedUser && !selectedUser.RoleId
                  ? "Role boş bırakılamaz!"
                  : ""
              }
            >
              <Select
                value={selectedUser ? selectedUser.RoleId : undefined}
                onChange={(value) => {
                  this.setState({
                    selectedUser: {
                      ...selectedUser,
                      RoleId: value,
                    },
                  });
                }}
              >
                {roles &&
                  roles.map((role) => (
                    <Select.Option key={role.Id} value={role.Id}>
                      {role.Name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        ;
      </div>
    );
  }
}
