import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAddProductManagementMutation } from "@/redux/features/admin/productManagement.api";
import { TResponse } from "@/types";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  brand: z.string().min(2, "Brand must be at least 2 characters"),
  price: z.number().min(1, "Price must be at least 1"),
  type: z.enum(["Mountain", "Road", "Hybrid", "BMX", "Electric"]),
  description: z.string(),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  inStock: z.boolean(),
});

type Bicycle = z.infer<typeof formSchema>;
const AddProductForm = () => {

    
  const [addProductManagement] = useAddProductManagementMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Bicycle>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<Bicycle> = async (data) => {
    const toastId = toast.loading("Creating...");
    const res = (await addProductManagement(data)) as TResponse;
    console.log("Bicycle Data:", res);
    if (res.error) {
      toast.error(res.error.data.message, { id: toastId });
    } else {
      toast.success("Product created successfully", { id: toastId });
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-6 shadow-lg border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Bicycle Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} placeholder="Bicycle name" />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              {...register("brand")}
              placeholder="Bicycle brand"
            />
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              {...register("price", { valueAsNumber: true })}
              placeholder="Bicycle price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <select
              id="type"
              {...register("type")}
              className="border rounded p-2 w-full"
            >
              <option value="Mountain">Mountain</option>
              <option value="Road">Road</option>
              <option value="Hybrid">Hybrid</option>
              <option value="BMX">BMX</option>
              <option value="Electric">Electric</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              {...register("description")}
              placeholder="Bicycle description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              {...register("quantity", { valueAsNumber: true })}
              placeholder="Quantity"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input id="inStock" type="checkbox" {...register("inStock")} />
            <Label htmlFor="inStock">In Stock</Label>
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
