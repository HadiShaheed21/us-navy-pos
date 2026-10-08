import type { Metadata, Viewport } from 'next';
import './shop.css';
import { ShopHeader } from '@/components/shop/ShopHeader';
import { ShopFooter } from '@/components/shop/ShopFooter';
import { CartDrawer } from '@/components/shop/CartDrawer';

/**
 * US NAVY customer storefront shell.
 *
 * Owns its own metadata and viewport so the POS root layout is untouched. The
 * POS root sets `userScalable: false`, which blocks pinch-zoom; a public
 * storefront must not disable zoom, so it is re-enabled here.
 */
export const metadata: Metadata = {
  title: {
    default: "US NAVY — Men's clothing & footwear",
    template: '%s · US NAVY',
  },
  description: "US NAVY is a men's fashion store: everyday clothing, shirts, tees, trousers and shoes.",
  applicationName: 'US NAVY',
  openGraph: {
    type: 'website',
    siteName: 'US NAVY',
    title: "US NAVY — Men's clothing & footwear",
    description: "Everyday men's clothing and shoes, stocked season after season.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Zoom stays enabled: the POS kiosk locks it, but a storefront must not.
  maximumScale: 5,
  userScalable: true,
  themeColor: '#FAFAF8',
};

export default function ShopLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // `shop-shell` pins a light palette locally so the POS `.dark` class on
    // <html> cannot recolour the storefront, and nothing here writes theme state.
    <div className="shop-shell min-h-dvh bg-[#FAFAF8] text-[#101010]">
      <a
        href="#shop-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-[#101010] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <ShopHeader />
      <main id="shop-main" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <ShopFooter />
      <CartDrawer />
    </div>
  );
}
