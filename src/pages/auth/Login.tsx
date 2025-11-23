import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { ProviderButtons } from "@/features/auth/components/ProviderButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { useToast } from "@/core/hooks/use-toast";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login button clicked");
    toast({
      title: "Login Successful",
      description: "Welcome back!"
    });
    console.log("Navigating to dashboard...");
    setTimeout(() => {
      navigate("/dashboard");
      console.log("Navigation called");
    }, 100);
  };
  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Login`,
      description: "Social login functionality coming soon!"
    });
  };
  return <AuthCard logo="Able" title="PRO">
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs text-muted-foreground">
            Email Address
          </Label>
          <Input id="email" type="email" placeholder="info@phoenixcoded.co" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-xs text-muted-foreground">
            Password
          </Label>
          <PasswordInput id="password" placeholder="••••••" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary font-medium hover:underline">
          Create
        </Link>
      </p>

      
    </AuthCard>;
};
export default Login;