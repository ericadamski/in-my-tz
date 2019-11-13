import React from "react"

export default function Footer() {
  return (
    <>
      <div className="footer">
        <p>
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          by{" "}
          <a
            href="https://twitter.com/zealigan"
            style={{ color: "var(--highlight)" }}
          >
            Eric
          </a>
        </p>
      </div>
      <style jsx>{`
        .footer {
          width: 100vw;
          background-color: transparent;
          position: fixed;
          bottom: 0;
          left: 0;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  )
}
