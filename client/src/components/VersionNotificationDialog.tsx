import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useVersionNotification } from '@/hooks/useVersionNotification';
import { useToast } from '@/hooks/use-toast';
import { Bell } from 'lucide-react';

interface VersionNotificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isManualView?: boolean;
}

export const VersionNotificationDialog: React.FC<VersionNotificationDialogProps> = ({
  isOpen,
  onClose,
  isManualView = false
}) => {
  const { versionData, updateNotificationPreference } = useVersionNotification();
  const { toast } = useToast();
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleClose = async () => {
    if (dontShowAgain && !isManualView) {
      try {
        await updateNotificationPreference.mutateAsync(false);
        toast({
          title: "Preferência atualizada",
          description: "Você não receberá mais notificações de versão automaticamente.",
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível atualizar a preferência.",
          variant: "destructive",
        });
      }
    }
    onClose();
  };

  if (!versionData?.hasVersion) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-500" />
            Novidades e Atualizações
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">
                Sistema SimpleDFe - Última Atualização
              </h3>
              <div className="text-sm text-blue-800 whitespace-pre-wrap">
                {versionData.content}
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex flex-col gap-3">
          {!isManualView && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dont-show-again"
                checked={dontShowAgain}
                onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
              />
              <label htmlFor="dont-show-again" className="text-sm text-gray-600">
                Não mostrar notificações de versão automaticamente
              </label>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Fechar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};