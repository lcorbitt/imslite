import React, { useState } from "react";

interface Product {
  id: number;
  serial: string;
  name: string;
  description: string;
  quantity: number;
  created_at: string;
}

interface ProductEditProps {
  product: Product;
}

const ProductEdit: React.FC<ProductEditProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [serial, setSerial] = useState(product.serial);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [quantity, setQuantity] = useState(product.quantity);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = { serial, name, description, quantity };
      await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      toggleModal()

      window.location.href = "/";
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // open the modal
  const openModal = () => {
    setIsOpen(true);
  };

  // close the modal
  const closeModal = () => {
    // if values change without saving, set them back to original values
    setSerial(product.serial)
    setName(product.name)
    setDescription(product.description)
    setQuantity(product.quantity)

    setIsOpen(false);
  };

  // toggle the modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // prevent modal from closing when clicking inside the modal content
  const preventClosingModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Edit Button */}
      <button className="btn btn-warning" onClick={openModal}>
        Edit
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={closeModal} // close modal when clicking outside of it
        >
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div
            className="bg-white p-8 rounded-lg z-50 relative w-6/12 section-padding"
            onClick={preventClosingModal} // prevent modal from closing when clicking inside it
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Modal Content */}
            <div>
              <h2 className="font-bold mb-8">Edit Product</h2>
              <form
                className="flex flex-col w-6/12 mx-auto"
                onSubmit={onSubmitForm}
              >
                <label>Serial No.</label>
                <input
                  type="text"
                  value={serial}
                  onChange={e => setSerial(e.target.value)}
                />

                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />

                <label>Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />

                <label>Quantity</label>
                <input
                  type="text"
                  value={quantity}
                  onChange={e => {
                    const value = e.target.value;
                    if (value === '') {
                      // if input is empty, set quantity state to be 0
                      setQuantity(0);
                    } else {
                      // otherwise, parse the input value as an integer
                      const parsedValue = parseInt(value, 10);
                      // check if the parsed value is NaN
                      if (!isNaN(parsedValue)) {
                        // if not NaN, update the quantity state with the parsed value
                        setQuantity(parsedValue);
                      }
                    }
                  }}
                />

                <button className="btn btn-success">Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductEdit;
