// ============================================================
// Home Page — DevOpsX Learning Platform (Reference Design)
// ============================================================

// NOTE — why things are commented out on this page:
// The home page had grown too long and too "loud". We want a short, simple
// page where most of the content fits on one screen without heavy scrolling.
// So the extra marketing blocks are parked (not deleted) and can be restored
// by simply un-commenting them:
//   • SubscriptionBanner — "Unlimited Learning. Unlimited Possibilities." +
//     the subscription plans / pricing pitch. Commented out because we are
//     not pushing subscriptions on the landing page for now.
//   • TrustedBy, ExploreCategories, Testimonials, Newsletter — already parked
//     earlier for the same reason.

import Hero from '../../components/sections/Hero';
import {
  // TrustedBy,          // commented out — "Trusted by Learners" section hidden
  // ExploreCategories,  // commented out — "Explore Top Categories" section hidden
  FeaturedBooksAndCourses,
  // SubscriptionBanner, // commented out — "Unlimited Learning" / subscription pitch hidden (see note above)
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
      {/* Commented out — "Unlimited Learning. Unlimited Possibilities." subscription
          banner. Reason: keeping the landing page short/simple and not pushing
          subscription plans here for now. Un-comment to bring it back. */}
      {/* <SubscriptionBanner /> */}
      {/* <Testimonials /> */}
      <FAQ />
      {/* <Newsletter /> */}
    </main>
  );
}
