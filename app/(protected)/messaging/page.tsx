'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { 
  Mail, 
  MessageSquare, 
  Send, 
  Inbox,
  Star,
  Archive,
  Trash2,
  Plus
} from 'lucide-react';

export default function MessagingPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  const conversations = [
    { id: '1', name: 'John Doe', email: 'john@example.com', lastMessage: 'I\'m interested in the property on Main St', time: '10:30 AM', unread: 2 },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', lastMessage: 'Can we schedule a showing for tomorrow?', time: 'Yesterday', unread: 0 },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', lastMessage: 'Thank you for the information', time: '2 days ago', unread: 1 },
  ];

  const messages = [
    { id: '1', sender: 'John Doe', content: 'Hi, I saw your listing on 123 Main St', time: '10:00 AM', isInbound: true },
    { id: '2', sender: 'Me', content: 'Hello John! Yes, that property is still available. Would you like to schedule a showing?', time: '10:15 AM', isInbound: false },
    { id: '3', sender: 'John Doe', content: 'I\'m interested in the property on Main St. Can you tell me more about it?', time: '10:30 AM', isInbound: true },
  ];

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Conversations List */}
      <div className="w-1/3 border-r bg-white">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">Messages</h1>
            <Button size="icon" variant="ghost">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                selectedConversation === conversation.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900 truncate">
                      {conversation.name}
                    </p>
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <div className="ml-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">{conversation.unread}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Thread */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedConversation ? (
          <>
            {/* Header */}
            <div className="p-4 bg-white border-b flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">
                  {conversations.find(c => c.id === selectedConversation)?.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {conversations.find(c => c.id === selectedConversation)?.email}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Star className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Archive className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isInbound ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-md px-4 py-2 rounded-lg ${
                      message.isInbound
                        ? 'bg-white border'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-medium ${message.isInbound ? 'text-gray-900' : 'text-blue-100'}`}>
                        {message.sender}
                      </span>
                      <span className={`text-xs ${message.isInbound ? 'text-gray-500' : 'text-blue-200'}`}>
                        {message.time}
                      </span>
                    </div>
                    <p className={message.isInbound ? 'text-gray-700' : 'text-white'}>
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Compose */}
            <div className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No conversation selected</h3>
              <p className="mt-1 text-sm text-gray-500">
                Select a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
