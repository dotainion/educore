import { useEffect, useRef } from "react";

/**
 * Generic auto-scroll hook (horizontal or vertical)
 * Works with drag systems (like Kanban, sliders, canvases, etc.)
 *
 * Usage:
 * const { ref, isDraggingRef } = useAutoScroll();
 */
export const useAutoScroll = () => {
    const ref = useRef(null);
    const isDraggingRef = useRef(false);
    const mouse = useRef({ x: 0, y: 0 });

    // Track mouse position globally
    useEffect(() => {
        const handleMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    // Auto-scroll engine
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const EDGE = 120;
        const SPEED = 14;

        let frame;

        const loop = () => {
            if (isDraggingRef.current && el) {
                const rect = el.getBoundingClientRect();
                const x = mouse.current.x;
                const y = mouse.current.y;

                const EDGE = 120;
                const SPEED = 12;

                const maxScrollLeft = el.scrollWidth - el.clientWidth;
                const maxScrollTop = el.scrollHeight - el.clientHeight;

                // 👉 RIGHT
                if (x > rect.right - EDGE) {
                    el.scrollLeft = Math.min(el.scrollLeft + SPEED, maxScrollLeft);
                }

                // 👉 LEFT
                else if (x < rect.left + EDGE) {
                    el.scrollLeft = Math.max(el.scrollLeft - SPEED, 0);
                }

                // 👉 DOWN
                if (y > rect.bottom - EDGE) {
                    el.scrollTop = Math.min(el.scrollTop + SPEED, maxScrollTop);
                }

                // 👉 UP
                else if (y < rect.top + EDGE) {
                    el.scrollTop = Math.max(el.scrollTop - SPEED, 0);
                }
            }

            frame = requestAnimationFrame(loop);
        };

        loop();

        return () => cancelAnimationFrame(frame);
    }, []);

    return {
        ref,
        isDraggingRef,
    };
};