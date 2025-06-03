
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, MessageSquare, Settings, Activity } from 'lucide-react';

interface MCPMessage {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'error';
}

interface MCPAgentProps {
  agentId: string;
  agentName: string;
  groupId?: string;
}

export function MCPAgent({ agentId, agentName, groupId }: MCPAgentProps) {
  const [messages, setMessages] = useState<MCPMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate connection to MCP agent
    setIsConnected(true);
    
    // Load initial agent message
    const welcomeMessage: MCPMessage = {
      id: '1',
      type: 'agent',
      content: `مرحباً! أنا ${agentName}، وكيل MCP الخاص بك. كيف يمكنني مساعدتك اليوم؟`,
      timestamp: new Date(),
      status: 'delivered'
    };
    setMessages([welcomeMessage]);
  }, [agentName]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: MCPMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: MCPMessage = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: `تم استلام رسالتك: "${inputMessage}". سأعمل على معالجة طلبك الآن.`,
        timestamp: new Date(),
        status: 'delivered'
      };

      setMessages(prev => [...prev.slice(0, -1), { ...userMessage, status: 'delivered' }, agentResponse]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle className="text-lg">{agentName}</CardTitle>
              <CardDescription>MCP Agent - {agentId}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isConnected ? "default" : "secondary"} className="gap-1">
              <Activity className="h-3 w-3" />
              {isConnected ? 'متصل' : 'غير متصل'}
            </Badge>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="h-64 overflow-y-auto border rounded-lg p-3 space-y-3 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border shadow-sm'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString('ar-SA', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border shadow-sm px-3 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="اكتب رسالتك هنا..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1"
          />
          <Button onClick={sendMessage} disabled={!inputMessage.trim() || isLoading}>
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
