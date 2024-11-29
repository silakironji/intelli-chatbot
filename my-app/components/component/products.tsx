/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/rb4snz5lJM5
 */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"

export function Products() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <Navbar />
      <header className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-900 leading-snug">
          We are building Africa’s most robust suite
          <br />
          of AI tools for businesses.
        </h1>
        <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto">
          Our first product is called Intelli Concierge, for customer support, a knowledgeable, humorous and
          professional speech conversational AI.
          <br />
          We are set to release more products;
        </p>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto italic">
          Experience the power of AI 
        </p>
        <div className="mt-8 mx-auto max-w-xs">
          <form className="flex flex-col space-y-4">
            <Input className="shadow-sm border border-gray-100" placeholder="Your Email Address" type="email" />
            <Button className="bg-blue-600 shadow-sm text-white hover:bg-blue-700">Book Demo</Button>
          </form>
        </div>
      </header>
    </div>
  )
}
