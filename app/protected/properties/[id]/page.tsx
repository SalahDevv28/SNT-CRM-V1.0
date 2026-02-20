'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProperties } from '@/hooks/useProperties';
import { usePropertyStore } from '@/stores/propertyStore';
import { Button } from '@/components/ui';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { PropertyType } from '@/types/database';
import {
  ArrowLeft,
  Edit2,
  MapPin,
  Home,
  Bed,
  Bath,
  Square,
  Calendar,
  Phone,
  Mail,
  Heart,
  Share2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

interface EditFormState {
  address: string;
  city: string;
  state: string;
  zip_code: string;
  price: string;
  bed_count: string;
  bath_count: string;
  sqft: string;
  description: string;
  property_type: PropertyType | '';
}

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.id as string;
  
  const { properties, update } = useProperties();
  const { selectedProperty, setSelectedProperty } = usePropertyStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<EditFormState>({
    address: '',
    city: '',
    state: '',
    zip_code: '',
    price: '',
    bed_count: '',
    bath_count: '',
    sqft: '',
    description: '',
    property_type: '',
  });

  const property = properties.find(p => p.id === propertyId) || selectedProperty;

  useEffect(() => {
    if (property) {
      setSelectedProperty(property);
      setEditForm({
        address: property.address,
        city: property.city || '',
        state: property.state || '',
        zip_code: property.zip_code || '',
        price: property.price?.toString() || '',
        bed_count: property.bed_count?.toString() || '',
        bath_count: property.bath_count?.toString() || '',
        sqft: property.sqft?.toString() || '',
        description: property.description || '',
        property_type: property.property_type || '',
      });
    }
  }, [property, setSelectedProperty]);

  if (!property) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Property not found</p>
      </div>
    );
  }

  const handleSave = async () => {
    try {
      await update(propertyId, {
        address: editForm.address,
        city: editForm.city,
        state: editForm.state,
        zip_code: editForm.zip_code,
        price: editForm.price ? parseFloat(editForm.price) : null,
        bed_count: editForm.bed_count ? parseInt(editForm.bed_count) : null,
        bath_count: editForm.bath_count ? parseFloat(editForm.bath_count) : null,
        sqft: editForm.sqft ? parseInt(editForm.sqft) : null,
        description: editForm.description,
        property_type: editForm.property_type === '' ? null : editForm.property_type,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update property:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => router.push('/properties')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Properties
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property Image */}
          <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <Home className="h-24 w-24 text-gray-400" />
          </div>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={editForm.address}
                      onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={editForm.city}
                        onChange={(e) => setEditForm({...editForm, city: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={editForm.state}
                        onChange={(e) => setEditForm({...editForm, state: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={editForm.zip_code}
                        onChange={(e) => setEditForm({...editForm, zip_code: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        value={editForm.price}
                        onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Property Type
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={editForm.property_type}
                        onChange={(e) => setEditForm({...editForm, property_type: e.target.value as PropertyType})}
                      >
                        <option value="single_family">Single Family</option>
                        <option value="condo">Condo</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="land">Land</option>
                        <option value="multi_family">Multi-Family</option>
                        <option value="commercial">Commercial</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bedrooms
                      </label>
                      <input
                        type="number"
                        value={editForm.bed_count}
                        onChange={(e) => setEditForm({...editForm, bed_count: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bathrooms
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={editForm.bath_count}
                        onChange={(e) => setEditForm({...editForm, bath_count: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Square Feet
                      </label>
                      <input
                        type="number"
                        value={editForm.sqft}
                        onChange={(e) => setEditForm({...editForm, sqft: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      value={editForm.description}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {property.address}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{property.city}, {property.state} {property.zip_code}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-blue-600">
                        {property.price ? formatCurrency(property.price) : 'Price not set'}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        property.status === 'active' ? 'bg-green-100 text-green-800' :
                        property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        property.status === 'sold' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {property.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <Bed className="h-6 w-6 mx-auto text-gray-600 mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{property.bed_count || 'N/A'}</p>
                      <p className="text-sm text-gray-600">Bedrooms</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <Bath className="h-6 w-6 mx-auto text-gray-600 mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{property.bath_count || 'N/A'}</p>
                      <p className="text-sm text-gray-600">Bathrooms</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <Square className="h-6 w-6 mx-auto text-gray-600 mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{property.sqft?.toLocaleString() || 'N/A'}</p>
                      <p className="text-sm text-gray-600">Sq Ft</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <Home className="h-6 w-6 mx-auto text-gray-600 mb-2" />
                      <p className="text-lg font-bold text-gray-900 capitalize">{property.property_type?.replace('_', ' ') || 'N/A'}</p>
                      <p className="text-sm text-gray-600">Type</p>
                    </div>
                  </div>

                  {property.description && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{property.description}</p>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Property Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">List Date:</span>
                        <span className="ml-2">{property.list_date ? formatDate(property.list_date) : 'Not set'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Days on Market:</span>
                        <span className="ml-2">{property.days_on_market || 0} days</span>
                      </div>
                      <div>
                        <span className="text-gray-500">MLS ID:</span>
                        <span className="ml-2">{property.mls_id || 'Not set'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Last Synced:</span>
                        <span className="ml-2">{property.last_synced_at ? formatDate(property.last_synced_at) : 'Never'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Agent Card */}
          <Card>
            <CardHeader>
              <CardTitle>Listing Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-lg font-semibold text-blue-600">
                    {property.user_id ? 'AG' : '??'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {property.user_id ? 'Agent Name' : 'Unassigned'}
                  </p>
                  <p className="text-sm text-gray-500">Real Estate Agent</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Agent
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Agent
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full" onClick={() => router.push(`/leads/new?property=${propertyId}`)}>
                  <Heart className="h-4 w-4 mr-2" />
                  Create Lead Interest
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Showing
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Property
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Property Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Property Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Views</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Inquiries</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Showings</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Offers</span>
                  <span className="font-medium">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
