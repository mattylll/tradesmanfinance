'use client';

import { type Author } from '@/data/authors';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Award, Briefcase, CheckCircle } from 'lucide-react';

interface AuthorBioProps {
  author: Author;
  variant?: 'full' | 'compact';
}

export function AuthorBio({ author, variant = 'full' }: AuthorBioProps) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ffd93d] flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">
            {author.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <p className="font-semibold text-white">{author.name}</p>
          <p className="text-sm text-gray-400">{author.role}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-[#ff6b35] to-[#ffd93d] flex items-center justify-center">
            <span className="text-white font-bold text-2xl md:text-3xl">
              {author.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h3 className="text-xl font-bold text-white">{author.name}</h3>
            <Badge className="bg-[#ff6b35]/10 text-[#ff6b35] border-none">
              {author.role}
            </Badge>
          </div>

          <p className="text-gray-400 mb-4 leading-relaxed">
            {author.bio}
          </p>

          {/* Credentials */}
          {author.credentials.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {author.credentials.map((credential) => (
                <div
                  key={credential}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 rounded-full text-sm"
                >
                  <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                  <span className="text-gray-300">{credential}</span>
                </div>
              ))}
            </div>
          )}

          {/* Expertise */}
          <div className="flex flex-wrap gap-2">
            {author.expertise.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-xs text-gray-400"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Experience badge */}
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <Briefcase className="h-4 w-4" />
            <span>{author.experience} experience in trade finance</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Simple author byline for article headers
 */
export function AuthorByline({ author }: { author: Author }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ffd93d] flex items-center justify-center">
        <span className="text-white font-bold text-sm">
          {author.name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
      <div>
        <p className="font-medium text-white">{author.name}</p>
        <p className="text-sm text-gray-500">{author.role}</p>
      </div>
    </div>
  );
}
