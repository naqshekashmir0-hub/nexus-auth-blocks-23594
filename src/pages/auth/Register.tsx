import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { ProviderButtons } from "@/features/auth/components/ProviderButtons";
import { PasswordStrengthIndicator } from "@/features/auth/components/PasswordStrengthIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useToast } from "@/core/hooks/use-toast";
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Account Created",
      description: "Welcome to Able Pro!"
    });
    navigate("/login");
  };
  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Sign Up`,
      description: "Social sign up functionality coming soon!"
    });
  };
  return <AuthCard logo="Able" title="PRO">
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Input id="firstName" type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Input id="lastName" type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
          </div>
        </div>

        <div className="space-y-2">
          <Input id="mobile" type="tel" placeholder="Mobile Number" value={mobile} onChange={e => setMobile(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Input id="email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <PasswordInput id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <PasswordStrengthIndicator password={password} />
        </div>

        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Login
        </Link>
      </p>

      
    </AuthCard>;
};
export default Register;