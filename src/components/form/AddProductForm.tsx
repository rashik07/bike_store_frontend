import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam } from "antd/es/upload/interface";
import { useAddProductManagementMutation } from "@/redux/features/admin/productManagement.api";

const { Option } = Select;

export type Bicycle = {
  name: string;
  brand: string;
  price: number;
  type: "Mountain" | "Road" | "Hybrid" | "BMX" | "Electric";
  description?: string;
  quantity: number;

};

const AddProductForm: React.FC = () => {
  const [addProductManagement] = useAddProductManagementMutation();
  const [form] = Form.useForm<Bicycle>();
  const [fileList, setFileList] = useState<RcFile[]>([]);

  const handleUploadChange = ({ fileList }: UploadChangeParam) => {
    setFileList(fileList.map((file) => file.originFileObj as RcFile));
  };

  const onFinish = async (values: Bicycle) => {
    if (fileList.length === 0) {
      message.error("Please upload a product image.");
      return;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(values));
    fileList.forEach((file) => formData.append("file", file));

    try {
      await addProductManagement(formData).unwrap();
      message.success("Product added successfully!");
      form.resetFields();
      setFileList([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error("Failed to add product. Please try again.");
    }
  };

  return (
    <>
      <h1>Product Add</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ inStock: true, quantity: 1 }}
      >
        <Form.Item
          label="Bicycle Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the bicycle name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: "Please enter the brand!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price ($)"
          name="price"
          rules={[{ required: true, message: "Please enter the price!" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: "Please select the type!" }]}
        >
          <Select>
            {(["Mountain", "Road", "Hybrid", "BMX", "Electric"] as const).map(
              (type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              )
            )}
          </Select>
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please enter the quantity!" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Upload Product Image">
          <Upload
            beforeUpload={() => false}
            listType="picture"
            onChange={handleUploadChange}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddProductForm;
