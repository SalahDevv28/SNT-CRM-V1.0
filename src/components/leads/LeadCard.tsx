'use client';

import { useRouter } from 'next/navigation';
import { formatDate, formatPhoneNumber, generateInitials } from '@/lib/utils';
import type { Lead } from '@/types/database';
import { Card, CardContent } from '@/components/ui';
import { 
  Mail, 
  Phone, 
  MapPin, 
  DollarSign,
  Star,
  MoreHorizontal
} from 'lucide-react';

interface LeadCardProps {
  lead: Lead;
}

export function LeadCard({ lead }: LeadCardProps) {
  const router = useRouter();

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-600';
    if (score >= 30) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'Hot';
    if (score >= 30) return 'Warm';
    return 'Cold';
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => router.push(`/leads/${lead.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-sm font-semibold text-blue-600">
                {generateInitials(lead.first_name, lead.last_name)}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {lead.first_name} {lead.last_name}
              </p>
              <p className="text-sm text-gray-500">{lead.email || 'No email'}</p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Open context menu
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-2 text-sm">
          {lead.phone && (
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="h-3 w-3" />
              <span>{formatPhoneNumber(lead.phone)}</span>
            </div>
          )}
          
          {lead.location_preference && (
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-3 w-3" />
              <span>{lead.location_preference}</span>
            </div>
          )}

          {(lead.budget_min || lead.budget_max) && (
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="h-3 w-3" />
              <span>
                {lead.budget_min ? `$${lead.budget_min.toLocaleString()}` : ''}
                {lead.budget_min && lead.budget_max ? ' - ' : ''}
                {lead.budget_max ? `$${lead.budget_max.toLocaleString()}` : ''}
              </span>
            </div>
          )}
        </div>

        <div className="mt-3 pt-3 border-t flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className={`h-4 w-4 ${getScoreColor(lead.score)}`} />
            <span className={`text-sm font-medium ${getScoreColor(lead.score)}`}>
              {getScoreLabel(lead.score)} ({lead.score})
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {lead.last_contact_at ? (
              <span>Last contact: {formatDate(lead.last_contact_at)}</span>
            ) : (
              <span>No contact yet</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
