import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Filter, 
  BookOpen, 
  Check, 
  AlertCircle, 
  Clock, 
  Settings 
} from 'lucide-react';
import { Book, BookStatus, BookCondition } from '../types';

// Mock data for demonstration
const mockBooks: Book[] = Array.from({ length: 20 }, (_, i) => ({
  id: `book-${i + 1}`,
  title: [
    'To Kill a Mockingbird',
    'The Great Gatsby',
    '1984',
    'Pride and Prejudice',
    'The Catcher in the Rye',
    'Animal Farm',
    'Lord of the Flies',
    'The Hobbit',
    'Fahrenheit 451',
    'Jane Eyre',
  ][i % 10],
  author: [
    'Harper Lee',
    'F. Scott Fitzgerald',
    'George Orwell',
    'Jane Austen',
    'J.D. Salinger',
    'George Orwell',
    'William Golding',
    'J.R.R. Tolkien',
    'Ray Bradbury',
    'Charlotte Brontë',
  ][i % 10],
  isbn: `978-1-${i + 100}-${i + 200}-${i + 300}`,
  publisher: [
    'Penguin Random House',
    'HarperCollins',
    'Simon & Schuster',
    'Macmillan Publishers',
    'Oxford University Press',
  ][i % 5],
  publicationYear: 1950 + (i % 70),
  category: [
    'Fiction',
    'Classic',
    'Science Fiction',
    'Romance',
    'Mystery',
    'Biography',
    'History',
    'Fantasy',
    'Science',
    'Literature',
  ][i % 10],
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc id aliquam tincidunt, nunc risus tincidunt nunc, eu aliquam magna nunc eu magna.',
  status: [
    BookStatus.Available,
    BookStatus.Available,
    BookStatus.Available,
    BookStatus.Checked_Out,
    BookStatus.Reserved,
    BookStatus.Under_Maintenance,
  ][i % 6] as BookStatus,
  condition: [
    BookCondition.New,
    BookCondition.Good,
    BookCondition.Fair,
    BookCondition.Poor,
  ][i % 4] as BookCondition,
  location: `Section ${String.fromCharCode(65 + (i % 26))}, Shelf ${Math.floor(i / 5) + 1}`,
  coverImage: `https://picsum.photos/seed/${i + 1}/200/300`,
  quantity: Math.floor(Math.random() * 5) + 1,
  availableQuantity: Math.floor(Math.random() * 5) + 1,
  schoolId: i % 2 === 0 ? '1' : '2',
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  updatedAt: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
}));

interface FilterOptions {
  status: BookStatus | 'all';
  category: string | 'all';
  condition: BookCondition | 'all';
}

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    category: 'all',
    condition: 'all',
  });

  // Get unique categories from books
  const categories = Array.from(
    new Set(mockBooks.map((book) => book.category))
  );

  useEffect(() => {
    // Simulate API call
    const fetchBooks = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setBooks(mockBooks);
      setIsLoading(false);
    };
    
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    // Apply search filter
    const matchesSearch =
      searchQuery === '' ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply status filter
    const matchesStatus =
      filters.status === 'all' || book.status === filters.status;

    // Apply category filter
    const matchesCategory =
      filters.category === 'all' || book.category === filters.category;

    // Apply condition filter
    const matchesCondition =
      filters.condition === 'all' || book.condition === filters.condition;

    return matchesSearch && matchesStatus && matchesCategory && matchesCondition;
  });

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
        return <Check className="h-3 w-3" />;
      case BookStatus.Checked_Out:
        return <Clock className="h-3 w-3" />;
      case BookStatus.Reserved:
        return <BookOpen className="h-3 w-3" />;
      case BookStatus.Under_Maintenance:
        return <Settings className="h-3 w-3" />;
      default:
        return <AlertCircle className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Books</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your library's book collection</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="btn btn-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add New Book
          </button>
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            className="input !pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className="btn btn-outline flex items-center"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </button>
      </div>
      
      {/* Expanded filters */}
      {showFilters && (
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>
              <select
                className="input mt-1"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value as BookStatus | 'all' })}
              >
                <option value="all">All Statuses</option>
                <option value={BookStatus.Available}>Available</option>
                <option value={BookStatus.Checked_Out}>Checked Out</option>
                <option value={BookStatus.Reserved}>Reserved</option>
                <option value={BookStatus.Under_Maintenance}>Under Maintenance</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>
              <select
                className="input mt-1"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Condition
              </label>
              <select
                className="input mt-1"
                value={filters.condition}
                onChange={(e) => setFilters({ ...filters, condition: e.target.value as BookCondition | 'all' })}
              >
                <option value="all">All Conditions</option>
                <option value={BookCondition.New}>New</option>
                <option value={BookCondition.Good}>Good</option>
                <option value={BookCondition.Fair}>Fair</option>
                <option value={BookCondition.Poor}>Poor</option>
              </select>
            </div>
          </div>
        </div>
      )}
      
      {/* Books grid */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
          <BookOpen className="h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No books found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBooks.map((book) => (
            <Link
              key={book.id}
              to={`/books/${book.id}`}
              className="card transition-all hover:translate-y-[-4px]"
            >
              <div className="relative mb-3 aspect-[2/3] w-full overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
                <div className="absolute right-2 top-2">
                  <span className={`badge ${getStatusBadgeClass(book.status)} flex items-center space-x-1`}>
                    {getStatusIcon(book.status)}
                    <span>{book.status.replace('_', ' ')}</span>
                  </span>
                </div>
              </div>
              <h3 className="line-clamp-1 font-medium text-gray-900 dark:text-white">{book.title}</h3>
              <p className="line-clamp-1 text-sm text-gray-600 dark:text-gray-400">{book.author}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="badge badge-secondary">{book.category}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {book.availableQuantity}/{book.quantity} available
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;