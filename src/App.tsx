import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingModal } from './components/OnboardingModal';
import { AuthModal } from './components/AuthModal';
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
import { StudentDashboardModal } from './components/StudentDashboardModal';
import { NotificationsModal } from './components/NotificationsModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { ProfileView } from './components/ProfileView';
import { MobileAppFrame } from './components/MobileAppFrame';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { OfflineBanner } from './components/OfflineBanner';
import { ArrowLeft, Menu, Sparkles } from 'lucide-react';
import {
  MainTab,
  ExtendedView,
  Course,
  Product,
  CartItem,
  UserProfile,
  UserRole,
} from './types';
import {
  MOCK_COURSES,
  MOCK_PRODUCTS,
  MOCK_WORKSHOPS,
  MOCK_USER,
  MOCK_NOTIFICATIONS,
} from './data/mockData';

export default function App() {
  // Splash & Onboarding states
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Navigation states
  const [currentTab, setCurrentTab] = useState<MainTab>('home');
  const [extendedView, setExtendedView] = useState<ExtendedView | null>(null);

  // User & Data states
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [workshops] = useState(MOCK_WORKSHOPS);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  // E-commerce cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: MOCK_PRODUCTS[0], quantity: 1 },
  ]);

  // Modals
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showStudentDashboard, setShowStudentDashboard] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleBuyNow = (product: Product) => {
    handleAddToCart(product);
    setShowCheckoutModal(true);
  };

  const handleOrderSuccess = (orderId: string) => {
    setCartItems([]);
    setNotifications((prev) => [
      {
        id: 'order-' + Date.now(),
        title: 'Hardware Order Confirmed',
        message: `Order #${orderId} has been confirmed and scheduled for dispatch.`,
        time: 'Just now',
        timestamp: 'Just now',
        read: false,
        type: 'order',
        category: 'orders',
      },
      ...prev,
    ]);
  };

  const handleMarkAllNotifsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleSelectTab = (tab: MainTab) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(12);
      }
    } catch (e) {
      // Ignore haptic feedback errors
    }
    setExtendedView(null);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectExtendedView = (view: ExtendedView) => {
    if (view === 'admin') {
      setShowAdminDashboard(true);
    } else {
      setExtendedView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEnrollOrContinueCourse = (course: Course) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === course.id
          ? { ...c, progress: c.progress ? Math.min(100, c.progress + 15) : 10 }
          : c
      )
    );
  };

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;
  const cartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <MobileAppFrame onOpenInstallPrompt={() => setShowInstallPrompt(true)}>
      <div className="min-h-full bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 pb-20">
        <OfflineBanner />

        {/* 1. Splash Screen Animation */}
        <AnimatePresence>
          {showSplash && (
            <SplashScreen onFinish={() => setShowSplash(false)} />
          )}
        </AnimatePresence>

        {/* 2. Onboarding Modal Flow */}
        <OnboardingModal
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          onGetStarted={() => setShowOnboarding(false)}
          onOpenLogin={() => {
            setShowOnboarding(false);
            setShowAuthModal(true);
          }}
        />

        {/* 3. Authentication & Role Switcher Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          currentUser={user}
          onLoginSuccess={(updatedUser) => {
            setUser(updatedUser);
          }}
        />

        {/* 4. Top Header Bar */}
        <TopHeader
          user={user}
          cartCount={cartCount}
          unreadNotifsCount={unreadNotifsCount}
          onOpenCart={() => setShowCartDrawer(true)}
          onOpenNotifs={() => setShowNotificationsModal(true)}
          onOpenRolePicker={() => setShowAuthModal(true)}
          onSearchClick={() => handleSelectTab('learn')}
          onOpenInstallPrompt={() => setShowInstallPrompt(true)}
        />

      {/* Extended View Back Button Strip (if inside Workshops, Schools, Projects, etc.) */}
      {extendedView && (
        <div className="sticky top-[53px] z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setExtendedView(null)}
              className="flex items-center gap-2 text-xs font-mono-code text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-code uppercase text-slate-400">
                Viewing: <strong className="text-slate-200">{extendedView}</strong>
              </span>
              <button
                onClick={() => setShowQuickMenu(true)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
                title="Open Ecosystem Menu"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3.5 sm:px-6 pt-4 sm:pt-6 pb-20">
        {/* Render Extended Views */}
        {extendedView === 'workshops' && (
          <WorkshopsView workshops={workshops} />
        )}
        {extendedView === 'schools' && (
          <SchoolSectionView />
        )}
        {extendedView === 'projects' && (
          <ProjectsView />
        )}
        {extendedView === 'certificates' && (
          <CertificatesView user={user} />
        )}
        {extendedView === 'about' && (
          <AboutView onContactClick={() => setExtendedView('contact')} />
        )}
        {extendedView === 'contact' && (
          <ContactView />
        )}

        {/* Render Primary Tabs when no Extended View is active */}
        {!extendedView && (
          <>
            {currentTab === 'home' && (
              <HomeView
                user={user}
                courses={courses}
                products={products}
                onSelectTab={handleSelectTab}
                onSelectExtendedView={handleSelectExtendedView}
                onSelectCourse={(course) => setSelectedCourse(course)}
                onSelectProduct={(product) => setSelectedProduct(product)}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onOpenStudentDashboard={() => setShowStudentDashboard(true)}
              />
            )}

            {currentTab === 'learn' && (
              <LearnView
                courses={courses}
                onSelectCourse={(course) => setSelectedCourse(course)}
              />
            )}

            {currentTab === 'store' && (
              <StoreView
                products={products}
                onSelectProduct={(product) => setSelectedProduct(product)}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            )}

            {currentTab === 'kms-ai' && (
              <KmsAiView />
            )}

            {currentTab === 'profile' && (
              <ProfileView
                user={user}
                courses={courses}
                ordersCount={1}
                onOpenRolePicker={() => setShowAuthModal(true)}
                onOpenLoginModal={() => setShowAuthModal(true)}
                onOpenCertificates={() => setExtendedView('certificates')}
                onOpenStudentDashboard={() => setShowStudentDashboard(true)}
                onOpenQuickMenu={() => setShowQuickMenu(true)}
                onSelectExtendedView={handleSelectExtendedView}
                onOpenInstallPrompt={() => setShowInstallPrompt(true)}
              />
            )}
          </>
        )}
      </main>

      {/* 5. Bottom Navigation Bar */}
      <BottomNavigation
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenQuickMenu={() => setShowQuickMenu(true)}
      />

      {/* Modals & Drawers */}
      <QuickMenuDrawer
        isOpen={showQuickMenu}
        onClose={() => setShowQuickMenu(false)}
        onSelectExtendedView={handleSelectExtendedView}
        onOpenInstallPrompt={() => setShowInstallPrompt(true)}
      />

      <CartDrawer
        isOpen={showCartDrawer}
        onClose={() => setShowCartDrawer(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setShowCheckoutModal(true)}
      />

      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        cartItems={cartItems}
        user={user}
        onOrderSuccess={handleOrderSuccess}
      />

      <CourseDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onEnrollOrContinue={handleEnrollOrContinueCourse}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <StudentDashboardModal
        isOpen={showStudentDashboard}
        onClose={() => setShowStudentDashboard(false)}
        user={user}
        courses={courses}
        workshops={workshops}
        onSelectCourse={(c) => setSelectedCourse(c)}
        onOpenCertificates={() => setExtendedView('certificates')}
      />

      <NotificationsModal
        isOpen={showNotificationsModal}
        onClose={() => setShowNotificationsModal(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotifsRead}
      />

      <AdminDashboardModal
        isOpen={showAdminDashboard}
        onClose={() => setShowAdminDashboard(false)}
      />

      <PWAInstallPrompt
        isOpen={showInstallPrompt}
        onClose={() => setShowInstallPrompt(false)}
      />
    </div>
  </MobileAppFrame>
  );
}
