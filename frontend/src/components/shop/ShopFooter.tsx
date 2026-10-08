import { Globe, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';
import { SHOP_BRAND, SHOP_CONTACT } from '@/lib/shop/mock-catalogue';
import { UsNavyWordmark } from '@/components/shop/UsNavyWordmark';

const FOOTER_GROUPS = [
  {
    title: 'Shop',
    links: [
      { href: '/shop/c/men', label: 'Men' },
      { href: '/shop/c/shoes', label: 'Shoes' },
      { href: '/shop/collections', label: 'Collections' },
    ],
  },
  {
    title: 'Help',
    links: [
      { href: '/shop', label: 'Shipping' },
      { href: '/shop', label: 'Returns' },
      { href: '/shop', label: 'Size guide' },
      { href: '/shop', label: 'Contact' },
    ],
  },
];

export function ShopFooter() {
  return (
    <footer className="mt-24 border-t clout-rule">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <UsNavyWordmark className="h-10" fallbackClassName="text-lg" alt={`${SHOP_BRAND} logo`} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#6b6b6b]">
            Men&apos;s clothing and footwear — everyday shirts, tees, trousers and shoes,
            stocked to be worn season after season.
          </p>
          <address className="mt-6 flex max-w-sm flex-col gap-1 text-sm not-italic leading-relaxed text-[#6b6b6b]">
            <span className="flex items-center gap-2">
              <Phone size={15} className="shrink-0" aria-hidden />
              <a href="tel:+917306585449" className="hover:text-[#101010]">{SHOP_CONTACT.phone}</a>
            </span>
            <span className="flex items-center gap-2">
              <MessageCircle size={15} className="shrink-0" aria-hidden />
              <span>WhatsApp: {SHOP_CONTACT.whatsapp}</span>
            </span>
            <span className="flex items-center gap-2">
              <Globe size={15} className="shrink-0" aria-hidden />
              <span>{SHOP_CONTACT.website}</span>
            </span>
          </address>
        </div>

        {FOOTER_GROUPS.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="clout-eyebrow">{group.title}</h2>
            <ul className="mt-4 space-y-3">
              {group.links.map((link) => (
                <li key={`${group.title}-${link.label}`}>
                  <Link href={link.href} className="clout-link text-sm text-[#6b6b6b] hover:text-[#101010]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t clout-rule">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-6 text-xs text-[#6b6b6b] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} {SHOP_BRAND}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
