
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Sėkmingai atsijungėte');
      navigate('/admin');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Klaida atsijungiant');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex ${isMobile ? 'flex-col py-4 space-y-4' : 'flex-row justify-between items-center h-16'}`}>
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-forest-700">Kelmų Naikinimas - Žinutės</h1>
            </div>
            <div className={`${isMobile ? 'flex flex-col space-y-2 w-full' : 'flex flex-row space-x-4'}`}>
              <Button 
                variant="outline" 
                onClick={() => navigate("/")}
                className={isMobile ? "w-full" : ""}
              >
                Grįžti į pagrindinį puslapį
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className={isMobile ? "w-full" : ""}
              >
                Atsijungti
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
