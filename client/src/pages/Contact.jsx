import { useState } from "react";

const WHATSAPP_NUMBER = "918053067573";
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    orderDetails: "",
    concern: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.orderDetails.trim())
      newErrors.orderDetails = "Please enter your order details";
    if (!formData.concern.trim())
      newErrors.concern = "Please describe your issue or concern";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const message =
      `New Contact Form Submission\n\n` +
      `Name: ${formData.name}\n` +
      `Order Details: ${formData.orderDetails}\n` +
      `Issue/Concern: ${formData.concern}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="bg-[#FFFFF6] min-h-screen px-6 py-16 sm:px-10 md:px-16 lg:px-20">
      <div className="mx-auto max-w-xl">
        <h1 className="font-serif text-3xl text-[#3F010C] sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-3 text-sm text-black/60">
          Have a question about your order? Fill out the form below and
          we'll get back to you on WhatsApp.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium uppercase tracking-wide text-[#3F010C]"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="mt-2 w-full border border-[#3F010C]/30 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors duration-200 focus:border-[#3F010C]"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="orderDetails"
              className="block text-xs font-medium uppercase tracking-wide text-[#3F010C]"
            >
              Order Details
            </label>
            <input
              type="text"
              id="orderDetails"
              name="orderDetails"
              value={formData.orderDetails}
              onChange={handleChange}
              placeholder="Order ID, product name, or order date"
              className="mt-2 w-full border border-[#3F010C]/30 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors duration-200 focus:border-[#3F010C]"
            />
            {errors.orderDetails && (
              <p className="mt-1 text-xs text-red-600">
                {errors.orderDetails}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="concern"
              className="block text-xs font-medium uppercase tracking-wide text-[#3F010C]"
            >
              Issue / Concern
            </label>
            <textarea
              id="concern"
              name="concern"
              rows={4}
              value={formData.concern}
              onChange={handleChange}
              placeholder="Describe your issue or concern"
              className="mt-2 w-full resize-none border border-[#3F010C]/30 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors duration-200 focus:border-[#3F010C]"
            />
            {errors.concern && (
              <p className="mt-1 text-xs text-red-600">{errors.concern}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-sm bg-[#3F010C] py-3 text-sm font-medium uppercase tracking-wide text-white transition-colors duration-300 hover:bg-black"
          >
            Submit via WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}