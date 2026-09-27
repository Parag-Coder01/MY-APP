import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingModal } from './components/OnboardingModal';
import { AuthModal } from './components/AuthModal';
import { ManageProfileModal } from './components/ManageProfileModal';
import { TopHeader } from './components/TopHeader';
import { BottomNavigation } from './components/BottomNavigation';
import { QuickMenuDrawer } from './components/QuickMenuDrawer';
import { HomeView } from './components/HomeView';
import { LearnView } from './components/LearnView';
import { CourseDetailModal } from './components/CourseDetailModal';
import { StoreView } from './components/StoreView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { KmsAiView } from './components/KmsAiView';
import { WorkshopsView } from './components/WorkshopsView';
import { SchoolSectionView } from './components/SchoolSectionView';
import { ProjectsView } from './components/ProjectsView';
import { CertificatesView } from './components/CertificatesView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { CurriculumView } from './components/CurriculumView';
import { EBooksView } from './components/EBooksView';
import { CareersView } from './components/CareersView';
import { ITServicesView } from './components/ITServicesView';
import { StudentDashboardModal } from './components/StudentDashboardModal';
import { NotificationsModal } from './components/NotificationsModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { ProfileView } from './components/ProfileView';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { Footer } from './components/Footer';
import { OfflineBanner } from './components/OfflineBanner';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ArrowLeft, Menu, Sparkles } from 'lucide-react';
import {
  MainTab,
  ExtendedView,
  Course,
  Product,
  CartItem,
  UserProfile,
} from './types';
import {
  MOCK_COURSES,
  MOCK_PRODUCTS,
  MOCK_WORKSHOPS,
  MOCK_USER,
  MOCK_NOTIFICATIONS,
} from './data/mockData';

function AppContent() {
  const { isDark, toggleTheme } = useTheme();

  // Splash & Onboarding states
  const [showSplash, setShowSplash] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Navigation states
  const [currentTab, setCurrentTab] = useState<MainTab>('home');
  const [extendedView, setExtendedView] = useState<ExtendedView | null>(null);

  // User & Data states with persistent local session
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('kite_user_session');
      if (saved) return JSON.parse(saved);
    } catch {}
    return MOCK_USER;
  });

  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [workshops] = useState(MOCK_WORKSHOPS);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  // E-commerce cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: MOCK_PRODUCTS[0], quantity: 1 },
  ]);

  // Modals & Auth State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalInitialMode, setAuthModalInitialMode] = useState<'login' | 'signup'>('login');
  const [showManageProfileModal, setShowManageProfileModal] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showStudentDashboard, setShowStudentDashboard] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  // Login & Logout management
  const isLoggedIn = user.id !== 'guest';

  const handleLoginSuccess = (loggedUser: UserProfile) => {
    setUser(loggedUser);
    try {
      localStorage.setItem('kite_user_session', JSON.stringify(loggedUser));
    } catch {}
    setShowAuthModal(false);
    setExtendedView(null);
    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: `Welcome, ${loggedUser.name}!`,
        message: `Logged in successfully as ${loggedUser.role}.`,
        time: 'Just now',
        read: false,
        type: 'account',
      },
      ...prev,
    ]);
  };

  const handleLogout = () => {
    setUser(MOCK_USER);
    try {
      localStorage.removeItem('kite_user_session');
    } catch {}
    setShowQuickMenu(false);
    setShowManageProfileModal(false);
    setShowStudentDashboard(false);
    setShowAdminDashboard(false);
    setExtendedView(null);
    setCurrentTab('home');
  };

  // Cart operations
  const handleAddToCart = (product: Product, qty: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    setShowCartDrawer(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  // Course enrollment
  const handleEnrollCourse = (course: Course) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === course.id ? { ...c, enrolled: true, progress: 5 } : c))
    );
    setSelectedCourse(null);
    setNotifications((prev) => [
      {
        id: `enr_${Date.now()}`,
        title: 'Course Enrolled! 🚀',
        message: `You are now enrolled in ${course.title}. Start lesson 1 now!`,
        time: 'Just now',
        read: false,
        type: 'course',
      },
      ...prev,
    ]);
    setShowStudentDashboard(true);
  };

  // Workshop Registration
  const handleRegisterWorkshop = (workshopTitle: string) => {
    setNotifications((prev) => [
      {
        id: `ws_${Date.now()}`,
        title: 'Workshop Registration Confirmed 🎟️',
        message: `You have successfully reserved your seat for ${workshopTitle}. Check your email for venue pass.`,
        time: 'Just now',
        read: false,
        type: 'event',
      },
      ...prev,
    ]);
  };

  // Direct checkout handler
  const handleBuyNow = (product: Product) => {
    handleAddToCart(product, 1);
    setSelectedProduct(null);
    setShowCartDrawer(false);
    setShowCheckoutModal(true);
  };

  // Handle Tab navigation
  const handleSelectTab = (tab: MainTab) => {
    setExtendedView(null);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectExtendedView = (view: ExtendedView) => {
    setExtendedView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render view router
  const renderActiveView = () => {
    if (extendedView) {
      switch (extendedView) {
        case 'workshops':
          return <WorkshopsView onRegister={handleRegisterWorkshop} />;
        case 'school-section':
          return (
            <SchoolSectionView
              onOpenContact={() => handleSelectExtendedView('contact')}
              onOpenStore={() => handleSelectTab('store')}
            />
          );
        case 'curriculum':
          return (
            <CurriculumView
              onSelectCourse={(courseId) => {
                const target = courses.find((c) => c.id === courseId);
                if (target) {
                  setSelectedCourse(target);
                } else {
                  handleSelectTab('learn');
                }
              }}
              onOpenContact={() => handleSelectExtendedView('contact')}
            />
          );
        case 'ebooks':
          return <EBooksView onOpenContact={() => handleSelectExtendedView('contact')} />;
        case 'projects':
          return <ProjectsView />;
        case 'certificates':
          return <CertificatesView />;
        case 'about':
          return <AboutView onSelectTab={handleSelectTab} />;
        case 'contact':
          return <ContactView />;
        case 'careers':
          return <CareersView />;
        case 'it-services':
          return <ITServicesView onOpenContact={() => handleSelectExtendedView('contact')} />;
        default:
          return null;
      }
    }

    switch (currentTab) {
      case 'home':
        return (
          <HomeView
            onSelectTab={handleSelectTab}
            onSelectExtendedView={handleSelectExtendedView}
            onSelectCourse={setSelectedCourse}
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onOpenAuthModal={(mode) => {
              setAuthModalInitialMode(mode || 'login');
              setShowAuthModal(true);
            }}
            courses={courses}
            products={products}
            user={user}
            onOpenInstallPrompt={() => setShowInstallPrompt(true)}
          />
        );
      case 'learn':
        return (
          <LearnView
            courses={courses}
            onSelectCourse={setSelectedCourse}
            userRole={user.role}
          />
        );
      case 'store':
        return (
          <StoreView
            products={products}
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        );
      case 'kms-ai':
        return <KmsAiView userRole={user.role} />;
      case 'profile':
        return (
          <ProfileView
            user={user}
            courses={courses}
            ordersCount={totalCartCount}
            onOpenRolePicker={() => {
              setAuthModalInitialMode('login');
              setShowAuthModal(true);
            }}
            onOpenLoginModal={() => {
              setAuthModalInitialMode('login');
              setShowAuthModal(true);
            }}
            onOpenCertificates={() => handleSelectExtendedView('certificates')}
            onOpenStudentDashboard={() => setShowStudentDashboard(true)}
            onOpenQuickMenu={() => setShowQuickMenu(true)}
            onSelectExtendedView={handleSelectExtendedView}
            onOpenInstallPrompt={() => setShowInstallPrompt(true)}
            onOpenManageProfile={() => setShowManageProfileModal(true)}
          />
        );
      default:
        return null;
    }
  };

  return (
      <div className="min-h-screen flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden max-w-[100vw] w-full">
        <OfflineBanner />

        {/* 1. Global Fixed Top Header */}
        <TopHeader
          user={user}
          cartCount={totalCartCount}
          unreadNotifsCount={unreadNotifsCount}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onOpenMenu={() => setShowQuickMenu(true)}
          onOpenCart={() => setShowCartDrawer(true)}
          onOpenNotifs={() => setShowNotificationsModal(true)}
          onOpenRolePicker={() => {
            setAuthModalInitialMode('login');
            setShowAuthModal(true);
          }}
          onOpenAuthModal={(mode) => {
            setAuthModalInitialMode(mode || 'login');
            setShowAuthModal(true);
          }}
          onOpenManageProfile={() => setShowManageProfileModal(true)}
          onSearchClick={() => handleSelectTab('learn')}
          onOpenInstallPrompt={() => setShowInstallPrompt(true)}
        />

        {/* Extended View Back Button Strip */}
        {extendedView && (
          <div
            className={`sticky top-[53px] z-30 backdrop-blur-md border-b px-4 py-2 ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'
            }`}
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <button
                onClick={() => setExtendedView(null)}
                className="flex items-center gap-2 text-xs font-mono-code text-cyan-500 dark:text-cyan-400 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Overview</span>
              </button>
              <span className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400">
                {extendedView.replace('-', ' ')}
              </span>
            </div>
          </div>
        )}

        {/* Main Routed Page Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 pt-4 pb-28">
          {renderActiveView()}



          {/* Global Comprehensive Footer */}
          <Footer
            onSelectTab={handleSelectTab}
            onSelectExtendedView={handleSelectExtendedView}
            onOpenInstallPrompt={() => setShowInstallPrompt(true)}
            isDark={isDark}
          />
        </main>

        {/* 5. Bottom Navigation Bar */}
        <BottomNavigation
          currentTab={currentTab}
          onSelectTab={handleSelectTab}
          onOpenQuickMenu={() => setShowQuickMenu(true)}
        />

        {/* Three Bars Navigation Menu Drawer */}
        <QuickMenuDrawer
          isOpen={showQuickMenu}
          onClose={() => setShowQuickMenu(false)}
          user={user}
          isLoggedIn={isLoggedIn}
          onLogin={(mode) => {
            setShowQuickMenu(false);
            setAuthModalInitialMode(mode || 'login');
            setShowAuthModal(true);
          }}
          onLogout={handleLogout}
          onOpenManageProfile={() => {
            setShowQuickMenu(false);
            setShowManageProfileModal(true);
          }}
          onSelectExtendedView={handleSelectExtendedView}
          onSelectTab={handleSelectTab}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onOpenInstallPrompt={() => {
            setShowQuickMenu(false);
            setShowInstallPrompt(true);
          }}
          onOpenStudentDashboard={() => {
            setShowQuickMenu(false);
            setShowStudentDashboard(true);
          }}
        />

        {/* Cart Drawer */}
        <CartDrawer
          isOpen={showCartDrawer}
          onClose={() => setShowCartDrawer(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onCheckout={() => {
            setShowCartDrawer(false);
            setShowCheckoutModal(true);
          }}
        />

        {/* Checkout Modal */}
        <CheckoutModal
          isOpen={showCheckoutModal}
          onClose={() => setShowCheckoutModal(false)}
          items={cartItems}
          user={user}
          onClearCart={handleClearCart}
        />

        {/* Course Detail Modal */}
        {selectedCourse && (
          <CourseDetailModal
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
            onEnroll={handleEnrollCourse}
          />
        )}

        {/* Product Detail Modal */}
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onBuyNow={handleBuyNow}
          />
        )}

        {/* Auth Modal (Login / Sign Up) */}
        <AuthModal
          isOpen={showAuthModal}
          initialMode={authModalInitialMode}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleLoginSuccess}
        />

        {/* Manage Profile Modal */}
        <ManageProfileModal
          isOpen={showManageProfileModal}
          onClose={() => setShowManageProfileModal(false)}
          user={user}
          onUpdateUser={(updated) => {
            setUser(updated);
            try {
              localStorage.setItem('kite_user_session', JSON.stringify(updated));
            } catch {}
          }}
        />

        {/* Student LMS Dashboard Modal */}
        <StudentDashboardModal
          isOpen={showStudentDashboard}
          onClose={() => setShowStudentDashboard(false)}
          user={user}
          courses={courses}
        />

        {/* Notifications Modal */}
        <NotificationsModal
          isOpen={showNotificationsModal}
          onClose={() => setShowNotificationsModal(false)}
          notifications={notifications}
          onMarkAllAsRead={() => {
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
          }}
          onClearNotification={(id) => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
          }}
        />

        {/* Admin Dashboard Modal */}
        <AdminDashboardModal
          isOpen={showAdminDashboard}
          onClose={() => setShowAdminDashboard(false)}
        />

        {/* SplashScreen */}
        <SplashScreen
          isOpen={showSplash}
          onFinish={() => {
            setShowSplash(false);
            const seen = localStorage.getItem('kite_seen_onboarding');
            if (!seen) {
              setShowOnboarding(true);
            }
          }}
        />

        {/* First time Onboarding Walkthrough */}
        <OnboardingModal
          isOpen={showOnboarding}
          onClose={() => {
            setShowOnboarding(false);
            try {
              localStorage.setItem('kite_seen_onboarding', 'true');
            } catch {}
          }}
        />

        {/* PWA Mobile App Install Prompt Modal */}
        <PWAInstallPrompt
          isOpen={showInstallPrompt}
          onClose={() => setShowInstallPrompt(false)}
        />
      </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
