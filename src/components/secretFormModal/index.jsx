import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export function SecretFormModal({
  isOpen,
  setFormModalOpen,
  onSubmit,
  secret,
  setEditingSecret,
  isEditing = false,
}) {
  const handleOnChange = (e) => {
    setEditingSecret({
      ...secret,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (secret.name && secret.value) {
      onSubmit(secret);
      if (!isEditing) {
        secret({ name: "", value: "" });
      }
      setFormModalOpen(false);
    } else {
      // TODO:notification
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setFormModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Secret" : "Add New Secret"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Secret Name
              </label>
              <Input
                id="name"
                name="name"
                value={secret.name}
                onChange={handleOnChange}
                placeholder="e.g., Database Password"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="value" className="text-sm font-medium">
                Secret Value
              </label>
              <Textarea
                id="value"
                name="value"
                value={secret.value}
                onChange={handleOnChange}
                placeholder="Paste your secret here..."
                className="min-h-[100px] font-mono"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Secrets are encrypted and only readable by you
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setFormModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Update Secret" : "Save Secret"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
