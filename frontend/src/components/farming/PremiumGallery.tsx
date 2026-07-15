import { motion } from "framer-motion";

const galleryImages = [
  { url: "/images/farm/3.webp", category: "Nature", span: "row-span-2 col-span-2" },
  { url: "/images/farm/8.jpg", category: "Farmers", span: "row-span-1 col-span-1" },
  { url: "/images/farm/4.jpg", category: "Tourism", span: "row-span-2 col-span-1" },
  { url: "/images/farm/11.jpg", category: "Ducks", span: "row-span-1 col-span-1" },
  { url: "/images/farm/13.avif", category: "Tea", span: "row-span-1 col-span-1" },
  { url: "/images/farm/20.webp", category: "Paddy", span: "row-span-1 col-span-2" },
  { url: "/images/farm/21.jpg", category: "Honey", span: "row-span-1 col-span-1" },
  { url: "/images/farm/6.jpg", category: "Bees", span: "row-span-1 col-span-1" },
  { url: "/images/farm/16.webp", category: "Apiary", span: "row-span-1 col-span-1" },
  { url: "/images/farm/19.jpg", category: "Bees", span: "row-span-1 col-span-1" },
  { url: "/images/farm/5.jpg", category: "Tradition", span: "row-span-1 col-span-1" },
];

export const PremiumGallery = () => {
  return (
    <section id="gallery" className="py-24 bg-[#111416]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-emerald-500 font-medium tracking-[0.2em] uppercase text-sm">Visual Journey</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mt-4">Captured Moments</h2>
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
