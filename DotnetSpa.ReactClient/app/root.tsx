import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import "./styles/globals.scss";
import styles from "./root.module.scss";

export const links = () => [
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css",
    integrity:
      "sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==",
    crossOrigin: "anonymous",
    referrerPolicy: "no-referrer",
  },
];

export const scripts = () => [
  {
    src: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/js/all.min.js",
    integrity:
      "sha512-b+nQTCdtTBIRIbraqNEwsjB6UvL3UEMkXnhzd8awtCYh0Kcsjl9uEgwVFVbhoj3uu1DO1ZMacNvLoyJJiNfcvg==",
    crossOrigin: "anonymous",
    referrerPolicy: "no-referrer",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>DotnetSpa - React Client</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className={styles.root}>
          <header>
            <div className={styles["site-name"]}>
              <a href="/">DotnetSpa</a>
            </div>
            <div className={styles["left"]}></div>
            <div className={styles["right"]}></div>
          </header>

          <nav>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <a
                  href="/"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </nav>

          <main>{children}</main>

          <footer>
            <span>React Client by Kody Crossman</span>
          </footer>
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main style={{ padding: "4rem 1rem", maxWidth: 800, margin: "auto" }}>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre
          style={{
            overflowX: "auto",
            backgroundColor: "#f8f9fa",
            padding: "1rem",
          }}
        >
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
