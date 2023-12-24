import React, { Component } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { Popconfirm, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getData, postData, deleteData } from "../../services/AccessAPI";

export default class Roles extends Component {
  state = {
    rolles: [],
    isModalVisible: false,
    selectedRole: null,
    token: null,
  };

  async componentDidMount() {
    await this.getRolles();
  }
  getRolles = () => {
    getData(`/roles`).then((result) => {
      let responseJson = result;
      if (responseJson) {
        this.setState({ rolles: JSON.parse(responseJson) });
      }
    });
  };

  handleEdit = (role) => {
    this.setState({ selectedRole: role, isModalVisible: true });
  };

  handleDelete = (roleId) => {
    deleteData("/roles/" + roleId).then((result) => {
      let responseJson = result;
      if (responseJson) {
        message.success("Silme işlemi başarıyla gerçekleştirildi.");
        this.getRolles();
      }
    });
  };

  handleUpdate = () => {
    const { selectedRole } = this.state;

    // Eğer selectedRole.Id yoksa (yeni kullanıcı ekleniyor), bu fonksiyonu çağırmamalıyız
    if (!selectedRole || !selectedRole.Id) {
      console.error("Güncellenecek kullanıcı bulunamadı.");
      return;
    }
    if (!this.validateForm()) {
      return;
    }

    // API'ye gönderilecek güncellenmiş kullanıcı verisi
    const updatedRoleData = {
      Name: selectedRole.DisplayName,
      DisplayName:selectedRole.DisplayName,
      Id: selectedRole.Id,
    };
    postData("/roles", updatedRoleData).then((result) => {
      let responseJson = result;
      if (responseJson) {
        message.success("Kullanıcı başarıyla Güncellendi.");
        this.getRolles();
        this.setState({ isModalVisible: false });
      }
    });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };
  handleAddRole = () => {
    this.setState({
      isModalVisible: true,
      selectedRole: {}, // Yeni bir kullanıcı objesi oluşturuyoruz
    });
  };

  handleCreateRole = () => {
    const { selectedRole } = this.state;

    if (!this.validateForm()) {
      // Gerekli kontrollerden biri başarısızsa işlemi engelle
      return;
    }

    // API'ye gönderilecek yeni kullanıcı verisi
    const newRole = {
      Name: selectedRole.DisplayName,
      DisplayName:selectedRole.DisplayName,
      Id: selectedRole.Id,
    };
    postData("/Roles", newRole).then((result) => {
      let responseJson = result;
      if (responseJson) {
        message.success("Rol başarıyla eklendi.");
        this.getRolles();
        this.setState({ isModalVisible: false });
      }
    });
  };
  

  validateForm = () => {
    // Formun geçerliliğini kontrol et
    const { selectedRole } = this.state;

    if (!selectedRole || !selectedRole.DisplayName) {
      message.error("Adı boş bırakılamaz.");
      return false;
    }
    return true;
  };
  render() {
    const {  isModalVisible, selectedRole, rolles } = this.state;

    const columns = [
      {
        title: "Adı",
        dataIndex: "DisplayName",
        key: "DisplayName",
        filters: [...new Set(rolles.map((item) => item.DisplayName))].map(
          (option) => ({
            text: option,
            value: option,
          })
        ),
        onFilter: (value, record) => record.DisplayName === value,
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
          onClick={this.handleAddRole}
          style={{ float: "left", margin: "20px" }}
        >
          Yeni Role Ekle
        </Button>
        <br></br>
        <Table
          dataSource={rolles}
          columns={columns}
          rowKey={(record) => record.Id}
          scroll={{ x: true }}
        />
        <Modal
          title={
            selectedRole && selectedRole.Id
              ? "Rol Güncelle"
              : "Yeni Rol Ekle"
          }
          visible={isModalVisible}
          onOk={
            selectedRole && selectedRole.Id
              ? this.handleUpdate
              : this.handleCreateRole
          }
          onCancel={this.handleCancel}
          okText={selectedRole && selectedRole.Id ? "Güncelle" : "Ekle"}
          cancelText="Vazgeç"
        >
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
         
            <Form.Item
              label="Adı"
              required
              hasFeedback
              validateStatus={selectedRole && !selectedRole.DisplayName ? "error" : ""}
              help={
                selectedRole && !selectedRole.DisplayName ? "Adı boş bırakılamaz!" : ""
              }
            >
              <Input
                value={selectedRole ? selectedRole.DisplayName : ""}
                onChange={(e) => {
                  this.setState({
                    selectedRole: {
                      ...selectedRole,
                      DisplayName: e.target.value,
                    },
                  });
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
        ;
      </div>
    );
  }
}
