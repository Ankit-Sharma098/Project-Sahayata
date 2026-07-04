import { ImagePlus, MapPin } from "lucide-react";
import { useState } from "react";
import { createReport } from "../services/reportService";
import toast from "react-hot-toast";
import { reverseGeocode } from "../services/locationService";
import LocationPicker from "../components/LocationPicker";

function Report() {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [coordinates, setCoordinates] = useState([
        85.1376,
        25.5941,
    ]);

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "Other",
        address: "",
        city: "",
        state: "",
    });

    const previewImage = (e) => {
        const selected = e.target.files[0];

        if (!selected) return;

        if (!selected.type.startsWith("image/")) {
            toast.error("Please select a valid image");
            return;
        }

        setFile(selected);
        setImage(URL.createObjectURL(selected));
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const getCurrentLocation = () => {

        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                setCoordinates([lng, lat]);

                const data = await reverseGeocode(lat, lng);

                if (!data) return;

                setForm((prev) => ({
                    ...prev,
                    address: data.display_name || "",
                    city:
                        data.address?.city ||
                        data.address?.town ||
                        data.address?.village ||
                        "",
                    state: data.address?.state || "",
                }));

                toast.success("Location Detected");

            },

            () => {

                toast.error("Location Permission Denied");

            }

        );

    };



    const handleSubmit = async () => {
        if (!file)
            return toast.error("Please upload an image");

        if (!form.title)
            return toast.error("Title is required");

        if (!form.description)
            return toast.error("Description is required");

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                toast.error("Please Login First");
                return;
            }
            const formData = new FormData();

            formData.append("image", file);

            formData.append("title", form.title);

            formData.append(
                "description",
                form.description
            );

            formData.append(
                "category",
                form.category
            );

            formData.append(
                "location",
                JSON.stringify({
                    type: "Point",

                    coordinates: coordinates, // Dynamic GPS Coordinates

                    address: form.address,

                    city: form.city,

                    state: form.state,
                })
            );

            const data = await createReport(
                formData,
                token
            );

            toast.success(data.message);

            setFile(null);
            setImage(null);

            setForm({
                title: "",
                description: "",
                category: "Other",
                address: "",
                city: "",
                state: "",
            });

            console.log(data);

        } catch (err) {

            console.log(err);

            toast.error("Report Failed");

        } finally {

            setLoading(false);

        }

    };


    return (
        <section className="min-h-screen bg-slate-950 py-28">
            <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900 p-10">
                <h1 className="mb-10 text-center text-5xl font-bold text-white">
                    Report Pollution
                </h1>

                {/* Image Upload */}

                <label
                    htmlFor="image"
                    className="mb-10 flex h-72 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-700 hover:border-emerald-500"
                >
                    {image ? (
                        <img
                            src={image}
                            alt="preview"
                            className="h-full w-full rounded-3xl object-cover"
                        />
                    ) : (
                        <>
                            <ImagePlus size={60} className="text-emerald-400" />

                            <p className="mt-5 text-slate-400">
                                Upload Pollution Image
                            </p>
                        </>
                    )}
                </label>

                <input
                    hidden
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={previewImage}
                />

                {/* Form */}

                <div className="grid gap-6 md:grid-cols-2">
                    <input
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleChange}
                        className="rounded-xl bg-slate-800 p-4 text-white outline-none"
                    />

                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="rounded-xl bg-slate-800 p-4 text-white outline-none"
                    >
                        <option>Other</option>
                        <option>Smoke</option>
                        <option>Dust</option>
                        <option>Industrial Pollution</option>
                        <option>Vehicle Emission</option>
                        <option>Construction Dust</option>
                        <option>Garbage Burning</option>
                    </select>
                </div>

                <textarea
                    rows="5"
                    name="description"
                    placeholder="Describe the pollution..."
                    value={form.description}
                    onChange={handleChange}
                    className="mt-6 w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
                />

                {/* Location */}

                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    <input
                        name="address"
                        placeholder="Address"
                        value={form.address}
                        onChange={handleChange}
                        className="rounded-xl bg-slate-800 p-4 text-white"
                    />

                    <input
                        name="city"
                        placeholder="City"
                        value={form.city}
                        onChange={handleChange}
                        className="rounded-xl bg-slate-800 p-4 text-white"
                    />

                    <input
                        name="state"
                        placeholder="State"
                        value={form.state}
                        onChange={handleChange}
                        className="rounded-xl bg-slate-800 p-4 text-white"
                    />
                </div>

                <div className="mt-10">
                    <h2 className="mb-4 text-xl font-semibold text-white">
                        Select Exact Location
                    </h2>

                    <LocationPicker
                        coordinates={coordinates}
                        setCoordinates={setCoordinates}
                    />
                </div>

                {/* GPS */}

                {/* GPS */}

                <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="mt-8 flex items-center gap-2 rounded-xl border border-emerald-500 px-5 py-3 text-emerald-400 hover:bg-emerald-500 hover:text-white transition"
                >
                    <MapPin size={20} />
                    Use Current Location
                </button>
                {/* Submit */}

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="mt-10 w-full rounded-xl bg-emerald-500 py-4 text-lg font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Submitting..." : "Submit Report"}
                </button>
            </div>
        </section>
    );
}

export default Report;