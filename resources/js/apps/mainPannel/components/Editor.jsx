import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { forwardRef, useImperativeHandle, useState } from "react";

export const Editor = forwardRef(({onChange}, ref) =>{

    // TipTap editor
    const editor = useEditor({
        extensions: [StarterKit],
        content: '',
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useImperativeHandle(ref, ()=>({
        content: editor.getHTML(),
        setContent: (text)=> editor.commands.setContent(text)
    }), []);

    return(
        <div className="">
            <EditorContent editor={editor} className="form-control" />
            {/* simple toolbar */}
            <div className="d-flex gap-2 mt-2">
                <button 
                    type="button"
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    Bold
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    Italic
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => editor.chain().focus().setParagraph().run()}
                >
                    P
                </button>
            </div>
        </div>
    )
});