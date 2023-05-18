import { SignupForm } from "@/components/Signup";

const Signup = () => (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <h1 className="text-5xl font-extrabold text-white">Sign up</h1>
            <SignupForm />      
        </div>
    );
export default Signup;