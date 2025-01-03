'use client';

import { useState, useEffect } from 'react';
import { useOrganizationList } from "@clerk/nextjs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from 'lucide-react';
import { CreateAssistantData } from '@/types/assistant';

interface CreateAssistantDialogProps {
  onAssistantCreated: () => void;
}

export function CreateAssistantDialog({ onAssistantCreated }: CreateAssistantDialogProps) {
  const { userMemberships, isLoaded } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    prompt: '',
  });
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (isLoaded && userMemberships?.data?.length > 0) {
      setSelectedOrganizationId(userMemberships.data[0].organization.id);
    }
  }, [isLoaded, userMemberships]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrganizationId) {
      toast({
        title: "Error",
        description: "Please select an organization",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const data: CreateAssistantData = {
        ...formData,
        organizationId: selectedOrganizationId,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/assistants/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create assistant');
      }

      toast({
        title: "Success",
        description: "Assistant created successfully",
      });
      setOpen(false);
      onAssistantCreated();
      setFormData({ name: '', prompt: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create assistant",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-[240px] w-full border-dashed">
          <Plus className="mr-2 h-5 w-5" />
          Create Assistant
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Assistant</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Organization</label>
            <Select
              value={selectedOrganizationId}
              onValueChange={setSelectedOrganizationId}
              disabled={!isLoaded}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {isLoaded && userMemberships?.data?.map((membership) => (
                    <SelectItem key={membership.organization.id} value={membership.organization.id}>
                      {membership.organization.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Input
              placeholder="Assistant name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Assistant prompt/instructions"
              value={formData.prompt}
              onChange={(e) => setFormData((prev) => ({ ...prev, prompt: e.target.value }))}
              required
              className="min-h-[100px]"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Assistant"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
