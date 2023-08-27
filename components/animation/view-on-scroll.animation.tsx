import React, { ReactNode, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ViewOnScroll({ children }: { children: ReactNode }) {
    const boxVariant = {
        visible: { opacity: 1, transition: { duration: 1 }, y: 0 },
        hidden: { opacity: 0, y: 70 },
    };

    const control = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            control.start("visible");
        } else {
            control.start("hidden");
        }
    }, [control, inView]);

    return (
        <motion.div
            className="box"
            ref={ref}
            variants={boxVariant}
            initial="hidden"
            animate={control}
        >
            {children}
        </motion.div>
    );
}
