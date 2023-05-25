import { useSession } from "next-auth/react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { ProfileImage } from "./ProfileImage";

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
    if (textArea == null) return
    textArea.style.height = "0"
    textArea.style.height = `${textArea.scrollHeight}px`
}

export function NewTweetForm() {
    const session = useSession();
    if (session.status !== "authenticated") return;

    return <Form />
}

function Form() {
        const session = useSession();
        const [inputValue, setInputValue] = useState('');
        const textAreaRef = useRef<HTMLTextAreaElement>();
        const InputRef = useCallback((textArea: HTMLTextAreaElement) => {
            updateTextAreaSize(textArea)
            textAreaRef.current = textArea
        }, []);
        
        useLayoutEffect(() => {
            updateTextAreaSize(textAreaRef.current);
        }, [inputValue]);
        
        if (session.status !== "authenticated") return null;
        
        return (
            <form className="flex flex-col gap-2 border-b px-4 py-2">
            <div className="flex gap-4">
                <ProfileImage src={session.data.user.image} />
                <textarea 
                ref={InputRef}
                style={{ height: 0 }}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none " placeholder="What's up, dog?"/>
            </div>
            <Button className="self-end">
                tweet
            </Button>
        </form>
    );
}
