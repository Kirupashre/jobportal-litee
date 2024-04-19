import DefaultRenderEmpty from "antd/es/config-provider/defaultRenderEmpty";
import {  Col, Form, Row } from "antd";
import React from "react";

function Experience(){
    return(
        <>
        <Form.List name="experiences">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row gutter={[10, 10]} align="middle">
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "company"]}
                    rules={[{ required: true, message: "Required" }]}
                    label="Company"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...restField}
                    name={[name, "designation"]}
                    rules={[{ required: true, message: "Required" }]}
                    label="Designation"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    {...restField}
                    name={[name, "location"]}
                    rules={[{ required: true, message: "Required" }]}
                    label="Location"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                
                <Col span={4}>
                  <Form.Item
                    {...restField}
                    name={[name, "duration"]}
                    rules={[{ required: true, message: "Required" }]}
                    label="Duration"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <i class="ri-delete-bin-line" onClick={() => remove(name)}></i>
              </Row>
            ))}
            <Form.Item>
              <button className="primary-outline-btn" onClick={() => add()}>
                ADD EXPERIENCE
              </button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.List name="projects">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row gutter={[10, 10]} align="middle">
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "title"]}
                    rules={[{ required: true, message: "Required" }]}
                    label="Title"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={10} className="mt-4">
                  <Form.Item
                    {...restField}
                    name={[name, "description"]}
                    rules={[{ required: true, message: "Required" }]}
                    label="Description"
                  >
                    <textarea type="text" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    {...restField}
                    name={[name, "duration"]}
                    rules={[{ required: true, message: "Required" }]}
                    label="Duration"
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <i class="ri-delete-bin-line" onClick={() => remove(name)}></i>
              </Row>
            ))}
            <Form.Item>
              <button className="primary-outline-btn" onClick={() => add()}>
                ADD PROJECT
              </button>
            </Form.Item>
          </>
        )}
      </Form.List>
        </>
    )
}

export default Experience;

