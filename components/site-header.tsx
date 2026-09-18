"use client";

import Image from "next/image";
import Link from "next/link";
import { MenuIcon, PhoneIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { nav, site } from "@/lib/site";

const barLink =
  "inline-flex h-12 items-center gap-1 px-4 text-[0.8rem] font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:bg-white/10 focus:bg-white focus:text-navy-700 data-active:bg-white data-active:text-navy-700 data-open:bg-white data-open:text-navy-700 data-popup-open:bg-white data-popup-open:text-navy-700";

export function SiteHeader() {
  return (
    <header className="relative z-40">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-navy-700"
      >
        Skip to content
      </a>

      {/* Utility strip */}
      <div className="bg-navy-950 text-white/75">
        <div className="container-site flex h-9 items-center justify-between gap-4 text-xs">
          <p className="truncate tracking-wide">
            {site.circuit} &middot; Kenton County, Kentucky
          </p>
          <div className="flex shrink-0 items-center gap-5">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-1.5 hover:text-white sm:inline-flex"
            >
              <PhoneIcon className="size-3" aria-hidden="true" />
              {site.phone}
            </a>
            <a
              href={site.newsletterUrl}
              className="font-semibold text-sky-300 hover:text-white"
            >
              Weekly newsletter &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Identity row */}
      <div className="bg-gradient-to-b from-white to-mist-50">
        <div className="container-site flex items-center gap-4 py-4 lg:py-5">
          <Link
            href="/"
            className="flex items-center gap-4 lg:pl-[8.5rem]"
            aria-label={`${site.person}, ${site.name} — home`}
          >
            <Image
              src="/images/kenton-seal.png"
              alt=""
              width={96}
              height={96}
              priority
              className="size-14 sm:size-16 lg:absolute lg:top-11 lg:left-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:z-10 lg:size-32 lg:drop-shadow-md"
            />
            <span className="flex flex-col">
              <span className="font-serif text-2xl leading-none font-semibold tracking-[0.04em] text-navy-700 uppercase sm:text-3xl lg:text-[2.5rem]">
                {site.person}
              </span>
              <span className="mt-1.5 font-serif text-[0.8rem] tracking-[0.12em] text-slate-700 uppercase sm:text-sm lg:text-base">
                Kenton County Commonwealth&rsquo;s Attorney
              </span>
            </span>
          </Link>

          <div className="ml-auto hidden items-center gap-6 md:flex">
            <div className="text-right">
              <p className="eyebrow text-steel-500">Main office</p>
              <a
                href={site.phoneHref}
                className="font-serif text-2xl text-navy-700 hover:underline"
              >
                {site.phone}
              </a>
            </div>
          </div>

          <MobileMenu />
        </div>
      </div>

      {/* Nav bar */}
      <div className="hidden border-t-[3px] border-heritage-700 bg-slate-700 lg:block">
        <div className="container-site flex items-center pl-[calc(8.5rem+2rem)]">
          <NavigationMenu>
            <NavigationMenuList>
              {nav.map((item) =>
                item.children ? (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger
                      className={`${barLink} rounded-none bg-transparent`}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[34rem] grid-cols-2 gap-1 p-3">
                        <li className="col-span-2">
                          <NavigationMenuLink
                            render={<Link href={item.href} />}
                            className="block rounded-lg bg-ice-100 px-3 py-2.5 hover:bg-ice-100/70"
                          >
                            <span className="font-serif text-lg text-navy-700">
                              {item.label} overview &rarr;
                            </span>
                          </NavigationMenuLink>
                        </li>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <NavigationMenuLink
                              render={<Link href={child.href} />}
                              className="flex flex-col items-start gap-0.5 px-3 py-2.5"
                            >
                              <span className="font-semibold text-ink">
                                {child.label}
                              </span>
                              {child.description && (
                                <span className="text-[0.8rem] text-subtle">
                                  {child.description}
                                </span>
                              )}
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink
                      render={<Link href={item.href} />}
                      className={`${barLink} rounded-none`}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <Link
            href="/resources/victim-resources"
            className="ml-auto inline-flex h-12 items-center px-4 text-[0.8rem] font-semibold tracking-[0.14em] text-sky-300 uppercase hover:text-white"
          >
            Help for victims
          </Link>
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger
        className="ml-auto inline-flex size-11 items-center justify-center rounded-full border border-line text-navy-700 lg:hidden"
        aria-label="Open menu"
      >
        <MenuIcon className="size-5" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[88vw] overflow-y-auto bg-white p-0"
      >
        <div className="border-b-[3px] border-heritage-700 bg-slate-700 px-6 py-5">
          <SheetTitle className="font-serif text-xl text-white">
            Menu
          </SheetTitle>
        </div>
        <nav aria-label="Mobile" className="px-6 pb-8">
          <ul className="divide-y divide-line">
            {nav.map((item) => (
              <li key={item.label} className="py-4">
                <SheetClose
                  render={<Link href={item.href} />}
                  className="font-serif text-xl text-navy-700"
                >
                  {item.label}
                </SheetClose>
                {item.children && (
                  <ul className="mt-2 space-y-1.5 border-l-2 border-ice-100 pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <SheetClose
                          render={<Link href={child.href} />}
                          className="text-[0.95rem] text-body hover:text-navy-700"
                        >
                          {child.label}
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <a
            href={site.phoneHref}
            className="mt-4 flex items-center gap-2 rounded-full bg-navy-700 px-5 py-3 font-semibold text-white"
          >
            <PhoneIcon className="size-4" aria-hidden="true" />
            Call {site.phone}
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
