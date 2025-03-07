import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import Link from "next/link";

interface FixedLinkButtonProps {
  children: ReactNode;
  className?: string;
}

const FixedLinkButton: React.FC<FixedLinkButtonProps> = ({ children, className }) => {
  const fixedUrl = "https://www.google.cl";

  return (
    <Button asChild className={className}>
      <Link href={fixedUrl} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    </Button>
  );
};

export default FixedLinkButton;
