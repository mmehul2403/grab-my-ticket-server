const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service provider
  auth: {
    user: "mehulmehta1206@gmail.com", // Your email address
    pass: "ghdu hzsc lsdb tynu", // Your email password or app-specific password
  },
});

const SendOrderConfirmationEmail = async (email, order) => {
  const mailOptions = {
    from: "mmehul2403@gmail.com",
    to: email,
    subject: "Order Confirmation",
    text: `Thank you for your order!\n\nOrder Details:\n\nOrder ID: ${
      order.id
    }\nShowtime ID: ${order.showTimeId}\nTotal Seats: ${
      order.ticketNum
    }\nTotal Price: $${order.totalPrice}\nSeats: ${order.seats
      .map((seat) => `${seat.row}${seat.column}`)
      .join(
        ", "
      )}\n\nYour tickets have been booked successfully.\n\nBest regards,\nYour Company`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { SendOrderConfirmationEmail };
