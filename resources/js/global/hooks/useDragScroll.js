import { useRef, useState } from "react";

export const useDragScroll = () => {
    const ref = useRef(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const disableRef = useRef(null);

    const onMouseDown = (e) => {
        const el = ref.current;
        if (!el) return;

        isDown.current = true;
        el.classList.add('dragging');

        startX.current = e.pageX - el.offsetLeft;
        scrollLeft.current = el.scrollLeft;
    };

    const onMouseLeave = () => {
        isDown.current = false;
    };

    const onMouseUp = () => {
        isDown.current = false;
    };

    const onMouseMove = (e) => {
        if(disableRef.current) return;
        
        const el = ref.current;
        if (!isDown.current || !el) return;

        e.preventDefault();

        const x = e.pageX - el.offsetLeft;
        const walk = (x - startX.current) * 1.5; // speed
        el.scrollLeft = scrollLeft.current - walk;
    };

    const disable = (state) =>{
        disableRef.current = state;
    }

    return {
        ref,
        events: {
            onMouseDown,
            onMouseLeave,
            onMouseUp,
            onMouseMove,
        },
        disable
    };
};