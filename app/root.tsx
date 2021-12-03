import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from 'remix';
import type { LinksFunction } from 'remix';

import tailwindStyleUrl from '~/styles/tailwind.css';
import classNames from 'classnames';
import { Recognition } from './helpers/recognizeFinder';
import {
  RecognitionContext,
  RecognitionProvider,
} from './contexts/RecognitionContext';
import { useContext } from 'react';
import { useRecognitionData } from './hooks/useRecognitionData';

// https://remix.run/api/app#links
export let links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: tailwindStyleUrl }];
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body className="bg-primary-background text-light-normal">
        <RecognitionProvider>{children}</RecognitionProvider>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const { finder } = useRecognitionData();
  return (
    <div className="h-screen flex flex-col items-stretch">
      <header className="w-full bg-primary-vivid">
        <div
          className={classNames(
            'flex items-center justify-between',
            'container mx-auto',
            'p-4'
          )}
        >
          <div
            className={classNames(
              'flex flex-row gap-4 items-center justify-center'
            )}
          >
            <Link
              to="/"
              className="flex flex-row gap-4 items-center justify-center"
            >
              <img src="/images/gold-pot.svg" width={32} height={32} />
              <span className="font-bold text-lg">私房钱大作战</span>
            </Link>
          </div>
          {finder && (
            <div className="flex flex-row gap-2 items-center">
              <img src={finder.avatar} width={32} className="rounded-md" />
              <span className="font-bold">{finder.name}</span>
            </div>
          )}
        </div>
      </header>
      <div className="container mx-auto p-8 flex-1">{children}</div>
    </div>
  );
}
