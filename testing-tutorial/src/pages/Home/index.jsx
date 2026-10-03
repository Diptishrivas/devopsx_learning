// ============================================================
// Home Page — DevOpsX Learning Platform (Reference Design)
// ============================================================

import Hero from '../../components/sections/Hero';
import {
  // TrustedBy,          // commented out — "Trusted by Learners" section hidden
  // ExploreCategories,  // commented out — "Explore Top Categories" section hidden
  FeaturedBooksAndCourses,
  SubscriptionBanner,
  // Testimonials,       // commented out — "What Our Learners Say" reviews section hidden
  FAQ,
  // Newsletter,        // commented out — "Stay Updated" banner hidden (footer has its own subscribe box)
} from '../../components/sections/HomeSections';

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <TrustedBy /> */}
      {/* <ExploreCategories /> */}
      <FeaturedBooksAndCourses />
      <SubscriptionBanner />
      {/* <Testimonials /> */}
      <FAQ />
      {/* <Newsletter /> */}
    </main>
  );
}
