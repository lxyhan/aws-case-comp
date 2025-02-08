 'use client'

import { useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { HeartIcon, ClockIcon, EyeIcon, TagIcon } from '@heroicons/react/24/outline'
import { videos } from '../../../data/videos'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function VideoDetail({ params }) {
  const video = videos.find(v => v.id.toString() === params.id)
  
  if (!video) return <div>Video not found</div>

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Video player */}
          <div className="aspect-h-9 aspect-w-16 overflow-hidden rounded-lg bg-gray-100">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Video info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{video.title}</h1>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">{video.viewCount.toLocaleString()} views</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">{video.duration}</span>
                </div>
              </div>
              <button
                type="button"
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <HeartIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6 text-base text-gray-700">
                <p>{video.summary}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Tags</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">AI-Generated Tags</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {video.aiTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="text-sm font-medium text-gray-900">
                Additional Details
              </h2>

              <div className="mt-4 space-y-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Industry</dt>
                  <dd className="text-sm font-medium text-gray-900">{video.industry}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-sm text-gray-600">Era</dt>
                  <dd className="text-sm font-medium text-gray-900">{video.era}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-sm text-gray-600">Type</dt>
                  <dd className="text-sm font-medium text-gray-900">{video.type}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-sm text-gray-600">Usage Rights</dt>
                  <dd className="text-sm font-medium text-gray-900">{video.usageRights}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-sm text-gray-600">Monetization Potential</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {(video.monetizationPotential * 100).toFixed(0)}%
                  </dd>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 