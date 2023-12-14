import LoginForm from "@/components/auth/loginForm";

export const metadata = {
  title: "Administradores || Capellari",
  description: "Login para administradores de Capellari",
};

const LoginPage = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
