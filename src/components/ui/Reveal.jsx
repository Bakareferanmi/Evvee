import { motion } from 'framer-motion'

/**
 * Fades + slides content in as it scrolls into view.
 * `scale` gives the "reveal-scale" treatment used on vendor cards.
 */
export default function Reveal({ children, className = '', delay = 0, scale = false, as = 'div' }) {
  const Comp = motion[as] ?? motion.div
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: scale ? 0 : 20, scale: scale ? 0.96 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.6, 0.2, 1] }}
    >
      {children}
    </Comp>
  )
}
