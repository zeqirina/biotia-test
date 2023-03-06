import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="w-full py-4 shadow bg-white">
      <div className="container mx-auto flex flex-col items-center space-y-2 px-6 md:flex-row md:space-x-4 md:space-y-0 lg:px-0">
        <Link to="/" className="font-medium">
          Pokemon App
        </Link>
      </div>
    </header>
  );
};

export default Header;
