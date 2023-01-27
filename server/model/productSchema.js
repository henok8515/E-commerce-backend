const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    catagories: {
      type: Array,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    price: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Product", productSchema);
