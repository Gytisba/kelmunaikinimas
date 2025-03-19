
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
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Initial session check:", session?.user?.id);
        setSession(session);
        
        if (session) {
          // Check if user is an admin
          try {
            const { data, error } = await supabase
              .from('admins')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle();
            
            console.log("Admin check result:", data, error);
            
            if (data && !error) {
              setIsAdmin(true);
              toast.success("Admin prieiga suteikta");
            } else {
              console.error("Admin check failed:", error);
              toast.error("Jūs neturite administratoriaus teisių");
            }
          } catch (adminCheckError) {
            console.error("Admin check exception:", adminCheckError);
            toast.error("Klaida tikrinant administratoriaus teises");
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
        console.log("Auth state changed:", event, session?.user?.id);
        setSession(session);
        
        if (session) {
          try {
            setLoading(true);
            // Check if user is an admin
            const { data, error } = await supabase
              .from('admins')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle();
            
            console.log("Auth change admin check:", data, error);
            
            if (data && !error) {
              setIsAdmin(true);
              toast.success("Admin prieiga suteikta");
            } else {
              console.error("Admin check failed on auth change:", error);
              setIsAdmin(false);
              toast.error("Jūs neturite administratoriaus teisių");
            }
          } catch (adminCheckError) {
            console.error("Auth change admin check exception:", adminCheckError);
            setIsAdmin(false);
            toast.error("Klaida tikrinant administratoriaus teises");
          } finally {
            setLoading(false);
          }
        } else {
          setIsAdmin(false);
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      // Successfully logged in
      toast.success("Sėkmingai prisijungta");
      
      // Check if the logged-in user is admin
      if (data.user) {
        const { data: adminData, error: adminError } = await supabase
          .from('admins')
          .select('*')
          .eq('id', data.user.id)
          .maybeSingle();
        
        console.log("Login admin check:", adminData, adminError);
        
        if (adminData && !adminError) {
          setIsAdmin(true);
          toast.success("Admin prieiga suteikta");
        } else {
          console.error("Admin check failed:", adminError);
          toast.error("Jūs neturite administratoriaus teisių");
        }
      }
    } catch (error: any) {
      console.error("Error logging in:", error);
      toast.error(error.message || "Nepavyko prisijungti");
    } finally {
      setLoggingIn(false);
      setPassword(''); // Clear password field
    }
  };

  // Ensure we show the login page if not authenticated or not admin
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner h-8 w-8 border-4 border-t-forest-500 border-forest-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) {
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

  // Show admin denied message if logged in but not admin
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold text-center text-red-600 mb-6">Prieiga uždrausta</h1>
          <p className="mb-6">Jūsų paskyra neturi administratoriaus teisių.</p>
          
          <div className="flex flex-col space-y-4">
            <Button 
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/admin");
              }}
            >
              Atsijungti
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
            >
              Grįžti į pagrindinį puslapį
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Only render admin content if user is logged in and is admin
  return (
    <AdminLayout>
      <MessagesList />
    </AdminLayout>
  );
};

export default Admin;
