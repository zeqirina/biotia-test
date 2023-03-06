import { PropsWithChildren } from "react";
import Header from "./Header";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full flex flex-col h-screen bg-gradient-to-r from-[#F0F3FA] to-[#F3F6FC]">
      <Header />
      {children}
    </div>
  );
};
