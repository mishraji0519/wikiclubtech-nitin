import { motion } from "framer-motion";

const WikimediaBackground = () => {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Original Teams hero background: soft blue, green, cyan and warm peach glow. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 8% 0%, rgba(190, 222, 255, 0.78) 0%, rgba(190, 222, 255, 0) 42%), radial-gradient(circle at 92% 0%, rgba(210, 248, 220, 0.82) 0%, rgba(210, 248, 220, 0) 44%), radial-gradient(circle at 50% 32%, rgba(211, 246, 239, 0.58) 0%, rgba(211, 246, 239, 0) 46%), radial-gradient(circle at 94% 92%, rgba(255, 237, 224, 0.72) 0%, rgba(255, 237, 224, 0) 38%), linear-gradient(180deg, #eef8ff 0%, #effcf7 48%, #fffdfa 100%)',
          }}
        />

        {/* Wikimedia-style orbiting dots from the original hero. */}
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
