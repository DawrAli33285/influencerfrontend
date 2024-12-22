import { useState } from "react";
import { useDropzone } from 'react-dropzone';
import { BASE_URL } from '../baseURL';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
export default function CreateBond() {
    const [error, setError] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);
    const [links, setLinks] = useState(['']);
    const handleAddLink = () => {
        setLinks([...links, '']);
    };
    const [bondstate, setBondState] = useState({
        platform: '',
        channel_name: '',
        social_id: '',
        reason: '',
        followers: '',
        mission_title: '',
        description: '',
        title: '',
        validity_number: '',
        quantity: '',
        bond_price: ''
    })
    const handleCheckboxChange = (e) => {
        setIsAccepted(e.target.checked);
    };
    const [isAccepted, setIsAccepted] = useState(false);
    const [disablecreateBond, setDisableCreateBond] = useState(false)

    const handleLinkChange = (index, value) => {
        const newLinks = [...links];
        newLinks[index] = value;
        setLinks(newLinks);
    };
    const onDrop = (acceptedFiles) => {
        setUploadedImages((prevImages) => {
            if (prevImages.length + acceptedFiles?.length > 4) {
                return [...prevImages, ...acceptedFiles.slice(0, 4 - prevImages.length)];
            }
            return [...prevImages, ...acceptedFiles];
        });
    };
    const navigate=useNavigate();

    const handleRemoveImage = (index) => {
        setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        multiple: true,
        onDrop,
    });

    const createBond = async () => {
        if (bondstate.mission_title.length == 0) {
            toast.dismiss()
            toast.error("Please enter mission title", { containerId: "createBondPage" })
            return;
        } else if (bondstate.platform.length == 0) {
            toast.dismiss()
            toast.error("Please enter platform", { containerId: "createBondPage" })
            return;
        } else if (bondstate.channel_name.length == 0) {
            toast.dismiss()
            toast.error("Please enter channel name", { containerId: "createBondPage" })
            return;
        } else if (bondstate.social_id.length == 0) {
            toast.dismiss()
            toast.error("Please enter social id", { containerId: "createBondPage" })
            return;
        } else if (bondstate.followers.length == 0) {
            toast.dismiss()
            toast.error("Please enter followers", { containerId: "createBondPage" })
            return;
        } else if (bondstate.description.length < 1000) {
            toast.dismiss()
            toast.error("Please enter mission description within minimum range", { containerId: "createBondPage" })
            return;
        } else if (bondstate.title.length == 0) {
            toast.dismiss()
            toast.error("Please enter bond title", { containerId: "createBondPage" })
            return;
        } else if (bondstate.validity_number.length === 0) {
            toast.dismiss()
            toast.error("Please select validty number", { containerId: "createBondPage" })
            return;
        } else if (bondstate.quantity === 0 || bondstate.quantity.length === 0) {
            toast.dismiss()
            toast.error("Please enter valid quantity", { containerId: "createBondPage" })
            return;
        } else if (bondstate.bond_price === 0 || bondstate.bond_price.length === 0) {
            toast.dismiss()
            toast.error("Please enter valid price", { containerId: "createBondPage" })
            return;
        } else if (bondstate.reason.length < 500) {
            toast.dismiss()
            toast.error("Please enter bond reason within minimum range", { containerId: "createBondPage" })
            return;
        } else if (isAccepted == false) {
            toast.dismiss()
            toast.error("Please accept terms and conditions", { containerId: "createBondPage" })
            return;
        }else if(uploadedImages?.length === 0){
            toast.dismiss()
            toast.error("Please select images for verification", { containerId: "createBondPage" })
            return;
        }
        try {

            setDisableCreateBond(true)
            let formData = new FormData();
            formData.append("platform", bondstate.platform);
            formData.append("channel_name", bondstate.channel_name);
            formData.append("social_id", bondstate.social_id);
            formData.append("followers", bondstate.followers);
            formData.append("mission_title", bondstate.mission_title);
            formData.append("description", bondstate.description);
            formData.append("title", bondstate.title);
            formData.append("validity_number", bondstate.validity_number);
            formData.append("quantity", bondstate.quantity);
            formData.append("bond_price", bondstate.bond_price);

            uploadedImages.forEach((image) => {
                formData.append('photos', image);
            });
            const token = localStorage.getItem('token')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            formData.append('social_media_links', links)
            let response = await axios.post(`${BASE_URL}/createBond`, formData, headers)
            console.log("BOND CREATED")
            console.log(response)
            toast.success(response?.data?.message)

            setBondState({
                platform: '',
                channel_name: '',
                social_id: '',
                reason: '',
                followers: '',
                mission_title: '',
                description: '',
                title: '',
                validity_number: '',
                quantity: '',
                bond_price: ''
            })
            setIsAccepted(false)
            setUploadedImages([])
            setLinks([])
            toast.success(response.data.message, { containerId: "createBondPage" })
            // window.location.reload(true)
            // setBondData((prev) => {
            //     let old;
            //     if (prev?.length > 0) {
            //         old = [...prev, response.data.bond]
            //     } else {
            //         old = [response.data.bond];
            //     }
            //     return old

            // })
navigate(-1)
        } catch (e) {
            setDisableCreateBond(false)
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "createBondPage" })

                return;
            } else {
                toast.error("Client error please try again", { containerId: "createBondPage" })
            }
        }
    }
    return (
     <>
   <ToastContainer containerId={"createBondPage"}/>
     <div className="h-[100vh]">
            <div className="w-full  overflow-x-auto bg-[#f2f2f2] rounded-[20px] mt-[20px] lg:px-[20px] lg:py-[40px]">
                <div className=" w-full h-full flex justify-center items-center lg:px-[20px] bg-[#f2f2f2]">
                    <div className=" flex   flex-col gap-[10px] p-[20px]  w-full">
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-col'>
                                <h1 className="lg:text-[2rem] text-[1.5rem] font-bold">Create Bond</h1>
                                <p className='lg:text-[0.94rem] text-[0.75rem]'>Build strong connections and foster lasting relationships with ease.</p>
                            </div>
                            <div
                                onClick={!disablecreateBond ? createBond : null}
                                className={`p-[10px] lg:max-w-[140px] w-full  font-medium text-[.88rem] rounded-[2rem] h-fit items-center text-center ${disablecreateBond ? 'bg-gray-400 text-gray-300 cursor-not-allowed' : 'bg-black text-white hover:cursor-pointer'}`}
                            >
                                Create Bond
                            </div>
                        </div>
                        <div className="flex flex-col gap-[20px]">

                            
                            <div className="bg-white p-[20px] rounded-[10px]">
                               
                                <h2 className="text-[17px] font-semibold border-b border-[#E9E9E9] pb-2 mb-6">Basic Information</h2>
                                <div className="grid grid-cols-2 gap-[20px]">
                                    
                                    <div className="col-span-2">
                                        <label htmlFor="title" className="text-[15px] font-medium">Mission Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Enter Title"
                                            className="mt-4 px-[15px] py-[13px] w-full bg-white text-[15px] text-black border border-[#E9E9E9] outline-none"
                                            value={bondstate.mission_title}
                                            onChange={(e) => {
                                                setBondState({
                                                    ...bondstate,
                                                    mission_title: e.target.value
                                                });
                                            }}
                                        />
                                    </div>

                                   
                                    <div className="col-span-2">
                                        <label htmlFor="socialMedia" className="text-[15px] font-medium">Social Media Information</label>
                                        {links.map((link, index) => (
                                            <div key={index} className="mt-4">
                                                <div className="flex flex-col md:flex-row gap-4">
                                                    <select
                                                        name={`platform-${index}`}
                                                        value={bondstate.platform}
                                                        onChange={(e) => {
                                                            setBondState({
                                                                ...bondstate,
                                                                platform: e.target.value
                                                            });
                                                        }}
                                                        className="px-[15px] py-[13px] w-full bg-white text-[15px] text-black border border-[#E9E9E9] outline-none"
                                                    >
                                                        <option value="">Select Platform</option>
                                                        <option value="Facebook">Facebook</option>
                                                        <option value="Twitter">Twitter</option>
                                                        <option value="Instagram">Instagram</option>
                                                        <option value="LinkedIn">LinkedIn</option>
                                                        <option value="YouTube">YouTube</option>
                                                    </select>

                                                    <input
                                                        type="text"
                                                        name={`channelName-${index}`}
                                                        value={bondstate.channel_name}
                                                        onChange={(e) => {
                                                            setBondState({
                                                                ...bondstate,
                                                                channel_name: e.target.value
                                                            });
                                                        }}
                                                        className="px-[15px] py-[13px] w-full bg-white text-[15px] text-black border border-[#E9E9E9] outline-none"
                                                        placeholder="Channel Name"
                                                    />

                                                    <input
                                                        type="text"
                                                        name={`socialId-${index}`}
                                                        value={bondstate.social_id}
                                                        onChange={(e) => setBondState({
                                                            ...bondstate,
                                                            social_id: e.target.value
                                                        })}
                                                        className="px-[15px] py-[13px] w-full bg-white text-[15px] text-black border border-[#E9E9E9] outline-none"
                                                        placeholder="Social ID"
                                                    />

                                                    <input
                                                        type="number"
                                                        name={`followers-${index}`}
                                                        value={bondstate.followers}
                                                        onChange={(e) => {
                                                            setBondState({
                                                                ...bondstate,
                                                                followers: e.target.value
                                                            });
                                                        }}
                                                        className="px-[15px] py-[13px] w-full bg-white text-[15px] text-black border border-[#E9E9E9] outline-none"
                                                        placeholder="Followers/Subscribers"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    
                                    <div className="col-span-2">
                                        <label htmlFor="mission" className="text-[15px] font-medium">Mission</label>
                                        <textarea
                                            id="mission"
                                            value={bondstate?.description}
                                            onChange={(e) => {
                                                setBondState({
                                                    ...bondstate,
                                                    description: e.target.value
                                                });
                                            }}
                                            maxLength={1200}
                                            className="mt-4 px-[15px] py-[13px] w-full bg-white text-[15px] text-black border border-[#E9E9E9] outline-none"
                                            placeholder="Write your mission statement here..."
                                            rows={10}
                                        ></textarea>
                                        {error && <p className="text-red-500 mt-2">{error}</p>}
                                        <p className="text-sm text-gray-600 mt-1">{bondstate?.description?.length} / 1000 characters required</p>
                                    </div>

                                  
                                    <div>
                                        <label htmlFor="title" className="text-[15px] font-medium">Bond Title</label>
                                        <input
                                            value={bondstate.title}
                                            type="text"
                                            name="title"
                                            placeholder="Enter Title"
                                            className="mt-4 px-[15px] py-[13px] w-full bg-white text-[15px] text-black border border-[#E9E9E9] outline-none"
                                            onChange={(e) => {
                                                setBondState({
                                                    ...bondstate,
                                                    title: e.target.value
                                                });
                                            }}
                                        />
                                    </div>

                                    
                                    <div>
                                        <label htmlFor="validitynumber" className="text-[15px] font-medium">Validity Number</label>
                                        <div className="mt-4">
                                            <select
                                                value={bondstate.validity_number}
                                                onChange={(e) => {
                                                    setBondState({
                                                        ...bondstate,
                                                        validity_number: e.target.value
                                                    });
                                                }}
                                                name="validitynumber"
                                                className="px-[15px] py-[13px] w-full bg-white text-[15px] text-black border border-[#E9E9E9] outline-none"
                                            >
                                                <option value="">Select validity</option>
                                                {Array.from({ length: 16 }, (_, index) => {
                                                    const months = (index + 3) * 2;
                                                    return (
                                                        months <= 36 && (
                                                            <option key={months} value={months}>{months} months</option>
                                                        )
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    
                                    <div>
                                        <label htmlFor="quantity" className="text-[15px] font-medium">Quantity</label>
                                        <input
                                            value={bondstate.quantity}
                                            type="text"
                                            name="quantity"
                                            placeholder="Enter Quantity"
                                            className="mt-4 px-[15px] py-[13px] w-full bg-white text-[15px] text-black border border-[#E9E9E9] outline-none"
                                            onKeyPress={(e) => {
                                                if (!/\d/.test(e.key)) {
                                                    e.preventDefault();
                                                }
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, "");
                                                setBondState({
                                                    ...bondstate,
                                                    quantity: value,
                                                });
                                            }}
                                        />
                                    </div>

                                    
                                    <div>
                                        <label htmlFor="price" className="text-[15px] font-medium">Bond Price</label>
                                        <input
                                            value={bondstate.bond_price}
                                            type="text"
                                            name="price"
                                            className="mt-4 px-[15px] py-[13px] w-full bg-white text-[15px] text-black border border-[#E9E9E9] outline-none"
                                            placeholder="Enter Bond Price"
                                            onKeyPress={(e) => {
                                                if (!/\d/.test(e.key)) {
                                                    e.preventDefault();
                                                }
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, "");
                                                setBondState({
                                                    ...bondstate,
                                                    bond_price: value,
                                                });
                                            }}
                                        />
                                    </div>

                                   
                                    <div className="col-span-2">
                                        <label htmlFor="reasonbond" className="text-[15px] font-medium">Reason For Bond Issuance</label>
                                        <textarea
                                            id="reasonbond"
                                            value={bondstate.reason}
                                            maxLength={520}
                                            onChange={(e) => {
                                                setBondState({
                                                    ...bondstate,
                                                    reason: e.target.value
                                                });
                                            }}
                                            className="mt-4 px-[15px] py-[13px] w-full bg-white text-[15px] text-black border border-[#E9E9E9] outline-none"
                                            placeholder="Write your bond issuance reason"
                                            rows={10}
                                        ></textarea>
                                        <p className="text-sm text-gray-600 mt-1">{bondstate?.reason?.length} / 500 characters required</p>
                                    </div>

                                  
                                    <div className="col-span-2">
                                        <label className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                checked={isAccepted}
                                                onChange={handleCheckboxChange}
                                                className="form-checkbox h-5 w-5 text-[#1DBF73]"
                                            />
                                            <span className="text-[15px] font-medium">
                                                I agree to the{' '}
                                                <a href="/terms" className="text-[#1DBF73] underline">Terms and Conditions</a>.
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>



                            <div className="bg-white p-[20px] rounded-[10px] shadow-md">
                                <h2 className="text-[17px] font-semibold border-b border-[#E9E9E9] pb-2 mb-6">Basic Information</h2>
                                <div
                                    {...getRootProps()}
                                    className={`border-2 border-dashed border-gray-300 p-[20px] text-center rounded-[10px] cursor-pointer ${uploadedImages?.length >= 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <div className="flex justify-center w-full">
                                        <svg width="80" height="66" viewBox="0 0 80 66" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>
                                    </div>
                                    <input
  {...getInputProps({
    onChange: (e) => {
      const file = e.target.files[0];
      if (file && !file.type.startsWith('image/')) {
        toast.error('Please upload only image files.',{containerId:"createBondPage"});
        e.target.value = ''; 
      }
    },
  })}
  disabled={uploadedImages?.length >= 4}
/>

                                    <p className="lg:text-[0.94rem] text-[0.75rem] text-[#667085] my-[10px]">Drag and Drop Here</p>
                                    <p className="lg:text-[0.94rem] text-[0.75rem] text-[#667085] my-[10px]">or</p>
                                    <div className="bg-black text-white lg:text-[0.94rem] text-[0.75rem] font-medium px-[20px] py-[10px] w-fit rounded-[20px] mx-auto">Browse Images</div>
                                </div>

                                <div className="flex flex-wrap gap-[10px] my-[10px]">
                                    {uploadedImages.map((file, index) => (
                                        <div
                                            key={index}
                                            className="relative w-[100px] h-[100px] bg-gray-200 p-[5px] rounded-[10px]"
                                        >
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt="uploaded"
                                                className="w-full h-full object-cover rounded-[10px]"
                                            />
                                            <button
                                                type="button"
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-[20px] h-[20px] flex items-center justify-center"
                                                onClick={() => handleRemoveImage(index)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}