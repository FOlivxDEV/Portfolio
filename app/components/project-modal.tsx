"use client";

import { motion } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { portfolio } from "../site-data";
import { ProjectVisual } from "./project-visual";

export function ProjectModal({ project, close }: { project: (typeof portfolio)[number]; close: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button,[href],[tabindex]:not([tabindex='-1'])");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [close]);

  return (
    <motion.div className="modal-backdrop" onMouseDown={close} role="presentation"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div ref={dialogRef} className="browser-modal" role="dialog" aria-modal="true" aria-label={`Prévia de ${project.name}`}
        onMouseDown={event => event.stopPropagation()} initial={{ opacity: 0, y: 30, scale: .96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .97 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}>
        <div className="browser-bar">
          <div className="traffic"><i /><i /><i /></div>
          <div className="address"><ShieldCheck size={13} /> studiox.design/{project.slug}</div>
          <button ref={closeRef} onClick={close} aria-label="Fechar prévia"><X size={18} /></button>
        </div>
        <div className="browser-scroll"><ProjectVisual project={project} large /></div>
      </motion.div>
    </motion.div>
  );
}
