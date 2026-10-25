// ============================================================
// Home Page — DevOpsX Learning Platform (Reference Design)
// ============================================================

// NOTE — why everything except the Hero is commented out on this page:
// The home page had grown too long and too "loud". The brief is a short, simple
// landing page that fits on one screen without heavy scrolling, so every extra
// marketing block is parked (NOT deleted) and comes back by un-commenting it:
//
//   • FeaturedBooksAndCourses — the "Featured Books & Courses" section.
//     Removed from the front page; the "Browse Books" button in the hero (and
//     the Books / Courses links in the navbar) already cover that journey.
//   • FAQ — "Frequently Asked Questions" grid. Removed from the front page;
//     the Contact page still carries the FAQs.
//   • SubscriptionBanner — "Unlimited Learning. Unlimited Possibilities." plus
//     the subscription plans / pricing pitch. We are not pushing subscriptions
//     on the landing page for now.
//   • TrustedBy, ExploreCategories, Testimonials, Newsletter — parked earlier
//     for the same reason.
//
// Net result: the landing page is just the Hero (headline + CTAs + preview
// video), which is what fits in a single screen.

import Hero from '../../components/sections/Hero';
// Every section below is currently unused on this page — kept as commented
// imports so re-enabling one is a two-line change (import + render).
// import {
//   TrustedBy,                // "Trusted by Learners" strip
//   ExploreCategories,        // "Explore Top Categories"
//   FeaturedBooksAndCourses,  // "Featured Books & Courses"
//   SubscriptionBanner,       // "Unlimited Learning" / subscription pitch
//   Testimonials,             // "What Our Learners Say"
//   FAQ,                      // "Frequently Asked Questions"
//   Newsletter,               // "Stay Updated" banner
// } from '../../components/sections/HomeSections';

export default function Home() {
  return (
    // flex column + flex:1 so the Hero stretches to fill the viewport instead
    // of leaving a blank strip above the footer (MainLayout's <main> is a flex
    // column). Plain <div>, not <main> — MainLayout already renders a <main>.
    <div style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
      <Hero />
      {/* <TrustedBy /> */}
      {/* <ExploreCategories /> */}
      {/* <FeaturedBooksAndCourses /> */}
      {/* <SubscriptionBanner /> */}
      {/* <Testimonials /> */}
      {/* <FAQ /> */}
      {/* <Newsletter /> */}
    </div>
  );
}
