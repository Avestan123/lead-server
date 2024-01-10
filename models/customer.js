const mongoose = require("mongoose");
const Employee = require("./employee");

const followupSchema = new mongoose.Schema({
  followUpDate: String,
  remarks: String,
});

const customerSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    contactPersonName: String,
    gstNumber: String,
    email: String,
    number: { type: String, required: true, unique: true },
    altNumber: String,
    address: { type: String, required: true },
    state: { type: String },
    city: { type: String},
    pin: { type: String},
    dob: { type: String},
    followUpDate: { type: String, required: true },
    latestFollowUpDate: String,
    requirement: { type: String, required: true },
    remarks: { type: String, required: true },
    clientlevel : { type: String},
    source: { type: String },
    sourceurl:{type: String},
    otherSource: String,
    additionalFollowups: [followupSchema], // Array of followups
    // electricityBill: String,
    // // photo:String,
    // pancard: String,
    // adharcard: String,
    // textRecipe: String,
    // powerOfAttorney: String,
    transferred: {
      type: Boolean,
      default: false,
    },
    transferredTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee', // Reference to the User model for the head
    },
    status: {
      type: String,
      enum: ["onboarding", "success", "pending", "workOrder", "lost"],
      default: "onboarding",
    },
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee", // Replace 'Employee' with the actual model name if different
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customers", customerSchema);
