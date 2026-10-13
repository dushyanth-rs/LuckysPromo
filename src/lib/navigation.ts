/**
 * Scrolls to a section id on the home page. If called from a different
 * page (e.g. a product detail page), navigates to the home page with the
 * section as a hash instead, since these anchor targets only exist there.
 */
export function scrollToSectionOrNavigateHome(id: string) {
  if (typeof window === 'undefined') return;

  if (window.location.pathname !== '/') {
    window.location.href = `/#${id}`;
    return;
  }

  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
