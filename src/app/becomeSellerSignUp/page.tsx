"use client";

//shadcn ui
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";

import Link from "next/link";

//react icons
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { signIn } from "next-auth/react";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    const res = await fetch("../api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (res.ok) {
      setPending(false);
      toast.success(data.message);
      router.push("/login");
    } else if (res.status === 400) {
      setError(data.message);
      setPending(false);
    } else if (res.status === 500) {
      setError(data.message);
      setPending(false);
    }
  };

  const handleProvider = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: "github" | "google"
  ) => {
    event.preventDefault();
    signIn(value, { callbackUrl: "/" });
  };

  return (
    <div id="signup-container">
      <Card id="signup-card">
        <CardHeader>
          <CardTitle id="signup-card-title">Sign Up As a Seller</CardTitle>
          <CardDescription id="signup-card-description">
            Use Email  to Sign Up :
          </CardDescription>
        </CardHeader>
        {!!error && (
          <div id="signup-error-message">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}
        <CardContent id="signup-card-content">
          <form onSubmit={handleSubmit} id="signup-form">
            <Input
             id="formInput"
              type="text"
              disabled={pending}
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
             id="formInput"
              type="email"
              disabled={pending}
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              id="formInput"
              type="password"
              disabled={pending}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <Input
             id="formInput"
              type="password"
              disabled={pending}
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
            />
            <Button id="signup-continue-button" size="lg" disabled={pending}>
              Sign Up
            </Button>
          </form>

          <Separator />
          <p className="ta-center separator-text">Or Sign Up With :</p>
          <div id="signup-social-buttons-wrapper">
            <Button
              disabled={false}
              onClick={(e) => handleProvider(e, "google")}
              variant="outline"
              size="lg"
              className="social-provider-button" /* Reusing class */
            >
              <FcGoogle className="social-provider-icon" />
            </Button>
            <Button
              disabled={false}
              onClick={(e) => handleProvider(e, "github")}
              variant="outline"
              size="lg"
              className="social-provider-button" /* Reusing class */
            >
              <FaGithub className="social-provider-icon" />
            </Button>
          </div>
          <p id="signup-login-text">
            Already have an account?
            <Link href="/becomeSellerLogIn" id="signup-login-link">
              Log In{" "}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;