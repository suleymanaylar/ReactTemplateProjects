import React, { Component } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { Popconfirm, message } from "antd";
import "alertifyjs/build/css/alertify.css";
import { PlusOutlined } from "@ant-design/icons";

export default class Users extends Component {
  state = {
    users: [],
    isModalVisible: false,
    selectedUser: null,
    roles: [],
  };

  async componentDidMount() {
    await this.getUsers();
    await this.getRoles();
  }

  getUsers = () => {
    fetch("https://localhost:44307/api/user")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sunucudan veri alınamadı.");
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Sunucudan gelen veri:", data);
        this.setState({ users: data });
      })
      .catch((error) => {
        console.error("Veri alımı hatası:", error);
      });
  };
  getRoles = () => {
    fetch("https://localhost:44307/api/Generals/GetAllRoleForTableDropdown")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sunucudan veri alınamadı.");
        }
        return response.json();
      })
      .then((data) => {
        //console.log("Sunucudan gelen veri:", data);
        this.setState({ roles: data });
      })
      .catch((error) => {
        console.error("Veri alımı hatası:", error);
      });
  };
  handleEdit = (user) => {
    this.setState({ selectedUser: user, isModalVisible: true });
  };

  handleDelete = (userId) => {
    fetch(`https://localhost:44307/api/user/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sunucudan silme işlemi gerçekleştirilemedi.");
        }

        message.success("Silme işlemi başarıyla gerçekleştirildi.");
        this.getUsers();
      })
      .catch((error) => {
        message.error("Silme işlemi hatası", error);
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

    // API'ye güncelleme isteği gönder
    fetch("https://localhost:44307/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sunucu hatası: Güncelleme başarısız");
        }
        return response.json();
      })
      .then((data) => {
        message.success("Güncelleme işlemi başarıyla gerçekleştirildi.");
        this.getUsers();

        // Modal'ı kapat
        this.setState({ isModalVisible: false });
      })
      .catch((error) => {
        console.error("Güncelleme hatası:", error);
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

    // API'ye ekleme isteği gönder
    fetch("https://localhost:44307/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sunucu hatası: Kullanıcı eklenemedi");
        }
        return response.json();
      })
      .then((data) => {
        message.success("Kullanıcı başarıyla eklendi.");
        this.getUsers();

        // Modal'ı kapat
        this.setState({ isModalVisible: false });
      })
      .catch((error) => {
        console.error("Kullanıcı ekleme hatası:", error);
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
      },
      {
        title: "İsim",
        dataIndex: "Name",
        key: "Name",
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
