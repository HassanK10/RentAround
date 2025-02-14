import { FcGoogle } from "react-icons/fc";
import { HiX } from "react-icons/hi";
import logo from "../assets/logo.svg";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { UserCredential } from "firebase/auth";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Responsive.css"

interface SignInPageProps {
  showSignIn: boolean;
  setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignInPage: React.FC<SignInPageProps> = ({ setShowSignIn }) => {
  const navigate = useNavigate();
  const { loginWithGoogle, sendMagicLink } = useAuth();
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleLoginwithgoogle = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      const res: UserCredential | null = await loginWithGoogle();
      const user = res?.user!;

      if (user) {
        if (user.metadata.creationTime === user.metadata.lastSignInTime) {
          toast.success("Welcome, new user!");
        } else {
          toast.success("Welcome back!");
        }
        setShowSignIn(false);
        navigate("/");
      } else {
        console.error("User is undefined");
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/account-exists-with-different-credential":
            toast.error("An account already exists with this email!");
            break;
          case "auth/popup-closed-by-user":
            toast.info("Login cancelled by user.");
            break;
          default:
            toast.error("Sign-in failed. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await sendMagicLink(email);
      toast.success("Magic link sent! Check your email.");
    } catch (error) {
      toast.error("Failed to send magic link. Try again.");
      console.error("Magic link error:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <div className="sign-in-overlay">
        <div className="sign-in-content">
          <button className="close-button" onClick={() => setShowSignIn(false)}>
            <HiX />
          </button>
          <div className="header-logo">
            <img src={logo} alt="Logo" className="header-img" />
          </div>
          <h3>Welcome To RentAround</h3>
          <form className="auth-form" onSubmit={handleSendMagicLink}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="instruction">
              Enter your email to sign in or create an account instantly
            </p>
            <button
              type="submit"
              className={`text-center magic-link-btn ${
                isSending ? "disabled-btn" : ""
              }`}
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Sign In With Magic Link"}
            </button>
          </form>
          <div className="d-flex align-items-center mb-3 divider">
            <hr className="flex-grow-1 border-secondary" />
            <span className="mx-2 text-muted">or</span>
            <hr className="flex-grow-1 border-secondary" />
          </div>
          <button className="google-login" onClick={handleLoginwithgoogle}>
            <span className="google-icon">
              <FcGoogle />
            </span>
            <span>Continue With Google</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
