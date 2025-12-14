import UserForm from "../../../components/Froms/UserForm";

export default function SignUp() {
  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <UserForm type="Register" navigateTo="/" />
      </div>
    </div>
  );
}
