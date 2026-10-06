# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: new or curious Grand Canyon University students, mostly freshmen and students looking for a faith community, who are deciding whether to show up. They usually arrive on a phone, from a QR code, an Instagram bio, or a link a friend sent.

Secondary: parents of GCU students who want to know who their student is spending time with, and who may want to support the staff financially.

## Product Purpose
The single-page site for The Navigators at Grand Canyon University. It explains who the group is, what a week looks like, and who the staff are, then makes the first step easy. Success means a student comes to NavNight (Mondays) or joins the GroupMe. For parents, success means they trust the group and know how to reach the staff or give.

## Positioning
GCU is a Christian campus with many ministries. Navs stands apart through:
- **Doers, not just hearers.** The emphasis is on obeying and applying Scripture (James 1:22), not on consuming events.
- **Life-to-life discipleship.** Each student is mentored one-on-one and then trained to invest in someone else (2 Timothy 2:2).
- **Outreach beyond GCU.** There are regular evangelism trips to Arizona State, where the faith is lived out in real conversations.

## Operating Context
- Weekly rhythms: NavNight (Mondays, 7:00 PM), a Friday morning prayer walk (8:00 AM), and ASU Evangelism every other Friday. Students also meet in small groups and one-on-one with a mentor.
- The GroupMe is the live channel for rides, meetups, and last-minute changes. Students join by QR code.
- Staff are full-time Navigators staff who raise their own support. Giving goes through the national Navigators donation page, where donors search by staff name.

## Capabilities and Constraints
- Next.js App Router, React, and TypeScript, deployed on Vercel. A single page is composed from section components.
- Content that changes (photos, staff, contact, GroupMe, giving link) lives in `lib/content.ts`. Staff or student leaders who are not developers must be able to update times, places, photos, and people without touching layout code. Keep editable content centralized there.
- Mobile-first: most visitors arrive on phones.
- Open facts, not yet provided: the NavNight building and room, the prayer walk meeting spot and length, the ASU trip pickup spot, time, and next date, the staff bios, and a GroupMe share URL (currently QR only). These must stay visible placeholders until real information is supplied. Never invent them.

## Brand Commitments
- Affiliate of The Navigators, a national ministry. The official Navigators logo and brand guidelines are binding, and the site must read as a legitimate affiliate. Logo assets are `public/assets/Navigators_Sail_Black.webp` and `public/assets/navigators-logo-white.png`.
- Mission line (verbatim): "To know Christ, make Him known, and help others do the same."
- Voice: warm, direct, and plainspoken. It speaks to a student as a peer ("No experience needed, and you don't need a friend to bring you."). Scripture references anchor claims.

## Evidence on Hand
- Real ministry photos: `public/images/gallery/` (8 photos covering Fall-Con, Bible study, ASU outreach, and community).
- Staff photos: `public/images/staff/` for Cameron & Emma Kessner (directors), Emily Parviz, and Elyse LaVallee.
- GroupMe QR code: `public/images/groupme-qr.png`.
- Staff contact: Cameron.kessner@navigators.org.
- Facts: The Navigators was founded in 1933, and the GCU group has 4 full-time staff.
- Absent, and must not be fabricated: student testimonials, attendance numbers, staff bios, and event locations.

## Product Principles
1. **Lower the barrier to the first visit.** Every section should make it easier to show up on Monday or join the GroupMe.
2. **Show the life, not the pitch.** Real people, real photos, and real rhythms carry the case. Avoid promotional claims.
3. **Truth over polish.** Never fill gaps with invented details. An honest placeholder beats a plausible fiction.
4. **Discipleship is the differentiator.** One life invested in another should come through in what the site emphasizes.
5. **Editable by the ministry.** Content changes should never need a developer.
