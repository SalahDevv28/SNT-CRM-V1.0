'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useLeads } from '@/hooks/useLeads';
import type { Lead } from '@/types/database';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import { 
  Users, 
  TrendingUp, 
  DollarSign,
  Target,
  Home,
  Activity
} from 'lucide-react';

export default function BrokerDashboardPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { metrics, setMetrics } = useDashboardStore();
  const { leads } = useLeads();

  // Define teamLeads at component scope with proper typing
  const teamLeads: Lead[] = leads; // In real app, filter by office_id

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role !== 'broker' && user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    // Calculate broker-specific metrics
    const closedDeals = teamLeads.filter((l: Lead) => l.status === 'closed').length;
    const totalRevenue = teamLeads
      .filter((l: Lead) => l.status === 'closed')
      .reduce((sum, lead) => sum + 0, 0); // Would sum linked property prices
    
    const conversionRate = teamLeads.length > 0 ? (closedDeals / teamLeads.length) * 100 : 0;
    const avgDaysOnMarket = 45; // Would calculate from properties

    setMetrics({
      totalLeads: teamLeads.length,
      activeLeads: teamLeads.filter((l: Lead) => ['new', 'prospecting', 'nurturing', 'under_contract'].includes(l.status)).length,
      totalProperties: 0, // TODO: fetch properties
      activeProperties: 0,
      upcomingShowings: 0,
      pendingTasks: 0,
      revenuePipeline: totalRevenue,
      conversionRate,
    });
  }, [user, leads, setMetrics, router, teamLeads]);

  if (!user || (user.role !== 'broker' && user.role !== 'admin')) {
    return null;
  }

  const teamMembers = [
    { id: '1', name: 'John Agent', email: 'john@example.com', deals: 12, revenue: 1250000, conversion: 15 },
    { id: '2', name: 'Jane Agent', email: 'jane@example.com', deals: 8, revenue: 890000, conversion: 12 },
    { id: '3', name: 'Bob Agent', email: 'bob@example.com', deals: 15, revenue: 2100000, conversion: 18 },
  ];

  const topPerformers = teamMembers
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Broker Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Team performance and business overview
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Team Leads
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{metrics.totalLeads}</div>
            <p className="text-xs text-gray-500 mt-1">
              {metrics.activeLeads} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Team Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(metrics.revenuePipeline)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Pipeline value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Closed Deals
            </CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {teamLeads.filter((l: Lead) => l.status === 'closed').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {metrics.conversionRate.toFixed(1)}% conversion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg Days on Market
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {metrics.revenuePipeline > 0 ? '45' : '0'}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              -5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Agent Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((agent, index) => (
                <div key={agent.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{agent.name}</p>
                      <p className="text-sm text-gray-500">{agent.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatCurrency(agent.revenue)}</p>
                    <p className="text-sm text-gray-500">{agent.deals} deals</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { agent: 'John Agent', action: 'Closed deal', details: '123 Main St - $450,000', time: '2 hours ago' },
                { agent: 'Jane Agent', action: 'New lead', details: 'Sarah Johnson - $350-450k', time: '4 hours ago' },
                { agent: 'Bob Agent', action: 'Showing scheduled', details: '456 Oak Ave - Saturday 2pm', time: '6 hours ago' },
                { agent: 'John Agent', action: 'Property listed', details: '789 Pine Rd - $625,000', time: '1 day ago' },
                { agent: 'Jane Agent', action: 'Lead converted', details: 'Mike Wilson - Under contract', time: '1 day ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.agent}</span> {activity.action}
                    </p>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead Assignment */}
      <Card>
        <CardHeader>
          <CardTitle>Unassigned Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            Leads that haven't been assigned to an agent yet will appear here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
