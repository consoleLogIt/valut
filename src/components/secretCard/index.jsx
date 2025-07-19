import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Pencil, Trash2, Copy, Check } from "lucide-react";

export function SecretCard({
  secret,
  onEdit,
  onDelete,
  onToggleReveal,
  isRevealed,
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">{secret.name}</CardTitle>
          <div className="flex space-x-2">
            <Button
              data-testid={isRevealed ? "hide-secret-btn" : "reveal-secret-btn"}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onToggleReveal(secret._id)}
              title={isRevealed ? "Hide secret" : "Reveal secret"}
            >
              {isRevealed ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>

            <Button data-testid="edit-secret-btn"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(secret)}
              title="Edit secret"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button 
              data-testid="delete-secret-btn"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 hover:text-red-600"
              onClick={() => onDelete(secret.id)}
              title="Delete secret"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 p-3 rounded-md">
          <code data-testid={isRevealed ? "secret-value-revealed" : "secret-value-hidden"} className="break-all font-mono">
            {isRevealed ? secret.value : "•".repeat(12)}
          </code>
        </div>
      </CardContent>
    </Card>
  );
}
