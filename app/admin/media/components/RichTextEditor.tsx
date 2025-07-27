'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import { useCallback, useEffect, useState } from 'react';
import { uploadMediaImage } from '@/lib/media-storage';
import Button from '@/shared/components/ui/Button';
import Input from '@/shared/components/ui/Input';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link as LinkIcon,
  Code,
  Heading1,
  Heading2,
  Undo,
  Redo,
  Unlink,
  Play,
  X,
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
}

export function RichTextEditor({
  content,
  onChange,
  className,
}: RichTextEditorProps) {
  const [showYouTubeDialog, setShowYouTubeDialog] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        validate: (href) => /^https?:\/\//.test(href),
      }),
      Youtube.configure({
        width: 640,
        height: 480,
        ccLanguage: 'en',
        interfaceLanguage: 'en',
      }),
    ],
    content: content || '<p></p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    // Update editor content when the content prop changes (e.g., when loading existing content)
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) return;

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(async () => {
    if (!editor) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      if (input.files && input.files.length > 0) {
        try {
          const file = input.files[0];
          const imageUrl = await uploadMediaImage(file);
          editor.chain().focus().setImage({ src: imageUrl }).run();
        } catch (error) {
          console.error('Failed to upload image:', error);
          alert('Failed to upload image. Please try again.');
        }
      }
    };
    input.click();
  }, [editor]);

  const addYouTubeVideo = useCallback(() => {
    setShowYouTubeDialog(true);
  }, []);

  const handleYouTubeSubmit = useCallback(() => {
    if (!editor || !youtubeUrl) return;

    try {
      editor.commands.setYoutubeVideo({
        src: youtubeUrl,
        width: 640,
        height: 480,
      });
      setYoutubeUrl('');
      setShowYouTubeDialog(false);
    } catch (error) {
      console.error('Failed to add YouTube video:', error);
      alert('Failed to add YouTube video. Please check the URL and try again.');
    }
  }, [editor, youtubeUrl]);

  const handleYouTubeCancel = useCallback(() => {
    setYoutubeUrl('');
    setShowYouTubeDialog(false);
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <div className={`border rounded-md p-1 flex flex-col items-start ${className || ''}`}>

      {/* Toolbar */}
      <div className="w-full flex flex-wrap gap-1 p-2 rounded-t-md bg-slate-200 sticky top-16 z-20">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-gray-200' : ''}
          aria-label="Bold">
          <Bold className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-gray-200' : ''}
          aria-label="Italic">
          <Italic className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''
          }
          aria-label="Heading 1">
          <Heading1 className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''
          }
          aria-label="Heading 2">
          <Heading2 className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
          aria-label="Bullet List">
          <List className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
          aria-label="Ordered List">
          <ListOrdered className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'bg-gray-200' : ''}
          aria-label="Code Block">
          <Code className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={setLink}
          className={editor.isActive('link') ? 'bg-gray-200' : ''}
          aria-label="Add Link">
          <LinkIcon className="w-4 h-4" />
        </Button>

        {editor.isActive('link') && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => editor.chain().focus().unsetLink().run()}
            aria-label="Remove Link">
            <Unlink className="w-4 h-4" />
          </Button>
        )}

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={addImage}
          aria-label="Add Image">
          <ImageIcon className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={addYouTubeVideo}
          aria-label="Add YouTube Video">
          <Play className="w-4 h-4" />
        </Button>

        <div className="ml-auto flex gap-1">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            aria-label="Undo">
            <Undo className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            aria-label="Redo">
            <Redo className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <EditorContent editor={editor} className="min-h-[300px] w-full p-2" />

      {/* YouTube Dialog */}
      {showYouTubeDialog && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add YouTube Video</h3>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleYouTubeCancel}
                aria-label="Close">
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <Input
                label="YouTube URL"
                name="youtubeUrl"
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
              
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleYouTubeCancel}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleYouTubeSubmit}
                  disabled={!youtubeUrl}>
                  Add Video
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
