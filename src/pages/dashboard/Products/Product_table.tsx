import React, { useState } from "react";
import { TProduct } from "@/types";
import { Modal, Form, Input, message } from "antd";
import { useUpdateProductMutation } from "@/redux/features/admin/productManagement.api";
import ProductTable from "@/components/form/editProductTable";

const ProductManagement: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<TProduct | null>(null);
  const [form] = Form.useForm();
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const [refreshTable, setRefreshTable] = useState(false); // State to trigger refresh

  const handleEdit = (product: TProduct) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsEditModalOpen(true);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const handleUpdateProduct = async () => {
    try {
      const values = await form.validateFields();
      if (editingProduct) {
        await updateProduct({ id: editingProduct._id, data: values }).unwrap();
        message.success("Product updated successfully");
        handleCancel();
        setRefreshTable((prev) => !prev); // Toggle to trigger re-fetch
      }
    } catch (error) {
      message.error("Failed to update product");
      console.error("Update error:", error);
    }
  };

  return (
    <div>
      <ProductTable onEdit={handleEdit} refreshTable={refreshTable} />

      <Modal
        title="Edit Product"
        open={isEditModalOpen}
        onCancel={handleCancel}
        confirmLoading={isLoading}
        onOk={handleUpdateProduct}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Bicycle Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Brand" name="brand">
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Quantity" name="quantity">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagement;
