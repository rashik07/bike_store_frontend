// import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
// import { PasswordInput } from "@/components/ui/password-input";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [login] = useLoginMutation();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Logging in");
    try {
      console.log(values);
      const userInfo = {
        email: values.email,
        password: values.password,
      };
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      // toast.success('Logged in', { id: toastId, duration: 2000 });
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{toastId}</code>
        </pre>
      );
      // console.log(res);
      if (user.role == "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
      // if (res?.data?.needsPasswordChange) {
      //   navigate(`/change-password`);
      // } else {
      //   navigate(`/`);
      // }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" type="email" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription>Enter your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
