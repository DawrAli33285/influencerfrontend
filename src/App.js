import logo from './logo.svg';
import './App.css';
import HomeHeader from './components/homeheader';
import frstimg from './imagerst.png'
import scndimg from './imagescnd.png'
import img from './image.png'
import fourthimg from './imagefourth.png'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ContentSection from './components/imagewithtext';
import HomeFooter from './components/homefooter';
const sections = [
  {
    heading: "Influencer Discovery",
    content: "Discover and connect with influencers effortlessly by searching and filtering based on niche, location, and engagement metrics. Our platform allows you to customize your search, making it easier than ever to find influencers who truly resonate with your brand. Whether you’re looking for lifestyle bloggers in a specific city or tech enthusiasts with high engagement rates, we provide comprehensive profiles that help you make informed decisions. Streamline your marketing efforts and collaborate with influencers.",
    image: `${frstimg}`,
  },
  {
    heading: "Campaign Management",
    content: "Plan and manage your influencer campaigns seamlessly with our intuitive tools, designed to simplify the entire process from start to finish. With features that allow you to track progress, set goals, and analyze performance metrics in real-time, you can ensure your campaigns are both efficient and effective. Collaborate effortlessly with influencers, streamline communication, and stay organized with our user-friendly interface. Empower your marketing strategy.",
    image: `${scndimg}`,
  },
  {
    heading: "Trusted Connections",
    content: "Build meaningful partnerships with vetted influencers to ensure authentic collaborations that resonate with your audience. Our platform carefully selects influencers who align with your brand's mission and values, enhancing your credibility and creating engaging content that captivates your target market. By focusing on quality over quantity, you can foster deeper connections that lead to lasting impact. Experience the difference that comes from working with trusted influencers.",
    image: `${img}`,
  },
  {
    heading: "Real Time Analytics",
    content: "Track your campaign performance in real-time with comprehensive analytics that provide valuable insights at every stage. Our advanced dashboard allows you to monitor key metrics such as engagement rates, reach, and conversions, ensuring you stay informed about how your campaigns are performing. By analyzing this data, you can make informed decisions and adjustments on the fly, maximizing the effectiveness of your strategies.",
    image: `${fourthimg}`,
  }
];
function App() {
  const [openIndex, setOpenIndex] = useState(null);
  const handleToggle = (index) => {
    if(index && openIndex){
      setOpenIndex(openIndex === index ? null : index);
    }
  };
  const faqs = [
    {
      question: "How do I create an account on your platform?",
      answer: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the last year.",
    },
    {
      question: "What criteria do you use to vet influencers?",
      answer: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the last year.",
    },
    {
      question: "What types of campaigns can I design with your tools?",
      answer: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the last year.",
    },
  ];
  const dotPositions = [
    { top: '5%', left: '50%', transform: 'translateX(-50%)' },
    { top: '40%', right: '-6px' },
    { top: '100%', right: '20%' },
    { top: '20%', right: '5%' },
    { top: '30%', left: '2%' },
    { top: '100%', left: '-6px' },
  ];
  useEffect(()=>{
window.scrollTo(0,0)
  },[])
  return (
    <div className='h-full'>
      <HomeHeader />
      <div className='w-full relative flex flex-col px-[20px] py-[40px]'>
        <div className='absolute top-[-10%] right-0 z-0'>
          <svg width="964" height="995" viewBox="0 0 964 995" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_f_209_1153)">
              <circle cx="721" cy="371" r="115" fill="#7638F9" />
            </g>
            <g filter="url(#filter1_f_209_1153)">
              <circle cx="479" cy="516" r="115" fill="#1195E2" />
            </g>
            <defs>
              <filter id="filter0_f_209_1153" x="302" y="-48" width="838" height="838" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="152" result="effect1_foregroundBlur_209_1153" />
              </filter>
              <filter id="filter1_f_209_1153" x="0" y="37" width="958" height="958" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="182" result="effect1_foregroundBlur_209_1153" />
              </filter>
            </defs>
          </svg>
        </div>
        {dotPositions.map((position, index) => (
          <div
            key={index}
            className='absolute z-10'
            style={{
              ...position,
              position: 'absolute',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="9" fill="#7638F9" />
            </svg>
          </div>
        ))}

        <h1 className=' lg:text-5xl text-2xl text-center font-semibold mt-10'>Connect with Influencers, Amplify</h1>
        <h1 className='lg:text-5xl text-2xl text-center font-semibold text-[#7638F9]'>Your Brand!</h1>
        <p className='mt-[20px] text-[#7E8183] text-center'>Discover the power of influencer marketing to grow your audience</p>
        <Link to="/signup" className='text-[16px] font-semibold bg-[#7638F9] rounded-[20px] py-[10px] px-[20px] w-fit text-white mx-auto my-[20px]'>Get Started With Us</Link>
      </div>
      <div className='w-full flex flex-col px-[20px] py-[40px] mt-[60px]'>
        <h1 className=' lg:text-5xl text-2xl text-center font-semibold mt-10'>What <span className='text-[#7638F9]'>Choose Us</span></h1>
        <p className='mt-[20px] text-[#7E8183] text-center'>See our features below</p>
        <div className="container mt-[40px] mx-auto">
          {sections.map((section, index) => (
            <ContentSection
              key={index}
              heading={section.heading}
              content={section.content}
              image={section.image}
              isEven={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
      <div className='w-full relative flex flex-col px-[20px] py-[40px] mt-14'>
        <div className='absolute left-0 top-[-50%]'>
          <svg width="156" height="720" viewBox="0 0 156 720" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="-273.757" y="-5.93959" width="623.582" height="418.651" rx="57.8282" transform="rotate(45 -273.757 -5.93959)" stroke="#C7ADFD" stroke-width="24" />
            <rect x="-368.998" y="2.28427" width="607.582" height="402.651" rx="44.0092" transform="rotate(45 -368.998 2.28427)" stroke="#F1EBFE" stroke-width="40" />
          </svg>

        </div>
        <div className='absolute right-0 top-0'>
          <svg width="124" height="758" viewBox="0 0 124 758" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="17.7469" width="609.654" height="409.131" rx="30.363" transform="matrix(-0.673206 0.739455 0.673206 0.739455 398.632 -8.21597)" stroke="#C7ADFD" stroke-width="24" />
            <mask id="path-2-inside-1_4_49" fill="white">
              <rect width="633.654" height="433.131" rx="38.8328" transform="matrix(-0.673206 0.739455 0.673206 0.739455 499.305 -16)" />
            </mask>
            <rect width="633.654" height="433.131" rx="38.8328" transform="matrix(-0.673206 0.739455 0.673206 0.739455 499.305 -16)" stroke="#F1EBFE" stroke-width="80" mask="url(#path-2-inside-1_4_49)" />
          </svg>

        </div>
        <h1 className=' lg:text-5xl text-2xl text-center font-semibold mt-10'>How it <span className='text-[#7638F9]'>Works</span></h1>
        <p className='mt-[20px] text-[#7E8183] text-center'>See how it works below</p>
        <div className='mt-[40px] grid xl:grid-cols-3 grid-cols-2 gap-[20px] xl:gap-[40px] w-full px-[20px] max-w-[1440px] mx-auto'>
          <div className=' shadow-lg w-full h-full flex flex-col p-[20px] rounded-[10px]'>
            <h1 className='text-[20px] font-semibold mb-[10px]'>Register</h1>
            <p className='text-[16px] text-[#7E8183]'>Creating an account is your first step toward unlocking a world of opportunities! By signing up, you’ll gain access to a powerful platform</p>
          </div>
          <div className=' shadow-lg w-full h-full flex flex-col p-[20px] rounded-[10px]'>
            <h1 className='text-[20px] font-semibold mb-[10px]'>Find Influencers</h1>
            <p className='text-[16px] text-[#7E8183]'>Search our extensive database to find influencers who perfectly match your brand's vision and values. With advanced filters and tailored.</p>
          </div>
          <div className=' shadow-lg w-full h-full flex flex-col p-[20px] rounded-[10px]'>
            <h1 className='text-[20px] font-semibold mb-[10px]'>Create a Campaign</h1>
            <p className='text-[16px] text-[#7E8183]'>Design your campaign and connect with your chosen influencers to create impactful collaborations that resonate with your audience.</p>
          </div>
          <div className=' shadow-lg w-full h-full flex flex-col p-[20px] rounded-[10px]'>
            <h1 className='text-[20px] font-semibold mb-[10px]'>Measure Results</h1>
            <p className='text-[16px] text-[#7E8183]'>Use our analytics to track performance and optimize future campaigns.</p>
          </div>
          <div className=' shadow-lg w-full h-full flex flex-col p-[20px] rounded-[10px]'>
            <h1 className='text-[20px] font-semibold mb-[10px]'>Business Promotion</h1>
            <p className='text-[16px] text-[#7E8183]'>Use our platform to promote your business and increase your connections by using our product</p>
          </div>
          <div className=' shadow-lg w-full h-full flex flex-col p-[20px] rounded-[10px]'>
            <h1 className='text-[20px] font-semibold mb-[10px]'>Manage Dashboard</h1>
            <p className='text-[16px] text-[#7E8183]'>Easily oversee all your campaigns with our intuitive manage dashboard, designed for seamless navigation and organization.</p>
          </div>
        </div>
      </div>
      <div className='bg-[#F7F7F7] w-full flex flex-col px-[20px] py-[40px] mt-[60px]'>
        <h1 className=' lg:text-5xl text-2xl text-center font-semibold mt-10'>Frequently Asked <span className='text-[#7638F9]'>Questions</span></h1>
        <p className='mt-[20px] text-[#7E8183] text-center'>See questions below</p>
        <div className='mt-[40px] max-w-[1280px] w-full mx-auto flex flex-col gap-[20px]'>
          {faqs.map((faq, index) => (
            <div key={index} className='flex w-full flex-col gap-[10px] bg-white border-[1px] rounded-[20px] p-[20px] border-[#7e818367]'>
              {/* Question */}
              <div className='flex w-full justify-between items-center hover:cursor-pointer' onClick={() => handleToggle(index)}>
                <h2 className='text-[20px] font-semibold'>{faq.question}</h2>
                <div>
                  <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d={openIndex === index ? "M1.5 8.75L9 1.25L16.5 8.75" : "M16.5 1.25L9 8.75L1.5 1.25"} stroke="#090D2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Answer */}
              {openIndex === index && (
                <p className="text-gray-600 mt-2 w-full transition-all ease-in-out duration-300">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <HomeFooter />
    </div>
  );
}

export default App;
