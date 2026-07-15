import { motion } from "framer-motion";

const surfGallery = [
  { url: "/images/hirikatiya/1.webp", category: "Surfing", span: "row-span-2 col-span-2" },
  { url: "/images/hirikatiya/2.jpg", category: "Sunset", span: "row-span-1 col-span-1" },
  { url: "/images/hirikatiya/3.jpg", category: "Yoga", span: "row-span-1 col-span-1" },
  { url: "/images/hirikatiya/4.png", category: "Ocean", span: "row-span-2 col-span-1" },
  { url: "/images/hirikatiya/5.jpg", category: "Culture", span: "row-span-1 col-span-1" },
  { url: "/images/hirikatiya/6.jpg", category: "Paradise", span: "row-span-1 col-span-1" },
  { url: "/images/hirikatiya/8.jpg", category: "Bay Life", span: "row-span-1 col-span-1" },
  { url: "/images/hirikatiya/9.jpg", category: "Wellness", span: "row-span-1 col-span-1" },
];

export const SurfGallery = () => {
  return (
    <section id="gallery" className="py-24 bg-[#111416]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-medium tracking-[0.2em] uppercase text-sm">Ocean Canvas</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 text-white">Bay Moments</h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mt-6 rounded-full opacity-50" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense gap-6 auto-rows-[200px] md:auto-rows-[350px]">
          {surfGallery.map((item, index) => (
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
