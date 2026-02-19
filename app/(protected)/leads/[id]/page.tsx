'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLeads } from '@/hooks/useLeads';
import { useInteractions } from '@/hooks/useInteractions';
import { useLeadStore } from '@/stores/leadStore';
import { Button } from '@/components/ui';
import { formatPhoneNumber, formatDate, formatDateTime } from '@/lib/utils';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  DollarSign,
  Star,
  MessageSquare,
  Calendar,
  FileText,
  Home,
  Plus,
  Edit2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

const TABS = [
  { id: 'profile', label: 'Profile', icon: FileText },
  { id: 'activity', label: 'Activity', icon: MessageSquare },
  { id: 'properties', label: 'Properties', icon: Home },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'notes', label: 'Notes', icon: MessageSquare },
];

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const leadId = params.id as string;
  
  const { leads, update } = useLeads();
  const { interactions, insert: addInteraction } = useInteractions();
  const { selectedLead, setSelectedLead } = useLeadStore();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const lead = leads.find(l => l.id === leadId) || selectedLead;

  useEffect(() => {
    if (lead) {
      setSelectedLead(lead);
      setEditForm({
        first_name: lead.first_name,
        last_name: lead.last_name,
        email: lead.email || '',
        phone: lead.phone || '',
        notes: lead.notes || '',
      });
    }
  }, [lead, setSelectedLead]);

  if (!lead) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Lead not found</p>
      </div>
    );
  }

  const leadInteractions = interactions.filter(i => i.lead_id === leadId);

  const handleSaveProfile = async () => {
    try {
      await update(leadId, {
        first_name: editForm.first_name,
        last_name: editForm.last_name,
        email: editForm.email,
        phone: editForm.phone,
        notes: editForm.notes,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update lead:', error);
    }
  };

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push('/leads')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {lead.first_name} {lead.last_name}
            </h1>
            <div className="flex items-center gap-4 mt-1">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                lead.status === 'prospecting' ? 'bg-yellow-100 text-yellow-800' :
                lead.status === 'nurturing' ? 'bg-orange-100 text-orange-800' :
                lead.status === 'under_contract' ? 'bg-green-100 text-green-800' :
                lead.status === 'closed' ? 'bg-purple-100 text-purple-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {lead.status.replace('_', ' ')}
              </span>
              <div className="flex items-center gap-1">
                <Star className={`h-4 w-4 ${getScoreColor(lead.score)}`} />
                <span className={`text-sm font-medium ${getScoreColor(lead.score)}`}>
                  {getScoreLabel(lead.score)} ({lead.score})
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button onClick={() => router.push(`/leads/${leadId}/interactions/new`)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Interaction
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'profile' && (
          <Card>
            <CardHeader>
              <CardTitle>Lead Profile</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={editForm.first_name}
                        onChange={(e) => setEditForm({...editForm, first_name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={editForm.last_name}
                        onChange={(e) => setEditForm({...editForm, last_name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      rows={4}
                      value={editForm.notes}
                      onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Contact Information</h4>
                      <div className="space-y-2">
                        {lead.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span>{lead.email}</span>
                          </div>
                        )}
                        {lead.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span>{formatPhoneNumber(lead.phone)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Property Criteria</h4>
                      <div className="space-y-2">
                        {(lead.budget_min || lead.budget_max) && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            <span>
                              {lead.budget_min ? `$${lead.budget_min.toLocaleString()}` : ''}
                              {lead.budget_min && lead.budget_max ? ' - ' : ''}
                              {lead.budget_max ? `$${lead.budget_max.toLocaleString()}` : ''}
                            </span>
                          </div>
                        )}
                        {lead.property_type && (
                          <div className="flex items-center gap-2">
                            <Home className="h-4 w-4 text-gray-400" />
                            <span className="capitalize">{lead.property_type.replace('_', ' ')}</span>
                          </div>
                        )}
                        {lead.location_preference && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span>{lead.location_preference}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {lead.notes && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Notes</h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{lead.notes}</p>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Lead Source:</span>
                        <span className="ml-2 capitalize">{lead.lead_source.replace('_', ' ')}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Created:</span>
                        <span className="ml-2">{formatDate(lead.created_at)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Last Contact:</span>
                        <span className="ml-2">
                          {lead.last_contact_at ? formatDate(lead.last_contact_at) : 'Never'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Next Follow-up:</span>
                        <span className="ml-2">
                          {lead.next_follow_up ? formatDate(lead.next_follow_up) : 'Not set'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 'activity' && (
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {leadInteractions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No activity yet. Add your first interaction.</p>
              ) : (
                <div className="space-y-4">
                  {leadInteractions
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .map((interaction) => (
                      <div key={interaction.id} className="flex gap-4 pb-4 border-b last:border-0">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <MessageSquare className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-gray-900 capitalize">
                              {interaction.type}
                            </p>
                            <span className="text-sm text-gray-500">
                              {formatDateTime(interaction.created_at)}
                            </span>
                          </div>
                          <p className="text-gray-700">{interaction.description}</p>
                          {interaction.notes && (
                            <p className="text-sm text-gray-500 mt-2">{interaction.notes}</p>
                          )}
                          {interaction.duration_minutes && (
                            <p className="text-sm text-gray-500 mt-1">
                              Duration: {interaction.duration_minutes} minutes
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 'properties' && (
          <Card>
            <CardHeader>
              <CardTitle>Properties Viewed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-8">Properties linked to this lead will appear here.</p>
            </CardContent>
          </Card>
        )}

        {activeTab === 'documents' && (
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-8">Uploaded documents will appear here.</p>
            </CardContent>
          </Card>
        )}

        {activeTab === 'notes' && (
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-8">Add notes about this lead.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
