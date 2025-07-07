"use client";

// Shadcn UI components remain the same
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

// React Icons remain the same
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";

// Assuming you have a globals.css file or similar imported in your root layout/app file

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
      redirect: false, // Prevents NextAuth from automatically redirecting on success/failure
      email,
      password,
    });

    // --- START DEBUGGING LOGS ---
    console.group("NextAuth SignIn Attempt Result:");
    console.log("Full response object:", res);
    console.log("Is response OK (res.ok)?", res?.ok);
    console.log("Response status (res.status):", res?.status);
    console.log("Error message from NextAuth (res.error):", res?.error); // This is crucial for debugging
    console.log("URL on error (res.url):", res?.url);
    console.groupEnd();
    // --- END DEBUGGING LOGS ---

    if (res?.ok) {
      router.push("/becomeSeller");
      // toast.success("Login successful"); // If you have sonner configured
      alert("Login successful"); // Keeping alert as per your previous code
    } else if (res?.status === 401) {
      setError("Invalid Credentials (Email or Password)");
      setPending(false);
    } else {
      setError("Something went wrong. Please check console for details.");
      setPending(false); // Ensure pending state is reset
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
          <CardTitle id="card-title">Log In As a Seller</CardTitle>
          <CardDescription id="card-description">
            Use Email to Log In :
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
          <p className="ta-center separator-text">Or Log In with : </p>
          <div id="social-buttons-layout">
            <Button
              disabled={false}
              onClick={(e) => handleProvider(e, "google")}
              variant="outline"
              size="lg"
              className="social-provider-button" /* Use class for reusable styles */
            >
              <FcGoogle className="social-provider-icon" />
            </Button>
            <Button
              disabled={false}
              onClick={(e) => handleProvider(e, "github")}
              variant="outline"
              size="lg"
              className="social-provider-button" /* Use class for reusable styles */
            >
              <FaGithub className="social-provider-icon" />
            </Button>
          </div>
          <p id="create-account-text">
            Create new account
            <Link href="/becomeSellerSignUp" id="signup-link">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;