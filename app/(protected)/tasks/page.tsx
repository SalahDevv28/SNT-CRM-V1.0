'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTasks } from '@/hooks/useTasks';
import { useTaskStore } from '@/stores/taskStore';
import { Button } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckSquare, 
  Clock, 
  AlertCircle,
  Calendar
} from 'lucide-react';

const TASK_STATUSES = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-800' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
];

const TASK_PRIORITIES = [
  { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
  { value: 'medium', label: 'Medium', color: 'bg-orange-100 text-orange-800' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' },
];

export default function TasksPage() {
  const router = useRouter();
  const { tasks, loading, insert, update, remove } = useTasks();
  const { filters, setFilters } = useTaskStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTasks = tasks.filter(task => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const pendingTasks = filteredTasks.filter(t => t.status !== 'completed');
  const completedTasks = filteredTasks.filter(t => t.status === 'completed');

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <CheckSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1">Manage your tasks and to-dos</p>
        </div>
        <Button onClick={() => router.push('/tasks/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks by title or description..."
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                {TASK_STATUSES.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={filters.priority || ''}
                onChange={(e) => setFilters({ priority: e.target.value || undefined })}
              >
                <option value="">All Priorities</option>
                {TASK_PRIORITIES.map(priority => (
                  <option key={priority.value} value={priority.value}>{priority.label}</option>
                ))}
              </select>
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

      {/* Tasks List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <CheckSquare className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new task.
          </p>
          <div className="mt-6">
            <Button onClick={() => router.push('/tasks/new')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Pending Tasks */}
          {pendingTasks.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Pending Tasks ({pendingTasks.length})
              </h2>
              <div className="space-y-3">
                {pendingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <input
                            type="checkbox"
                            checked={task.status === 'completed'}
                            onChange={async () => {
                              await update(task.id, { 
                                status: task.status === 'completed' ? 'new' : 'completed',
                                completed_at: task.status === 'completed' ? null : new Date().toISOString()
                              });
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <h3 className="font-medium text-gray-900">{task.title}</h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${TASK_PRIORITIES.find(p => p.value === task.priority)?.color}`}>
                            {task.priority}
                          </span>
                        </div>
                        {task.description && (
                          <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {task.due_date && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>Due: {formatDate(task.due_date)}</span>
                            </div>
                          )}
                          {task.assigned_to_user_id && (
                            <div className="flex items-center gap-1">
                              <span>Assigned</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getPriorityIcon(task.priority)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Completed Tasks ({completedTasks.length})
              </h2>
              <div className="space-y-3 opacity-75">
                {completedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-gray-50 border rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <input
                            type="checkbox"
                            checked={true}
                            onChange={async () => {
                              await update(task.id, { 
                                status: 'new',
                                completed_at: null
                              });
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <h3 className="font-medium text-gray-500 line-through">{task.title}</h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${TASK_PRIORITIES.find(p => p.value === task.priority)?.color}`}>
                            {task.priority}
                          </span>
                        </div>
                        {task.description && (
                          <p className="text-gray-500 text-sm mb-3">{task.description}</p>
                        )}
                        <div className="text-sm text-gray-400">
                          Completed {task.completed_at ? formatDate(task.completed_at) : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
