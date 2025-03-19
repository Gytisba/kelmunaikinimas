
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("kontaktai");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        toast.error("Galima įkelti tik nuotraukas.");
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Nuotrauka negali būti didesnė nei 5MB.");
        return;
      }
      
      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  const clearImageSelection = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let imageUrl = null;
      
      // Upload image if one is selected
      if (selectedImage) {
        const fileName = `${Date.now()}-${selectedImage.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('message_images')
          .upload(fileName, selectedImage);
          
        if (uploadError) {
          throw new Error(`Klaida įkeliant nuotrauką: ${uploadError.message}`);
        }
        
        imageUrl = fileName;
      }
      
      // Save message to database
      const { error } = await supabase
        .from('messages')
        .insert([
          { 
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            message: formData.message,
            image_url: imageUrl
          }
        ]);
        
      if (error) {
        throw error;
      }
      
      toast.success("Jūsų žinutė išsiųsta! Susisieksime su jumis artimiausiu metu.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
      clearImageSelection();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Klaida siunčiant žinutę. Prašome bandyti dar kartą.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontaktai" className="section-padding bg-forest-50">
      <div className={`section-container ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
        <h2 className="section-title">Susisiekite</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          <div>
            <p className="text-gray-700 mb-6">
              Jei turite kelmų, kuriuos norite pašalinti, ir ieškote patikimų 
              specialistų, susisiekite su mūsų komanda – pasirūpinsime, kad jūsų 
              sklypas būtų nepriekaištingai sutvarkytas!
            </p>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-forest-100 p-3 rounded-full mr-4">
                    <svg className="w-5 h-5 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-forest-700">Telefonas</h3>
                    <p className="text-gray-600">+370 600 00000</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-forest-100 p-3 rounded-full mr-4">
                    <svg className="w-5 h-5 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-forest-700">El. paštas</h3>
                    <p className="text-gray-600">info@kelmunaikinimas.lt</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-forest-100 p-3 rounded-full mr-4">
                    <svg className="w-5 h-5 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-forest-700">Adresas</h3>
                    <p className="text-gray-600">Vilnius, Lietuva</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Vardas
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Jūsų vardas"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    El. paštas
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="jusu@elpastas.lt"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefonas
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+370 600 00000"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Žinutė
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Jūsų žinutė..."
                  />
                </div>
                
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                    Nuotrauka (neprivaloma)
                  </label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="input-field"
                  />
                  
                  {imagePreview && (
                    <div className="mt-2 relative">
                      <div className="relative w-32 h-32 border border-gray-200 rounded overflow-hidden">
                        <img 
                          src={imagePreview} 
                          alt="Pasirinkta nuotrauka" 
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={clearImageSelection}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          aria-label="Pašalinti nuotrauką"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? "Siunčiama..." : "Siųsti užklausą"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
