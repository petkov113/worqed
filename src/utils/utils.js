import { useSpring } from 'react-spring'

export const useFadeIn = () => {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } })
  return fadeIn
}
