import { Link } from "@tanstack/react-router";

export const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/vocabulary", label: "Vocabulary" },
  { to: "/conversations", label: "Conversations" },
  { to: "/quiz", label: "Quiz" },
  { to: "/progress", label: "Progress" },
] as const;

export function SiteNav() {
  return (
    <header className="border-b bg-card">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="font-display text-xl font-bold text-primary">
          Kannada for Everyone
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-foreground hover:bg-muted data-[status=active]:bg-secondary data-[status=active]:text-secondary-foreground"
                  activeProps={{ "aria-current": "page" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
