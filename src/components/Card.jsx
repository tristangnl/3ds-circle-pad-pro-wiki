import React, { useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

const styles = {
  card: {
    border: "1px solid var(--ifm-color-emphasis-300, #dadde1)",
    overflow: "hidden",
    background: "var(--ifm-card-background-color, #fff)",
    width: "100%",
  },
  body: {
    padding: "1rem 1.25rem",
  },
  mediaWrap: {
    float: "right",
    width: "320px",
    margin: "0 0 .75rem 1.25rem",
    flexShrink: 0,
    background: "#000",
    border: "1px solid var(--ifm-color-emphasis-200, #eaecef)",
  },
  media: {
    position: "relative",
    width: "100%",
    paddingTop: "56.25%",
  },
  iframe: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    border: 0,
  },
  thumbnailBtn: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    border: 0,
    cursor: "pointer",
    background: "none",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnailImg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  playIcon: {
    position: "relative",
    zIndex: 1,
    width: "68px",
    height: "48px",
  },
  clear: { clear: "both", },
  footer: {
    padding: ".85rem 1.25rem",
    borderTop: "1px solid var(--ifm-color-emphasis-200, #eaecef)",
  },
  titleLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: ".5rem",
    fontSize: "var(--ifm-h3-font-size, 1.15rem)",
    fontWeight: 700,
    lineHeight: 1.3,
  },
  githubIcon: {
    width: "22px",
    height: "22px",
  },
};

export default function Card({ title, children, githubUrl, youtubeId }) {
  const [playing, setPlaying] = useState(false);


  const thumbnailUrl = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
    : null;

  const embedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}`
    : null;

  return (
    <div style={styles.card}>

      <div style={styles.body}>
        {embedUrl && (
          <div style={styles.mediaWrap}>
            <div style={styles.media}>
              {playing ? (
                <iframe
                  style={styles.iframe}
                  src={`${embedUrl}?autoplay=1`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  style={styles.thumbnailBtn}
                  onClick={() => setPlaying(true)}
                >
                  <img style={styles.thumbnailImg} src={thumbnailUrl} alt={title} />
                  <span aria-hidden="true" style={styles.playIcon}>
                    <svg viewBox="0 0 68 48" xmlns="http://www.w3.org/2000/svg">
                      <rect width="68" height="48" rx="12" fill="rgba(0,0,0,.6)" />
                      <polygon points="26,14 26,34 48,24" fill="white" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          </div>
        )}

        <div>
          {children}
        </div>

        <div style={styles.clear} />
      </div>

      <div style={styles.footer}>
        {githubUrl ? (
          <a
            style={styles.titleLink}
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img style={styles.githubIcon} src={useBaseUrl("/img/github.webp")} alt="GitHub" />
            {title}
          </a>
        ) : (
          <span style={styles.titleLink}>{title}</span>
        )}
      </div>

    </div>
  );
}