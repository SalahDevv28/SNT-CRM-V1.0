'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useLeads } from '@/hooks/useLeads';
import { useProperties } from '@/hooks/useProperties';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { formatCurrency, formatDate } from '@/lib/utils';
import { 
  Users, 
  Home, 
  TrendingUp, 
  Calendar, 
  CheckSquare, 
  Activity,
  DollarSign,
  Target
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { metrics, setMetrics, loading } = useDashboardStore();
  const { leads } = useLeads();
  const { properties } = useProperties();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Calculate dashboard metrics
    const activeLeads = leads.filter(l => ['new', 'prospecting', 'nurturing', 'under_contract'].includes(l.status));
    const activeProperties = properties.filter(p => p.status === 'active');
    const totalLeads = leads.length;
    const totalProperties = properties.length;
    
    // Calculate revenue pipeline (sum of prices for leads under contract)
    const revenuePipeline = leads
      .filter(l => l.status === 'under_contract')
      .reduce((sum, lead) => {
        // This would typically be linked to properties with prices
        return sum; 
      }, 0);

    // Calculate conversion rate (closed deals / total leads)
    const closedDeals = leads.filter(l => l.status === 'closed').length;
    const conversionRate = totalLeads > 0 ? (closedDeals / totalLeads) * 100 : 0;

    setMetrics({
      totalLeads,
      activeLeads: activeLeads.length,
      totalProperties,
      activeProperties: activeProperties.length,
      upcomingShowings: 0, // TODO: Implement calendar integration
      pendingTasks: 0, // TODO: Implement task integration
      revenuePipeline,
      conversionRate,
    });
  }, [user, leads, properties, setMetrics]);

  if (!user) {
    return null;
  }

  const kpiCards = [
    {
      title: 'Total Leads',
      value: metrics.totalLeads,
      change: '+12%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Leads',
      value: metrics.activeLeads,
      change: '+5%',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Properties',
      value: metrics.totalProperties,
      change: '+2',
      icon: Home,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Revenue Pipeline',
      value: formatCurrency(metrics.revenuePipeline),
      change: '+18%',
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Upcoming Showings',
      value: metrics.upcomingShowings,
      change: 'This week',
      icon: Calendar,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Pending Tasks',
      value: metrics.pendingTasks,
      change: 'Due soon',
      icon: CheckSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Conversion Rate',
      value: `${metrics.conversionRate.toFixed(1)}%`,
      change: '+2.5%',
      icon: Target,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      title: 'Recent Activity',
      value: 'View All',
      change: '5 today',
      icon: Activity,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.first_name || user.last_name ? `${user.first_name} ${user.last_name}`.trim() : user.email}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your real estate business today.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{card.value}</div>
              <p className="text-xs text-gray-500 mt-1">{card.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            {leads.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No leads yet. Start by importing or adding leads.</p>
            ) : (
              <div className="space-y-4">
                {leads.slice(0, 5).map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <p className="font-medium text-gray-900">
                        {lead.first_name} {lead.last_name}
                      </p>
                      <p className="text-sm text-gray-500">{lead.email || lead.phone}</p>
                    </div>
                    <div className="text-right">
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
                      <p className="text-xs text-gray-500 mt-1">Score: {lead.score}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/leads')}
                className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <p className="font-medium text-gray-900">Add New Lead</p>
                <p className="text-sm text-gray-500">Create a new lead record</p>
              </button>
              <button
                onClick={() => router.push('/properties')}
                className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <p className="font-medium text-gray-900">Add Property</p>
                <p className="text-sm text-gray-500">List a new property</p>
              </button>
              <button
                onClick={() => router.push('/leads/import')}
                className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <p className="font-medium text-gray-900">Import Leads</p>
                <p className="text-sm text-gray-500">Bulk import from CSV</p>
              </button>
              <button
                onClick={() => router.push('/calendar')}
                className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <p className="font-medium text-gray-900">Schedule Showing</p>
                <p className="text-sm text-gray-500">Add calendar event</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Properties */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Properties</CardTitle>
        </CardHeader>
        <CardContent>
          {properties.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No properties listed yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {properties.slice(0, 6).map((property) => (
                <div key={property.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-gray-900 mb-2">
                    {property.address}, {property.city}, {property.state}
                  </h4>
                  <p className="text-lg font-bold text-blue-600 mb-2">
                    {property.price ? formatCurrency(property.price) : 'Price not set'}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{property.bed_count} beds</span>
                    <span>{property.bath_count} baths</span>
                    <span>{property.sqft} sqft</span>
                  </div>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      property.status === 'active' ? 'bg-green-100 text-green-800' :
                      property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      property.status === 'sold' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {property.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
