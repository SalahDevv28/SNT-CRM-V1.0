'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLeads } from '@/hooks/useLeads';
import { useLeadStore } from '@/stores/leadStore';
import { Button } from '@/components/ui';
import { formatPhoneNumber, formatDate } from '@/lib/utils';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  Calendar,
  User,
  ArrowUpDown
} from 'lucide-react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { LeadCard } from '@/components/leads/LeadCard';

const LEAD_STATUSES = [
  { id: 'new', title: 'New', color: 'bg-blue-500' },
  { id: 'prospecting', title: 'Prospecting', color: 'bg-yellow-500' },
  { id: 'nurturing', title: 'Nurturing', color: 'bg-orange-500' },
  { id: 'under_contract', title: 'Under Contract', color: 'bg-green-500' },
  { id: 'closed', title: 'Closed', color: 'bg-purple-500' },
  { id: 'lost', title: 'Lost', color: 'bg-gray-500' },
];

export default function LeadsPage() {
  const router = useRouter();
  const { leads, loading, update } = useLeads();
  const { filters, setFilters } = useLeadStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const leadId = active.id as string;
    const newStatus = over.id as string;

    // Update lead status in database
    await update(leadId, { status: newStatus as any });
  };

  const getLeadsByStatus = (status: string) => {
    return leads.filter(lead => lead.status === status);
  };

  const activeLead = leads.find(lead => lead.id === activeId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600 mt-1">Manage your leads and track interactions</p>
        </div>
        <Button onClick={() => router.push('/leads/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Lead
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads by name, email, phone..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {LEAD_STATUSES.map((status) => (
            <div
              key={status.id}
              id={status.id}
              className="flex flex-col bg-gray-50 rounded-lg p-4 min-h-[500px]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${status.color}`} />
                  <h3 className="font-semibold text-gray-900">{status.title}</h3>
                  <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
                    {getLeadsByStatus(status.id).length}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              <SortableContext
                items={getLeadsByStatus(status.id).map(lead => lead.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex-1 space-y-3">
                  {getLeadsByStatus(status.id).map((lead) => (
                    <LeadCard key={lead.id} lead={lead} />
                  ))}
                </div>
              </SortableContext>
            </div>
          ))}
        </div>

        <DragOverlay>
          {activeLead ? (
            <div className="rotate-6 shadow-xl opacity-90">
              <LeadCard lead={activeLead} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
