/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/6xya6SChfg2
 */
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import { Input } from "@/components/ui/input";

export function ChatWindow() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div
      key="1"
      className="flex flex-col h-full max-w-md mx-auto bg-white rounded-lg shadow-md"
    >
      <div className="flex flex-col h-full max-w-md mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between p-4 bg-[#007FFF] text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                alt="Ellie's avatar"
                src="/placeholder.svg?height=40&width=40"
              />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-xs font-semibold">Elli</p>
            </div>
          </div>
          <VolumeIcon className="text-white" />
        </div>
        <div className="flex flex-col items-start justify-between flex-1 p-4">
        <p className="font-bold text-gray-600 ">
                Elli typically replies in under 5 minutes
        </p>
          <div className="w-full">
            <div className="mb-4 text-sm">
              
            </div>
            <div className="flex flex-col space-y-2"></div>
          </div>
          {messages.map((m) => (
          <div
            key={m.id}
            className={`${
              m.role === 'user' ? 'flex items-end space-x-2' : 'flex items-start justify-end space-x-2'
            } px-4 py-2 space-y-2`}
          >
            {m.role === 'user' ? (
              <Avatar>
                <AvatarImage
                  alt="User"
                  src="/placeholder.svg?height=30&width=30"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            ) : (
              <Avatar>
                <AvatarImage
                  alt="Elli"
                  src="/placeholder.svg?height=30&width=30"
                />
                <AvatarFallback>E</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-xs px-4 py-2 text-sm text-gray-700 rounded-lg bg-blue-600 text-white p-3 rounded-lg ${
                m.role === 'user' ? 'bg-blue-100' : 'bg-gray-600'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
          <div className="w-full mt-4 ">
            <Button
              className="w-full text-white mb-2 bg-emerald-600 border border-gray-900"
              variant="default"
            >
              General Inquiries
            </Button>
            <Button className="w-full" variant="outline">
              Make a Reservation
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-2 bg-gray-200">
        <Button className="text-xs text-blue-600 bg-transparent hover:bg-gray-100">Directions</Button>
        <Button className="text-xs text-blue-600 bg-transparent hover:bg-gray-100">Prices</Button>
        <Button className="text-xs text-blue-600 bg-transparent hover:bg-gray-100">Amenities</Button>
      </div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between p-2 border-t">
          <Button className="bg-[#E0E7FF] rounded-full p-2">
          <MicIcon className="text-[#3730A3]" />
        </Button>
            <div className="flex items-center px-4 py-2 bg-white">
              <Input
                className="flex-grow w-full p-2 border border-gray-300 rounded shadow-xl"
                value={input}
                placeholder="How may I help you today?..."
                onChange={handleInputChange}
              />              
            </div>
            <Button className="bg-[#E0E7FF] rounded-full p-2" variant="secondary">
                <SendIcon type="submit" className="text-blue-600" />
              </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ArrowLeftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function VolumeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    </svg>
  );
}

function MicIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function SendIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
