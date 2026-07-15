import { motion } from "framer-motion";

const galleryItems = [
  { url: "/images/food/1.webp", category: "Detox", span: "row-span-2 col-span-2" },
  { url: "/images/food/2.jpg", category: "Herbal", span: "row-span-1 col-span-1" },
  { url: "/images/food/3.jpg", category: "Tradition", span: "row-span-1 col-span-1" },
  { url: "/images/food/4.jpg", category: "Wellness", span: "row-span-2 col-span-1" },
  { url: "/images/food/5.jpg", category: "Harvest", span: "row-span-1 col-span-1" },
  { url: "/images/food/6.jpg", category: "Cooking", span: "row-span-1 col-span-1" },
  { url: "/images/food/8.jpg", category: "Culinary", span: "row-span-1 col-span-1" },
  { url: "/images/food/9.jpg", category: "Desserts", span: "row-span-1 col-span-1" },
];

export const FoodGallery = () => {
  return (
    <section id="gallery" className="py-24 bg-[#111416]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-medium tracking-[0.2em] uppercase text-sm">Visual Sanctuary</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 text-white">Plated Poetry</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full opacity-50" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense gap-6 auto-rows-[200px] md:auto-rows-[350px]">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`relative group overflow-hidden rounded-[2.5rem] border border-white/5 ${item.span}`}
            >
              <img
                src={item.url}
                alt={item.category}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
