export default function ContentSection({ heading, content, image, isEven }) {
    return (
        <div className={`flex flex-col justify-center lg:flex-row ${isEven ? 'lg:flex-row-reverse' : ''} items-center py-10`}>
           
            <div className="w-full lg:w-1/4">
                <img src={image} alt={heading} className="w-full h-auto object-cover" />
            </div>

           
            <div className="w-full lg:w-1/2 px-6 lg:px-12">
                <h2 className="lg:text-5xl text-2xl font-semibold mb-4">
                    {heading.split(" ")[0]} <span className="text-[#7638F9]">{heading.split(" ")[1]}</span>
                </h2>
                <p className="text-lg text-gray-600">
                    {content}
                </p>
            </div>
        </div>
    );
};