
import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
    
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      
      <div className="flex-1 flex flex-col">
    
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-30">
          <button onClick={() => setIsOpen(true)}>
            <Menu size={24} />
          </button>

          <h1 className="font-semibold text-[#3F010C]">THATHWAM SAREES</h1>

          <div className="w-6" />
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  );
}