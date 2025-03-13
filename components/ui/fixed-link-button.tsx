import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import Link from "next/link";

interface FixedLinkButtonProps {
  children: ReactNode;
  className?: string;
}

const FixedLinkButton: React.FC<FixedLinkButtonProps> = ({ children, className }) => {
  const fixedUrl = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1DoaNF6jGiZt9clyLQrqRc3vuveJLs2-bPuXM5fU-vvSME0nV2gGwNRHpq5OE-GdBRMnuXju3H";

  return (
    <Button asChild className={className}>
      <Link href={fixedUrl} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    </Button>
  );
};

export default FixedLinkButton;
