import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Copy, 
  Clock, 
  Check, 
  AlertCircle, 
  BookOpen,
  Settings,
  Users
} from 'lucide-react';
import { Book, BookStatus, BookCondition } from '../types';
import { mockBooks } from '../data/mockData';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchBook = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundBook = mockBooks.find((b) => b.id === id) || null;
      setBook(foundBook);
      setIsLoading(false);
    };
    
    fetchBook();
  }, [id]);

  const getStatusBadgeClass = (status: BookStatus) => {
    switch (status) {
      case BookStatus.Available:
        return 'badge-success';
      case BookStatus.Checked_Out:
        return 'badge-warning';
      case BookStatus.Reserved:
        return 'badge-primary';
      case BookStatus.Under_Maintenance:
        return 'badge-error';
      default:
        return 'badge-secondary';
    }
  };

  const getStatusIcon = (status: BookStatus) => {
    switch (status) {
      case BookStatus.Available:
        return <Check className="h-4 w-4" />;
      case BookStatus.Checked_Out:
        return <Clock className="h-4 w-4" />;
      case BookStatus.Reserved:
        return <BookOpen className="h-4 w-4" />;
      case BookStatus.Under_Maintenance:
        return <Settings className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getConditionBadgeClass = (condition: BookCondition) => {
    switch (condition) {
      case BookCondition.New:
        return 'badge-success';
      case BookCondition.Good:
        return 'badge-primary';
      case BookCondition.Fair:
        return 'badge-warning';
      case BookCondition.Poor:
        return 'badge-error';
      default:
        return 'badge-secondary';
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
        <BookOpen className="h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Book not found</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          The book you're looking for doesn't exist or has been removed
        </p>
        <Link to="/books" className="mt-4 btn btn-primary">
          Back to Books
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center">
        <Link to="/books" className="mr-4 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <ArrowLeft className="h-5 w-5" />
          <span className="ml-1">Back to Books</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* Book cover and basic actions */}
        <div className="md:col-span-4">
          <div className="sticky top-24">
            <div className="overflow-hidden rounded-lg">
              <img
                src={book.coverImage}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="mt-6 space-y-3">
              <button className="btn btn-primary w-full">
                <Users className="mr-2 h-4 w-4" />
                Check Out Book
              </button>
              <div className="grid grid-cols-3 gap-3">
                <button className="btn btn-outline">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="btn btn-outline">
                  <Copy className="h-4 w-4" />
                </button>
                <button className="btn btn-danger">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Book details */}
        <div className="md:col-span-8">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{book.title}</h1>
            <div className="mt-2 sm:mt-0">
              <span className={`badge ${getStatusBadgeClass(book.status)} flex items-center space-x-1`}>
                {getStatusIcon(book.status)}
                <span>{book.status.replace('_', ' ')}</span>
              </span>
            </div>
          </div>
          
          <p className="text-lg text-gray-700 dark:text-gray-300">by {book.author}</p>
          
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Book metadata */}
            <div className="card">
              <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Book Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">ISBN</span>
                  <span className="font-medium text-gray-900 dark:text-white">{book.isbn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Publisher</span>
                  <span className="font-medium text-gray-900 dark:text-white">{book.publisher}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Publication Year</span>
                  <span className="font-medium text-gray-900 dark:text-white">{book.publicationYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Category</span>
                  <span className="badge badge-secondary">{book.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Condition</span>
                  <span className={`badge ${getConditionBadgeClass(book.condition)}`}>{book.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Location</span>
                  <span className="font-medium text-gray-900 dark:text-white">{book.location}</span>
                </div>
              </div>
            </div>
            
            {/* Availability information */}
            <div className="card">
              <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Availability</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Copies</span>
                  <span className="font-medium text-gray-900 dark:text-white">{book.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Available Copies</span>
                  <span className="font-medium text-gray-900 dark:text-white">{book.availableQuantity}</span>
                </div>
                <div className="mt-4">
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Availability</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {book.availableQuantity}/{book.quantity}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-full rounded-full bg-primary-500"
                      style={{ width: `${(book.availableQuantity / book.quantity) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Book description */}
          <div className="mt-6 card">
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Description</h3>
            <p className="text-gray-700 dark:text-gray-300">{book.description}</p>
          </div>
          
          {/* Checkout history */}
          <div className="mt-6 card">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Checkout History</h3>
              <button className="btn btn-sm btn-outline">View All</button>
            </div>
            
            <div className="mt-4">
              <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Checkout Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Return Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    <tr>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-100 dark:bg-gray-700">
                            <div className="flex h-full w-full items-center justify-center">
                              <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              Emma Johnson
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">Mar 12, 2025</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">Apr 2, 2025</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="badge badge-success">Returned</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-100 dark:bg-gray-700">
                            <div className="flex h-full w-full items-center justify-center">
                              <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              Michael Brown
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">Feb 3, 2025</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">Feb 24, 2025</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="badge badge-success">Returned</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;