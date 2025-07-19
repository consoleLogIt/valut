import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SecretCard } from "@/components/SecretCard";
import { SecretFormModal } from "@/components/secretFormModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createSecret,
  fetchSecrets,
  updateSecret,
  deleteSecret,
} from "@/state/slices/secretsSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Dashboard() {
  const dispatch = useDispatch();
  const {
    items: secrets,
    loading,
    error,
  } = useSelector((state) => state.secrets);

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [secretToDelete, setSecretToDelete] = useState(null);
  const [editingSecret, setEditingSecret] = useState(null);
  const [revealedSecrets, setRevealedSecrets] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // loads the secrets
    dispatch(fetchSecrets());
  }, [dispatch]);

  // common handler for creating or updating  a secret
  const handleSubmitSecret = (secretData) => {
    if (isEditing && editingSecret) {
      // Update the secret
      dispatch(updateSecret({ _id: editingSecret._id, ...secretData }));
    } else {
      // Create the secret
      dispatch(createSecret(secretData));
    }
    setEditingSecret(null);
    setFormModalOpen(false);
  };

  const handleDeleteClick = (secret) => {
    setSecretToDelete(secret);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (secretToDelete) {
      dispatch(deleteSecret(secretToDelete._id));
      setIsDeleteModalOpen(false);
      setSecretToDelete(null);
    }
  };

  const toggleRevealSecret = (id) => {
    setRevealedSecrets((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-8 px-4 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Secrets</h1>
          <Button
            data-testid="add-secret-btn"
            onClick={() => {
              setEditingSecret({ name: "", value: "" });
              setFormModalOpen(true);
              setIsEditing(false);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Secret
          </Button>
        </div>

        <div className="grid gap-4">
          {loading ? (
            <h1>Loading...</h1>
          ) : error ? (
            <h1>Error: {error}</h1>
          ) : (
            secrets.map((secret) => (
              <SecretCard
                key={secret._id}
                secret={secret}
                onEdit={() => {
                  setEditingSecret(secret);
                  setFormModalOpen(true);
                  setIsEditing(true);
                }}
                onDelete={() => handleDeleteClick(secret)}
                onToggleReveal={toggleRevealSecret}
                isRevealed={!!revealedSecrets[secret._id]}
                isCopied={copiedId === secret._id}
              />
            ))
          )}
        </div>

        <SecretFormModal
          isOpen={formModalOpen}
          setFormModalOpen={(data) => {
            console.log({ data });
            setFormModalOpen(data);
          }}
          onSubmit={handleSubmitSecret}
          setEditingSecret={setEditingSecret}
          secret={editingSecret || { name: "", value: "" }}
          isEditing={isEditing}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Secret</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>
                Are you sure you want to delete the secret "
                {secretToDelete?.name}"?
              </p>
              <p className="text-sm text-gray-500 mt-2">
                This action cannot be undone.
              </p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
