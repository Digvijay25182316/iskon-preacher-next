import Login from "@/components/Auth/Login";

export default function Home() {
  return (
    <main className="h-screen w-screen flex items-center justify-center flex-col gap-5 bg-white text-black">
      <p className="text-4xl font-bold text-gray-800">Sign in</p>
      <div className="flex items-center gap-1 font-semibold text-lg">
        <p>Don&apos;t have an account ? </p>{" "}
        <p className=" text-blue-500 hover:underline">Sign up</p>
      </div>
      <div className=" border border-gray-50 md:p-8 p-5 md:rounded-[46px] rounded-[36px] md:w-[450px] mt-4 bg-[#f7fafa]">
        <Login />
      </div>
    </main>
  );
}
