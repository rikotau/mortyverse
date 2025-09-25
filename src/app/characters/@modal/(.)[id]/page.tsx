"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import CharacterDetailPage from "../../[id]/page";

export default function CharacterModal() {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      <DialogContent className="z-50 max-w-lg bg-white rounded-xl p-6 shadow-xl">
        <DialogTitle className="sr-only">Character Detail</DialogTitle>
        <CharacterDetailPage />
      </DialogContent>
    </Dialog>
  );
}
