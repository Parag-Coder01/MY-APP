export type UserRole =
  | 'student'
  | 'parent'
  | 'school'
  | 'educator'
  | 'customer'
  | 'other';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  institution?: string;
  grade?: string;
  city?: string;
  enrolledCoursesCount: number;
  completedProjectsCount: number;
  certificatesCount: number;
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'lab' | 'quiz' | 'project';
  completed?: boolean;
}

export interface Course {
  id: string;
  title: string;
  category:
    | 'Robotics'
    | 'Arduino'
    | 'IoT'
    | 'Artificial Intelligence'
    | 'Machine Learning'
    | 'Programming'
    | 'Electronics'
    | 'STEM'
    | 'Embedded Systems';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  instructor: string;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  image: string;
  description: string;
  progress?: number;
  isPopular?: boolean;
  curriculum: Array<{
    moduleTitle: string;
    lessons: CourseLesson[];
  }>;
  projects: string[];
  requirements: string[];
  certificateProvided: boolean;
  lessonsCount?: number;
}

export interface Product {
  id: string;
  name: string;
  category:
    | 'Arduino Kits'
    | 'Robotics Kits'
    | 'IoT Modules'
    | 'Sensors'
    | 'AI Learning Kits'
    | 'Components'
    | 'Accessories';
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  inStock: boolean;
  description: string;
  specifications: Record<string, string>;
  whatsIncluded: string[];
  learningResources: string[];
  includes?: string[];
  specs?: Record<string, string>;
  compatibleProjects?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  createdAt: string;
  expectedDelivery: string;
  shippingAddress: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
}

export interface Workshop {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  mode: 'online' | 'offline' | 'school' | string;
  ageGroup: string;
  seatsTotal: number;
  seatsLeft: number;
  price: number;
  image: string;
  instructor: string;
  description: string;
  syllabus: string[];
  requirements: string[];
  venue: string;
  certificate: boolean;
  isFlagship?: boolean;
  fee?: number;
  targetAudience?: string;
  registrationStatus?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Robotics' | 'AI' | 'IoT' | 'Arduino' | 'Electronics';
  image: string;
  description: string;
  components: string[];
  skillsLearned: string[];
  estimatedHours: string;
  circuitType: string;
  title?: string;
  skills?: string[];
}

export interface CertificateItem {
  id: string;
  certificateId: string;
  title: string;
  studentName: string;
  issueDate: string;
  type: 'Course Completion' | 'Workshop Excellence' | 'Innovation Hackathon' | string;
  score?: string;
  instructor: string;
  verified: boolean;
  verificationUrl?: string;
}

export type Certificate = CertificateItem;

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category?: 'courses' | 'workshops' | 'orders' | 'announcements' | 'mentor' | string;
  time?: string;
  timestamp?: string;
  read: boolean;
  actionUrl?: string;
  type?: 'workshop' | 'order' | 'certificate' | 'system' | string;
}

export type AppNotification = NotificationItem;

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  codeSnippet?: string;
  imagePreview?: string;
  suggestedActions?: string[];
}

export type MainTab = 'home' | 'learn' | 'store' | 'kms-ai' | 'profile';
export type ExtendedView =
  | 'workshops'
  | 'schools'
  | 'projects'
  | 'about'
  | 'contact'
  | 'certificates'
  | 'admin'
  | 'curriculum'
  | 'ebooks'
  | 'careers'
  | 'it-services'
  | null;
