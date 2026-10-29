/* Discipleship resource manifest for /resources, built from the table of contents of
   "Growing With Christ — Discipleship Binder (ALL) - 2025.pdf" (75 PDF pages).

   Publication gate: the binder contains third-party and adapted material, so a file is only linked
   once its status is "cleared"; anything else shows an honest "pending permission" state instead
   of a link. Public redistribution was cleared by the site owner on 2026-10-29 (see CLEARANCE).
   The PDFs under public/resources/pdfs/2025/ were cut from the original binder without editing:
   each section, tool and the plan keeps its complete original pages and ends with the binder's
   credits page (PDF page 75). The full binder is a byte-identical copy of the source file.

   Page numbers: the printed page labels in the binder run one behind the PDF viewer, so
   PDF page = printed page + 1. Each tool runs from its heading to the page before the next one.
   Ranges, titles and descriptions were checked against the 2025 binder's text and page images
   (SHA-256 below). Titles follow the binder's table of contents. */

export type PublicationStatus = "pending-permission" | "cleared";

export type PageRange = { start: number; end: number };

export type SectionId = "evangelize" | "establish" | "equip" | "empower";

export type ResourceFile = {
  /** Planned path under /public, e.g. "/resources/pdfs/2025/evangelize.pdf". */
  path: string;
  /** Only "cleared" files are linked. */
  status: PublicationStatus;
};

export type Resource = {
  id: string;
  section: SectionId;
  /** Position within its section, in binder order (1-based). */
  order: number;
  /** Title as printed in the binder's table of contents. */
  title: string;
  /** Short description, written from the tool's own pages. */
  description: string | null;
  /** Source credit printed on the tool's pages, if it adapts someone else's material. */
  credit: string | null;
  /** Page labels printed in the binder. */
  printedPages: PageRange;
  /** Physical pages in the PDF viewer. */
  pdfPages: PageRange;
  file: ResourceFile;
};

export type ResourceSection = {
  id: SectionId;
  order: number;
  title: string;
  overview: string;
  /** Physical PDF pages, including the section cover. */
  pdfPages: PageRange;
  file: ResourceFile;
  resources: Resource[];
};

const DIR = "/resources/pdfs/2025";
/** Who cleared the PDFs for public redistribution, and when. */
export const CLEARANCE = { by: "Site owner", on: "2026-10-29" };

const cleared = (path: string): ResourceFile => ({ path, status: "cleared" });
const slug = (s: string) =>
  s.toLowerCase().replace(/[’'.]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

type Tool = [title: string, printedStart: number, description: string, credit?: string];

/** Builds a section's tools from [title, first printed page, description, credit] in binder order. Each tool ends on the
    page before the next tool; the last tool ends on the section's last page. */
function section(
  id: SectionId,
  order: number,
  title: string,
  overview: string,
  pdfPages: PageRange,
  tools: Tool[],
): ResourceSection {
  const lastPrinted = pdfPages.end - 1;
  return {
    id,
    order,
    title,
    overview,
    pdfPages,
    file: cleared(`${DIR}/${id}.pdf`),
    resources: tools.map(([toolTitle, start, description, credit], i) => {
      const end = i + 1 < tools.length ? tools[i + 1][1] - 1 : lastPrinted;
      return {
        id: `${id}-${slug(toolTitle)}`,
        section: id,
        order: i + 1,
        title: toolTitle,
        description,
        credit: credit ?? null,
        printedPages: { start, end },
        pdfPages: { start: start + 1, end: end + 1 },
        file: cleared(`${DIR}/${id}/${slug(toolTitle)}.pdf`),
      };
    }),
  };
}

export const BINDER = {
  title: "Growing With Christ",
  edition: "2025 edition",
  sourceFile: "Growing With Christ — Discipleship Binder (ALL) - 2025.pdf",
  /** SHA-256 of the copy the ranges were checked against. Exports must come from this exact file. */
  sourceSha256: "9617f6d20ec236454c90ea33f781773eb97fa50cb5f2c89c578ebef925cffed5",
  pdfPages: { start: 1, end: 75 },
  rangesVerified: true,
  /** Paraphrase of the binder's last page (PDF page 75). */
  credits:
    "Made by University of Arizona Navigators staff in 2020, last updated in 2025, and meant to be shared. Please don’t reproduce it for profit.",
  /** Download size of the full binder, shown beside its link. */
  size: "26 MB",
  file: cleared(`${DIR}/growing-with-christ-full.pdf`),
};

/** Standalone discipleship plan worksheet (Life, Word, Mission, Prayer). */
export const MEETING_PLAN = {
  title: "Discipleship plan",
  printedPages: { start: 4, end: 4 },
  pdfPages: { start: 5, end: 5 },
  file: cleared(`${DIR}/discipleship-plan.pdf`),
};

/** The four sections in the binder's original order. The binder says the tools can be used in any order. */
export const RESOURCE_SECTIONS: ResourceSection[] = [
  section("evangelize", 1, "Evangelize",
    "For people who don’t know Jesus yet, or haven’t made Him Lord of their life.",
    { start: 6, end: 16 },
    [
      ["Three Circles", 6, "A simple drawing of God’s design, our brokenness, and the way back through Jesus.", "Adapted from #noplaceleft"],
      ["Who Sits on the Throne", 7, "Galatians 2:20 and the question of who is really in charge of your life.", "Adapted from Four Spiritual Laws"],
      ["One Verse Bridge", 8, "Romans 6:23, one word at a time, to explain the gospel.", "One-Verse Evangelism by Randy D. Raysbrook, © 2000"],
      ["Gospel Appointment", 9, "Life without the Shepherd set beside the life Psalm 23 describes.", "Adapted from UCSD Navigators"],
      ["Gospel vs. Religion", 11, "Grace compared with self-effort, with Ephesians 2:4–10."],
      ["The Well", 13, "Jeremiah 2:13 and where we go looking for life."],
      ["Five Assurances of Faith", 14, "Five promises from Scripture that are true of every believer.", "Adapted from the Growing with Christ series"],
      ["My Heart Christ’s Home", 15, "Discussion questions on Robert Munger’s story about giving Jesus every room.", "Adapted from My Heart, Christ’s Home by Robert Munger"],
    ]),
  section("establish", 2, "Establish",
    "For people learning what it looks like to be a disciple of Jesus. A good place to start if you aren’t sure.",
    { start: 17, end: 35 },
    [
      ["The Wheel", 17, "A picture of a Christ-centered life and how each part relates."],
      ["The Word Hand", 18, "Five ways to take in the Bible, from hearing to meditating."],
      ["Daily Time with God", 19, "How to begin meeting with God each day in His Word."],
      ["Inductive Bible Study", 20, "Observation, interpretation, and application for studying a passage.", "Adapted from Discipleship Journal, Issue 90, and Facts of the Matter by Dwight Hill"],
      ["Memorize God’s Word", 21, "Why to memorize Scripture, how to start, and the Topical Memory System verses.", "Topical Memory System (TMS) by NavPress"],
      ["A.C.T.S. Prayer Tool", 23, "Adoration, confession, thanksgiving, and supplication as a way into prayer."],
      ["Prayer Map", 24, "Map the people around you who don’t know Jesus yet, then pray for them."],
      ["Identity in Christ", 25, "The woman at the well in John 4 and the question of who we are."],
      ["Tyranny of the Urgent", 26, "Questions on Charles Hummel’s article about what’s urgent and what’s important.", "Adapted from Tyranny of the Urgent by Charles Hummel"],
      ["Fasting in Scripture", 27, "What the Bible says about fasting and how to make it part of your life."],
      ["Developing a Heart for the Lost", 28, "Psalm 23 read from the point of view of someone without the Shepherd."],
      ["Sharing Your Testimony", 29, "Tell your story so that Jesus and His gospel are at the center."],
      ["God’s Heart for the Nations", 30, "The state of God’s world and five habits for joining His global work."],
      ["Becoming a Servant", 32, "Mark 10:45 and what it looks like to serve rather than be served."],
      ["Building Friendships", 33, "The “one another” passages as the basis for biblical friendship."],
      ["Solomon on Social Media", 34, "Proverbs applied to posting, sharing, and scrolling."],
    ]),
  section("equip", 3, "Equip",
    "For disciples who know how to go to Jesus for themselves and are ready to pass that on. The binder suggests starting here once someone is taking personal responsibility for the Great Commission.",
    { start: 36, end: 54 },
    [
      ["You Can Make Disciples: The Archer", 36, "Five passages, pictured as an archer, for anyone who doesn’t feel qualified."],
      ["Born to Reproduce", 37, "2 Timothy 2:2 and the four generations in a single verse.", "Adapted from the Growing with Christ series"],
      ["The Need of the Hour", 38, "Navigators founder Dawson Trotman on Jeremiah 33:3.", "Adapted from The Need of the Hour by Dawson Trotman"],
      ["The Discipleship Process: The 4 E’s", 39, "The stages of discipleship, and where you and others are in them.", "Adapted from the Process Illustration"],
      ["Jesus and Discipleship", 40, "How Jesus made disciples, from the Gospels, with principles to follow."],
      ["Discipleship 101", 41, "What discipleship is, and what we’re building when we disciple someone."],
      ["Master Builder: The Wheel", 43, "Using the Wheel to see where someone needs to grow, and a plan to walk through it."],
      ["Discipleship Blueprint", 44, "A month-by-month plan of themes and next steps across a school year."],
      ["Building Well: Values Over Beliefs", 45, "1 Corinthians 3 and building on values rooted in Jesus, not just behaviors."],
      ["Relational Evangelism: P.A.L.S.", 47, "Matthew 4:19 and sharing Jesus through everyday relationships."],
      ["Gospel Fluency", 48, "Relating the gospel to everyday life and to the way others think."],
      ["Spending Extended Time with the Father", 49, "How to plan a longer, unhurried time with God, and what to bring."],
      ["Praying the Promises", 51, "Pleading God’s promises back to Him in prayer.", "Adapted from Praying Over God’s Promises by Tom Yeakley, used with permission of NavPress"],
      ["Your Place in Missions", 53, "Scripture on God’s heart for all nations, and where you fit in.", "Adapted from Your Place in Missions by Mark Stebbins"],
    ]),
  section("empower", 4, "Empower",
    "For disciples ready for a lifetime of laboring, raising up disciplemakers wherever they live, work, or play.",
    { start: 55, end: 74 },
    [
      ["Five Marks of a Disciplemaker", 55, "Five marks of a disciplemaker, starting with a passion for Jesus and a life lived from Scripture."],
      ["Many Aspire, Few Attain", 56, "2 Timothy 4:7–8 and what helps a disciple finish well."],
      ["Disciplemaking Communities", 57, "1 Thessalonians read as “all of you”: making disciples together."],
      ["Decision Making", 58, "Surrendering to God’s will as the key to any decision.", "Adapted from Tom Yeakley"],
      ["Memorial Stones", 59, "Trace the people, events, and circumstances God has used to shape you.", "Adapted from The Navigators TDC team"],
      ["Persevering in Fellowship", 61, "Staying rooted in the body of Christ as seasons of life change."],
      ["Alongsider: Life-to-Life Discipleship", 62, "How Jesus and Paul walked alongside a few people.", "Excerpt from The Ways of the Alongsider: Growing Disciples Life to Life by Bill Mowry, used with permission of NavPress"],
      ["Thirty Days of Praying: Neighborhood", 63, "A day-by-day guide to prayer-walking your neighborhood."],
      ["Share God’s Love with Your Neighbors", 65, "Practical ways to love your neighbors as yourself."],
      ["3D Gospel", 66, "How one gospel speaks to guilt, shame, and fear.", "Adapted from The 3D Gospel by Jayson Georges"],
      ["Thirty Days of Praying: Names of God", 67, "Thirty names and attributes of God to pray through."],
      ["Doing Good", 69, "Matthew 5:14–16 and the good works God prepared for us.", "Adapted from Doing Good by Craig Parker"],
      ["The Great Tithing Misunderstanding", 70, "What Scripture says about giving, beyond 10 percent.", "Adapted from The Great Tithing Misunderstanding by Scott Morton"],
      ["Sabbath", 71, "A short study introducing a weekly day of rest.", "Adapted from Margaret and Roy Fitzwater’s Sabbath Bible Study"],
      ["Identity: Being Over Doing", 72, "Who we are to God before anything we do: beloved, child, friend, co-laborer."],
      ["The Common Rule", 73, "Daily and weekly habits for loving God and neighbor.", "Adapted from The Common Rule by Justin Whitmel Earley"],
    ]),
];

/** The public URL for a file, or null while it is not cleared for redistribution. */
export function publishedHref(file: ResourceFile): string | null {
  return file.status === "cleared" ? file.path : null;
}
