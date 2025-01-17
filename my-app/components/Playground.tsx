'use client'

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Edit, Send, Trash2, Plus, Upload, X, FileText } from 'lucide-react';

export default function Playground() {
  const [useCustomAssistants, setUseCustomAssistants] = useState<boolean>(false);
  const [selectedAssistant, setSelectedAssistant] = useState<string>("gpt-3.5-turbo");
  const [temperature, setTemperature] = useState<number>(0.7);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [systemPrompt, setSystemPrompt] = useState<string>("You are a helpful assistant.");
  const [customAssistants, setCustomAssistants] = useState<string[]>(["My Assistant 1", "My Assistant 2"]);
  const [newAssistantName, setNewAssistantName] = useState<string>("");
  const [isAddingAssistant, setIsAddingAssistant] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultModels = ["gpt-3.5-turbo", "gpt-4", "claude-v1"];

  const handleSendMessage = () => {
    if (newMessage) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'user', content: newMessage },
        { role: 'assistant', content: `Response from ${selectedAssistant}: ${newMessage}` },
      ]);
      setNewMessage("");
    }
  };

  const handleClearConversation = () => {
    setMessages([]);
  };

  const handleAddAssistant = () => {
    if (newAssistantName) {
      setCustomAssistants((prev) => [...prev, newAssistantName]);
      setNewAssistantName("");
      setIsAddingAssistant(false);
    }
  };

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      
      // Save to local storage
      const storedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
      const updatedFiles = [...storedFiles, ...newFiles.map(file => file.name)];
      localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
    }
  }, []);

  const handleRemoveFile = (fileName: string) => {
    setUploadedFiles((prevFiles) => prevFiles.filter(file => file.name !== fileName));
    
    // Remove from local storage
    const storedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
    const updatedFiles = storedFiles.filter((name: string) => name !== fileName);
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
  };

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFileUpload(event.dataTransfer.files);
  }, [handleFileUpload]);

  return (
    <Card className="w-full max-w-[95vw] mx-auto my-4 sm:my-8">
      <CardContent className="p-2 sm:p-6">
        <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] sm:h-[calc(100vh-8rem)] bg-background">
          {/* Side Panel */}
          <div className="w-full lg:w-1/4 lg:max-w-xs bg-gray-50 p-4 sm:p-4 border border-b lg:border-b-0 lg:border-r border-border overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Canvas </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="custom-assistant-mode"
                  checked={useCustomAssistants}
                  onCheckedChange={setUseCustomAssistants}
                />
                <Label htmlFor="custom-assistant-mode">Use Custom Assistants</Label>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {useCustomAssistants ? "Custom Assistant" : "Model"}
                </label>
                <Select 
                  value={selectedAssistant} 
                  onValueChange={setSelectedAssistant}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {(useCustomAssistants ? customAssistants : defaultModels).map((assistant) => (
                        <SelectItem key={assistant} value={assistant}>
                          {assistant}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {useCustomAssistants && (
                <Dialog open={isAddingAssistant} onOpenChange={setIsAddingAssistant}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Custom Assistant
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Assistant</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <Input
                        value={newAssistantName}
                        onChange={(e) => setNewAssistantName(e.target.value)}
                        placeholder="Enter assistant name"
                      />
                      <Button onClick={handleAddAssistant}>Add Assistant</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">System Prompt</label>
                <Textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="Enter system prompt"
                  className="h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Temperature: {temperature.toFixed(1)}</label>
                <Slider
                  value={[temperature]}
                  onValueChange={(value) => setTemperature(value[0])}
                  max={1}
                  step={0.1}
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="file-upload" className="block text-sm font-medium text-foreground mb-1">
                  Upload Files
                </label>
                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Files
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Files</DialogTitle>
                    </DialogHeader>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer"
                      onDragOver={onDragOver}
                      onDrop={onDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                        multiple
                      />
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-600">
                        Drag and drop files here, or click to select files
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
                {uploadedFiles.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {uploadedFiles.map((file) => (
                      <div key={file.name} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          <span className="text-sm text-foreground truncate">{file.name}</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveFile(file.name)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 p-4">
              <Card className="h-full">
                <ScrollArea className="h-full p-4">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <p className={`font-bold ${msg.role === 'user' ? 'text-primary' : 'text-secondary'}`}>
                        {msg.role === 'user' ? 'You:' : 'Assistant:'}
                      </p>
                      <p className={`${msg.role === 'user' ? 'bg-primary/10' : 'bg-secondary/10'} p-2 rounded-lg inline-block`}>
                        {msg.content}
                      </p>
                    </div>
                  ))}
                </ScrollArea>
              </Card>
            </div>
            <div className="p-2 sm:p-4 bg-background border-t border-border">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1 min-h-[80px] sm:min-h-0"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="flex space-x-2">
                  <Button className="flex-1 sm:flex-none" onClick={handleSendMessage}>
                    <Send className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Send</span>
                  </Button>
                  <Button className="flex-1 sm:flex-none" variant="outline" onClick={handleClearConversation}>
                    <Trash2 className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Clear</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}