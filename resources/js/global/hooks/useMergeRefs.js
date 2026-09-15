export const useMergeRefs = (...refs) => {
    return (node) => {
        refs.forEach((ref) => {
            if (!ref) return;

            // function ref
            if (typeof ref === "function") {
                ref(node);
            }
            // object ref
            else {
                ref.current = node;
            }
        });
    };
};