import { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

//the inner box to keep everything contained and not pressed up against the side edges
const PageContainer = ({ children }: PageContainerProps) => {
  return <div className="mx-12 mt-12">{children}</div>;
};

export default PageContainer;