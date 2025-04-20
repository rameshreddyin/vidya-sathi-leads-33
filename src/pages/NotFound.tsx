
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-education-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-education-600 hover:bg-education-700">
          <Link to="/">
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
