'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProperties } from '@/hooks/useProperties';
import { usePropertyStore } from '@/stores/propertyStore';
import { Button } from '@/components/ui';
import { formatCurrency, formatDate } from '@/lib/utils';
import { 
  Plus, 
  Search, 
  Filter, 
  Home,
  MapPin,
  Bed,
  Bath,
  Square
} from 'lucide-react';

const PROPERTY_TYPES = [
  { value: 'single_family', label: 'Single Family' },
  { value: 'condo', label: 'Condo' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'land', label: 'Land' },
  { value: 'multi_family', label: 'Multi-Family' },
  { value: 'commercial', label: 'Commercial' },
];

const PROPERTY_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'sold', label: 'Sold' },
  { value: 'off_market', label: 'Off Market' },
];

export default function PropertiesPage() {
  const router = useRouter();
  const { properties, loading, insert, update, remove } = useProperties();
  const { filters, setFilters } = usePropertyStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProperties = properties.filter(prop => {
    if (filters.status && prop.status !== filters.status) return false;
    if (filters.type && prop.property_type !== filters.type) return false;
    if (filters.city && !prop.city?.toLowerCase().includes(filters.city!.toLowerCase())) return false;
    if (filters.minPrice && prop.price && prop.price < filters.minPrice!) return false;
    if (filters.maxPrice && prop.price && prop.price > filters.maxPrice!) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        prop.address.toLowerCase().includes(query) ||
        prop.city?.toLowerCase().includes(query) ||
        prop.state?.toLowerCase().includes(query) ||
        (prop.description?.toLowerCase().includes(query))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
          <p className="text-gray-600 mt-1">Manage your property listings</p>
        </div>
        <Button onClick={() => router.push('/properties/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search properties by address, city, state..."
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

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={filters.status || ''}
                onChange={(e) => setFilters({ status: e.target.value || undefined })}
              >
                <option value="">All Statuses</option>
                {PROPERTY_STATUSES.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={filters.type || ''}
                onChange={(e) => setFilters({ type: e.target.value || undefined })}
              >
                <option value="">All Types</option>
                {PROPERTY_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                placeholder="Filter by city..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={filters.city || ''}
                onChange={(e) => setFilters({ city: e.target.value || undefined })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Price
              </label>
              <input
                type="number"
                placeholder="Min price..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={filters.minPrice || ''}
                onChange={(e) => setFilters({ minPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilters({})}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}

      {/* Properties Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading properties...</p>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="text-center py-12">
          <Home className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No properties</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new property listing.
          </p>
          <div className="mt-6">
            <Button onClick={() => router.push('/properties/new')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(`/properties/${property.id}`)}
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <Home className="h-16 w-16 text-gray-400" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {property.address}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin className="h-3 w-3" />
                  <span>{property.city}, {property.state} {property.zip_code}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-blue-600">
                    {property.price ? formatCurrency(property.price) : 'Price not set'}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    property.status === 'active' ? 'bg-green-100 text-green-800' :
                    property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    property.status === 'sold' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {property.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{property.bed_count || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.bath_count || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    <span>{property.sqft ? `${property.sqft.toLocaleString()} sqft` : 'N/A'}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {property.property_type?.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
