import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { authenticate } from "../shopify.server";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <ui-nav-menu>
        <Link to="/app" rel="home">
          Dashboard
        </Link>
        <Link to="/app/additional">Additional page</Link>
        <Link to="/app/seo_issues">Seo Issues</Link>
        <Link to="/app/meta_tag">Meta Tag</Link>
        <Link to="/app/auto_pilot">Auto Pilot</Link>
        <Link to="/app/google_snippets">Google Snippets</Link>
        <Link to="/app/broken_links">Broken Links</Link>
        <Link to="/app/image_optimizer">Image Optimizer</Link>
        <Link to="/app/url_optimization">URL Optimization</Link>
        <Link to="/app/sitemap">Sitemap</Link>
        <Link to="/app/bulk_editor">Bulk Editor</Link>
      </ui-nav-menu>
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
