import { motion } from "framer-motion";

const waterfallGallery = [
  { url: "/images/waterfall/2.webp", category: "Cascades", span: "row-span-2 col-span-2" },
  { url: "/images/waterfall/4.jpg", category: "Rainforest", span: "row-span-1 col-span-1" },
  { url: "/images/waterfall/3.jpg", category: "Nature", span: "row-span-1 col-span-1" },
  { url: "/images/waterfall/5.jpg", category: "Hidden Falls", span: "row-span-2 col-span-1" },
  { url: "/images/waterfall/7.jpg", category: "Adventure", span: "row-span-1 col-span-1" },
  { url: "/images/waterfall/8.jpg", category: "Wildlife", span: "row-span-1 col-span-2" },
  { url: "/images/lake/9.webp", category: "Landscape", span: "row-span-1 col-span-1" },
];

export const WaterfallGallery = () => {
  return (
    <section id="gallery" className="py-24 bg-[#111416]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-500 font-medium tracking-[0.2em] uppercase text-sm">Visual Expedition</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 text-white">The Falls Archive</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-6 rounded-full opacity-50" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense gap-8 auto-rows-[250px] md:auto-rows-[400px]">
          {waterfallGallery.map((item, index) => (
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
