import LoginForm from "../components/LoginForm";
import { useState } from "react";
import { noAuth } from "@/utilities/auth";
import SignInForm from "@/components/SignInForm";
import { useAuth } from "@/utilities/auth";


export default function Login() {

  noAuth();

  const [showSignInForm, setShowSignInForm] = useState(false);

  // Function to toggle between LoginForm and SignInForm
  const toggleForm = () => {
    setShowSignInForm((prevState) => !prevState);
  };

  return (
    <div className="w-screen h-screen bg-blue-600">
      {showSignInForm ? (
        <SignInForm toggleForm={toggleForm} />
      ) : (
        <LoginForm toggleForm={toggleForm} />
      )}
    </div>
  );
}
