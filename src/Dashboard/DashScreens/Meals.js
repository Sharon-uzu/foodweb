import React, { useState, useRef, useEffect } from 'react';  
import Footer from '../../Components/Footer';  
import AdminHeader from '../DashComponents/AdminHeader';  
import Sidebar from '../DashComponents/Sidebar';  
import { IoMdClose } from "react-icons/io";  
import imgupload from '../../Assets/upload.jpg';  
import { Supabase } from '../../config/supabase-config';  
import { Swiper, SwiperSlide } from 'swiper/react';  
import { Navigation } from 'swiper/modules';   
import 'swiper/css';  
import 'swiper/css/navigation';  
  
const Meals = ({ userId, userDetails, profileImage }) => {  
    const [showModal, setShowModal] = useState(false);  
    const [showEditModal, setShowEditModal] = useState(false);  
    const [selectedImage, setSelectedImage] = useState(imgupload);  
    const [file, setFile] = useState(null);  
    const [mealName, setMealName] = useState('');  
    const [mealPrice, setMealPrice] = useState('');  
    const [category, setCategory] = useState('');  
    const [selectedMealId, setSelectedMealId] = useState(null);  
    const [meals, setMeals] = useState([]);  
    const fileInputRef = useRef(null);  
    const [businessName, setBusinessName] = useState('');  
    const [loading, setLoading] = useState(true);  
  
    const [buttonText, setButtonText] = useState("Add Meal");  
    const [editButtonText, setEditButtonText] = useState("Update Meal");  
    const [deleteButtonText, setDeleteButtonText] = useState("Delete Meal");  
  
    const supabaseUrl = 'https://wgfidvtzcblzcnstkyae.supabase.co';  
  
    // Fetch data from Supabase  
    useEffect(() => {  
        if (!userId) return;  
        const fetchMeals = async () => {  
            setLoading(true);   
            const { data, error } = await Supabase  
                .from('food-web-meals')  
                .select('*')  
                .eq('adminid', userId);  
        
            if (error) {  
                console.error('Error fetching meals:', error);  
            } else {  
                setMeals(data || []);  
            }  
            setLoading(false);   
        };  

        fetchMeals();  
    }, [userId]);   

    // Handle file input  
    const handleFileChange = (event) => {  
        const selectedFile = event.target.files[0];  
        if (selectedFile) {  
            setFile(selectedFile);  
            const reader = new FileReader();  
            reader.onloadend = () => {  
                setSelectedImage(reader.result);  
            };  
            reader.readAsDataURL(selectedFile);  
        }  
    };  
  
    const handleUploadClick = () => {  
        fileInputRef.current?.click();  
    };  

    const handleAddMeal = async () => {  
        // Validate inputs  
        if (!mealName || !mealPrice.trim() || isNaN(mealPrice) || !category || !file) {  
            alert("All fields are required!");  
            return;  
        }  
        
        setButtonText("Loading...");   
        const filePath = `${userId}/${Date.now()}-${file.name}`;  
        const { error: fileError } = await Supabase.storage.from("meals").upload(filePath, file);  

        if (fileError) {  
            console.error("Error uploading image:", fileError);  
            setButtonText("Add Meal");  
            return;  
        }  

        const imageUrl = `${supabaseUrl}/storage/v1/object/public/meals/${filePath}`;  

        const { data, error } = await Supabase.from("food-web-meals").insert([  
            {  
                adminid: userId,  
                business: businessName,  
                mealname: mealName,  
                mealprice: parseFloat(mealPrice),  
                category,  
                image: imageUrl  
            }  
        ]).select();  

        if (error) {  
            console.error("Error adding meal:", error);  
            setButtonText("Add Meal");  
            return;  
        }  

        setMeals([...meals, ...data]);  
        resetModal();  
    };  

    const handleEditMeal = async () => {  
        if (!mealName || !mealPrice.trim() || isNaN(mealPrice) || !category) {  
            alert("All fields are required!");  
            return;  
        }  

        setEditButtonText("Updating...");  
        const updates = {  
            mealname: mealName,  
            mealprice: parseFloat(mealPrice),  
            category,  
            image: selectedImage // Adjust according to your update requirements  
        };  

        const { error } = await Supabase.from('food-web-meals')  
            .update(updates)  
            .eq('id', selectedMealId);  

        if (error) {  
            console.error("Error updating meal:", error);  
            setEditButtonText("Update Meal");  
            return;  
        }  

        const updatedMeals = meals.map(meal =>  
            meal.id === selectedMealId ? { ...meal, ...updates } : meal  
        );  

        setMeals(updatedMeals);  
        resetModal();  
    };  

    const handleDeleteMeal = async () => {  
        if (selectedMealId === null) return;  

        setDeleteButtonText("Deleting...");  

        const { error } = await Supabase.from('food-web-meals')  
            .delete()  
            .eq('id', selectedMealId);  

        if (error) {  
            console.error("Error deleting meal:", error);  
            setDeleteButtonText("Delete Meal");  
            return;  
        }  

        setMeals(meals.filter(meal => meal.id !== selectedMealId));  
        resetModal();  
    };  

    const resetModal = () => {  
        setShowModal(false);  
        setShowEditModal(false);  
        setMealName("");  
        setMealPrice("");  
        setCategory("");  
        setFile(null);  
        setSelectedImage(imgupload);  
        setButtonText("Add Meal");  
        setEditButtonText("Update Meal");  
        setDeleteButtonText("Delete Meal");  
        setSelectedMealId(null);  
    };  

    // Swiper settings  
    const swiperSettings = {  
        modules: [Navigation],  
        slidesPerView: 5,  
        spaceBetween: 20,  
        navigation: true,   
        breakpoints: {  
            1024: { slidesPerView: 3 },  
            768: { slidesPerView: 2 },  
            0: { slidesPerView: 1 },  
        },  
    };  

    return (  
        <div>  
            <AdminHeader userDetails={userDetails} profileImage={profileImage}/>  
            <div className="main">  
                <Sidebar />  
                <div className="main-right">  
                    <div className="meals">  
                        <div className="meals-c">  
                            <div className="meal-top">  
                                <h3>Meal Menu</h3>  
                                <button onClick={() => setShowModal(true)}>Add Meal</button>  
                            </div>  

                            <div className="slider-container foods-c">  
                                {loading ? (  
                                    <div className="loader-container">  
                                        <div className="loader"></div>  
                                    </div>  
                                ) : meals.length > 0 ? (  
                                    <Swiper {...swiperSettings}>  
                                        {meals.map((food) => (  
                                            <SwiperSlide className="food slide" key={food.id}>  
                                                <div className="food-c" style={{ cursor: 'pointer' }}>  
                                                    <img src={food.image} alt={food.mealname} loading="lazy" />  
                                                    <p>{food.category}</p>  
                                                    <h6>{food.mealname}</h6>  
                                                    <h5>N{food.mealprice}</h5>  
                                                    <button onClick={() => {  
                                                      setSelectedMealId(food.id);  
                                                      setMealName(food.mealname);  
                                                      setMealPrice(food.mealprice);  
                                                      setCategory(food.category);  
                                                      setSelectedImage(food.image);  
                                                      setShowEditModal(true);  
                                                    }}>Edit</button>  
                                                </div>  
                                            </SwiperSlide>  
                                        ))}  
                                    </Swiper>  
                                ) : (  
                                    <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }} className="empty-message">  
                                        No meals added yet.  
                                    </p>  
                                )}  
                            </div>  
                        </div>  
                    </div>  

                    {showModal && (  
                        <div className="modal-overlay">  
                            <div className="modal-content">  
                                <h2>Add Meal  
                                    <button className="close-button" onClick={resetModal}>  
                                        <IoMdClose size={24} />  
                                    </button>  
                                </h2>   
                                <div className="meal-inp">  
                                    <div>  
                                        <input className="modal-input" type="text" placeholder="Meal Name" value={mealName} onChange={(e) => setMealName(e.target.value)} />  
                                        <input className="modal-input" type="text" placeholder="Meal Price" value={mealPrice} onChange={(e) => setMealPrice(e.target.value)} />   
                                        <input className="modal-input" type="text" placeholder='Category' value={category} onChange={(e) => setCategory(e.target.value)} />  
                                        <button className="modal-create-button" onClick={handleAddMeal} disabled={buttonText === "Loading..."}>  
                                            {buttonText}  
                                        </button>  
                                    </div>  
                                    <div className="image-upload" onClick={handleUploadClick}>  
                                        <p>Click to upload image</p>  
                                        <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} accept="image/*" />  
                                        <img src={selectedImage} alt="Upload Preview" className="image-preview" />  
                                    </div>  
                                </div>   
                            </div>  
                        </div>  
                    )}  

                    {showEditModal && (  
                        <div className="modal-overlay">  
                            <div className="modal-content">  
                                <h2>Edit Meal  
                                    <button className="close-button" onClick={resetModal}>  
                                        <IoMdClose size={24} />  
                                    </button>  
                                </h2>   
                                <div className="meal-inp">  
                                    <div>  
                                        <input className="modal-input" type="text" placeholder="Meal Name" value={mealName} onChange={(e) => setMealName(e.target.value)} />  
                                        <input className="modal-input" type="text" placeholder="Meal Price" value={mealPrice} onChange={(e) => setMealPrice(e.target.value)} />   
                                        <input className="modal-input" type="text" placeholder='Category' value={category} onChange={(e) => setCategory(e.target.value)} />  
                                        <button className="modal-create-button" onClick={handleEditMeal} disabled={editButtonText === "Updating..."}>  
                                            {editButtonText}  
                                        </button>  
                                        <button className="modal-delete-button" onClick={handleDeleteMeal} disabled={deleteButtonText === "Deleting..."}>  
                                            {deleteButtonText}  
                                        </button>  
                                    </div>  
                                    <div className="image-upload" onClick={handleUploadClick}>  
                                        <p>Click to upload image</p>  
                                        <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} accept="image/*" />  
                                        <img src={selectedImage} alt="Upload Preview" className="image-preview" />  
                                    </div>  
                                </div>   
                            </div>  
                        </div>  
                    )}  
                    <Footer />  
                </div>  
            </div>  
        </div>  
    );  
};  

export default Meals;  