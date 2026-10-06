import { motion } from "framer-motion";

const WikimediaBackground = () => {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Visible hero gradient — kept underneath the neutral reference grid. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 18% 18%, rgba(191, 219, 254, 0.62) 0%, rgba(191, 219, 254, 0) 42%), radial-gradient(circle at 82% 20%, rgba(221, 214, 254, 0.58) 0%, rgba(221, 214, 254, 0) 44%), radial-gradient(circle at 72% 82%, rgba(186, 230, 253, 0.42) 0%, rgba(186, 230, 253, 0) 42%), #fbfdfc',
          }}
        />

        {/* Original animated gradient orbs */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-br from-blue-400/25 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-gradient-to-br from-violet-400/25 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.55, 0.35, 0.55] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orbiting Circles */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative w-96 h-96">
            <motion.div
              className="absolute w-4 h-4 bg-green-700 rounded-full top-0 left-1/2 -translate-x-1/2"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-4 h-4 bg-blue-800 rounded-full top-1/2 right-0 -translate-y-1/2"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
            />
            <motion.div
              className="absolute w-4 h-4 bg-red-600 rounded-full bottom-0 left-1/2 -translate-x-1/2"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
            />
          </div>
        </motion.div>
      </div>

      <style>{`
        header .container > div > p:first-of-type {
          display: none !important;
        }
      `}</style>
    </>
  );
};

export default WikimediaBackground;
