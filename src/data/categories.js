import { FiCamera, FiClipboard, FiHeadphones } from 'react-icons/fi'
import { GiForkKnifeSpoon, GiLipstick } from 'react-icons/gi'
import { FaHandshake } from 'react-icons/fa'

export const categories = [
  { slug: 'photography-video', name: 'Photography & Video', icon: FiCamera, tint: 'purple' },
  { slug: 'food-catering', name: 'Food & Catering', icon: GiForkKnifeSpoon, tint: 'lime' },
  { slug: 'beauty-styling', name: 'Beauty & Styling', icon: GiLipstick, tint: 'purple' },
  { slug: 'event-coordination', name: 'Event Coordination', icon: FiClipboard, tint: 'lime' },
  { slug: 'entertainment', name: 'Entertainment', icon: FiHeadphones, tint: 'purple' },
  { slug: 'support-services', name: 'Support Services', icon: FaHandshake, tint: 'lime' },
]
