import type { CSSProperties } from "react";
import { portfolio } from "../site-data";

export function ProjectVisual({ project, large = false }: { project: (typeof portfolio)[number]; large?: boolean }) {
  return (
    <div className={`project-visual ${large ? "large" : ""}`} style={{ "--accent": project.accent } as CSSProperties}>
      <div className="mock-nav"><span /><span /><span /><i /></div>
      <div className="mock-body">
        <div className="mock-copy"><small>{project.eyebrow}</small><b>{project.mockTitle}</b><span /><span /><div className="mock-cta">Explorar</div></div>
        <div className="mock-art"><i /><i /><i /></div>
      </div>
    </div>
  );
}
