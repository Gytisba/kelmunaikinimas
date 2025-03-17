
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import MessagesList from "@/components/admin/MessagesList";
import AdminLayout from "@/components/admin/AdminLayout";

const Admin = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        
        if (session) {
          // Check if user is an admin using the data query
          const { data, error } = await supabase
            .from('admins')
            .select('*')
            .eq('id', session.user.id);
          
          if (data && data.length > 0 && !error) {
            setIsAdmin(true);
          } else {
            console.error("Admin check failed:", error);
            toast.error("Jūs neturite administratoriaus teisių");
            await supabase.auth.signOut();
            setSession(null);
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
        toast.error("Įvyko klaida tikrinant sesiją");
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setLoading(true);
        
        try {
          if (session) {
            // Check if user is an admin
            const { data, error } = await supabase
              .from('admins')
              .select('*')
              .eq('id', session.user.id);
            
            if (data && data.length > 0 && !error) {
              setIsAdmin(true);
            } else {
              console.error("Admin check failed:", error);
              toast.error("Jūs neturite administratoriaus teisių");
              await supabase.auth.signOut();
              setSession(null);
            }
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Auth state change error:", error);
          setIsAdmin(false);
        } finally {
          setLoading(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      toast.success("Sėkmingai prisijungta");
    } catch (error: any) {
      console.error("Error logging in:", error);
      toast.error(error.message || "Nepavyko prisijungti");
    } finally {
      setLoggingIn(false);
      setPassword(''); // Clear password field
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner h-8 w-8 border-4 border-t-forest-500 border-forest-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session || !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center text-forest-700 mb-6">Admin Prisijungimas</h1>
          
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  El. paštas
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Slaptažodis
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loggingIn}
                >
                  {loggingIn ? "Jungiamasi..." : "Prisijungti"}
                </Button>
              </div>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <Button 
              variant="link" 
              onClick={() => navigate("/")}
            >
              Grįžti į pagrindinį puslapį
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <MessagesList />
    </AdminLayout>
  );
};

export default Admin;
