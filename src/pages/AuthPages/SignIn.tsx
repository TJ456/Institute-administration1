import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Sign In | InfuniLMS - Institute Administration"
        description="Sign in to InfuniLMS Institute Administration with your Gmail account"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
