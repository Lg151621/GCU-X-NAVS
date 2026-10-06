/* Site content that is likely to change. Later this can come from a CMS or database. */

/** Navigators staff giving page. Swap for the Kessners' direct page when available. */
export const givingUrl = "https://donations.navigators.org/s/support-staff/";

export type Photo = {
  /** Path under /public, e.g. "/images/gallery/photo-01.jpg". null shows the purple tint placeholder. */
  src: string | null;
  alt: string;
  label: string;
  tag: string;
  /** Placeholder background used while src is null. */
  tint?: string;
};

/* Photos for the spiral, in display order (1200 × 800 each). */
export const PHOTOS: Photo[] = [
  { src: "/images/gallery/photo-01-group-sign.jpg",     alt: "Navs students together in front of a camp sign",     label: "Fall-Con",           tag: "Life together" },
  { src: "/images/gallery/photo-02-bible-study.jpg",    alt: "Students gathered in a living room for Bible study", label: "In the Word",        tag: "Bible study" },
  { src: "/images/gallery/photo-03-asu-outreach.jpg",   alt: "Students walking across a street in Tempe at sunset", label: "ASU Evangelism",         tag: "ASU outreach" },
  { src: "/images/gallery/photo-04-backyard-night.jpg", alt: "Students gathered in a backyard under string lights", label: "Gathered",          tag: "Community" },
  { src: "/images/gallery/photo-05-forest-selfie.jpg",  alt: "Four friends smiling in a pine forest",              label: "Staff",         tag: "Adventures" },
  { src: "/images/gallery/photo-07-discussion.jpg",     alt: "Guys sitting in a circle talking with Bibles open",  label: "Iron sharpens iron", tag: "Brotherhood" },
  { src: "/images/gallery/photo-08-study-night.jpg",    alt: "A full living room of students reading together",   label: "Study night",        tag: "Growing together" },
  { src: "/images/gallery/photo-09-couch.jpg",          alt: "Five friends laughing on a couch",                   label: "TUFF",           tag: "Doing life together" },
];

export type StaffMember = {
  role: string;
  name: string;
  /** Path under /public */
  photo: string;
  alt: string;
  /** CSS object-position for the photo crop */
  position: string;
  /** Empty shows the bio placeholder */
  bio: string;
};

export const staffVerse = {
  ref: "Romans 6:23",
  lead: "For the wages of sin is death, but the free gift of God is",
  emphasis: "eternal life in Christ Jesus our Lord.",
};

/* Order = left, middle, right panel in the Staff split card. */
export const staff: StaffMember[] = [
  { role: "Directors", name: "Cameron & Emma Kessner", photo: "/images/staff/staff-photo-3.jpeg",
    alt: "Cameron and Emma Kessner, directors of Navigators at GCU", position: "25% 35%", bio: "" },
  { role: "Staff", name: "Emily Parviz", photo: "/images/staff/staff-photo-1.jpg",
    alt: "Emily Parviz, Navigators staff at GCU", position: "50% 30%", bio: "" },
  { role: "Staff", name: "Elyse LaVallee", photo: "/images/staff/staff-photo-2.jpeg",
    alt: "Elyse LaVallee, Navigators staff at GCU", position: "50% 30%", bio: "" },
];

export type ContactWay = {
  title: string;
  value: string;
  description: string;
  copyLabel: string;
};

export type GroupChat = {
  /** QR code image under /public, e.g. "/images/groupme-qr.png". null shows a placeholder tile. */
  qr: string | null;
  /** GroupMe share link. null hides the "Join GroupMe" button. */
  url: string | null;
};

export const GROUP_CHAT: GroupChat = { qr: "/images/groupme-qr.png", url: null };

export const STAFF_EMAIL: ContactWay = {
  title: "Email the staff",
  value: "Cameron.kessner@navigators.org",
  description: "Questions about Navs, for students or parents.",
  copyLabel: "Copy email",
};
