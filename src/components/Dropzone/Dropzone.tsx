import { useId, useState, type DragEvent } from 'react';
import './Dropzone.css';

export interface DropzoneProps {
  accept?: string;
  hint?: string;
  onFiles?: (files: File[]) => void;
}

function size(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function Dropzone({ accept, hint = 'Up to 5 MB', onFiles }: DropzoneProps) {
  const id = useId();
  const [over, setOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const add = (list: FileList | null) => {
    if (!list?.length) return;
    const next = [...files, ...Array.from(list)];
    setFiles(next);
    onFiles?.(next);
  };
  const onDrop = (e: DragEvent) => { e.preventDefault(); setOver(false); add(e.dataTransfer.files); };

  return (
    <div className="ui-dropzone-wrap">
      <label
        htmlFor={id} className="ui-dropzone" data-over={over}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={onDrop}
      >
        <input id={id} type="file" multiple accept={accept} className="ui-dropzone__input" onChange={(e) => { add(e.target.files); e.target.value = ''; }} />
        <strong>Drag a file here</strong>
        <span>or click to browse. {hint}</span>
      </label>
      {files.length > 0 && (
        <ul className="ui-dropzone__list" aria-label="Selected files">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`}>
              <span className="ui-dropzone__name">{f.name}</span>
              <span className="ui-dropzone__size">{size(f.size)}</span>
              <button type="button" aria-label={`Remove ${f.name}`} onClick={() => { const n = files.filter((_, j) => j !== i); setFiles(n); onFiles?.(n); }}>✕</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
