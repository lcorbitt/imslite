import React, { useState} from "react";

const ProductInput = () => {
  const [serial, setSerial] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState("")

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = { serial, name, description, quantity };
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
  
      window.location.href = "/";
    } catch (err: any) {
      console.error(err.message)
    }
  };

  return (
    <div className="section-padding">
      <h2 className="text-center mb-8 font-bold">New Product</h2>

      <form className="flex flex-col w-6/12 mx-auto" onSubmit={onSubmitForm}>
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
          onChange={e => setQuantity(e.target.value)}
        />

        <button className="btn btn-success mt-8">Add</button>
      </form>
    </div>
  )
};

export default ProductInput;