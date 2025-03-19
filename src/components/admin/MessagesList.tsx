
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
  is_read: boolean;
  image_url: string | null;
}

const MessagesList = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Nepavyko gauti žinučių');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: !currentStatus })
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Update local state
      setMessages(
        messages.map((message) =>
          message.id === id ? { ...message, is_read: !currentStatus } : message
        )
      );

      toast.success(`Žinutė pažymėta kaip ${!currentStatus ? 'skaityta' : 'neskaityta'}`);
    } catch (error) {
      console.error('Error updating message:', error);
      toast.error('Nepavyko atnaujinti žinutės būsenos');
    }
  };

  const getImageUrl = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('message_images')
        .createSignedUrl(path, 3600); // URL valid for 1 hour

      if (error) {
        throw error;
      }

      return data.signedUrl;
    } catch (error) {
      console.error('Error getting image URL:', error);
      toast.error('Nepavyko gauti nuotraukos');
      return null;
    }
  };

  const handleViewMessage = async (message: Message) => {
    setSelectedMessage(message);
    setImageUrl(null);
    
    // Get image URL if it exists
    if (message.image_url) {
      const url = await getImageUrl(message.image_url);
      setImageUrl(url);
    }
    
    setIsViewDialogOpen(true);
    
    // Mark as read if it's unread
    if (!message.is_read) {
      handleMarkAsRead(message.id, false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setMessageToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!messageToDelete) return;

    try {
      // First check if there's an image to delete
      const messageToBeDeleted = messages.find(m => m.id === messageToDelete);
      
      if (messageToBeDeleted?.image_url) {
        // Delete the image from storage
        const { error: storageError } = await supabase.storage
          .from('message_images')
          .remove([messageToBeDeleted.image_url]);
          
        if (storageError) {
          console.error('Error deleting image:', storageError);
          // Continue with message deletion even if image deletion fails
        }
      }
      
      // Delete the message from the database
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageToDelete);

      if (error) {
        throw error;
      }

      setMessages(messages.filter((message) => message.id !== messageToDelete));
      toast.success('Žinutė ištrinta');
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Nepavyko ištrinti žinutės');
    } finally {
      setDeleteDialogOpen(false);
      setMessageToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="spinner h-8 w-8 border-4 border-t-forest-500 border-forest-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-forest-700 mb-6">
        Gautos Žinutės ({messages.length})
      </h2>

      {messages.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Kol kas nėra jokių žinučių
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Būsena</TableHead>
                <TableHead>Vardas</TableHead>
                <TableHead>El. paštas</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="w-[80px]">Nuotrauka</TableHead>
                <TableHead className="text-right">Veiksmai</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message) => (
                <TableRow 
                  key={message.id}
                  className={message.is_read ? 'bg-gray-50' : 'bg-white'}
                >
                  <TableCell>
                    <span 
                      className={`inline-block w-3 h-3 rounded-full ${
                        message.is_read ? 'bg-gray-300' : 'bg-green-500'
                      }`}
                    />
                  </TableCell>
                  <TableCell>{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>
                    {format(new Date(message.created_at), 'yyyy-MM-dd HH:mm')}
                  </TableCell>
                  <TableCell>
                    {message.image_url ? (
                      <span className="text-forest-600">
                        <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewMessage(message)}
                    >
                      Peržiūrėti
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMarkAsRead(message.id, message.is_read)}
                    >
                      {message.is_read ? 'Neskaityta' : 'Skaityta'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteClick(message.id)}
                    >
                      Ištrinti
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* View Message Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Žinutė nuo {selectedMessage?.name}</DialogTitle>
            <DialogDescription>
              Gauta: {selectedMessage && format(new Date(selectedMessage.created_at), 'yyyy-MM-dd HH:mm')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Kontaktinė informacija</h4>
              <p className="mt-1">El. paštas: {selectedMessage?.email}</p>
              {selectedMessage?.phone && <p>Telefonas: {selectedMessage.phone}</p>}
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Žinutė</h4>
              <p className="mt-1 whitespace-pre-wrap">{selectedMessage?.message}</p>
            </div>

            {imageUrl && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Nuotrauka</h4>
                <div className="mt-2 border border-gray-200 rounded-md overflow-hidden">
                  <img 
                    src={imageUrl} 
                    alt="Pridėta nuotrauka" 
                    className="max-w-full h-auto max-h-96 object-contain"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              {selectedMessage && (
                <Button
                  onClick={() => {
                    handleMarkAsRead(selectedMessage.id, selectedMessage.is_read);
                    setIsViewDialogOpen(false);
                  }}
                >
                  Pažymėti kaip {selectedMessage.is_read ? 'neskaitytą' : 'skaitytą'}
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={() => setIsViewDialogOpen(false)}
              >
                Uždaryti
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ar tikrai norite ištrinti šią žinutę?</AlertDialogTitle>
            <AlertDialogDescription>
              Šis veiksmas yra negrįžtamas. Žinutė bus ištrinta visam laikui.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Atšaukti</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Ištrinti
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MessagesList;
