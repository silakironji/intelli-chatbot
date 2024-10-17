"use client"
import { DashComponent } from "@/components/component/dash";
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';



export default function Page() {

  return (
    <div className=" container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Command Center</h1>
      <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
      <DashComponent />
      </Suspense>      
    </div>
  );
}