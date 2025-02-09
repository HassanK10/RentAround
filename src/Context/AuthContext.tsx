import { auth } from "../Firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  currentUser: User | null;
  loginWithGoogle: () => Promise<UserCredential | null>;
  sendMagicLink: (email: string) => Promise<void>;
  completeSignInWithEmailLink: () => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Google Authentication
  const loginWithGoogle = async (): Promise<UserCredential | null> => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      setCurrentUser(result.user);
      localStorage.setItem("currentUser", JSON.stringify(result.user)); // Save user
      return result;
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      return null;
    }
  };

  // ✅ **Fixed: Send Magic Link**
  const sendMagicLink = async (email: string): Promise<void> => {
    const actionCodeSettings = {
      url: "http://localhost:3000/", // Update with your actual domain
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      localStorage.setItem("emailForSignIn", email);
      console.log("✅ Magic link sent to:", email);
    } catch (error) {
      console.error("❌ Error sending magic link:", error);
    }
  };

  const completeSignInWithEmailLink = async (): Promise<void> => {
    try {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        const email = localStorage.getItem("emailForSignIn");
        if (!email) {
          console.error("❌ No email found in localStorage for sign-in.");
          return;
        }

        // Sign in the user with email link
        const result = await signInWithEmailLink(
          auth,
          email,
          window.location.href
        );
        setCurrentUser(result.user);
        localStorage.setItem("currentUser", JSON.stringify(result.user));
        localStorage.removeItem("emailForSignIn"); // Remove stored email

        console.log("✅ Successfully signed in with email link!");
      }
    } catch (error) {
      console.error("❌ Error completing sign-in with email link:", error);
    }
  };

  // ✅ **Automatically Complete Sign-In When Redirected**
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      completeSignInWithEmailLink();
    }
  }, []);

  // Logout function
  const logOut = async () => {
    await signOut(auth);
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  // Persist user session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        localStorage.removeItem("currentUser");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loginWithGoogle,
        sendMagicLink,
        completeSignInWithEmailLink,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
