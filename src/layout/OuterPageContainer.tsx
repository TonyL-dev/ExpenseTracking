import { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

// the black box that contains the entire page to make it look dark mode
const OuterPageContainer = ({ children }: PageContainerProps) => {
  return <div className={`bg-[#141517] text-white min-h-screen pb-4`}>{children}</div>;
};

export default OuterPageContainer;