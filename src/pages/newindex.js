import ActiveBids from "../components/activebidds";
import Banner from "../components/banner";
import ExploreBond from "../components/explorebond";
import HomeFooter from "../components/homefooter";
import HomeHeader from "../components/homeheader";
import HowDoesItWork from "../components/howdoesitwork";
import Reviews from "../components/review";
import TopIssuers from "../components/topissuers";
import WhyChooseUs from "../components/whychooseus";

export default function NewIndex(){
    return(
        <div className="w-full">
            <HomeHeader />
            <Banner />
            <HowDoesItWork />
            <WhyChooseUs />
            <ExploreBond />
            <TopIssuers />
            <ActiveBids />
            <Reviews />
            <HomeFooter />
        </div>
    )
}