import { memo, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
    AnimatePresence,
    motion,
    useAnimation,
    useMotionValue,
    useTransform,
} from 'framer-motion';
import './ThreeDCarousel.css';

// Choose the right layout effect based on environment
const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Media query hook for responsive behavior
function useMediaQuery(query, { defaultValue = false, initializeWithValue = true } = {}) {
    const IS_SERVER = typeof window === 'undefined';

    const getMatches = (query) => {
        if (IS_SERVER) {
            return defaultValue;
        }
        return window.matchMedia(query).matches;
    };

    const [matches, setMatches] = useState(() => {
        if (initializeWithValue) {
            return getMatches(query);
        }
        return defaultValue;
    });

    const handleChange = () => {
        setMatches(getMatches(query));
    };

    useIsomorphicLayoutEffect(() => {
        const matchMedia = window.matchMedia(query);
        handleChange();

        matchMedia.addEventListener('change', handleChange);

        return () => {
            matchMedia.removeEventListener('change', handleChange);
        };
    }, [query]);

    return matches;
}

// Award ceremony & gala images from Unsplash
const carouselImages = [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop', // Award ceremony
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop', // Celebration event
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=400&fit=crop', // Conference stage
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', // Professional portrait
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=400&fit=crop', // Speaker at event
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=400&fit=crop', // Stage presentation
    'https://images.unsplash.com/photo-1560439514-4e9645039924?w=400&h=400&fit=crop', // Business meeting
    'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=400&h=400&fit=crop', // Elegant venue
    'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=400&h=400&fit=crop', // Event decoration
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=400&fit=crop', // Grand hall
];

const duration = 0.15;
const transition = { duration, ease: [0.32, 0.72, 0, 1], filter: 'blur(4px)' };
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] };

// Carousel cylinder component
const Carousel = memo(({ handleClick, controls, cards, isCarouselActive }) => {
    const isScreenSizeSm = useMediaQuery('(max-width: 640px)');
    const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
    const faceCount = cards.length;
    const faceWidth = cylinderWidth / faceCount;
    const radius = cylinderWidth / (2 * Math.PI);
    const rotation = useMotionValue(0);
    const transform = useTransform(
        rotation,
        (value) => `rotate3d(0, 1, 0, ${value}deg)`
    );

    return (
        <div
            className="three-d-carousel__wrapper"
            style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
            }}
        >
            <motion.div
                drag={isCarouselActive ? 'x' : false}
                className="three-d-carousel__cylinder"
                style={{
                    transform,
                    rotateY: rotation,
                    width: cylinderWidth,
                    transformStyle: 'preserve-3d',
                }}
                onDrag={(_, info) =>
                    isCarouselActive &&
                    rotation.set(rotation.get() + info.offset.x * 0.05)
                }
                onDragEnd={(_, info) =>
                    isCarouselActive &&
                    controls.start({
                        rotateY: rotation.get() + info.velocity.x * 0.05,
                        transition: {
                            type: 'spring',
                            stiffness: 100,
                            damping: 30,
                            mass: 0.1,
                        },
                    })
                }
                animate={controls}
            >
                {cards.map((imgUrl, i) => (
                    <motion.div
                        key={`key-${imgUrl}-${i}`}
                        className="three-d-carousel__face"
                        style={{
                            width: `${faceWidth}px`,
                            transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
                        }}
                        onClick={() => handleClick(imgUrl, i)}
                    >
                        <motion.img
                            src={imgUrl}
                            alt={`Event moment ${i + 1}`}
                            layoutId={`img-${imgUrl}`}
                            className="three-d-carousel__image"
                            initial={{ filter: 'blur(4px)' }}
                            layout="position"
                            animate={{ filter: 'blur(0px)' }}
                            transition={transition}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
});

Carousel.displayName = 'Carousel';

// Main 3D Photo Carousel component
function ThreeDPhotoCarousel({ images = carouselImages }) {
    const [activeImg, setActiveImg] = useState(null);
    const [isCarouselActive, setIsCarouselActive] = useState(true);
    const controls = useAnimation();
    const cards = useMemo(() => images, [images]);

    const handleClick = (imgUrl) => {
        setActiveImg(imgUrl);
        setIsCarouselActive(false);
        controls.stop();
    };

    const handleClose = () => {
        setActiveImg(null);
        setIsCarouselActive(true);
    };

    return (
        <motion.div layout className="three-d-carousel">
            <AnimatePresence mode="sync">
                {activeImg && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        layoutId={`img-container-${activeImg}`}
                        layout="position"
                        onClick={handleClose}
                        className="three-d-carousel__overlay"
                        style={{ willChange: 'opacity' }}
                        transition={transitionOverlay}
                    >
                        <motion.img
                            layoutId={`img-${activeImg}`}
                            src={activeImg}
                            alt="Selected event moment"
                            className="three-d-carousel__overlay-image"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{
                                delay: 0.5,
                                duration: 0.5,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                            style={{
                                willChange: 'transform',
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="carousel-instructions">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 4h6v6" />
                    <path d="M10 20H4v-6" />
                    <path d="M20 4L4 20" />
                </svg>
                Drag to rotate • Click to view
            </div>
            <Carousel
                handleClick={handleClick}
                controls={controls}
                cards={cards}
                isCarouselActive={isCarouselActive}
            />
        </motion.div>
    );
}

export { ThreeDPhotoCarousel };
export default ThreeDPhotoCarousel;
