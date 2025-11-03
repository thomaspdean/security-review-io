"use client";

import { useEffect, useRef } from "react";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { java } from "@codemirror/lang-java";
import { lineNumbers } from "@codemirror/view";
import { Language } from "@/lib/types";

interface CodeViewerProps {
  value: string;
  language: Language;
  height?: string;
}

const languageMap: Record<Language, () => any> = {
  python: python,
  javascript: javascript,
  html: html,
  java: java,
  c: () => null, // C language support not available in CodeMirror 6, fallback to null
};

export function CodeViewer({ value, language, height = "600px" }: CodeViewerProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const langSupport = languageMap[language];
    const langExtension = langSupport ? langSupport() : null;

    const extensions = [
      lineNumbers(),
      EditorView.theme({
        "&": { height },
        ".cm-scroller": { overflow: "auto" },
        ".cm-content": { padding: "12px" },
      }),
      EditorView.editable.of(false), // Read-only
      EditorState.readOnly.of(true),
    ];

    if (langExtension) {
      extensions.push(langExtension);
    }

    const state = EditorState.create({
      doc: value,
      extensions,
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [value, language, height]);

  return (
    <div
      ref={editorRef}
      className="rounded-md border overflow-hidden"
      aria-label={`Code viewer for ${language} file`}
    />
  );
}

