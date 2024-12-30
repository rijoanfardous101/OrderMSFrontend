import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/hooks/useAuthStore";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const signupSchema = z.object({
  companyName: z.string().min(4, {
    message: "Minimum 4 characters",
  }),
  emailAddress: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(1, {
    message: "Please enter a password",
  }),
});

const SignupPage = () => {
  const { signup } = useAuthStore();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      companyName: "",
      emailAddress: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signupSchema>) {
    signup(values);
  }

  return (
    <Card className="w-[350px] m-auto mt-20">
      <CardHeader className="text-center">
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Please signup with company details.</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Example Inc" {...field} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="user@example.com" {...field} />
                  </FormControl>
                  <FormMessage></FormMessage>
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
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Signup
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-center text-sm block">
        <div>
          Have an account?{" "}
          <Link to="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignupPage;
