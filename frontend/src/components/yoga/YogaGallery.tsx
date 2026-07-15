import { motion } from "framer-motion";

const yogaGallery = [
  { url: "/images/yoga/1.avif", category: "Sunrise Flow", span: "row-span-2 col-span-2" },
  { url: "/images/yoga/2.jpg", category: "Meditation", span: "row-span-1 col-span-1" },
  { url: "/images/yoga/4.jpg", category: "Herbal", span: "row-span-2 col-span-1" },
  { url: "/images/yoga/5.jpg", category: "Sound Healing", span: "row-span-1 col-span-1" },
  { url: "/images/yoga/6.jpg", category: "Nature Yoga", span: "row-span-1 col-span-1" },
  { url: "/images/yoga/7.jpg", category: "Temple", span: "row-span-1 col-span-2" },
  { url: "/images/yoga/8.jpg", category: "Retreat Space", span: "row-span-1 col-span-1" },
];

export const YogaGallery = () => {
  return (
    <section id="gallery" className="py-24 bg-[#111416]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-medium tracking-[0.2em] uppercase text-sm">Visual Silence</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 text-white">The Sacred Archive</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full opacity-50" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense gap-8 auto-rows-[250px] md:auto-rows-[400px]">
          {yogaGallery.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`relative group overflow-hidden rounded-[3.5rem] border border-white/5 ${item.span}`}
            >
              <img
                src={item.url}
                alt={item.category}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
