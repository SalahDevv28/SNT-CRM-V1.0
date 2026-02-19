'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLeads } from '@/hooks/useLeads';
import { Button } from '@/components/ui';
import { useAuthStore } from '@/stores/authStore';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import type { Lead } from '@/types/database';

export default function NewLeadPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { insert } = useLeads();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    budget_min: '',
    budget_max: '',
    property_type: '',
    location_preference: '',
    lead_source: 'other',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user?.id) {
        toast.error('You must be logged in to create a lead');
        setLoading(false);
        return;
      }

      const leadData: Partial<Lead> = {
        user_id: user.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email || null,
        phone: formData.phone || null,
        budget_min: formData.budget_min ? parseFloat(formData.budget_min) : null,
        budget_max: formData.budget_max ? parseFloat(formData.budget_max) : null,
        property_type: formData.property_type as 'single_family' | 'condo' | 'townhouse' | 'land' | 'multi_family' | 'commercial' | null,
        location_preference: formData.location_preference || null,
        lead_source: formData.lead_source as 'website' | 'referral' | 'cold_call' | 'email' | 'social_media' | 'mls' | 'other',
        status: 'new',
        score: 0,
        notes: formData.notes || null,
      };

      const { error } = await insert(leadData);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Lead created successfully!');
        router.push('/leads');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Add New Lead</h1>
        <p className="text-gray-600 mt-1">Enter lead information below</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              name="first_name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              name="last_name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Budget ($)
            </label>
            <input
              type="number"
              name="budget_min"
              min="0"
              step="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.budget_min}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Budget ($)
            </label>
            <input
              type="number"
              name="budget_max"
              min="0"
              step="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.budget_max}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Type
            </label>
            <select
              name="property_type"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.property_type}
              onChange={handleChange}
            >
              <option value="">Select property type</option>
              <option value="single_family">Single Family</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="land">Land</option>
              <option value="multi_family">Multi-Family</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lead Source
            </label>
            <select
              name="lead_source"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.lead_source}
              onChange={handleChange}
            >
              <option value="website">Website</option>
              <option value="referral">Referral</option>
              <option value="cold_call">Cold Call</option>
              <option value="email">Email</option>
              <option value="social_media">Social Media</option>
              <option value="mls">MLS</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location Preference
          </label>
          <input
            type="text"
            name="location_preference"
            placeholder="e.g., Downtown, Suburbs, etc."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.location_preference}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            name="notes"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional information about the lead..."
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Create Lead
          </Button>
        </div>
      </form>
    </div>
  );
}
