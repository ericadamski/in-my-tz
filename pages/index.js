import React, { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import Head from "next/head"
import { NextSeo } from "next-seo"
import spacetime from "spacetime"
import timezone from "spacetime-informal"

function encode(t, tz) {
  return `${t},${tz}`
    .split("")
    .map(c => c.charCodeAt(0).toString(16))
    .join("")
}

function checkIsValidTime(time) {
  if (!time) return

  const [t, zone] = time
    .toLowerCase()
    .replace(" ", "__")
    .split("__")

  let tn = t
    .split(":")
    .map(t => t.padStart(2, "0"))
    .join("")

  if (t.includes("pm") || t.includes("am")) {
    tn = tn.replace(/am|pm/, "")
  }

  if (t.includes("pm")) {
    const hours = +tn.toString().substring(0, 2)

    if (hours <= 12 && hours !== 0) {
      tn = +`${hours + 12}${tn.toString().substring(2)}`
    }
  }

  if (isNaN(tn)) {
    return "Please enter a numeric time."
  }

  if (!zone) {
    return "Please separate the time and timezone with a space."
  }

  const tz = timezone.display(timezone.find(zone))

  if (!tz) {
    return "Please enter a valid timezone."
  }

  return [tn, tz.iana]
}

const Home = () => {
  const copyEl = useRef()
  const [stack, setStack] = useState([1])
  const [time, setTime] = useState()
  const [isValidTime, setIsValidTime] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(
    () => {
      let isValid = checkIsValidTime(time)

      if (isValid !== isValidTime) {
        setIsValidTime(isValid)
      }
    },
    [time]
  )

  const scroll = latest => {
    window.scroll(0, latest.height)
  }

  const copy = () => {
    const { current: el } = copyEl

    if (el) {
      el.select()
      if (document.execCommand("copy")) {
        setCopied(true)
      }
    }
  }

  const active = stack[stack.length - 1]

  return (
    <div>
      <Head>
        <title>In My Timezone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextSeo
        title="In my timezone"
        description="Enter a time, get a shareable url where people can see the time you submitted in their own timezone."
        canonical="https://in-my-tz.now.sh"
        openGraph={{
          url: "https://in-my-tz.now.sh",
          title: "In my timezone",
          description:
            "Enter a time, get a shareable url where people can see the time you submitted in their own timezone.",
          images: [],
          site_name: "In my timezone",
        }}
        twitter={{
          handle: "@zealigan",
          cardType: "summary_large_image",
        }}
      />
      <textarea
        ref={copyEl}
        readOnly
        style={{
          position: "fixed",
          top: "-200vh",
          left: "-200vw",
        }}
        value={
          Array.isArray(isValidTime) &&
          `https://in-my-tz.now.sh/t/${encode(...isValidTime)}`
        }
      />

      <div
        className="page flex column center-items justify-center"
        style={{ paddingBottom: "20vh" }}
      >
        <h1 className="page__title">In my timezone</h1>
        <div className="page__instructions flex row wrap">
          <div id="1" className="page__instruction flex column center-items">
            <div className="page__field flex column">
              <label htmlFor="time" className="label">
                Enter a time
              </label>
              <input
                name="time"
                className="input"
                onChange={({ target }) => setTime(target.value)}
              />
              <p className="hint">
                Ex. 9PM EST{" "}
                {typeof isValidTime === "string" && (
                  <span className="error">- {isValidTime}</span>
                )}
              </p>
            </div>
            <motion.button
              disabled={!Array.isArray(isValidTime)}
              initial={{
                color: "var(--background)",
                background: "var(--highlight)",
                borderColor: "var(--highlight)",
              }}
              whileHover={{
                color: "var(--highlight)",
                background: "var(--background)",
                borderColor: "var(--highlight)",
              }}
              whileTap={{ scale: 0.9 }}
              className="button"
              onClick={() => setStack([...stack, 2])}
            >
              Next
            </motion.button>
          </div>
        </div>
        {stack.length >= 2 && (
          <motion.div
            style={{
              width: 2,
              backgroundColor: "var(--highlight)",
              margin: "1rem",
            }}
            animate={{ height: 600 }}
            onUpdate={scroll}
          />
        )}
        {active === 2 && (
          <motion.div
            id="2"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "1rem",
              padding: "1rem",
              textAlign: "center",
            }}
            animate={{ height: "auto" }}
          >
            <p style={{ textAlign: "center" }}>
              Whoever goes to this url will see the time you've entered in their
              own timezone!
            </p>
            <code className="url" onClick={copy}>
              https://in-my-tz.now.sh/t/
              {Array.isArray(isValidTime) && encode(...isValidTime)}
            </code>
            <motion.button
              initial={{
                color: "var(--background)",
                background: "var(--highlight)",
                borderColor: "var(--highlight)",
              }}
              whileHover={{
                color: "var(--highlight)",
                background: "var(--background)",
                borderColor: "var(--highlight)",
              }}
              whileTap={{ scale: 0.9 }}
              className="button"
              onClick={copy}
            >
              Copy
            </motion.button>
          </motion.div>
        )}
      </div>
      {copied && (
        <motion.div
          style={{
            background: "var(--highlight)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: 0,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          animate={{ height: "100vh" }}
        >
          <h2 style={{ fontSize: "3rem", textAlign: "center" }}>
            Your URL has been copied!
          </h2>
          <motion.button
            initial={{
              color: "var(--background)",
              background: "var(--foreground)",
              borderColor: "var(--foreground)",
            }}
            whileHover={{
              color: "var(--foreground)",
              background: "var(--highlight)",
              borderColor: "var(--foreground)",
            }}
            whileTap={{ scale: 0.9 }}
            className="button"
            onClick={() => location.reload()}
          >
            Go again!
          </motion.button>
        </motion.div>
      )}

      <style jsx>{`
        .error {
          color: var(--error);
        }

        .url {
          background-color: var(--highlight);
          color: var(--background);
          border-radius: 6px;
          padding: 0.5rem 1rem;
        }

        .page {
          background-color: var(--background);
          min-height: 100vh;
          width: 100vw;
        }

        .page__title {
          font-size: 3rem;
        }

        .input {
          height: 40px;
          border-radius: 6px;
          border: 2px solid var(--accents-4);
          background-color: var(--accents-1);
          box-shadow: none;
          padding: 0.5rem 1rem;
          font-size: 1rem;
        }

        .input:hover,
        .input:focus {
          outline: none;
          border-color: var(--highlight);
        }

        .label {
          font-weight: bold;
          font-size: 1rem;
        }

        .hint {
          padding: 0;
          margin: 0;
          color: var(--accents-3);
          font-size: 0.75rem;
        }

        .page__field,
        .page__instruction {
          width: 100%;
        }

        .flex {
          display: flex;
        }

        .flex.column {
          flex-direction: column;
        }

        .flex.row {
          flex-direction: row;
        }

        .flex.wrap {
          flex-wrap: wrap;
        }

        .center-items {
          align-items: center;
        }

        .justify-center {
          justify-content: center;
        }
      `}</style>

      <style jsx global>{`
        .page__instructions {
          width: 100%;
          max-width: 300px;
        }

        .button {
          padding: 0.75rem 2rem;
          border: 2px solid transparent;
          font-size: 1rem;
          font-weight: bold;
          border-radius: 6px;
          margin-top: 1rem;
        }

        .button:disabled {
          pointer-events: none;
          opacity: 0.5;
        }

        .button:focus,
        .button:hover {
          outline: none;
          cursor: pointer;
        }

        /* latin-ext */
        @font-face {
          font-family: "IBM Plex Sans";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: local("IBM Plex Sans"), local("IBMPlexSans"),
            url(https://fonts.gstatic.com/s/ibmplexsans/v7/zYXgKVElMYYaJe8bpLHnCwDKhd_eFaxOedfTDw.woff2)
              format("woff2");
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
            U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: "IBM Plex Sans";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: local("IBM Plex Sans"), local("IBMPlexSans"),
            url(https://fonts.gstatic.com/s/ibmplexsans/v7/zYXgKVElMYYaJe8bpLHnCwDKhdHeFaxOedc.woff2)
              format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* latin-ext */
        @font-face {
          font-family: "IBM Plex Sans";
          font-style: normal;
          font-weight: 600;
          font-display: swap;
          src: local("IBM Plex Sans SemiBold"), local("IBMPlexSans-SemiBold"),
            url(https://fonts.gstatic.com/s/ibmplexsans/v7/zYX9KVElMYYaJe8bpLHnCwDKjQ76AI9sdP3pBmtF8A.woff2)
              format("woff2");
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
            U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: "IBM Plex Sans";
          font-style: normal;
          font-weight: 600;
          font-display: swap;
          src: local("IBM Plex Sans SemiBold"), local("IBMPlexSans-SemiBold"),
            url(https://fonts.gstatic.com/s/ibmplexsans/v7/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIFsdP3pBms.woff2)
              format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* latin-ext */
        @font-face {
          font-family: "IBM Plex Sans";
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: local("IBM Plex Sans Bold"), local("IBMPlexSans-Bold"),
            url(https://fonts.gstatic.com/s/ibmplexsans/v7/zYX9KVElMYYaJe8bpLHnCwDKjWr7AI9sdP3pBmtF8A.woff2)
              format("woff2");
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
            U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: "IBM Plex Sans";
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: local("IBM Plex Sans Bold"), local("IBMPlexSans-Bold"),
            url(https://fonts.gstatic.com/s/ibmplexsans/v7/zYX9KVElMYYaJe8bpLHnCwDKjWr7AIFsdP3pBms.woff2)
              format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* latin-ext */
        @font-face {
          font-family: "Noto Serif";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: local("Noto Serif"), local("NotoSerif"),
            url(https://fonts.gstatic.com/s/notoserif/v8/ga6Iaw1J5X9T9RW6j9bNfFkWaDq8fMVxMw.woff2)
              format("woff2");
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
            U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: "Noto Serif";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: local("Noto Serif"), local("NotoSerif"),
            url(https://fonts.gstatic.com/s/notoserif/v8/ga6Iaw1J5X9T9RW6j9bNfFcWaDq8fMU.woff2)
              format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* latin-ext */
        @font-face {
          font-family: "Noto Serif";
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: local("Noto Serif Bold"), local("NotoSerif-Bold"),
            url(https://fonts.gstatic.com/s/notoserif/v8/ga6Law1J5X9T9RW6j9bNdOwzfRmece9LOocoDg.woff2)
              format("woff2");
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
            U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: "Noto Serif";
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: local("Noto Serif Bold"), local("NotoSerif-Bold"),
            url(https://fonts.gstatic.com/s/notoserif/v8/ga6Law1J5X9T9RW6j9bNdOwzfReece9LOoc.woff2)
              format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        html,
        body {
          font-family: "IBM Plex Sans", sans-serif;
          margin: 0;
          padding: 0;
          color: var(--foreground);
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: "Noto Serif", serif;
          color: var(--foreground);
        }

        :root {
          --background: #fffafb;
          --accents-1: #fafafa;
          --accents-2: #eaeaea;
          --accents-3: #999;
          --accents-4: #888;
          --accents-5: #666;
          --accents-6: #444;
          --accents-7: #333;
          --foreground: #303036;
          --success: #30bced;
          --highlight: #d68fd6;
          --error: #ff5484;
        }
      `}</style>
    </div>
  )
}

export default Home
