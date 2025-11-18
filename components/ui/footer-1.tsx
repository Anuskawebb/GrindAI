"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Instagram, Twitter, Linkedin, type LucideIcon } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
  badge?: string; // optional, e.g., "Pro", "New", "Hiring"
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  iconName: "instagram" | "twitter" | "linkedin";
  href: string;
  label: string;
}

interface FooterProps {
  logoSrc: string;
  logoAlt: string;
  description: string;
  columns: FooterColumn[];
  socialLinks: SocialLink[];
  copyright?: string;
}

export const Footer: FC<FooterProps> = ({
  logoSrc,
  logoAlt,
  description,
  columns,
  socialLinks,
  copyright = `© ${new Date().getFullYear()} GrindApp. All Rights Reserved.`,
}) => {
  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-0">
          {/* Logo + Description + Social */}
          <div className="flex flex-col gap-4 md:w-1/3">
            <Link href="/">
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={120}
                height={40}
                className="object-contain"
              />
            </Link>
            <p className="text-gray-600">{description}</p>
            <div className="flex space-x-4 mt-2">
              {socialLinks.map(({ iconName, href, label }) => {
                const IconMap: Record<string, LucideIcon> = {
                  instagram: Instagram,
                  twitter: Twitter,
                  linkedin: Linkedin,
                };
                const Icon = IconMap[iconName];
                return (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-gray-500 hover:text-orange-500 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-8 md:w-2/3">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col space-y-2 min-w-[120px]">
                <h4 className="text-gray-900 font-semibold">{col.title}</h4>
                {col.links.map(({ label, href, badge }) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-gray-600 hover:text-orange-500 flex items-center gap-1 transition-colors"
                  >
                    {label}
                    {badge && (
                      <span className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded">
                        {badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>{copyright}</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link href="#" className="hover:text-orange-500 hover:underline transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-orange-500 hover:underline transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-orange-500 hover:underline transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

