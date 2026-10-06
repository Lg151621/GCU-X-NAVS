import SectionHead from "./SectionHead";

export default function Events() {
  return (
    <section id="week">
      <SectionHead label="Our week" title={<>Gather. Pray. <em>Go.</em></>}>
        Three rhythms shape our week. Come to one or all three. No experience needed, and you don&apos;t need a friend to bring you.
      </SectionHead>
      <div className="week">
        <article className="event">
          <span className="when">Mondays · <span className="ph">7:00 PM</span></span>
          <h3>NavNight</h3>
          <p>Our main weekly gathering, centered on abiding in Jesus and what that looks like in everyday life as a student.</p>
          <dl>
            <dt>Where</dt><dd><span className="ph">Building &amp; room</span></dd>
            <dt>Bring</dt><dd>A Bible if you have one</dd>
          </dl>
        </article>
        <article className="event">
          <span className="when">Fridays · 8:00 AM</span>
          <h3>Prayer walk</h3>
          <p>We start Friday mornings walking campus together and praying for GCU, our classmates, and our city.</p>
          <dl>
            <dt>Meet at</dt><dd><span className="ph">Meeting spot</span></dd>
            <dt>Length</dt><dd><span className="ph">About 45 min</span></dd>
          </dl>
        </article>
        <article className="event">
          <span className="when">Every other Friday</span>
          <h3>ASU outreach</h3>
          <p>We head to Arizona State to share the gospel and have real conversations about Jesus. First-timers go out with someone experienced.</p>
          <dl>
            <dt>Leave from</dt><dd><span className="ph">Pickup spot &amp; time</span></dd>
            <dt>Next trip</dt><dd><span className="ph">Date</span></dd>
          </dl>
        </article>
      </div>
    </section>
  );
}
