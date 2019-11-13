import spacetime from "spacetime"
import timezone from "spacetime-informal"
import { motion } from "framer-motion"
import Footer from "../../components/Footer"

function decode(t) {
  const chars = []

  for (let i = 0; i < t.length; i += 2) {
    chars.push(t.substring(i, i + 2))
  }

  return chars.map(c => String.fromCharCode(parseInt(c, 16))).join("")
}

function toLocale(time) {
  let locale = "am"
  let [h, m = "0"] = time.split(":")

  if (+h === 0) {
    h = 12
  }

  if (+h > 12) {
    h -= 12
    locale = "pm"
  }

  return `${h}:${m.padStart(2, "0")}${locale}`
}

const Time = props => {
  const { t, tz } = props
  const time = spacetime.now(tz).time(toLocale(t))
  const remoteTz = timezone.display(tz)

  return (
    <div>
      <motion.a
        style={{
          border: "2px solid transparent",
          fontSize: "1rem",
          fontWeight: "bold",
          margin: "1rem",
          position: "fixed",
          top: 0,
          left: 0,
          borderRadius: 100,
          padding: "0.5rem 1rem",
          textDecoration: "none",
          color: "var(--foreground)",
        }}
        whileHover={{
          borderColor: "var(--foreground)",
        }}
        href="/"
      >
        <span role="img" aria-label="house">
          🏡
        </span>{" "}
        Go home
      </motion.a>
      <div className="page flex column center-items justify-center">
        <h1 className="page__title">
          {time.time()}{" "}
          {remoteTz.standard
            ? remoteTz.standard.abbrev
            : remoteTz.standard.iana}{" "}
          in your timezone is {time.goto().time()}
        </h1>
      </div>
      <Footer />
      <style jsx>{`
        .page {
          background-color: var(--background);
          min-height: 100vh;
          width: 100vw;
        }

        .page__title {
          font-size: 3rem;
          padding: 2rem;
          text-align: center;
        }

        .flex {
          display: flex;
        }

        .flex.column {
          flex-direction: column;
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

Time.getInitialProps = ({ query, res }) => {
  if (!query.t) {
    if (process.browser) {
      Router.replace("/")
    } else {
      res.writeHead(302, { Location: "/" })
      res.end()
    }
  }

  const [t, tz] = decode(query.t).split(",")

  return { t, tz }
}

export default Time
