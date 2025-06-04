// User types
export enum Role {
  Admin = 'admin',
  Staff = 'staff',
  Teacher = 'teacher',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  schoolId: string;
}

// Book types
export enum BookStatus {
  Available = 'available',
  Checked_Out = 'checked_out',
  Reserved = 'reserved',
  Under_Maintenance = 'under_maintenance',
}

export enum BookCondition {
  New = 'new',
  Good = 'good',
  Fair = 'fair',
  Poor = 'poor',
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publicationYear: number;
  category: string;
  description: string;
  status: BookStatus;
  condition: BookCondition;
  location: string;
  coverImage?: string;
  quantity: number;
  availableQuantity: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

// School types
export interface School {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

// Checkout types
export interface Checkout {
  id: string;
  bookId: string;
  userId: string;
  checkoutDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'active' | 'returned' | 'overdue';
  schoolId: string;
}

// Activity and dashboard types
export interface Activity {
  id: string;
  type: 'checkout' | 'return' | 'add_book' | 'edit_book' | 'delete_book' | 'add_user' | 'edit_user' | 'delete_user';
  description: string;
  userId: string;
  resourceId?: string;
  timestamp: string;
  schoolId: string;
}

export interface DashboardStats {
  totalBooks: number;
  availableBooks: number;
  checkedOutBooks: number;
  overdueBooks: number;
  totalUsers: number;
  topCategories: { category: string; count: number }[];
  recentActivities: Activity[];
}