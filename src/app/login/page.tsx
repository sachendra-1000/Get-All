"use client";

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

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push("/");
      alert("Login successful");
    } else if (res?.status === 401) {
      setError("Invalid Credentials (Email or Password)");
      setPending(false);
    } else {
      setError("Something went wrong. Please try again.");
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
    <div id="signin-container">
      <Card id="signin-card">
        <CardHeader>
          <CardTitle id="card-title">Log In</CardTitle>
          <CardDescription id="card-description">
            Use Email to Log In
          </CardDescription>
        </CardHeader>
        {!!error && (
          <div id="error-message-container">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}
        <CardContent id="card-content-wrapper">
          <form onSubmit={handleSubmit} id="signin-form">
            <Input
              id="formInput"
              type="email"
              disabled={pending}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              id="formInput"
              type="password"
              disabled={pending}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button id="continue-button" size="lg" disabled={pending}>
              Log In
            </Button>
          </form>

          <Separator />
          <p className="ta-center separator-text">Or Log In with:</p>
          <div id="social-buttons-layout">
            <Button
              disabled={false}
              onClick={(e) => handleProvider(e, "google")}
              variant="outline"
              size="lg"
              className="social-provider-button"
            >
              <FcGoogle className="social-provider-icon" />
            </Button>
            <Button
              disabled={false}
              onClick={(e) => handleProvider(e, "github")}
              variant="outline"
              size="lg"
              className="social-provider-button"
            >
              <FaGithub className="social-provider-icon" />
            </Button>
          </div>
          <p id="create-account-text">
            Create new account
            <Link href="/signup" id="signup-link">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;