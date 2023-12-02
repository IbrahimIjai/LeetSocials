import CloseModal from "@/components/CloseModal";
import SignIn from "@/components/SignIn";
import { FC } from "react";

const page: FC = () => {
  return (
    <div className="fixed inset-0 z-10 transition-all duration-100 backdrop-blur-sm fade-in bg-foreground/50">
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="relative w-full px-2 py-20 border rounded-lg h-fit bg-background">
          <div className="absolute top-4 right-4">
            <CloseModal />
          </div>

          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default page;
