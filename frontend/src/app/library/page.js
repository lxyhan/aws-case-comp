'use client'

import { Fragment, useState, useEffect } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Menu,
  Transition
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon, ChartBarIcon, ClockIcon, EyeIcon, TagIcon, VideoCameraIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid'
import { videos as initialVideos } from '../../data/videos'
import Link from 'next/link'

const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
}
const breadcrumbs = [{ id: 1, name: 'Men', href: '#' }]
const filters = [
  {
    id: 'industry',
    name: 'Industry',
    options: [
      { value: 'technology', label: 'Technology & Innovation' },
      { value: 'sports', label: 'Sports & Entertainment' },
      { value: 'business', label: 'Business & Finance' },
      { value: 'science', label: 'Science & Education' },
    ],
  },
  {
    id: 'era',
    name: 'Era',
    options: [
      { value: 'archive', label: 'Archive' },
      { value: '2000s', label: '2000s' },
      { value: '2010s', label: '2010s' },
      { value: '2020s', label: '2020s' },
    ],
  },
]
const products = [
  {
    id: 1,
    name: 'Basic Tee 8-Pack',
    href: '#',
    price: '$256',
    description: 'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
    options: '8 colors',
    imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-02-image-card-01.jpg',
    imageAlt: 'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32',
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
    options: 'Black',
    imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-02-image-card-02.jpg',
    imageAlt: 'Front of plain black t-shirt.',
  },
  // More products...
]
const footerNavigation = {
  products: [
    { name: 'Bags', href: '#' },
    { name: 'Tees', href: '#' },
    { name: 'Objects', href: '#' },
    { name: 'Home Goods', href: '#' },
    { name: 'Accessories', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  customerService: [
    { name: 'Contact', href: '#' },
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Warranty', href: '#' },
    { name: 'Secure Payments', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Find a store', href: '#' },
  ],
}

const sortOptions = [
  { name: 'Most Viewed', value: 'views', icon: EyeIcon },
  { name: 'Monetization Potential', value: 'monetization', icon: ChartBarIcon },
  { name: 'Duration', value: 'duration', icon: ClockIcon },
]

// This will be our landing page (/)
export default function LandingPage() {
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">ChronoVault AI</span>
              <img
                className="h-12 w-auto"
                src="/logo.png"
                alt="ChronoVault AI"
              />
            </Link>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link href="/library" className="text-sm font-semibold leading-6 text-gray-900">
              Video Library
            </Link>
            <a href="#features" className="text-sm font-semibold leading-6 text-gray-900">
              Features
            </a>
            <a href="#technology" className="text-sm font-semibold leading-6 text-gray-900">
              Technology
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <div className="relative isolate pt-14">
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  ChronoVault AI
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Unlocking the Value of Legacy Video Archives with AWS AI
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    href="/library"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    View Demo Library
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack Section */}
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Powered by AWS</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Advanced AI Video Processing
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Leveraging Amazon Rekognition, RAG, and advanced AI services to transform historical footage into searchable, valuable assets.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {/* AWS Service Cards */}
                <div className="flex flex-col">
                  <div className="rounded-lg bg-gray-50 p-6">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Amazon Rekognition</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Automated scene detection, object recognition, and content analysis
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="rounded-lg bg-gray-50 p-6">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">RAG Technology</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Advanced retrieval and context-aware content understanding
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="rounded-lg bg-gray-50 p-6">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">AI-Powered Search</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Natural language search across video content and metadata
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white">
          <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Experience the Future of Video Archives
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                Try our demo library to see how ChronoVault AI can transform your historical footage into searchable, valuable content.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/library"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  View Demo Library
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
