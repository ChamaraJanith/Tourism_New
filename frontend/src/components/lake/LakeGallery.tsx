import { motion } from "framer-motion";

const galleryImages = [
  { url: "/images/lake/1.jpg", category: "Panoramic", span: "row-span-2 col-span-2" },
  { url: "/images/lake/3.jpg", category: "Nature", span: "row-span-2 col-span-1" },
  { url: "/images/lake/4.webp", category: "Sunset", span: "row-span-1 col-span-1" },
  { url: "/images/lake/5.webp", category: "Ecosystem", span: "row-span-1 col-span-1" },
  { url: "/images/lake/6.webp", category: "Wildlife", span: "row-span-1 col-span-2" },
  { url: "/images/lake/7.webp", category: "Navigation", span: "row-span-1 col-span-1" },
  { url: "/images/lake/8.webp", category: "Zen", span: "row-span-1 col-span-1" },
];

export const LakeGallery = () => {
  return (
    <section id="gallery" className="py-24 bg-[#111416]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-500 font-medium tracking-[0.2em] uppercase text-sm">Visual Journey</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 text-white">Waterfront Wonders</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense gap-4 auto-rows-[200px] md:auto-rows-[300px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`relative group overflow-hidden rounded-3xl border border-white/5 ${image.span}`}
            >
              <img
                src={image.url}
                alt={image.category}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
