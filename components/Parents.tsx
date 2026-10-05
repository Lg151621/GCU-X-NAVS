import { givingUrl, STAFF_EMAIL } from "@/lib/content";
import SectionHead from "./SectionHead";

export default function Parents() {
  return (
    <section id="parents">
      <SectionHead label="For parents" title={<>Who your student is <em>spending time with.</em></>}>
        Sending a student off to college is a big step. Here&apos;s what you should know about us.
      </SectionHead>
      <div className="parents">
        <div className="qa">
          <div>
            <h3>Who are The Navigators?</h3>
            <p>A nondenominational Christian ministry founded in 1933, with staff on college campuses, military bases, and in communities across the U.S. and around the world.</p>
          </div>
          <div>
            <h3>Who leads the GCU group?</h3>
            <p>Cameron and Emma Kessner direct the ministry, alongside staff members Emily and Elyse. Student leaders are trained and mentored by staff.</p>
          </div>
          <div>
            <h3>What does a typical week look like?</h3>
            <p>A Monday evening gathering, an optional Friday morning prayer walk, and an outreach trip to ASU every other Friday. Students also meet in small groups and one-on-one with a mentor.</p>
          </div>
          <div>
            <h3>How do I reach someone?</h3>
            <p>Email the staff at <a href={`mailto:${STAFF_EMAIL.value}`}>{STAFF_EMAIL.value}</a>. We&apos;re always glad to talk.</p>
          </div>
        </div>
        <div className="facts">
          <div className="fact">
            <div className="big">1933</div>
            <p>The year The Navigators began, built on 2 Timothy 2:2 and life-to-life discipleship.</p>
          </div>
          <div className="fact">
            <div className="big">4</div>
            <p>Full-time staff investing in GCU students every week.</p>
          </div>
          <div className="support">
            <h3>Support our staff</h3>
            <p>
              Navigators staff raise their own support. If this ministry has meant something to your family, you can partner with them. On the giving page, search for the staff member&apos;s name, such as Kessner.
            </p>
            <a className="btn" href={givingUrl} target="_blank" rel="noopener">Give to our staff</a>
          </div>
        </div>
      </div>
    </section>
  );
}
