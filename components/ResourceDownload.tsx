import { publishedHref, type ResourceFile } from "@/lib/resources";

type Props = {
  file: ResourceFile;
  /** What is being downloaded, for screen readers, e.g. "Three Circles". */
  name: string;
  /** Visible download label, e.g. "Download section PDF". */
  label?: string;
  /** Adds an "Open" preview link beside the download. */
  preview?: boolean;
  /** Quieter pending state for list rows, where the same status repeats many times. */
  compact?: boolean;
  className?: string;
};

/* A download only renders as a link once its file is cleared for public redistribution.
   Until then it shows a plain, non-interactive "pending permission" note, never a broken link. */
export default function ResourceDownload({ file, name, label = "Download PDF", preview = false, compact = false, className }: Props) {
  const href = publishedHref(file);
  const cls = className ? `res-actions ${className}` : "res-actions";

  if (!href) {
    return (
      <div className={cls}>
        <span className={compact ? "res-pending compact" : "res-pending"}>
          <span className="sr-only">{label} for {name}: </span>Pending permission
        </span>
      </div>
    );
  }

  return (
    <div className={cls}>
      {preview && (
        <a className="res-link" href={href} target="_blank" rel="noopener">
          Open<span className="sr-only"> {name} PDF in a new tab</span>
        </a>
      )}
      <a className="res-link" href={href} download>
        {label}<span className="sr-only"> for {name}</span>
      </a>
    </div>
  );
}
