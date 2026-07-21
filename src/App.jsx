import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CookieConsent from './components/layout/CookieConsent'
import ChatWidget from './components/layout/ChatWidget'

import Hero from './components/sections/Hero'
import CategoryGrid from './components/sections/CategoryGrid'
import VendorGrid from './components/sections/VendorGrid'
import TestimonialTicker from './components/sections/TestimonialTicker'
import HowItWorks from './components/sections/HowItWorks'
import BlogSection from './components/sections/BlogSection'
import ListBusinessCTA from './components/sections/ListBusinessCTA'

import AuthModal from './components/modals/AuthModal'
import CategoryModal from './components/modals/CategoryModal'
import BlogModal from './components/modals/BlogModal'
import SavedVendorsModal from './components/modals/SavedVendorsModal'
import BookingsModal from './components/modals/BookingsModal'
import ProfileModal from './components/modals/ProfileModal'
import BusinessOnboardingModal from './components/modals/BusinessOnboardingModal'
import LegalModal from './components/modals/LegalModal'

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <CategoryGrid />
        <VendorGrid />
        <TestimonialTicker />
        <HowItWorks />
        <BlogSection />
        <ListBusinessCTA />
      </main>

      <Footer />

      {/* Floating widgets */}
      <CookieConsent />
      <ChatWidget />

      {/* Modals — each reads activeModal from context and no-ops when closed */}
      <AuthModal />
      <CategoryModal />
      <BlogModal />
      <SavedVendorsModal />
      <BookingsModal />
      <ProfileModal />
      <BusinessOnboardingModal />
      <LegalModal />
    </>
  )
}
