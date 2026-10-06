import { motion } from "framer-motion";

const WikimediaBackground = () => {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft static hero background matching the reference image. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 18% 18%, rgba(191, 219, 254, 0.62) 0%, rgba(191, 219, 254, 0) 42%), radial-gradient(circle at 82% 20%, rgba(221, 214, 254, 0.58) 0%, rgba(221, 214, 254, 0) 44%), radial-gradient(circle at 72% 82%, rgba(186, 230, 253, 0.42) 0%, rgba(186, 230, 253, 0) 42%), #fbfdfc",
          }}
        />
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
