import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Virtual Try-On
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Upload your portrait and clothing to see how they look together
        </p>
        <Link to="/try-on">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            Start Try-On
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
