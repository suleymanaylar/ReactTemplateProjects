import React, { Component } from "react";
import { Table, Button, Badge } from "antd";
import { Popconfirm, message } from "antd";
import { withRouter } from "react-router-dom";
import { getData } from "../services/AccessAPI";

class MinistryPage extends Component {
  state = {
    applications: [],
    selectedApplications: null,
    applicationsDetail: [],
  };

  async componentDidMount() {
    await this.getApplications();
  }
  getApplications = () => {
    getData(`/MinistryPage/GetAll`).then((result) => {
      let responseJson = result;
      if (responseJson) {
        this.setState({ applications: JSON.parse(responseJson) });
      }
    });
  };
  // getApplications = () => {
  //   let token=SessionManager.getToken();
  //   fetch("https://localhost:44307/api/MinistryPage")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Sunucudan veri alınamadı.");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Sunucudan gelen veri:", data);
  //       this.setState({ applications: data });
  //     })
  //     .catch((error) => {
  //       console.error("Veri alımı hatası:", error);
  //     });
  // };

  handleApproval = (applicationId) => {
    message.success("Onaylama İşlemi Gerçekleştirildi.AppId: " + applicationId);
  };
  handleReject = (applicationId) => {
    message.success("Red Etme İşlemi Gerçekleştirildi.AppId: " + applicationId);
  };

  handleReview = (application) => {
    this.props.history.push({
      pathname: "/ApplicationsForm",
      state: { applicationsDetail: application },
    });
  };
  render() {
    const { applications } = this.state;

    const columns = [
      {
        title: "İşlemler",
        key: "actions",
        render: (text, record) => (
          <span>
            <Popconfirm
              key="success"
              title="Onaylamak İstediğinize Emin misiniz?"
              okText="Evet"
              cancelText="Hayır"
              onConfirm={() => this.handleApproval(record.Id)}
            >
              <Button
                style={{
                  margin: "5px",
                  backgroundColor: "#4CAF50",
                  borderColor: "#4CAF50",
                  color: "#fff",
                }}
              >
                Onayla
              </Button>
            </Popconfirm>
            <Popconfirm
              key="reject"
              title="Red Etmek İstediğinize Emin misiniz?"
              okText="Evet"
              cancelText="Hayır"
              onConfirm={() => this.handleReject(record.Id)}
            >
              <Button
                style={{
                  margin: "5px",
                }}
                type="danger"
              >
                Reddet
              </Button>
            </Popconfirm>

            <Button
              style={{
                margin: "5px",
                backgroundColor: "#FFD700",
                borderColor: "#FFD700",
                color: "#fff",
              }}
              onClick={() => this.handleReview(record)}
            >
              İncele
            </Button>
          </span>
        ),
      },
      {
        title: "Durum",
        dataIndex: "ApplicationsStatus",
        key: "ApplicationsStatus",
        render: (text) => {
          let badgeColor = "";
          let badgeText = "";

          if (text === "Basvuruldu") {
            badgeColor = "blue";
            badgeText = "Başvuruldu";
          } else if (text === "Onay") {
            badgeColor = "green";
            badgeText = "Onay";
          } else if (text === "Tamamlanmadi") {
            badgeColor = "yellow";
            badgeText = "Onay";
          }

          return <Badge status={badgeColor} text={badgeText} />;
        },
      },
      {
        title: "Başvurulan İl",
        dataIndex: "CityOfWork",
        key: "CityOfWork",
      },
      {
        title: "Başvurulan Alan",
        dataIndex: "ApplicationTypes",
        key: "ApplicationTypes",
      },
      {
        title: "Adı",
        dataIndex: "Name",
        key: "Name",
      },
      {
        title: "Soyadı",
        dataIndex: "SurName",
        key: "SurName",
      },
      {
        title: "Cinsiyet",
        dataIndex: "Gender",
        key: "Gender",
      },
      {
        title: "TC Kimlik No",
        dataIndex: "IdentityNumber",
        key: "IdentityNumber",
      },
      {
        title: "Çalışma Yılı",
        dataIndex: "WorkingYear",
        key: "WorkingYear",
      },
      {
        title: "Ücret Beklentisi",
        dataIndex: "SalaryExpectations",
        key: "SalaryExpectations",
      },
      {
        title: "Bölüm",
        dataIndex: "DepartmanName",
        key: "DepartmanName",
      },
      {
        title: "Askerlik Durumu",
        dataIndex: "MilitaryStatus",
        key: "MilitaryStatus",
      },
      {
        title: "Yalın Bilgi Seviyesi",
        dataIndex: "KnowledgeLevels",
        key: "KnowledgeLevels",
      },
      {
        title: "Telefon Numarası",
        dataIndex: "PhoneNumber",
        key: "PhoneNumber",
      },
    ];

    return (
      <div>
        <Table
          dataSource={applications}
          columns={columns}
          rowKey={(record) => record.Id}
          scroll={{ x: true }}
        />
      </div>
    );
  }
}
export default withRouter(MinistryPage);
