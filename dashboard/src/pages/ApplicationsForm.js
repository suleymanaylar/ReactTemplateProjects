import React from "react";
import { Form, Input, Col, Card,  Row } from "antd";

const Applications = (props) => {
  const applicationsDetail = props.location.state?.applicationsDetail;
  return (
    <div>
      <Col>
        <Card>
          <Row>
            <Col md={6} style={{ marginLeft: "156px" }}>
              <Form.Item label="Name">
                <Input value={applicationsDetail.Name} disabled />
              </Form.Item>
              <Form.Item label="Surname">
                <Input value={applicationsDetail.SurName} disabled />
              </Form.Item>
              <Form.Item label="Tc Kımlık">
                <Input value={applicationsDetail.IdentityNumber} disabled />
              </Form.Item>
            </Col>
            <Col md={6} style={{ marginLeft: "56px" }}>
              <Form.Item label="Name">
                <Input value={applicationsDetail.Name} disabled />
              </Form.Item>
              <Form.Item label="Surname">
                <Input value={applicationsDetail.SurName} disabled />
              </Form.Item>
              <Form.Item label="Tc Kımlık">
                <Input value={applicationsDetail.IdentityNumber} disabled />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </div>
  );
};

export default Applications;
