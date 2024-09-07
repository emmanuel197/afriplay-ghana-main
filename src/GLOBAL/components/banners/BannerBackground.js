// import { useEffect, useState } from "react";
// import ReactPlayer from "react-player";

// const BannerBackground = ({ muted, bannerImg, _trailer, _onPlayTrailer, _bannerContent }) => {
//     const [onPlayTrailer, setOnPlayTrailer] = useState(_onPlayTrailer);
//     const [isPlaying, setIsPlaying] = useState(true); 
//     const [isPlayerReady, setIsPlayerReady] = useState(false);

//     // Handle scroll locally, only affecting the BannerBackground
//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY < 350) setIsPlaying(true);
//             else setIsPlaying(false);
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => { window.removeEventListener("scroll", handleScroll); };
//     }, []);

//     const bannerImgRender = () => (
//         <div className="hero-player-container">
//             <img
//                 src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${bannerImg}?accessKey=WkVjNWNscFhORDBLCg==`}
//                 alt={_bannerContent?.title}
//                 className="dynamic-landing-banner"
//                 width="100%"
//                 height="100%"
//             />
//         </div>
//     );

//     // Only the BannerBackground handles its internal player state.
//     if (onPlayTrailer) {
//         return (
//             <div className='hero-player-container'>
//                 {!isPlayerReady && bannerImgRender()}
//                 <ReactPlayer
//                     height='100%'
//                     width='100%'
//                     className='react-player'
//                     url={_trailer}
//                     playing={isPlaying}
//                     muted={muted}
//                     autoPlay={true}
//                     controls={false}
//                     onReady={() => setIsPlayerReady(true)}
//                     onEnded={() => {
//                         setIsPlayerReady(false);
//                         setOnPlayTrailer(false);
//                     }}
//                 />
//             </div>
//         );
//     } else if (bannerImg) {
//         return bannerImgRender();
//     }
//     return null;
// };

// export default BannerBackground;
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

// Utility function to detect iOS devices
const isIOS = () => /iPhone|iPad|iPod/i.test(window.navigator.userAgent);

const BannerBackground = ({ muted, bannerImg, _trailer, _onPlayTrailer, _bannerContent }) => {
    const [onPlayTrailer, setOnPlayTrailer] = useState(_onPlayTrailer);
    const [isPlaying, setIsPlaying] = useState(false); // Start playing only after interaction
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [isMuted, setIsMuted] = useState(muted);
    const [interactionTriggered, setInteractionTriggered] = useState(false); // Track user interaction

    useEffect(() => {
        if (isIOS()) {
            setIsMuted(true); // Ensure muted is true on iOS to allow auto-play
        }

        // Function to trigger video play after user interaction
        const triggerVideoPlay = () => {
            if (!interactionTriggered) {
                setInteractionTriggered(true);
                setIsPlaying(true); // Start playing after user interaction
            }
        };

        // Listen for any user interaction to trigger video play
        document.addEventListener('touchstart', triggerVideoPlay, { once: true });
        document.addEventListener('mousedown', triggerVideoPlay, { once: true });
        window.addEventListener("scroll", triggerVideoPlay, { once: true });

        return () => {
            document.removeEventListener('touchstart', triggerVideoPlay);
            document.removeEventListener('mousedown', triggerVideoPlay);
            window.removeEventListener("scroll", triggerVideoPlay);
        };
    }, [interactionTriggered]);

    const bannerImgRender = () => (
        <div className="hero-player-container">
            <img
                src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${bannerImg}?accessKey=WkVjNWNscFhORDBLCg==`}
                alt={_bannerContent?.title}
                className="dynamic-landing-banner"
                width="100%"
                height="100%"
            />
        </div>
    );

    if (onPlayTrailer) {
        return (
            <div className='hero-player-container'>
                {!isPlayerReady && bannerImgRender()}
                <ReactPlayer
                    height='100%'
                    width='100%'
                    className='react-player'
                    url={_trailer}
                    playing={isPlaying} // Start playing after user interaction
                    muted={isMuted} // Ensure muted is true on mobile/iOS
                    autoPlay={true}
                    controls={false}
                    playsinline={true} // Ensure video plays inline on iOS
                    onReady={() => setIsPlayerReady(true)}
                    onEnded={() => {
                        setIsPlayerReady(false);
                        setOnPlayTrailer(false);
                    }}
                />
            </div>
        );
    } else if (bannerImg) {
        return bannerImgRender();
    }
    return null;
};

export default BannerBackground;
