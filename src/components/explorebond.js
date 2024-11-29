import { Link } from "react-router-dom";
import exploreone from "../explore1.png";
import exploretwo from "../explore2.png";
import explorethree from "../explore3.png";
import { MoonLoader } from 'react-spinners';
import explorefour from "../explore4.png";
export default function ExploreBond({state,setState,loading}) {
    return (
        <div className="w-full flex flex-col gap-[40px] px-[20px] py-[40px] xl:px-[40px]">
            <div className="flex justify-between">
                <p className="font-bold xl:text-[1.5rem] text-[1.3rem]">
                    Explore Trending <span className="font-normal text-[#1DBF73] italic">Promise Bonds.</span>
                </p>
                <Link to={`/search?filter=bond&search=`} className="text-[#1DBF73] font-bold xl:text-[1.5rem] text-[1.3rem]">View All Promise Bond</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[10px]">
                {loading?<div className='flex'>
                    <MoonLoader color="#6B33E3" size={100} />
                </div>:state?.bonds?.length==0?<div className='flex justify-center items-center'>
                   <p>No result found</p>
                </div>:state?.bonds?.map((bond,i)=>{
                              const hasYouTube = bond?.social_media_links?.some((link) =>
                                link.includes("youtube")
                              );
                              const hasTikTok = bond?.social_media_links?.some((link) =>
                                link.includes("tiktok")
                              );
                    
                    return <div key={bond?._id} className="bg-white p-[20px] flex flex-col gap-[20px] rounded-[20px]">
                    <img src={bond?.photos[0]} alt="cardimg" className="rounded-[10px] h-[250px] w-full object-cover" />
                    <div className="flex justify-between">
                        <div className="flex gap-[10px] font-bold">
                            <img src="https://png.pngitem.com/pimgs/s/22-223925_female-avatar-female-avatar-no-face-hd-png.png" alt="avatar" className="w-[24px] h-[24px] rounded-full" />
                          {bond?.issuer_id?.user_id?.username}
                        </div>
                        
                    </div>
                    <p className="text-[1rem] text-[#74767E]">{bond?.missions[0]?.description}</p>
                    <span className="text-[1rem] font-bold">${bond?.bond_issuerance_amount}</span>
                </div>
                })}
                
            </div>
        </div>
    )
}