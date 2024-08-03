import { useState, useEffect, useRef } from 'react';
import ConversationHeader from './conversationsHeader';
import MessageHistory from './messageHistory';
import MessageInput from './messageInput';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Conversation } from './types';

interface ConversationViewProps {
  conversation: Conversation | null;
}

const ConversationView: React.FC<ConversationViewProps> = ({ conversation }) => {

  useEffect(() => {
  }, [conversation]);

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Select a conversation to view details</p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col h-full p-4 gap-2">
        <ConversationHeader conversation={conversation} />        
          <MessageHistory messages={conversation.messages} />          
        <MessageInput 
          customerNumber={conversation.customer_number || conversation.recipient_id}
        />
      </div>
    </TooltipProvider>
  );
}

export default ConversationView;
