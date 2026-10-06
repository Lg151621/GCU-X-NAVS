import SectionHead from "./SectionHead";

export default function About() {
  return (
    <section id="who">
      <SectionHead label="Who we are" title={<>Not just hearers of the Word. <em>Doers.</em></>}>
        The Navigators started in 1933 with one man discipling sailors in the U.S. Navy. The idea hasn&apos;t changed: one life invested in another, who invests in another. That life-to-life vision still guides The Navigators today.
      </SectionHead>
      <a className="btn who-cta" href="https://www.navigators.org/who-we-are/" target="_blank" rel="noopener noreferrer">Learn about The Navigators</a>
      <div className="mission">
        <article>
          <h3><em>Know</em> Christ</h3>
          <p>Abiding in Jesus through His Word, prayer, and a community that walks with you.</p>
          <span className="ref">John 15:5</span>
        </article>
        <article>
          <h3>Make Him <em>known</em></h3>
          <p>Sharing the gospel where we live, work, worship, and spend time with others.</p>
          <span className="ref">Matthew 28:19–20</span>
        </article>
        <article>
          <h3><em>Help others</em> do the same</h3>
          <p>Discipleship that multiplies. You learn it, live it, then pass it on to someone else.</p>
          <span className="ref">2 Timothy 2:2</span>
        </article>
      </div>
      <div className="doers">
        <blockquote>
          We don&apos;t just want to consume the Word. We want to <em>follow it</em> and <em>pass it on.</em>
        </blockquote>
        <p>
          Scripture is meant to change how we live and then be shared. The Navigators helps people grow in Christ and invest in others, one life at a time.
          <br />
          <span className="ref">James 1:22</span>
        </p>
      </div>
    </section>
  );
}
