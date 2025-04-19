import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchChannelEPGInfo, fetchChannels } from "../../../redux/channels";
import Slider from "react-slick";
import sliderSettings from "../../../../utils/sliderConfig/sliderSettings";
import MovieCard from "../../cards/MovieCard";
import SliderWrapper from "../../SliderWrapper";

const LiveTvReelSlider = () => {
    const dispatch = useDispatch();
    const { channels, channelCategories } = useSelector((state) => state.fetchMovies);
    const [EPGs, setEPGs] = useState([]);

    // Fetch eligible channels
    useEffect(() => {
        const initFetchChannel = async () => {
            await fetchChannels(dispatch);
        };
        initFetchChannel();
    }, [dispatch]);

    // Fetch EPG data only for eligible channels
    useEffect(() => {
        const fetchEPG = async () => {
            if (channels.length === 0) return;
            const channelIDs = channels.map(ch => ch.id).toString();
            const epgData = await fetchChannelEPGInfo(channelIDs);
            setEPGs(epgData);
        };
        fetchEPG();
    }, [channels]); // Depend on channels instead of channelCategories

    // Create Set of eligible channel IDs for quick lookup
    const eligibleChannelIds = new Set(channels.map(ch => ch.id));

    return (
        <div>
            {channelCategories.map((category) => {
                // Filter category channels to only eligible ones
                const filteredChannels = category.channels.filter(catChannel => 
                    eligibleChannelIds.has(catChannel.id)
                );

                // Skip rendering if no channels in category
                if (filteredChannels.length === 0) return null;

                return (
                    <div key={category.id}>
                        <SliderWrapper title={category.name}>
                            <Slider {...sliderSettings(5)}>
                                {filteredChannels.map((movieItem, index) => {
                                    const _movie = { ...movieItem };
                                    const _epg = EPGs.filter(epg => 
                                        movieItem.id === epg.id
                                    );

                                    if (_epg.length > 0) {
                                        _movie.shows = _epg[0].shows;
                                    }

                                    return (
                                        <MovieCard 
                                            key={movieItem.id + index} 
                                            type='livetv' 
                                            movie={_movie} 
                                        />
                                    );
                                })}
                            </Slider>
                        </SliderWrapper>
                        <br />
                        <br />
                    </div>
                );
            })}
        </div>
    );
};

export default LiveTvReelSlider;

