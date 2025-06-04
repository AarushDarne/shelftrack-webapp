import { Link } from 'react-router-dom';
import { ArrowLeft, BookX } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <BookX className="h-24 w-24 text-primary-500" />
      <h1 className="mt-6 text-4xl font-bold text-gray-900 dark:text-white">404</h1>
      <h2 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">Page Not Found</h2>
      <p className="mt-4 max-w-md text-gray-600 dark:text-gray-400">
        Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, or never existed.
      </p>
      <Link to="/" className="mt-8 btn btn-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;