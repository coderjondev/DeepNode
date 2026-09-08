import { AuthDialog } from "@/components/auth-dialog";
import { AuthMobileDrawer } from "@/components/auth-mobile-drawer";
import ChatInput from "@/components/chat-input/chat-input";
import { Meteors } from "@/components/ui/meteors";

const page = () => {
  return (
    <>
      <div className="flex justify-end p-2.5 relative w-full overflow-hidden h-screen">
        <Meteors number={10} />
        <div className="flex gap-2.5">
          <AuthDialog>Log in</AuthDialog>
          <AuthDialog variant={"outline"}>Sign up</AuthDialog>
        </div>
        <AuthMobileDrawer />
      </div>
      <ChatInput />
    </>
  );
};

export default page;
